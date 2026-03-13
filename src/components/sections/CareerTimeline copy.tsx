import { useContext, useState } from "react";
import { careerFigure } from "../../assets/illustrations";
import styles from "../../style";
import { ThemeContext } from "../theme/ThemeEngine";
import { careerTimeline } from "../../assets/contents";
import { LangContext } from "../language";
import DOMPurify from "dompurify"
import { getActiveBreakpoint } from "../../utils/utils";

/** @constant DATE_COLUMN_WIDTH Width of the date label column, left of the axis (px). */
const DATE_COLUMN_WIDTH = 72;

/** @constant DATE_DOT_GAP Gap between date column and dot column (px) — matches gap-2 = 8px. */
const DATE_DOT_GAP = 8;

/** @constant DOT_COLUMN_WIDTH Width of the dot column centered on the axis (px). */
const DOT_COLUMN_WIDTH = 52;

/**
 * @constant AXIS_LEFT Left offset (px) of the 2px axis line so its center falls exactly
 * on the dot center: date_col + gap + half_dot_col - half_line_width.
 */
const AXIS_LEFT = DATE_COLUMN_WIDTH + DATE_DOT_GAP + Math.floor(DOT_COLUMN_WIDTH / 2) - 1;

/**
 * @description Career timeline section.
 */
