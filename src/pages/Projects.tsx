import styles from '../style'
import ProjectsListing from '../components/sections/ProjectsListing'
import { SearchEngine } from '../components/search/SearchEngine'
import { PageTransition } from '../components/animations'

const Projects = () => {

    return (
        <PageTransition>
        <div id="projects-page-container"
            className=
            {`
                ${styles.page}
                ${styles.flexCol}
                relative
            `}
        >
            <div id="projects-listing-container" 
                className=
                {`
                    w-full
                    h-fit
                    ${styles.flexCol}
                    ${styles.contentStartY}
                    pl-[11%]
                    pr-[12%]
                    py-[6%]
                `}
            >
                <SearchEngine>
                    <ProjectsListing />
                </SearchEngine>
            </div>
        </div>
        </PageTransition>
    )
}

export default Projects
