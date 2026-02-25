import { useContext } from "react";
import { motion } from "framer-motion";
import { PageTransition, ScrollReveal } from "../components/animations";
import { MetaTags } from "../components/seo";
import { LangContext } from "../components/language";
import { CareerEntryType, CareerEntry } from "../assets/dataTypes";
import { careerPageContent, careerTimeline } from "../assets/contents";
import styles from "../style";

/** Translated labels for each career entry type, keyed by language. */
const careerTypeLabels: {[type: string]: {[lang: string]: string}} = {
  [CareerEntryType.EDUCATION]: { fr: "Formation", en: "Education" },
  [CareerEntryType.EXPERIENCE]: { fr: "Expérience", en: "Experience" },
  [CareerEntryType.PROJECT]: { fr: "Projet", en: "Project" },
  [CareerEntryType.CERTIFICATION]: { fr: "Certification", en: "Certification" },
  [CareerEntryType.VOLUNTEERING]: { fr: "Bénévolat", en: "Volunteering" },
};

/** Major entry types (education, experience) receive a larger visual treatment. */
const isMajorType = (type: CareerEntryType) =>
  type === CareerEntryType.EDUCATION || type === CareerEntryType.EXPERIENCE;

/**
 * @component Career
 * @description Career roadmap page with a horizontal stats summary bar and a
 * vertical timeline with differentiated card sizes. Major entries (education,
 * experience) get wider cards with an accent left border and larger timeline
 * dots. Minor entries (project, certification, volunteering) get compact cards.
 * Desktop: centered timeline with alternating cards of varying widths.
 * Mobile: left-aligned timeline with stacked cards.
 */
const Career = () => {
  const { currentLang } = useContext(LangContext);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Stat counts per career entry type for the horizontal summary bar. */
  const stats = Object.values(CareerEntryType)
    .map(type => ({
      type,
      count: careerTimeline.filter(e => e.type === type).length,
    }))
    .filter(s => s.count > 0);

  /** Render a timeline card. Major entries get wider text, accent border and
   * more padding. Minor entries are compact. */
  const renderCard = (entry: CareerEntry, major: boolean) => (
    <div
      className={`
        bg-(--color-secondary)
        border border-(--color-tertiary)/15
        ${major ? "border-l-4 border-l-(--color-tertiary)" : ""}
        rounded-lg
        ${major ? "lg:p-5 p-4" : "lg:p-3 p-3"}
        space-y-1.5
      `}
    >
      <span className={`${styles.tag} 2xl:text-xs xl:text-3xs text-3xs`}>
        {careerTypeLabels[entry.type]?.[currentLang] ?? entry.type}
      </span>

      <h3
        className={`
          font-primary-semibold
          ${major
            ? "2xl:text-xl xl:text-lg md:text-md text-sm"
            : "2xl:text-lg xl:text-md md:text-sm text-2xs"
          }
          text-(--color-quaternary)
        `}
      >
        {entry.title[currentLang]}
      </h3>

      <p className="font-secondary-regular 2xl:text-sm xl:text-xs text-3xs text-(--color-quaternary) opacity-70">
        {entry.organization[currentLang]}
      </p>

      <p className="font-secondary-semibold 2xl:text-sm xl:text-xs text-3xs text-(--color-tertiary)">
        {entry.period[currentLang]}
      </p>

      <p className={`${styles.paragraph} 2xl:text-sm xl:text-xs text-3xs`}>
        {entry.description[currentLang]}
      </p>

      {entry.tags && entry.tags.length > 0 && (
        <div className={`${styles.flexRow} ${styles.flexWrap} gap-1.5 pt-1`}>
          {entry.tags.map(tag => (
            <span key={tag} className={`${styles.tag} 2xl:text-3xs xl:text-3xs text-3xs`}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <PageTransition>
      <MetaTags
        title={`${careerPageContent.title[currentLang]} - Clément Barrière`}
        description={careerPageContent.subtitle[currentLang]}
        keywords={["Career", "Resume", "Timeline", "Education", "Experience"]}
        ogUrl="https://clembarr.dev/career"
        canonical="https://clembarr.dev/career"
      />

      <div
        id="career-container"
        className={`
          ${styles.page}
          ${styles.flexCol}
          ${styles.sectionContainer}
          space-y-8
          pb-20
        `}
      >
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <header className="text-center space-y-2">
            <motion.h1
              className={`
                font-primary-bold
                2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl
                text-(--color-quaternary)
                mb-2
              `}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {careerPageContent.title[currentLang]}
            </motion.h1>
            <p
              className={`
                ${styles.paragraph}
                text-(--color-quaternary)
                opacity-80
                max-w-2xl
                mx-auto
              `}
            >
              {careerPageContent.subtitle[currentLang]}
            </p>
          </header>
        </ScrollReveal>

        {/* Horizontal stats summary bar */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className={`${styles.flexRow} ${styles.flexWrap} justify-center gap-3`}>
            {stats.map(({ type, count }) => (
              <div
                key={type}
                className={`
                  ${styles.flexRow}
                  items-center
                  gap-2
                  px-4 py-2
                  rounded-lg
                  bg-(--color-secondary)
                  border border-(--color-tertiary)/15
                `}
              >
                <span className="font-primary-bold 2xl:text-xl xl:text-lg text-md text-(--color-tertiary)">
                  {count}
                </span>
                <span className="font-secondary-regular 2xl:text-xs xl:text-3xs text-3xs text-(--color-quaternary) opacity-70">
                  {careerTypeLabels[type]?.[currentLang]}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Vertical line — centered on desktop, left-aligned on mobile */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-(--color-tertiary)/30 lg:left-1/2 left-4 lg:-translate-x-1/2" />

          {careerTimeline.map((entry, index) => {
            const major = isMajorType(entry.type);
            const isLeft = index % 2 === 0;

            return (
              <ScrollReveal
                key={`${entry.type}-${index}`}
                direction={isLeft ? "left" : "right"}
                delay={0.1 + index * 0.08}
              >
                <div
                  className={`
                    relative
                    ${styles.flexRow}
                    items-start
                    ${major ? "lg:mb-8 mb-5" : "lg:mb-5 mb-4"}
                    w-full
                  `}
                >
                  {/* Connection dot — larger with ring for major entries */}
                  <div
                    className={`
                      absolute
                      ${major ? "w-4 h-4" : "w-2.5 h-2.5"}
                      rounded-full
                      bg-(--color-tertiary)
                      top-5
                      lg:left-1/2 left-4
                      lg:-translate-x-1/2 -translate-x-1/2
                      z-10
                      ${major ? "shadow-[0_0_0_4px] shadow-(--color-tertiary)/15" : ""}
                    `}
                  />

                  {/* Card container — major entries are wider (55%) than minor (45%) */}
                  <div
                    className={`
                      w-full
                      ${major ? "lg:w-[calc(55%-1rem)]" : "lg:w-[calc(45%-1rem)]"}
                      ml-8 lg:ml-0
                      ${isLeft ? "lg:mr-auto lg:pr-5" : "lg:ml-auto lg:pl-5"}
                    `}
                  >
                    {renderCard(entry, major)}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
};

export default Career;
