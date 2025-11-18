import { CSSProperties, useContext, useEffect, useRef } from "react";
import styles from "../../style";
import { Project } from "../../assets/dataTypes";
import Card from "./Card";
import { LangContext } from "../language";
import { Link } from "react-router";
import { getRGBAThemeColor, handleMouseEnter, handleMouseLeave, handleMouseMove } from "../../utils";
import { ThemeContext } from "../theme/ThemeEngine";

type ProjectCardProps = {
    project: Project;
    additionalStyles: CSSProperties;
    onanimationend?: (e: React.AnimationEvent<HTMLDivElement>) => void;
}

const ProjectCard = ({project, additionalStyles, onanimationend}: ProjectCardProps) => {
    const { currentLang } = useContext(LangContext);
    const {currentTheme} = useContext(ThemeContext);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        window.onload = () => cardRef.current!.style.backgroundColor = getRGBAThemeColor("--color-secondary", 1);
    }, [currentTheme])

    return (
        <div ref={cardRef}
            id={`card-${project.title}-container`}  
            className={`
                color-scheme-primary
                ${styles.sizeFull}
                xl:max-h-[75%] lg:max-h-[65%] md:max-h-[55%] sm:max-h-[55%] ss:max-h-[50%] xs:max-h-[40%] max-h-[35%]
                2xl:max-w-[380px] xl:max-w-[350px] lg:max-w-[300px] md:max-w-[400px] sm:max-w-[75%] ss:max-w-[75%] max-w-[80%]
                aspect-square
                absolute
                rounded-md
                shadow-lg
                overflow-hidden
                cursor-pointer
                hover:shadow-xl
                transition-all
                duration-200
                ease-linear
            `}
            style={additionalStyles}
            onMouseLeave={() => handleMouseLeave(cardRef.current)}
            onMouseMove={(e) => handleMouseMove(e, cardRef.current)}
            onMouseEnter={() => handleMouseEnter(cardRef.current)}
            onAnimationEnd={(e: React.AnimationEvent<HTMLDivElement>) => onanimationend ? onanimationend(e) : () => {}}
        >
            <Link to="/projects">
                <Card key={`card-${project.title}`}
                    title={project.title[currentLang] || project.title[0]}
                    content={project.description[currentLang]}
                    tags={
                        project.tags[currentLang] ? 
                        project.tags[currentLang].concat(project.tags[0])
                        : project.tags[0]
                    }
                    moreTopClasses=
                    {`
                    `}
                    titleProps=
                    {`
                        bg-(--color-secondary)
                        lg:text-xl md:text-2xl sm:text-xl ss:text-md text-sm
                        md:px-[8%] px-[10%]
                        mb-[4%]
                    `}
                    contentProps=
                    {`
                        2xl:text-xl lg:text-lg md:text-xl sm:text-lg ss:text-base text-xs
                        md:px-[8%] px-[10%]
                        md:mt-0 mt-2
                        mb-[4%]
                        wrap-break-word
                    `}
                    tagsProps=
                    {`
                        2xl:text-lg lg:text-md md:text-lg sm:text-md ss:text-sm text-2xs
                        md:px-[8%] px-[10%]
                    `}
                />
            </Link>
        </div>
  )
}

export default ProjectCard
