import { useContext, useEffect, useState } from "react"
import styles from "../../style"
import { SearchContext } from "./SearchEngine";
import { DropdownSort } from "../dropdowns";
import { getActiveBreakpoint } from "../../utils";
import { sortOptions } from "../../assets/constants";
import { LangContext } from "../language";

const SortingBar = () => {
    const { toMatch, setToMatch } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);
    const alreadyDisplayedItems = ["ALL"];
    const [isMobile, setIsMobile] = useState((getActiveBreakpoint("number") as number <= 1));

    useEffect(() => {
        window.addEventListener("resize", () => {
            const avbp = getActiveBreakpoint("number") as number;
            if (!isMobile && avbp <= 1) {
                setIsMobile(true);
            }
            else if (isMobile && avbp > 1) {
                setIsMobile(false);
            }
        })
    }, [])

    return (
    <div id="sorting-bar-container"
        className=
        {`
            ${styles.sizeFit}
            ${styles.flexRow}
            ${styles.contentCenter}
        `}
    >
        {isMobile ? "" : sortOptions.slice(0,4).map((option, index) => {
            alreadyDisplayedItems.push(option.context);
            return(
                <button key={index}
                    onClick={() => setToMatch([option.context])}
                    className=
                    {`
                        px-4
                        py-1
                        rounded-md
                        ${styles.hyperlink}
                        duration-300
                        text-nowrap
                        ${option.context === toMatch[0] ? "text-(--color-tertiary)" : ""}
                    `}
                > {option.content[currentLang].toUpperCase()} 
                    <hr id='lib-hr'
                        className=
                        {`
                            ${styles.line}
                        `}
                        style={{animation: "hr-apparition 0.5s forwards ease-in-out"}}
                    />
                </button>
            )
        })}

        <div id="dropdown-sort-container"
            className=
            {`
                ${styles.sizeFit}
                ${styles.flexRow}
                ${styles.contentStartX}
                ml-[5%]
            `}
        >
            <DropdownSort alreadyDisplayedItems={alreadyDisplayedItems} />
        </div>
    </div>
  )
}

export default SortingBar
