import { useContext } from "react"
import styles from "../../style"
import DOMPurify from "dompurify"
import { LangContext } from "../language"
import { Hyperlink, Skill } from "../../assets/dataTypes"
import { ThemeContext } from "../theme/ThemeEngine"
import { getActiveBreakpoint } from "../../utils"
import { menuIcons } from "../../assets"
import { RetexContext } from "./RetexDisplayEngine"

type RetexHeaderProps = {
    title: {[lang: string]: string},
    date: Date,
    tools: Skill[],
    additionalRessources?: Hyperlink[]
}

const RetexHeader = (relatedProject: RetexHeaderProps) => {
    const { currentLang } = useContext(LangContext);
    const { currentTheme } = useContext(ThemeContext);
    const { setDisplayedRetex } = useContext(RetexContext);

    return (
        <header id='retex-header'
            className=
            {`
                h-fit
                md:w-3/12 w-full
                ${styles.flexCol}
                z-21
                overflow-hidden
            `}
        >
            <img src={menuIcons.close_menu_icon.content[currentTheme]}
                id='close-button'
                alt={menuIcons.close_menu_icon.alt}
                className=
                {`
                    absolute
                    ${getActiveBreakpoint('number') as number < 2 ? "" : "hidden"}
                    top-[30px]
                    right-[30px]
                    z-23
                    ${styles.sizeFit}
                    cursor-pointer
                `}
                onClick={() => setDisplayedRetex(undefined)}
            />

            <div id='retex-header-main'
                className=
                {`
                    ${styles.flexCol}
                    color-scheme-secondary
                    rounded-lg
                    shadow-lg
                `}
            >
                <h1 className=
                    {`
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
                    `}
                > 
                    <p className=
                        {`
                            ${styles.flexWrap}
                            ${styles.contentStartX}
                            leading-8
                            md:mr-0 mr-4
                        `}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(relatedProject.title[currentLang] || relatedProject.title[0])}}
                    />

                    <hr className=
                        {`
                            ${styles.line}
                            md:w-[50%] w-[25%]

                        `}
                    />

                    <span className=
                        {`
                            font-primary-regular
                            text-[60%]
                        `}
                    > 
                    {relatedProject.date.toLocaleDateString(
                        currentLang === 'fr' ? 'fr' : 'en', 
                        {month: 'numeric', year: 'numeric'}
                    )} 
                    </span>
                </h1>

                <div id='retex-skills'
                    className=
                    {`
                        ${getActiveBreakpoint('number') as number < 2 ? styles.flexRow : styles.flexCol}
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
                    {relatedProject.tools.slice(0, 6).map((tool, index) => (
                        <span key={`retex-skill-${index}`}
                            className=
                            {`
                                ${getActiveBreakpoint('number') as number < 2 ? styles.flexCol : styles.flexRow}
                                ${styles.sizeFull}
                                ${getActiveBreakpoint('number') as number < 2 ? styles.contentStartY : styles.contentStartX}
                                space-x-[8%]
                            `}
                        >   
                            <img src={tool.icon.content[currentTheme]}
                                alt={tool.icon.alt}
                                className=
                                {`
                                    object-cover
                                    object-center
                                    aspect-square
                                    md:w-[25%] w-[80%]
                                    max-w-[50px]
                                `}
                            />

                            <label className=
                                {`
                                    ${getActiveBreakpoint('number') as number < 2 ? "hidden" : ""}
                                    font-primary-regular
                                    2xl:text-lg md:text-sm
                                `}
                            > {tool.label} </label>
                        </span>
                    ))}
                </div>
            </div>

            <div id='retex-header-additional'
                className=
                {`
                    ${getActiveBreakpoint('number') as number < 2 ? "hidden" : styles.flexCol}
                `}
            >
                <ul id='retex-header-additional-ressources'
                    className=
                    {`
                        ${styles.sizeFull}
                        ${styles.flexCol}
                        list-none
                        text-wrap
                        ml-[6%]
                        mt-[8%]
                        text-[90%]
                        space-y-[3%]
                    `}
                >
                    {relatedProject.additionalRessources ? 
                        relatedProject.additionalRessources.map((resource, index) => (
                            <li key={`retex-resource-${index}`}
                                className=
                                {`
                                    ${styles.sizeFull}
                                    ${styles.flexRow}
                                    ${styles.contentStartX}
                                    space-x-[3%]
                                    ${currentTheme === 'dark' ? 'text-(--color-tertiary)' : 'text-(--color-primary)'}
                                    hover:text-white
                                    hover:cursor-pointer
                                    hover:translate-x-[2%]
                                    transition-all
                                    duration-400
                                    ease-in-out
                                `}
                            >   
                                <a target='_blank'
                                    href={resource.link}
                                > → {resource.content[currentLang]} </a>
                            </li>
                        ))
                    : null}
                </ul>
            </div>
        </header>
    )
}

export default RetexHeader
