import { useContext, useRef } from 'react';
import { coreImages } from '../../assets';
import {Retex} from "../../assets/dataTypes";
import styles from '../../style';
import { LangContext } from '../language';
import Card from './Card';
import { handleMouseLeave, handleMouseMove } from '../../utils';
import { RetexContext } from '../retex';

const ProjectPreview = (project: Retex) => {
    const { currentLang } = useContext(LangContext);
    const { setDisplayedRetex } = useContext(RetexContext);
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={cardRef}
            id={`card-${project.title}-container`}
            className=
            {`
                ${styles.flexCol}
                color-scheme-primary
                md:w-[30%] base:w-full
                h-[500px]
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
            onClick={() => setDisplayedRetex(project.title[currentLang] || project.title[0])}
        >
            <div className=
                {`
                    m-[6%]
                    mb-0
                `}
            >
                <img id={`card-${project.title}-img`}
                    src={project.img && project.img.length > 0 ? project.img[0] : coreImages.placeholder_retex_image}
                    alt="project image"
                    className=
                    {`
                        lg:h-[200px] h-full
                        w-full
                        aspect-video
                        object-cover
                        object-top
                    `}
                />
            </div>
            
            <Card title={project.title[currentLang] || project.title[0]} 
                content={project.description[currentLang]} 
                tags={project.tags[currentLang].concat(project.tags[0])} 
                moreTopClasses=
                {`
                    px-[8%]
                `}
                titleProps=
                {`
                `}
                contentProps=
                {`
                `}
                tagsProps=
                {`
                `}
            />
        </div>
    );
}

export default ProjectPreview;
