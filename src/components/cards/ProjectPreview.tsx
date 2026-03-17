import { useContext, useRef } from 'react';
import { coreImages } from '../../assets';
import {Retex, ProjectMedia, MediaType} from "../../assets/dataTypes";
import styles from '../../style';
import { LangContext } from '../language';
import Card from './Card';
import { handleMouseLeave, handleMouseMove } from '../../utils/utils';
import { RetexContext } from '../retex';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';

/**
 * @component ProjectPreview
 * @description Project card with a cover image or video preview, used in the projects listing.
 * @param project - Retex data for the project to display
 */
const ProjectPreview = (project: Retex) => {
    const { currentLang } = useContext(LangContext);
    const { setDisplayedRetex } = useContext(RetexContext);
    const cardRef = useRef<HTMLDivElement>(null);

    /**
     * Normalizes media input (string or ProjectMedia) into a ProjectMedia object.
     * 
     * @function normalizeMedia
     * @param media - The media to normalize
     * @returns A ProjectMedia object
     */
    const normalizeMedia = (media: string | ProjectMedia): ProjectMedia => {
        if (typeof media === 'string') {
            return {
                url: media,
                type: MediaType.IMAGE,
                alt: "Project illustration"
            };
        }
        return media;
    };

    const firstMedia = normalizeMedia(project.coverImage || coreImages.placeholder_retex_image);

    /**
     * Renders a preview of the media (image or video).
     * 
     * @function renderMedia
     * @param media - The media object to render
     * @returns A React element (img or video)
     */
    const renderMedia = (media: ProjectMedia) => {
        const className = `
            lg:h-50 h-full
            w-full
            aspect-video
            object-cover
            object-top
        `;

        if (media.type === MediaType.VIDEO) {
            return (
                <div className="relative w-full h-full">
                    <video
                        src={media.url}
                        poster={media.poster}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className={className}
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded font-bold backdrop-blur-sm">
                        VIDEO
                    </div>
                </div>
            );
        }

        return (
            <img id={`card-${project.title}-img`}
                src={media.url}
                alt={media.alt || "project image"}
                className={className}
            />
        );
    };

    return (
        <div ref={cardRef}
            id={`card-${project.title}-container`}
            className={`
                ${styles.flexCol}
                color-scheme-primary
                bg-(--color-secondary)
                w-full md:w-[45%] xl:w-[30%]
                md:h-125 ss:h-125 h-115
                rounded-md
                shadow-xl
                overflow-hidden
                cursor-pointer
                last:overflow-visible
                mt-[5%]
                transition-all
                duration-200
                ease-linear
            `}
            style={{
                transformStyle: 'preserve-3d',
            }}
            onMouseLeave={() => handleMouseLeave(cardRef.current)}
            onMouseMove={(e) => handleMouseMove(e, cardRef.current)}
            onClick={() => setDisplayedRetex(project.title[currentLang] || project.title[UNIVERSAL_LANG])}
        >
            <div className={`
                    m-[6%]
                    mb-0
                `}
            >
                {renderMedia(firstMedia)}
            </div>
            
            <Card title={project.title[currentLang] || project.title[UNIVERSAL_LANG]} 
                content={project.description[currentLang]} 
                tags={(project.tags[currentLang] ? project.tags[currentLang] : project.tags[UNIVERSAL_LANG]).concat(project.tags[UNIVERSAL_LANG])} 
                moreTopClasses=
                {`
                    px-[8%]
                    space-y-[3%]
                `}
                titleProps={`
                    mt-4
                `}
                contentProps={`
                    wrap-break-word
                    md:text-base ss:text-sm text-xs
                `}
                tagsProps={`
                    2xl:text-base xl:text-sm md:text-base ss:text-sm text-xs
                `}
            />
        </div>
    );
}

export default ProjectPreview;
