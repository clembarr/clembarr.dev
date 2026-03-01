import { useContext, useEffect, useState } from "react"
import styles from "../../style"
import { SearchContext } from "./SearchEngine";
import { DropdownSort } from "../dropdowns";
import { getActiveBreakpoint } from "../../utils";
import { menuIcons } from "../../assets/menu_icons";
import { LangContext } from "../language";
import { ThemeContext } from "../theme/ThemeEngine";
import { FilterOption } from "../../assets/dataTypes";

/** Options merged into the Date pill and excluded from the regular pills loop. */
const DATE_OPTIONS = ["NEWEST", "OLDEST"];

/** Options excluded from the regular pills loop (ALL is its own pill, date options merged). */
const EXCLUDED_FROM_PILLS = ["ALL", ...DATE_OPTIONS];

type SortingBarProps = {
    options: FilterOption[];
    maxPills?: number;
}

/**
 * @description Sorting bar for filtering. Always displays an ALL pill
 * and a Date pill (with a chevron cycling newest/oldest). Regular filter pills
 * follow, using abbreviations when available. A dropdown shows remaining options.
 * On mobile, only the dropdown is shown.
 * @param options - the filter options to display as pills and in the dropdown
 * @param maxPills - maximum number of regular pills shown on desktop (default: 4)
 */
const SortingBar = ({ options, maxPills = 4 }: SortingBarProps) => {
    const { toMatch, updateSearch, setSearchInput } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);
    const { currentTheme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState((getActiveBreakpoint("number") as number <= 1));

    const isDark = currentTheme === 'dark';

    /** The current state of the date pill: null (inactive), "NEWEST" or "OLDEST". */
    const dateState: string | null =
        toMatch[0] === "NEWEST" ? "NEWEST"
        : toMatch[0] === "OLDEST" ? "OLDEST"
        : null;

    /** Regular pills: all options except ALL and date-related ones. */
    const regularPills = options.filter(
        (option) => !EXCLUDED_FROM_PILLS.includes(option.context)
    );

    /** Items already displayed as pills, to exclude from the dropdown. */
    const alreadyDisplayedItems = [
        "ALL",
        ...DATE_OPTIONS,
        ...(!isMobile ? regularPills.slice(0, maxPills).map((o) => o.context) : []),
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
        setSearchInput("");
        if (dateState === null || dateState === "OLDEST") {
            updateSearch(["NEWEST"]);
        } else {
            updateSearch(["OLDEST"]);
        }
    };

    /**
     * @function isActive Check if a sort option context matches the current filter.
     * @param context the sort option context to check
     * @returns true if the option is currently active
     */
    const isActive = (context: string) => context === toMatch[0];

    /**
     * @function getPillLabel Returns the abbreviated label for a sort option if available,
     * otherwise falls back to the full content label.
     * @param option the sort option to get the label for
     * @returns the uppercased label string
     */
    const getPillLabel = (option: FilterOption) => {
        const label = option.abreviation
            ? (option.abreviation.content[currentLang] || option.abreviation.content[0])
            : option.content[currentLang];
        return label.toUpperCase();
    };

    /** Shared pill class names. */
    const pillBase = `
        px-2.5 py-1
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

    const allOption = options.find((o) => o.context === "ALL")!;

    return (
        <div id="sorting-bar-container"
            className=
            {`
                ${styles.sizeFit}
                ${styles.flexRow}
                ${styles.contentCenter}
                gap-4
            `}
        >
            {!isMobile && (
                <>
                    <button
                        onClick={() => { setSearchInput(""); updateSearch(["ALL"]); }}
                        className={`
                            ${pillBase}
                            ${isActive("ALL") ? pillActive : pillInactive}
                        `}
                    > {allOption.content[currentLang].toUpperCase()} </button>

                    <button
                        onClick={handleDateClick}
                        className={`
                            ${pillBase}
                            ${styles.flexRow}
                            ${styles.contentCenter}
                            ${dateState !== null ? pillActive : pillInactive}
                        `}
                    >
                        DATE
                        {dateState !== null && (
                            <img
                                src={menuIcons.chevron_icon.content[currentTheme]}
                                alt={menuIcons.chevron_icon.alt}
                                className={`
                                    w-4
                                    ml-1    
                                    ${styles.easeOutTransition}
                                    ${dateState === "OLDEST" ? 'rotate-180' : 'rotate-0'}
                                `}
                            />
                        )}
                    </button>

                    {regularPills.slice(0, maxPills).map((option, index) => (
                        <button key={index}
                            onClick={() => { setSearchInput(""); updateSearch([option.context]); }}
                            data-tooltip={option.abreviation ? option.content[currentLang] : undefined}
                            className={`
                                ${pillBase}
                                ${isActive(option.context) ? pillActive : pillInactive}
                                ${(option.abreviation && (option.abreviation.content[currentLang] !== '')) ? 'pill-tooltip' : ''}
                            `}
                        > {getPillLabel(option)} </button>
                    ))}
                </>
            )}

            <div id="dropdown-sort-container"
                className=  
                {`
                    ${styles.sizeFit}
                    ${styles.flexRow}
                    ${styles.contentStartX}
                    ml-6
                `}
            >
                <DropdownSort alreadyDisplayedItems={alreadyDisplayedItems} options={options} />
            </div>
        </div>
    )
}

export default SortingBar
