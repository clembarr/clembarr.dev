import { useContext, useEffect, useState } from "react"
import styles from "../../style"
import { SearchContext } from "./SearchEngine";
import { DropdownSort } from "../dropdowns";
import { getActiveBreakpoint } from "../../utils";
import { sortOptions } from "../../assets/constants";
import { LangContext } from "../language";
import { ThemeContext } from "../theme/ThemeEngine";
import { AvailableSortOptions } from "../../assets/dataTypes";

/** Options merged into the Date pill and excluded from the regular pills loop. */
const DATE_OPTIONS = [AvailableSortOptions.NEWEST, AvailableSortOptions.OLDEST];

/** Options excluded from the regular pills loop entirely (ALL is implicit, date options merged). */
const EXCLUDED_FROM_PILLS = [AvailableSortOptions.ALL, ...DATE_OPTIONS];

/** Maximum number of regular pills shown on desktop (excluding the Date pill). */
const MAX_PILLS = 4;

/**
 * @description Sorting bar for projects filtering. Displays filter pills on desktop
 * with a special Date pill that cycles between inactive → newest → oldest → inactive.
 * A dropdown shows remaining options. On mobile, only the dropdown is shown.
 */
const SortingBar = () => {
    const { toMatch, setToMatch } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);
    const { currentTheme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState((getActiveBreakpoint("number") as number <= 1));

    const isDark = currentTheme === 'dark';

    /** The current state of the date pill: null (inactive), "NEWEST" or "OLDEST". */
    const dateState: string | null =
        toMatch[0] === AvailableSortOptions.NEWEST ? AvailableSortOptions.NEWEST
        : toMatch[0] === AvailableSortOptions.OLDEST ? AvailableSortOptions.OLDEST
        : null;

    /** Regular pills: all sortOptions except ALL and date-related ones. */
    const regularPills = sortOptions.filter(
        (option) => !EXCLUDED_FROM_PILLS.includes(option.context as AvailableSortOptions)
    );

    /** Items already displayed as pills, to exclude from the dropdown. */
    const alreadyDisplayedItems = [
        AvailableSortOptions.ALL,
        ...DATE_OPTIONS,
        ...(!isMobile ? regularPills.slice(0, MAX_PILLS).map((o) => o.context) : []),
    ];

    useEffect(() => {
        const handleResize = () => {
            const avbp = getActiveBreakpoint("number") as number;
            if (!isMobile && avbp <= 1) {
                setIsMobile(true);
            }
            else if (isMobile && avbp > 1) {
                setIsMobile(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobile])

    /**
     * @function handleDateClick Cycles the Date pill through its 3 states:
     * inactive → NEWEST → OLDEST → inactive (back to ALL).
     */
    const handleDateClick = () => {
        if (dateState === null) {
            setToMatch([AvailableSortOptions.NEWEST]);
        } else if (dateState === AvailableSortOptions.NEWEST) {
            setToMatch([AvailableSortOptions.OLDEST]);
        } else {
            setToMatch([AvailableSortOptions.ALL]);
        }
    };

    /**
     * @function isActive Check if a sort option context matches the current filter.
     * @param context the sort option context to check
     * @returns true if the option is currently active
     */
    const isActive = (context: string) => context === toMatch[0];

    /** Shared pill class names for both the Date pill and regular pills. */
    const pillBase = `
        px-4 py-1.5
        rounded-md
        text-nowrap
        text-sm
        font-primary-regular
        cursor-pointer
        transition-all duration-250 ease-out
        border
    `;

    /** Active pill styling. */
    const pillActive = `
        bg-(--color-tertiary)/15
        text-(--color-tertiary)
        border-(--color-tertiary)/40
        ${isDark ? 'shadow-[0_0_8px_rgba(124,255,196,0.15)]' : 'shadow-sm'}
    `;

    /** Inactive pill styling. */
    const pillInactive = `
        bg-(--color-primary)/60
        text-(--color-muted)
        border-(--color-border)
        hover:text-(--color-tertiary)
        hover:border-(--color-tertiary)/30
        hover:bg-(--color-tertiary)/5
    `;

    const dateLabel = currentLang === "fr" ? "DATE" : "DATE";

    return (
    <div id="sorting-bar-container"
        className=
        {`
            ${styles.sizeFit}
            ${styles.flexRow}
            ${styles.contentCenter}
            gap-3
        `}
    >
        {!isMobile && (
            <>
                {/* Date pill with rotating chevron */}
                <button
                    onClick={handleDateClick}
                    className={`
                        ${pillBase}
                        ${styles.flexRow}
                        ${styles.contentCenter}
                        gap-1.5
                        ${dateState !== null ? pillActive : pillInactive}
                    `}
                >
                    {dateLabel}
                    <svg
                        className={`
                            w-2.5 h-2.5
                            transition-all duration-300 ease-out
                            ${dateState === null ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
                            ${dateState === AvailableSortOptions.OLDEST ? 'rotate-180' : 'rotate-0'}
                        `}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Regular filter pills */}
                {regularPills.slice(0, MAX_PILLS).map((option, index) => (
                    <button key={index}
                        onClick={() => setToMatch([option.context])}
                        className={`
                            ${pillBase}
                            ${isActive(option.context) ? pillActive : pillInactive}
                        `}
                    > {option.content[currentLang].toUpperCase()} </button>
                ))}
            </>
        )}

        <div id="dropdown-sort-container"
            className=
            {`
                ${styles.sizeFit}
                ${styles.flexRow}
                ${styles.contentStartX}
                ${isMobile ? "" : "ml-1"}
            `}
        >
            <DropdownSort alreadyDisplayedItems={alreadyDisplayedItems} />
        </div>
    </div>
  )
}

export default SortingBar
