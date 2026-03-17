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
import { getActiveBreakpoint, getMaxPills, randomNumberBetween } from "../../utils/utils";
import { noDataMessages, sortOptions, PROJECTS_LISTING_PERSPECTIVE } from "../../assets/constants";
import { ThemeContext } from "../theme/ThemeEngine";
import { ScrollReveal } from "../animations";
import { UNIVERSAL_LANG } from "../../utils/translationUtils";


/**
 * @component ProjectsListing
 * @description Full projects listing page with search, sort, and retex overlay.
 * Filters and sorts projects based on SearchContext. Opens a modal-style retex
 * dialog when a project is selected, trapping focus inside for accessibility.
 */
const ProjectsListing = () => {
    const { toMatch } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);
    const [ displayedProjects, setDisplayedProjects ] = useState(projects);
    const { displayedRetexTitle } = useContext(RetexContext);
    const {currentTheme} = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState((getActiveBreakpoint("number") as number >= 2));
    
    useEffect(() => {
        const handleResize = () => {
            const avbp = getActiveBreakpoint("number") as number;
            if (!isMobile && avbp >= 2) {
                setIsMobile(true);
            }
            else if (isMobile && avbp < 2) {
                setIsMobile(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobile])

    useEffect(() => {
        const matchingProjects: Retex[] = [];
        let allTags: string[];
        projects.filter((project) => toMatch.some((filter) => {
            //specific filters (date, favorite) have their own logic
            switch (filter) {
                case "ALL":
                    matchingProjects.push(project);
                    //favorite projects first
                    matchingProjects.sort((a, b) => a.favorite === b.favorite ? a.date <= b.date ? 1 : -1 : !a.favorite ? 1 : -1);
                    break;
                case "NEWEST":
                    matchingProjects.push(project);
                    matchingProjects.sort((a, b) => a.date <= b.date ? 1 : -1);
                    break;
                case "OLDEST":
                    matchingProjects.push(project);
                    matchingProjects.sort((a, b) => a.date >= b.date ? 1 : -1);
                    break;
                case "FAVORITE":
                    if (project.favorite) {
                        matchingProjects.push(project);
                    }
                    break;
                default:
                    if (!(toMatch.length === 1 /** Does the filter comes from the sorting bar ? */
                        && (sortOptions.find((option) => option.context === filter)
                        || sortOptions.find((option) => (option.abreviation?.content[currentLang] || option.abreviation?.content[0]) === filter))
                        || sortOptions.find((option) => option.content[currentLang] === filter))
                    ) { 
                        if (filter.length > 1 && ((project.title[currentLang] || project.title[0]).toUpperCase().includes(filter) 
                        || project.description[currentLang].toUpperCase().includes(filter) 
                        || (Object(project.content.specs).length > 0 && project.content.specs[currentLang].toUpperCase().includes(filter))
                        || project.content.notions[currentLang]?.map((notion: string) => notion.toUpperCase()).includes(filter))
                        ) { matchingProjects.push(project); break;}
                    }
                    
                    allTags = [];
                    for (const lang in project.tags) {
                        allTags.push(...project.tags[lang].map((tag: string) => tag.toUpperCase()));
                    }
                    if (allTags.includes(filter.toUpperCase())) {
                        matchingProjects.push(project);
                    }
            }
        }))
        setDisplayedProjects(
            toMatch.includes("NEWEST") || toMatch.includes("OLDEST") || toMatch.includes("ALL") || toMatch.includes("FAVORITE") ? 
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
            // Auto-focus the dialog so screen readers announce it.
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
                <ProjectPreview key={`project-${project.title[currentLang] || project.title[UNIVERSAL_LANG]}-preview`} {...project} />
            ))
        : noDataMessages.find((message) => message.context === "projects")!.content[currentLang])
    }

    return (
    <section id='projects-listing'
        className={`
            ${styles.sizeFull}
            ${styles.flexCol}
            ${styles.contentCenter}
            relative
        `}
    >
        <ScrollReveal direction="up" delay={0.2} className="">
            <div id='search-options-container'
                className={`
                    w-full
                    h-fit
                    ${styles.flexColToRowAtLg} 
                    ${styles.contentCenter}
                    2xl:gap-36 xl:gap-31 lg:gap-25
                    lg:space-y-0 space-y-6
                    lg:py-0 ss:py-[2%] py-[8%]
                `}
            >
                <Searchbar />

                <Sortingbar options={sortOptions} 
                    maxPills={getMaxPills()} 
                />
            </div>
        </ScrollReveal>
        
        <div id='retex-container'
            ref={retexContainerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Project details"
            tabIndex={-1}
            className={`
                ${displayedRetexTitle === undefined ? "hidden" : "block"}
                ${styles.sizeFull}
                fixed
                z-20
                top-0
                left-0
                backdrop-blur-md
                bg-transparent
                overflow-auto lg:overflow-hidden
            `}
            style={{
                animation: "fade-in 0.3s ease-in-out",
            }}
        >
            <RetexViewer />
        </div>

        <ScrollReveal direction="up" delay={0.35} className="w-full">
        <div id="projects-container"
            className={`
                ${styles.flexWrap}
                ${displayedProjects.length > 0 ? styles.contentStartX : styles.contentCenter}
                gap-x-[3%]
                w-full md:w-full ss:w-[85%] ]
                h-fit
                ${displayedProjects.length > 0 ? "" : "min-h-[50vh]"}
                ${displayedProjects.length > 0 ? styles.contentStartAll : `${styles.contentCenter} text-center`}
                my-[3%]
                md:ml-[4%] ss:ml-[7.5%]
                md:space-y-0 space-y-5
            `}
            style={{
                perspective: PROJECTS_LISTING_PERSPECTIVE,
            }}
        >   
            {getProjectsPreviews()}
        </div>
        </ScrollReveal>
    </section>
    )
}

export default ProjectsListing
