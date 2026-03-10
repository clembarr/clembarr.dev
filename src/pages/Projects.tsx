import styles from '../style'
import ProjectsListing from '../components/sections/ProjectsListing'
import { SearchEngine } from '../components/search/SearchEngine'
import { PageTransition } from '../components/animations'
import { MetaTags, StructuredData } from '../components/seo'
import { ProjectSEOConstants, websiteSchema } from '../assets/constants'

/**
 * @component Projects
 * @description Projects listing page. Wraps ProjectsListing in a SearchEngine
 * context so search, sort and filter state is available to child components.
 */
const Projects = () => {

    return (
        <PageTransition>
        <MetaTags
            title={ProjectSEOConstants.title}
            description={ProjectSEOConstants.description}
            keywords={ProjectSEOConstants.keywords}
            ogUrl={ProjectSEOConstants.ogUrl}
            canonical={ProjectSEOConstants.canonical}
        />
        <StructuredData schema={websiteSchema} />
        <div id="projects-page-container"
            className={`
                ${styles.page}
                ${styles.flexCol}
                relative
            `}
        >
            <div id="projects-listing-container"
                className={`
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
