import { useContext } from "react"
import styles from "../../style"
import DOMPurify from "dompurify"
import { LangContext } from "../language"
import { Retex } from "../../assets/dataTypes"
import { ThemeContext } from "../theme/ThemeEngine"
import { menuIcons } from "../../assets"
import { RetexContext } from "./RetexDisplayEngine"
import { getLinkFromTypedLink } from "../../utils/utils"
import { UNIVERSAL_LANG } from "../../utils/translationUtils"

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

    return (
        <header id='retex-header'
            className={`
                h-fit
                lg:w-3/12 w-full
                ${styles.flexCol}
                z-21
                overflow-hidden
            `}
        >
            <button id="close-retex-button"
                type="button"
                aria-label="Close"
                className={`
                    absolute
                    lg:hidden
                    md:top-[60px] sm:top-[50px] ss:top-[45px] top-[35px] 
                    md:right-[45px] ss:right-[35px] right-[30px]
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
                    pt-[6%] lg:pt-0
                `}
            >
                <h1 className={`
                    w-full
                    font-primary-bold
                    2xl:text-2xl xl:text-xl lg:text-lg md:text-2xl text-xl
                    text-wrap
                    tracking-wide
                    lg:py-[6%]
                    lg:pt-[8%]
                    px-[10%]
                    border-dashed
                    lg:space-y-[2%] ss:space-y-0 space-y-[2%]
                `}>
                    <p className={`
                        ${styles.flexWrap}
                        ${styles.contentStartX}
                        leading-8
                        lg:mr-0 mr-4
                    `}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(relatedProject.title[currentLang] || relatedProject.title[0])}}
                    />

                    <hr className={`
                        ${styles.line}
                        lg:w-[50%] w-[25%]
                        mt-4 lg:mt-2 xl:mt-4
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
                        ${styles.flexRowToColAtLg}
                        ${styles.sizeFull}
                        ${styles.contentStartX}
                        px-[10%]
                        py-[8%]
                        pt-[6%]
                        lg:space-y-[6%]
                        lg:overflow-hidden overflow-x-scroll
                        overflow-y-hidden
                        space-x-3 md:space-x-6 lg:space-x-0
                    `}
                >
                    {relatedProject.content.tools.slice(0, 6).map((tool, index) => (
                        <a key={`retex-skill-${index}`}
                            className={`
                                ${styles.flexColToRowAtLg}
                                ${styles.sizeFull}
                                ${styles.contentStartX}
                                lg:space-x-[8%]
                                ${styles.defaultTransition}
                                hover:translate-x-[3px]
                            `}
                            href={getLinkFromTypedLink(tool.link || "")}
                        >
                            <img src={tool.icon.content[currentTheme]}
                                alt={tool.icon.alt}
                                className={`
                                    object-cover
                                    object-center
                                    aspect-square
                                    w-8 ss:w-10 md:w-12 lg:w-[25%]
                                    max-w-[50px]
                                `}
                            />

                            <span className={`
                                hidden lg:inline
                                font-primary-regular
                                2xl:text-lg xl:text-base lg:text-2xs
                            `}> {tool.label} </span>
                        </a>
                    ))}
                </div>
            </div>

            <div id='retex-header-additional'
                className={`
                    ${styles.hiddenToFlexColAtLg}
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
                                    href={getLinkFromTypedLink(resource.link)}
                                    className={`${styles.animatedLink} font-bold`}
                                > → {resource.content[currentLang] || resource.content[UNIVERSAL_LANG]} </a>
                            </li>
                        ))
                    : null}
                </ul>
            </div>
        </header>
    )
}

export default RetexHeader
