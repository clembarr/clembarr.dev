import { CSSProperties, useContext, useRef } from "react";
import styles from "../../style";
import { Project } from "../../assets/dataTypes";
import Card from "./Card";
import { LangContext } from "../language";
import { Link } from "react-router";
import { handleMouseEnter, handleMouseLeave, handleMouseMove } from "../../utils/utils";
import { ThemeContext } from "../theme/ThemeEngine";

type ProjectCardProps = {
  project: Project;
  additionalStyles: CSSProperties;
  onanimationend?: (e: React.AnimationEvent<HTMLDivElement>) => void;
}

/**
 * @component ProjectCard
 * @description Tilt-on-hover project card used in the home page slider.
 * @param project - Project data to display
 * @param additionalStyles - Inline styles forwarded to the root element (position, z-index, etc.)
 * @param onanimationend - Handler forwarded to the root element's onAnimationEnd event
 */
const ProjectCard = ({project, additionalStyles, onanimationend}: ProjectCardProps) => {
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);
  const cardRef = useRef<HTMLDivElement>(null);

  const isDark = currentTheme === 'dark';

  return (
    <div
      ref={cardRef}
      id={`card-${project.title[currentLang]}-container`}
      className={`
        group
        ${styles.sizeFull}
        xl:max-h-[75%] lg:max-h-[65%] md:max-h-[55%] sm:max-h-[55%] ss:max-h-[50%] xs:max-h-[40%] max-h-[35%]
        2xl:max-w-95 xl:max-w-87.5 lg:max-w-75 md:max-w-100 sm:max-w-[75%] ss:max-w-[75%] max-w-[80%]
        aspect-square
        absolute
        rounded-xl
        overflow-hidden
        cursor-pointer
        ${styles.easeOutTransition}
        ${isDark
          ? `
            bg-(--color-surface)
            border border-(--color-border)
            shadow-(--shadow-card)
            hover:border-(--color-tertiary)/30
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          `
          : `
            bg-(--color-surface)
            border-(--color-border)
            shadow-(--shadow-card)
            hover:shadow-(--shadow-card-hover)
          `
        }
        hover:-translate-y-1
      `}
      style={additionalStyles}
      onMouseLeave={() => handleMouseLeave(cardRef.current)}
      onMouseMove={(e) => handleMouseMove(e, cardRef.current)}
      onMouseEnter={() => handleMouseEnter(cardRef.current)}
      onAnimationEnd={(e: React.AnimationEvent<HTMLDivElement>) =>
        onanimationend ? onanimationend(e) : () => {}
      }
    >
      <div id={`top-card-${project.title[currentLang]}-line`}
        className={`
          absolute
          top-0 left-0 right-0
          h-0.75
          transition-all duration-300
          bg-linear-to-r from-(--color-tertiary)/0 via-(--color-tertiary) to-(--color-tertiary)/0 opacity-0 group-hover:opacity-100 shadow-(--glow-md)
        `}
      />

      <Link to="/projects" 
        className={`
          block 
          ${styles.sizeFull}
        `}
      >
        <Card
          key={`card-${project.title}`}
          title={project.title[currentLang] || project.title[0]}
          content={project.description[currentLang]}
          tags={
            project.tags[currentLang]
              ? project.tags[currentLang].concat(project.tags[0])
              : project.tags[0]
          }
          moreTopClasses="pt-4"
          titleProps={`
            lg:text-xl md:text-2xl sm:text-xl ss:text-md text-sm
            md:px-[8%] px-[10%]
            mb-[4%]
            mt-6
            text-(--color-quaternary)
            group-hover:text-(--color-tertiary)
            transition-colors duration-300
          `}
          contentProps={`
            2xl:text-lg lg:text-lg md:text-xl sm:text-lg ss:text-base text-xs
            md:px-[8%] px-[10%]
            md:mt-0 mt-2
            mb-[4%]
            wrap-break-word
            text-(--color-quaternary)/80
          `}
          tagsProps={`
            2xl:text-sm lg:text-md md:text-lg sm:text-md ss:text-sm text-2xs
            md:px-[8%] px-[10%]
          `}
        />
      </Link>
    </div>
  )
}

export default ProjectCard;
