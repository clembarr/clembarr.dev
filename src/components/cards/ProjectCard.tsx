import { CSSProperties, useContext, useRef } from "react";
import styles from "../../style";
import { Project } from "../../assets/dataTypes";
import Card from "./Card";
import { LangContext } from "../language";
import { Link } from "react-router";
import { handleMouseEnter, handleMouseLeave, handleMouseMove } from "../../utils";
import { ThemeContext } from "../theme/ThemeEngine";

type ProjectCardProps = {
  project: Project;
  additionalStyles: CSSProperties;
  onanimationend?: (e: React.AnimationEvent<HTMLDivElement>) => void;
}

/**
 * @description Modern ProjectCard with theme-aware styling and 3D tilt effect
 */
const ProjectCard = ({project, additionalStyles, onanimationend}: ProjectCardProps) => {
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);
  const cardRef = useRef<HTMLDivElement>(null);

  const isDark = currentTheme === 'dark';

  return (
    <div
      ref={cardRef}
      id={`card-${project.title}-container`}
      className={`
        group
        ${styles.sizeFull}
        xl:max-h-[75%] lg:max-h-[65%] md:max-h-[55%] sm:max-h-[55%] ss:max-h-[50%] xs:max-h-[40%] max-h-[35%]
        2xl:max-w-[380px] xl:max-w-[350px] lg:max-w-[300px] md:max-w-[400px] sm:max-w-[75%] ss:max-w-[75%] max-w-[80%]
        aspect-square
        absolute
        rounded-xl
        overflow-hidden
        cursor-pointer
        transition-all
        duration-300
        ease-(--ease-out)
        ${isDark
          ? `
            bg-(--color-surface)/95
            backdrop-blur-sm
            border border-(--color-border)
            shadow-(--shadow-card)
            hover:border-(--color-tertiary)/30
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-(--glow-sm)
          `
          : `
            bg-(--color-surface)
            border border-(--color-border)
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
      {/* Top accent line */}
      <div
        className={`
          absolute
          top-0 left-0 right-0
          h-[3px]
          transition-all duration-300
          ${isDark
            ? 'bg-gradient-to-r from-(--color-tertiary)/0 via-(--color-tertiary) to-(--color-tertiary)/0 opacity-0 group-hover:opacity-100 shadow-(--glow-md)'
            : 'bg-(--color-tertiary) opacity-0 group-hover:opacity-100'
          }
        `}
      />

      <Link to="/projects" className="block w-full h-full">
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
            bg-transparent
            lg:text-xl md:text-2xl sm:text-xl ss:text-md text-sm
            md:px-[8%] px-[10%]
            mb-[4%]
            text-(--color-quaternary)
            group-hover:text-(--color-tertiary)
            transition-colors duration-300
          `}
          contentProps={`
            2xl:text-xl lg:text-lg md:text-xl sm:text-lg ss:text-base text-xs
            md:px-[8%] px-[10%]
            md:mt-0 mt-2
            mb-[4%]
            wrap-break-word
            text-(--color-quaternary)/80
          `}
          tagsProps={`
            2xl:text-lg lg:text-md md:text-lg sm:text-md ss:text-sm text-2xs
            md:px-[8%] px-[10%]
          `}
        />
      </Link>

      {/* View indicator */}
      <div
        className={`
          absolute
          bottom-4 right-4
          ${styles.flexRow}
          items-center
          gap-1
          text-xs
          font-primary-semibold
          text-(--color-tertiary)
          opacity-0
          group-hover:opacity-100
          translate-x-2
          group-hover:translate-x-0
          transition-all duration-300
        `}
      >
        <span>View</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  )
}

export default ProjectCard;
