import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { projects } from "../../assets/contents";
import styles from "../../style"
import ProjectPreview from "../cards/ProjectPreview";
import Searchbar from "../search/Searchbar";
import { SearchContext } from "../search/SearchEngine";
import Sortingbar from "../search/Sortingbar";
import { Retex } from "../../assets/dataTypes";
import { LangContext } from "../language";
import { RetexViewer, RetexContext } from "../retex";
import { getActiveBreakpoint, randomNumberBetween } from "../../utils";
import { noDataMessages, sortOptions } from "../../assets/constants";
import { ThemeContext } from "../theme/ThemeEngine";


const ProjectsListing = () => {
    const { toMatch } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);
    const [ displayedProjects, setDisplayedProjects ] = useState(projects);
    const { displayedRetexTitle } = useContext(RetexContext);
    const {currentTheme} = useContext(ThemeContext);

    useEffect(() => {
        const matchingProjects: Retex[] = [];
        let allTags: string[];
        projects.filter((project) => toMatch.some((filter) => {
            switch (filter) {
                case "ALL":
                    matchingProjects.push(project);
                    break;
                case "NEWEST":
                    matchingProjects.push(project);
                    matchingProjects.sort((a, b) => a.date <= b.date ? 1 : -1);
                    break;
                case "OLDEST":
                    matchingProjects.push(project);
                    matchingProjects.sort((a, b) => a.date >= b.date ? 1 : -1);
                    break;
                default:
                    if (!(toMatch.length === 1 /** Does the filter comes from the sorting bar ? */
                        && (sortOptions.find((option) => option.context === filter)
                        || sortOptions.find((option) => (option.abreviation?.content[currentLang] || option.abreviation?.content[0]) === filter))
                        || sortOptions.find((option) => option.content[currentLang] === filter))
                    ) { 
                        if (filter.length > 1 && ((project.title[currentLang] || project.title[0]).toUpperCase().includes(filter) 
                        || project.description[currentLang].toUpperCase().includes(filter) 
                        || (Object(project.specs).length > 0 && project.specs[currentLang].toUpperCase().includes(filter))
                        || project.notions[currentLang]?.map((notion) => notion.toUpperCase()).includes(filter))
                        ) { matchingProjects.push(project); break;}
                    }
                    
                    allTags = [];
                    for (const lang in project.tags) {
                        allTags.push(...project.tags[lang].map((tag) => tag.toUpperCase()));
                    }
                    if (allTags.includes(filter.toUpperCase())) {
                        matchingProjects.push(project);
                    }
            }
        }))
        setDisplayedProjects(
            toMatch.includes("NEWEST") || toMatch.includes("OLDEST") ?
            matchingProjects : matchingProjects.sort(() => randomNumberBetween(0,1) === 0 ? 1 : -1)
        );
    }, [toMatch]);

    const retexContainerRef = useRef<HTMLDivElement>(null);

    /** Traps focus inside the retex dialog when open, restores it when closed. */
    const handleFocusTrap = useCallback((e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !retexContainerRef.current) return;
        const focusable = retexContainerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }, []);

    useEffect(() => {
        if (displayedRetexTitle != undefined) {
            document.body.style.overflow = "hidden";
            document.addEventListener('keydown', handleFocusTrap);
            /** Auto-focus the dialog so screen readers announce it. */
            setTimeout(() => retexContainerRef.current?.focus(), 50);
        }
        else {
            document.body.style.overflow = "scroll";
            document.removeEventListener('keydown', handleFocusTrap);
        }
        return () => document.removeEventListener('keydown', handleFocusTrap);
    }, [displayedRetexTitle, handleFocusTrap]);

    useEffect(() => {
        setDisplayedProjects(displayedProjects);
    }, [currentLang, currentTheme]);
    
    const getProjectsPreviews = () => {
        return (displayedProjects.length > 0 ? 
            displayedProjects.map((project) => (
                <ProjectPreview key={`project-${project.title[currentLang] || project.title[0]}-preview`} {...project} />
            ))
        : noDataMessages.find((message) => message.context === "projects")!.content[currentLang])
    }

    return (
    <section id='projects-listing'
        className=
        {`
            ${styles.sizeFull}
            ${styles.flexCol}
            ${styles.contentCenter}
            relative
        `}
    >
        <div id='search-options-container'
            className=
            {`
                w-full
                h-fit
                ${getActiveBreakpoint("number") as number > 1 ? styles.flexRow + " space-x-40" : styles.flexCol}
                ${styles.contentCenter}
                mr-30
            `}
        >
            <Searchbar />
            
            <Sortingbar options={sortOptions} />
        </div>
        
        <div id='retex-container'
            ref={retexContainerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Project details"
            tabIndex={-1}
            className=
            {`
                ${displayedRetexTitle === undefined ? "hidden" : "block"}
                ${styles.sizeFull}
                fixed
                z-20
                top-0
                left-0
                backdrop-blur-md
                bg-transparent
                ${getActiveBreakpoint('number') as number < 2 ? "overflow-scroll" : ""}
            `}
            style={{
                animation: "fade-in 0.3s ease-in-out",
            }}
        >
            <RetexViewer />
        </div>

        <div id="projects-container"
            className=
            {`
                ${styles.flexWrap}
                ${displayedProjects.length > 0 ?  styles.contentStartX : styles.contentCenter}
                gap-x-[3%]
                w-full
                h-fit
                ${displayedProjects.length > 0 ? "" : "min-h-[50vh]"}
                ${displayedProjects.length > 0 ? styles.contentStartAll : `${styles.contentCenter} text-center`}
                my-[3%]
                ml-[4%]
            `}
            style={{
                perspective: '2000px',
            }}
        >   
            {getProjectsPreviews()}
        </div>
    </section>
    )
}

export default ProjectsListing
