import styles from '../style'
import ProjectsListing from '../components/sections/ProjectsListing'
import { SearchEngine } from '../components/search/SearchEngine'
import { PageTransition } from '../components/animations'
import { MetaTags, StructuredData, websiteSchema } from '../components/seo'

const Projects = () => {

    return (
        <PageTransition>
        <MetaTags
            title="Projets - Clément Barrière"
            description="Découvrez les projets de Clément Barrière : développement web, intelligence artificielle, algorithmes et plus."
            keywords={['projets', 'projects', 'développement', 'software', 'AI', 'algorithms']}
            ogUrl="https://clembarr.dev/projects"
            canonical="https://clembarr.dev/projects"
        />
        <StructuredData schema={websiteSchema} />
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
