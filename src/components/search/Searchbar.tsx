import { useContext, useRef } from "react"
import styles from "../../style"
import { SearchContext } from "./SearchEngine"
import { placeholderMessages } from "../../assets/constants";
import { LangContext } from "../language";

type SearchbarProps = {
    placeholderContext?: string;
}

/**
 * @description Search bar with controlled input, debounced real-time search
 * (300 ms), immediate search on Enter, and a reset button (×).
 * @param placeholderContext - context key used to look up the placeholder message (default: "search")
 */
const Searchbar = ({ placeholderContext = "search" }: SearchbarProps) => {
    const { searchInput, setSearchInput, updateSearch } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);

    /** Debounce timer ref — cleared on each keystroke and on Enter. */
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    /**
     * @function handleChange Updates the controlled input value and schedules
     * a debounced search after 300 ms.
     */
    const handleChange = (value: string) => {
        setSearchInput(value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            updateSearch([...value.toUpperCase().split(' ')]);
        }, 300);
    };

    /**
     * @function handleImmediateSearch Cancels the pending debounce and triggers
     * the search right away (used on Enter key press).
     */
    const handleImmediateSearch = () => {
        clearTimeout(debounceRef.current);
        updateSearch([...searchInput.toUpperCase().split(' ')]);
    };

    /**
     * @function handleReset Clears the input and resets the filter to ALL.
     */
    const handleReset = () => {
        clearTimeout(debounceRef.current);
        setSearchInput("");
        updateSearch(["ALL"]);
    };

    return (
        <div id='search-bar-container'
            className=
            {`
                ${styles.sizeFit}
                ${styles.flexRow}
                ${styles.contentCenter}
                relative
                md:text-base text-2xs
            `}
        >
            <input type='search'
                value={searchInput}
                placeholder={placeholderMessages.find((message) => message.context === placeholderContext)!.content[currentLang]}
                className=
                {`
                    px-[3%]
                    py-[1.5%]
                    pr-8
                    rounded-md
                    bg-(--color-primary)
                    border-2
                    border-(--color-quaternary)
                    ${styles.defaultTransition}
                `}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleImmediateSearch();
                    }
                }}
            />
            {searchInput !== "" && (
                <button
                    type="button"
                    onClick={handleReset}
                    aria-label="Clear search"
                    className={`
                        absolute right-2
                        w-5 h-5
                        ${styles.flexRow}
                        ${styles.contentCenter}
                        text-(--color-quaternary)
                        hover:text-(--color-tertiary)
                        cursor-pointer
                        transition-colors duration-200
                    `}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Searchbar;
