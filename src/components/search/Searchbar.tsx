import { useContext } from "react"
import styles from "../../style"
import { SearchContext } from "./SearchEngine"
import { placeholderMessages } from "../../assets/constants";
import { LangContext } from "../language";

const Searchbar = () => {
    const { setToMatch } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);

    const handleSearchTerms = (searchTerms: string) => {
        setToMatch(
            [...searchTerms.toUpperCase().split(' ').filter((term) => ! term.includes(' '))]
        );
    }

    return (
        <div id='search-bar-container'
            className=
            {`
                ${styles.sizeFit}
                ${styles.flexRow}
                ${styles.contentCenter}
            `}
        >
            <input type='search'
                placeholder={placeholderMessages.find((message) => message.context === 'search')!.content[currentLang]}
                className=
                {`
                    px-[3%]
                    py-[1.5%]
                    rounded-md
                    bg-(--color-primary)
                    border-2
                    border-(--color-quaternary)
                    transition-all
                    duration-300
                    ease-in-out
                `}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchTerms(e.currentTarget.value);
                    }
                }}
            />
        </div>
  )
}

export default Searchbar;