const CareerTimeline = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { currentLang } = useContext(LangContext);

  /**@constant hoveredIndex index of the currently hovered entry, or null. */
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /** @constant isDark Is the current theme dark? */
  const isDark: boolean = currentTheme === 'dark';

  return (
    <div id='career'
      className={`
        w-full
        h-[75vh]
        relative
        overflow-hidden
      `}
    >
      <div id='illustration-container'
        className={`
          hidden md:flex
          absolute 
          ${isDark ? 
            `
              top-40
              -left-15
              opacity-100
              max-w-lg
            ` 
          : 
            `
              top-20
              left-0 
              opacity-95
              max-w-100
            `
          }
          ${styles.sizeFull}
          ${styles.flexCol}
        `}
      >
        <img id="career-illustration"
          src={careerFigure.content[currentTheme]}
          alt={careerFigure.alt}
          className={`object-cover w-full h-auto`}
        />
      </div>

      <div id='timeline-wrapper'
        className={`
          ${styles.flexCol}
          w-full
          h-full
          min-h-0
          relative
          py-6
          md:ml-112
          overflow-y-scroll
          overflow-x-hidden
          mask-[linear-gradient(to_bottom,transparent,black_5%,black_88%,transparent)]
        `}
      >
        <div id='entries-content' className={`relative ${styles.flexCol} w-full`}>

          <div id='timeline-axis'
            className={`
              absolute
              top-6
              bottom-0
              w-0.75
              opacity-20
              bg-(--color-tertiary)
            `}
            style={{ left: `${AXIS_LEFT}px` }}
          />

        {careerTimeline.map((entry, i) => {
          const isHovered = hoveredIndex === i;

          return (
            <div key={i}
              id={`timeline-entry-${i}`}
              className={`
                ${styles.flexRow}
                ${styles.contentStartY}
                group
                gap-4
                mb-5
                last:mb-0
              `}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div id={`left-area-${i}`}
                className={`
                  ${styles.flexRow} 
                  items-start 
                  gap-2 
                  shrink-0
                `}
              >
                <div id={`date-col-${i}`}
                  className={`
                    ${styles.flexCol}
                    ${styles.contentEndX}
                    pt-2
                    font-mono
                    text-3xs
                    leading-tight
                    text-right
                    ${styles.defaultTransition}
                  `}
                  style={{
                    width:   `${DATE_COLUMN_WIDTH}px`,
                    opacity: isHovered ? 0.9 : 0.3,
                  }}
                >
                  {entry.period[currentLang]}
                </div>

                <div id={`dot-col-${i}`}
                  className={`
                    ${styles.flexCol}
                    ${styles.contentStartX}
                    shrink-0
                    pt-2
                  `}
                  style={{ width: `${DOT_COLUMN_WIDTH}px` }}
                >
                  <div id={`dot-${i}`}
                    className={`
                      relative
                      z-10
                      rounded-lg
                      border-[2.5px]
                      ${styles.defaultTransition}
                    `}
                    style={{
                      width:           isHovered ? '16px' : '13px',
                      height:          isHovered ? '16px' : '13px',
                      borderColor:     'var(--color-tertiary)',
                      backgroundColor: isHovered ? 'var(--color-tertiary)' : 'var(--color-secondary)',
                      marginTop:       isHovered ? '-1.5px' : '0',
                    }}
                  />
                </div>
              </div>

              <div id={`card-${i}`}
                className={`
                  ${styles.sizeFull}
                  ${styles.flexCol}
                  ${styles.contentStartY}
                  flex-1
                  relative
                  overflow-hidden
                  rounded-lg
                  border border-(--color-tertiary)/15
                  group-hover:border-(--color-tertiary)/50
                  px-5 py-4
                  mr-[35%]
                  ml-12
                  bg-(--color-secondary)
                  ${styles.defaultTransition}
                  space-y-3
                  shadow-lg
                `}
              >
                <div className={`
                    absolute top-0 left-0 right-0
                    h-[2px]
                    opacity-0 group-hover:opacity-100
                    ${styles.defaultTransition}
                    bg-gradient-to-r from-transparent via-(--color-tertiary) to-transparent
                  `} 
                />

                <div id={`card-header-${i}`}
                  className={`
                    ${styles.sizeFull}
                    ${styles.flexRow}
                    last:items-end
                  `}
                >
                  <div id={`header-info-${i}`}
                    className={`
                      ${styles.sizeFull}
                      ${styles.flexCol}
                    `}
                  >
                    <p id={`card-title-${i}`}
                      className={`
                        font-primary-bold
                        text-xl
                        leading-snug
                        text-(--color-quaternary)
                        group-hover:text-(--color-tertiary)
                        transition-colors duration-300
                      `}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.title[currentLang]) }}
                    />

                    <p id={`card-orga-${i}`} 
                      className={`
                        text-md
                        opacity-80
                        mt-1
                        font-primary-semibold
                        text-(--color-quaternary)
                      `}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.organization[currentLang]) }}
                    />
                  </div>

                  {entry.icon && (
                    <div id={`icon-container-${i}`}
                      className={`
                        ${styles.sizeFit}
                        ${styles.contentEndAll}
                        relative
                        py-2
                        px-2
                      `}
                    >
                      <img id={`card-icon-${i}`}
                        src={entry.icon?.content[currentTheme]}
                        alt={entry.icon?.alt}
                        className={`
                          ${styles.sizeFull}
                          object-cover
                          max-w-14
                        `}
                      />
                    </div>
                  )}
                </div>

                <p id={`card-description-${i}`} 
                  className={`
                    text-base
                    opacity-55
                    leading-relaxed 
                    font-primary-regular
                  `}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.description[currentLang]) }}
                />

                <div id={`tags-container-${i}`}
                  className={`
                    ${styles.flexWrap}
                    gap-3 
                    mt-3
                  `}
                >
                  <span id={`type-badge-${i}`}
                    className={`
                      ${styles.tag}
                      text-3xs
                      font-primary-semibold
                      ${styles.defaultTransition}
                      bg-(--color-xp-type)/10
                      hover:bg-(--color-xp-type)/20
                      border-(--color-xp-type)/30
                      text-(--color-xp-type)
                    `}
                  > {entry.type.valueOf()} </span>

                  {entry.tags && entry.tags[currentLang] && entry.tags[currentLang].length > 0 
                    && entry.tags[currentLang]?.map((tag, j) => (
                      <span id={`tag-${j}-${i}`}
                        key={tag}
                        className={`
                          ${styles.tag}
                          text-3xs
                          font-primary-semibold
                          ${styles.defaultTransition}
                          hover:bg-(--color-tertiary)/20
                        `}
                      > {tag} </span>
                    ))}
                  </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;
