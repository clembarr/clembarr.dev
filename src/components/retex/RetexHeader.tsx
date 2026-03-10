import { useContext } from "react"
import styles from "../../style"
import DOMPurify from "dompurify"
import { LangContext } from "../language"
import { Retex } from "../../assets/dataTypes"
import { ThemeContext } from "../theme/ThemeEngine"
import { getActiveBreakpoint } from "../../utils/utils"
import { menuIcons } from "../../assets"
import { RetexContext } from "./RetexDisplayEngine"

/**
 * @component RetexHeader
 * @description Left-side panel of the retex viewer. Displays the project title,
 * date, tool icons, and additional resource links. On mobile, renders a close
 * button and a horizontal scrollable tool strip instead of the sidebar layout.
 * @param relatedProject - The retex project data to display
 */
const RetexHeader = (relatedProject: Retex) => {
    const { currentLang } = useContext(LangContext);
    const { currentTheme } = useContext(ThemeContext);
    const { setDisplayedRetex } = useContext(RetexContext);

    const isMobile = (getActiveBreakpoint('number') as number) < 2;

    return (
        <header id='retex-header'
            className={`
                h-fit
                md:w-3/12 w-full
                ${styles.flexCol}
                z-21
                overflow-hidden
            `}
        >
            <button
                type="button"
                aria-label="Close"
                className={`
                    absolute
                    ${isMobile ? "" : "hidden"}
                    top-[30px]
                    right-[30px]
                    z-23
                    ${styles.sizeFit}
                    cursor-pointer
                `}
                onClick={() => setDisplayedRetex(undefined)}
            >
                <img src={menuIcons.close_menu_icon.content[currentTheme]}
                    alt={menuIcons.close_menu_icon.alt}
                />
            </button>

            <div id='retex-header-main'
                className={`
                    ${styles.flexCol}
                    color-scheme-secondary
                    rounded-lg
                    shadow-lg
                `}
            >
                <h1 className={`
                    w-full
                    font-primary-bold
                    md:text-3xl text-xl
                    tracking-wide
                    md:py-[6%]
                    md:pt-[6%]
                    px-[10%]
                    border-dashed
                    md:space-y-[6%] space-y-[2%]
                    md:mb-[3%]
                `}>
                    <p className={`
                        ${styles.flexWrap}
                        ${styles.contentStartX}
                        leading-8
                        md:mr-0 mr-4
                    `}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(relatedProject.title[currentLang] || relatedProject.title[0])}}
                    />

                    <hr className={`
                        ${styles.line}
                        md:w-[50%] w-[25%]
                    `}
                    />

                    <span className={`
                        font-primary-regular
                        text-[60%]
                    `}>
                    {relatedProject.date.toLocaleDateString(
                        currentLang === 'fr' ? 'fr' : 'en',
                        {month: 'numeric', year: 'numeric'}
                    )}
                    </span>
                </h1>

                <div id='retex-skills'
                    className={`
                        ${isMobile ? styles.flexRow : styles.flexCol}
                        ${styles.sizeFull}
                        ${styles.contentStartX}
                        px-[10%]
                        py-[8%]
                        pt-[6%]
                        md:space-y-[6%]
                        md:overflow-hidden overflow-x-scroll
                        overflow-y-hidden
                    `}
                >
                    {relatedProject.content.tools.slice(0, 6).map((tool, index) => (
                        <span key={`retex-skill-${index}`}
                            className={`
                                ${isMobile ? styles.flexCol : styles.flexRow}
                                ${styles.sizeFull}
                                ${isMobile ? styles.contentStartY : styles.contentStartX}
                                space-x-[8%]
                            `}
                        >
                            <img src={tool.icon.content[currentTheme]}
                                alt={tool.icon.alt}
                                className={`
                                    object-cover
                                    object-center
                                    aspect-square
                                    md:w-[25%] w-[80%]
                                    max-w-[50px]
                                `}
                            />

                            <span className={`
                                ${isMobile ? "hidden" : ""}
                                font-primary-regular
                                2xl:text-lg md:text-sm
                            `}> {tool.label} </span>
                        </span>
                    ))}
                </div>
            </div>

            <div id='retex-header-additional'
                className={`
                    ${isMobile ? "hidden" : styles.flexCol}
                `}
            >
                <ul id='retex-header-additional-ressources'
                    className={`
                        ${styles.sizeFull}
                        ${styles.flexCol}
                        list-none
                        text-wrap
                        ml-[6%]
                        mt-[8%]
                        2xl:text-base
                        space-y-[3%]
                    `}
                >
                    {relatedProject.content.additionalRessources ?
                        relatedProject.content.additionalRessources.map((resource, index) => (
                            <li key={`retex-resource-${index}`}
                                className={`
                                    ${styles.sizeFull}
                                    space-x-[3%]
                                `}
                            >
                                <a target='_blank'
                                    rel="noopener noreferrer"
                                    href={resource.link as any}
                                    className={`${styles.animatedLink} font-bold`}
                                > → {resource.content[currentLang] || resource.content[0]} </a>
                            </li>
                        ))
                    : null}
                </ul>
            </div>
        </header>
    )
}

export default RetexHeader
