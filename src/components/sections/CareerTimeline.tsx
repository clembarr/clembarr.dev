import { useContext, useState, useRef } from "react";
import { careerFigure } from "../../assets/illustrations";
import styles from "../../style";
import { ThemeContext } from "../theme/ThemeEngine";
import { careerTimeline } from "../../assets/contents";
import { LangContext } from "../language";
import DOMPurify from "dompurify"
import { menuIcons } from "../../assets";

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
 * @description Career timeline section with vertical (desktop) and horizontal (mobile) views.
 */
const CareerTimeline = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { currentLang } = useContext(LangContext);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const isDark: boolean = currentTheme === 'dark';

  /**
   * @function getYear Extract only the year from a period string
   * @param period the multilingual period object
   */
  const getYear = (period: { [key: string]: string }) => {
    const str = period[currentLang];
    const match = str.match(/\d{4}/);
    return match ? match[0] : str;
  }

  /** @constant sortedCareerTimeline Entries sorted from most recent to oldest by start year. */
  const sortedCareerTimeline = [...careerTimeline].sort((a, b) => {
    const yearA = parseInt(a.period['fr'].match(/\d{4}/)?.[0] ?? '0');
    const yearB = parseInt(b.period['fr'].match(/\d{4}/)?.[0] ?? '0');
    return yearB - yearA;
  });

  return (
    <div id="career"
      className={`
        w-full
        h-[75vh]
        md:mb-20 lg:mb-10
        relative
        overflow-hidden
      `}
    >
      <div id={`illustration-container`}
        className={`
          hidden lg:flex
          absolute 
          ${isDark ? 
          `
            top-40 lg:top-60 xl:top-40
            -left-15 lg:left-0 xl:-left-15
            opacity-100 lg:opacity-30 xl:opacity-100
            max-w-lg
            lg:w-80 xl:w-120 2xl:w-auto
          ` 
          : 
          `
            top-20 lg:top-35 xl:top-20
            left-0 
            opacity-95 lg:opacity-30 xl:opacity-95
            max-w-100
            lg:w-80 xl:w-90 2xl:w-auto
          `
        }
          ${styles.sizeFull}
          ${styles.flexCol}
        `}
      >
        <img id={`career-illustration`}
          src={careerFigure.content[currentTheme]}
          alt={careerFigure.alt}
          className={`object-cover w-full h-auto`}
        />
      </div>

      <div id={`career-vertical-view`}
        className={`
          hidden md:flex
          ${styles.flexCol}
          w-full
          h-full
          min-h-0
          relative
          py-6
          lg:ml-30 xl:ml-[23vw]
          overflow-y-scroll
          overflow-x-hidden
          mask-[linear-gradient(to_bottom,transparent,black_5%,black_88%,transparent)]
          no-scrollbar
        `}
      >
        <div id={`vertical-entries-content`} className={`relative ${styles.flexCol} w-full`}>
          <div id={`vertical-timeline-axis`}
            className={`
              absolute
              -top-10
              -bottom-10
              w-0.75
              opacity-20
              bg-(--color-tertiary)
            `}
            style={{ left: `${AXIS_LEFT}px` }}
          />

          {sortedCareerTimeline.map((entry, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <div key={`v-entry-${i}`}
                id={`v-timeline-entry-${i}`}
                className={`
                  ${styles.flexRow}
                  ${styles.contentStartY}
                  group
                  gap-4
                  mb-8
                  last:mb-0
                `}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div id={`v-left-area-${i}`} className={`flex items-start gap-2 shrink-0`}>
                  <div id={`v-date-col-${i}`}
                    className={`
                      ${styles.flexCol}
                      ${styles.contentEndY}
                      pt-2
                      font-mono
                      text-3xs
                      leading-tight
                      text-right
                      ${styles.defaultTransition}
                    `}
                    style={{
                      width: `${DATE_COLUMN_WIDTH}px`,
                      opacity: isHovered ? 0.9 : 0.3,
                    }}
                  >
                    {entry.period[currentLang]}
                  </div>

                  <div id={`v-dot-col-${i}`}
                    className={`flex flex-col items-center shrink-0 pt-2`}
                    style={{ width: `${DOT_COLUMN_WIDTH}px` }}
                  >
                    <div id={`v-dot-${i}`}
                      className={`
                        relative
                        z-10
                        rounded-lg
                        border-[2.5px]
                        ${styles.defaultTransition}
                      `}
                      style={{
                        width: isHovered ? '16px' : '13px',
                        height: isHovered ? '16px' : '13px',
                        borderColor: 'var(--color-tertiary)',
                        backgroundColor: isHovered ? 'var(--color-tertiary)' : 'var(--color-secondary)',
                        marginTop: isHovered ? '-1.5px' : '0',
                      }}
                    />
                  </div>
                </div>

                <div id={`v-card-${i}`}
                  className={`
                    ${styles.flexCol}
                    ${styles.contentStartY}
                    flex-1
                    relative
                    overflow-hidden
                    rounded-lg
                    border border-(--color-tertiary)/15
                    group-hover:border-(--color-tertiary)/50
                    px-5 py-4
                    xl:mr-[35%] lg:mr-[20%] mr-4
                    ml-12
                    bg-(--color-secondary)
                    ${styles.defaultTransition}
                    space-y-3
                    shadow-lg
                  `}
                >
                  <div id={`v-card-glow-${i}`}
                    className={`
                      absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100
                      ${styles.defaultTransition}
                      bg-gradient-to-r from-transparent via-(--color-tertiary) to-transparent
                    `} 
                  />

                  <div id={`v-card-header-${i}`} className={`flex w-full items-start justify-between`}>
                    <div id={`v-header-info-${i}`} className={`flex flex-col`}>
                      <p id={`v-card-title-${i}`}
                        className={`font-primary-bold text-xl leading-snug text-(--color-quaternary) group-hover:text-(--color-tertiary) transition-colors duration-300`}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.title[currentLang]) }}
                      />
                      <p id={`v-card-orga-${i}`} 
                        className={`text-md opacity-80 mt-1 font-primary-semibold text-(--color-quaternary)`}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.organization[currentLang]) }}
                      />
                    </div>
                    {entry.icon && (
                      <img id={`v-card-icon-${i}`}
                        src={entry.icon.content[currentTheme]}
                        alt={entry.icon.alt}
                        className={`object-cover w-12 h-auto ml-4 opacity-80`}
                      />
                    )}
                  </div>

                  <p id={`v-card-description-${i}`} 
                    className={`text-base opacity-55 leading-relaxed font-primary-regular`}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.description[currentLang]) }}
                  />

                  <div id={`v-tags-container-${i}`} className={`flex flex-wrap gap-2 mt-3`}>
                    <span id={`v-type-badge-${i}`} className={`${styles.tag} text-3xs font-primary-semibold bg-(--color-xp-type)/10 text-(--color-xp-type)`}>
                      {entry.type.valueOf()}
                    </span>
                    {entry.tags && entry.tags[currentLang]?.map((tag, j) => (
                      <span key={`v-tag-${i}-${j}`} id={`v-tag-${i}-${j}`} className={`${styles.tag} text-3xs font-primary-semibold opacity-60 hover:opacity-100`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id={`career-horizontal-view`}
        className={`
          flex md:hidden
          ${styles.sizeFull}
          ${styles.flexCol}
          ${styles.contentStartX}
          px-4
        `}
      >
        <div id={`horizontal-scroll-container`}
          ref={horizontalScrollRef}
          className={`
            ${styles.sizeFull}
            flex
            overflow-x-auto
            snap-x
            snap-mandatory
            no-scrollbar
            gap-6
            py-10
          `}
        >
          {sortedCareerTimeline.map((entry, i) => (
            <div key={`h-entry-${i}`}
              id={`h-entry-wrapper-${i}`}
              className={`
                snap-center
                shrink-0
                xs:w-[66vw] w-[65vw]
                max-w-[320px]
                ${styles.flexCol}
                gap-4
              `}
            >
              <div id={`h-indicator-row-${i}`} className={`flex items-center gap-4`}>
                <div id={`h-year-label-${i}`} className={`font-mono text-xs text-(--color-tertiary)`}>
                  {getYear(entry.period)}
                </div>
                <div id={`h-axis-line-${i}`} className={`flex-1 h-[1px] bg-(--color-tertiary)/20`} />
                <div id={`h-dot-${i}`} className={`w-3 h-3 rounded-full bg-(--color-tertiary)`} />
              </div>

              <div id={`h-card-${i}`}
                className={`
                  p-6
                  rounded-lg
                  bg-(--color-secondary)
                  border border-(--color-tertiary)/15
                  shadow-xl
                  ${styles.flexCol}
                  gap-4
                `}
              >
                <div id={`h-card-header-${i}`} className={`flex justify-between items-start`}>
                  <div id={`h-title-group-${i}`} className={`flex flex-col`}>
                    <h3 id={`h-card-title-${i}`}
                      className={`font-primary-bold text-lg leading-tight text-(--color-quaternary)`}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.title[currentLang]) }}
                    />
                    <p id={`h-card-orga-${i}`}
                      className={`text-sm font-primary-semibold opacity-70 mt-1`}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.organization[currentLang]) }}
                    />
                  </div>
                  {entry.icon && (
                    <img id={`h-card-icon-${i}`}
                      src={entry.icon.content[currentTheme]}
                      alt={entry.icon.alt}
                      className={`w-10 h-auto opacity-80`}
                    />
                  )}
                </div>

                <p id={`h-card-desc-${i}`}
                  className={`text-sm opacity-60 leading-relaxed font-primary-regular line-clamp-4`}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.description[currentLang]) }}
                />

                <div id={`h-tags-row-${i}`} className={`flex flex-wrap gap-2`}>
                  <span id={`h-type-badge-${i}`} className={`${styles.tag} text-[10px] font-primary-semibold bg-(--color-xp-type)/10 text-(--color-xp-type)`}>
                    {entry.type.valueOf()}
                  </span>
                  {entry.tags && entry.tags[currentLang]?.slice(0, 2).map((tag, j) => (
                    <span key={`h-tag-${i}-${j}`} id={`h-tag-${i}-${j}`} className={`${styles.tag} text-[10px] opacity-100`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div id="mobile-swipe-indicator"
        className={`
          md:hidden
          absolute
          ${styles.flexCol}
          ${styles.contentCenter}
          sm:bottom-45 ss:bottom-40 xs:bottom-40 bottom-15
          w-full
          opacity-30
          pointer-events-none
          animate-fade-in
        `}
        >
          <span className={`text-[10px] font-mono uppercase tracking-widest`}>
            Swipe !
          </span>
          <img id="swipe-icon"
            src={menuIcons.double_chevrons_icon.content[currentTheme]}
            alt={menuIcons.double_chevrons_icon.alt}
            className={`w-6`}
            style={{ animation: 'swipe-hint 2s infinite ease-in-out' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;
