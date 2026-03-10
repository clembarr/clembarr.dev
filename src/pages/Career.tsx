/**
 * @fileoverview Career page — scroll-driven 3D card fan.
 *
 * Scroll driver: (n−1)×slideH + vpHeight of vertical scroll space.
 * slideH = vpHeight × SLIDE_H_FACTOR (0.40) so 5 entries span ~2 screens.
 *
 * All n cards are stacked at the same centre position. Each card's transforms
 * (x, rotateY, scale, opacity) are derived from its signed "distance" to the
 * current scroll position:
 *   dist_i = i − scrollY × (n−1) / scrollRange
 *
 * Active card (dist≈0): flat, full-scale, centred.
 * Adjacent cards (|dist|≈1): offset sideways + rotated — visible as upcoming/past.
 * Distant cards (|dist|>2.5): fully transparent.
 *
 * The background year text is tied to each card's dist so only the active one
 * contributes visible opacity.
 *
 * marginTop = −navbarH pulls the driver behind the navbar so the sticky viewport
 * locks at scrollY = 0 with no preceding vertical tick.
 */

import { useContext, useState, useEffect } from "react";
import {
  motion, useScroll, useTransform, useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { PageTransition } from "../components/animations";
import { MetaTags } from "../components/seo";
import { LangContext } from "../components/language";
import { ThemeContext } from "../components/theme/ThemeEngine";
import { CareerEntryType, CareerEntry } from "../assets/dataTypes";
import { author, CareerSEOConstants, careerTypeLabels } from "../assets/constants";
import { careerPageContent, careerTimeline } from "../assets/contents";
import { coreImages } from "../assets";
import styles from "../style";

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Fraction of the viewport height consumed per card step in the scroll space.
 * 0.40 ⇒ 5 entries span ~2 screen-heights; ~2–3 cards are "in range" at once.
 */
const SLIDE_H_FACTOR = 0.40;

/** Horizontal offset per unit dist, as a fraction of the viewport width. */
const CARD_SPREAD_VW = 0.28;

/** Peak rotateY (degrees) applied at |dist| = 1. */
const MAX_ROT_Y = 20;

/** CSS perspective depth for the 3D stage (px). */
const PERSPECTIVE_PX = 1100;

/** Accent color per career entry type. */
const ENTRY_ACCENT: Record<CareerEntryType, string> = {
  [CareerEntryType.EXPERIENCE]:    'var(--color-tertiary)',
  [CareerEntryType.EDUCATION]:     '#60A5FA',
  [CareerEntryType.CERTIFICATION]: '#F59E0B',
  [CareerEntryType.VOLUNTEERING]:  '#A78BFA',
};

/**
 * @function extractYear Returns the last 4-digit year found in a period string.
 * e.g. "Apr. 2025 — Jul. 2025" → "2025".
 */
const extractYear = (period: string): string => {
  const matches = period.match(/\d{4}/g);
  return matches ? matches[matches.length - 1] : '';
};

// ─── CareerSlide ──────────────────────────────────────────────────────────────

interface CareerSlideProps {
  entry: CareerEntry;
  index: number;
  total: number;
  lang: string;
}

/**
 * @component CareerSlide
 * @description One career entry's readable content. Left border tinted with the
 * entry-type accent; accent also colors the counter, badge, and period line.
 */
const CareerSlide = ({ entry, index, total, lang }: CareerSlideProps) => {
  const accent = ENTRY_ACCENT[entry.type];

  return (
    <div className={`${styles.flexCol} gap-4`}>

      <span id="slide-counter"
        className="font-secondary-regular text-3xs tracking-[0.2em] uppercase"
        style={{ color: accent, opacity: 0.7 }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      <div id="entry-type-badge">
        <span
          className="font-primary-semibold text-3xs tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ color: accent, background: `${accent}1A`, border: `1px solid ${accent}38` }}
        >
          {careerTypeLabels[entry.type]?.[lang] ?? entry.type}
        </span>
      </div>

      <h2 id="entry-title" className="font-primary-bold 2xl:text-4xl xl:text-3xl lg:text-2xl text-xl text-(--color-quaternary) leading-tight">
        {entry.title[lang]}
      </h2>

      <div id="entry-org-period" className={`${styles.flexCol} gap-0.5`}>
        <p className="font-secondary-regular text-sm text-(--color-quaternary) opacity-60">
          {entry.organization[lang]}
        </p>
        <p className="font-secondary-semibold text-xs tracking-wide" style={{ color: accent }}>
          {entry.period[lang]}
        </p>
      </div>

      <div id="accent-divider" className="w-10 h-px" style={{ background: accent, opacity: 0.5 }} />

      <p id="entry-description" className="font-primary-regular text-sm leading-relaxed text-(--color-quaternary) opacity-75 tracking-wide text-wrap">
        {entry.description[lang]}
      </p>

      {entry.tags && entry.tags.length > 0 && (
        <div id="entry-tags" className={`${styles.flexRow} flex-wrap gap-2`}>
          {entry.tags.map(tag => (
            <span key={tag} className={`${styles.tag} text-3xs`}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── SlideIndicator ───────────────────────────────────────────────────────────

/**
 * @component SlideIndicator
 * @description Row of pill-dots at the bottom. Active dot expands to a pill.
 */
const SlideIndicator = ({ count, active }: { count: number; active: number }) => (
  <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${styles.flexRow} gap-2 items-center`}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="rounded-full bg-(--color-quaternary)"
        animate={{ width: i === active ? 22 : 6, opacity: i === active ? 0.65 : 0.2 }}
        style={{ height: 6 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
    ))}
  </div>
);

// ─── CareerCard3D ─────────────────────────────────────────────────────────────

interface CareerCard3DProps {
  entry: CareerEntry;
  index: number;
  n: number;
  scrollRange: number;
  scrollY: MotionValue<number>;
  vpWidth: number;
  navbarH: number;
  lang: string;
}

/**
 * @component CareerCard3D
 * @description Positions a career card in 3D space based on its signed distance
 * from the current scroll position. The continuous "dist" MotionValue drives:
 *
 *   x       = dist × vpWidth × CARD_SPREAD_VW  (horizontal spread)
 *   rotateY = dist × MAX_ROT_Y                 (3D tilt, clamped at ±2.5 steps)
 *   scale   = 1 − |dist| × 0.10               (depth illusion, min 0.72)
 *   opacity = 1 − |dist| × 0.36               (fade-out, zero beyond 2.5)
 *
 * Also renders the background year text: full opacity (0.07) only when dist ≈ 0,
 * fading to 0 beyond |dist| = 0.9 so adjacent cards never leak their year.
 *
 * dist > 0 → upcoming card (to the right, leaning right).
 * dist < 0 → past card (to the left, leaning left).
 */
const CareerCard3D = ({
  entry, index, n, scrollRange, scrollY, vpWidth, navbarH, lang,
}: CareerCard3DProps) => {
  const accent = ENTRY_ACCENT[entry.type];

  // Signed distance from the active card position (0 = active, ±1 = adjacent).
  const dist = useTransform(scrollY, v => {
    const cardProgress = scrollRange > 0 ? v * (n - 1) / scrollRange : 0;
    return index - cardProgress;
  });

  const x       = useTransform(dist, d => d * vpWidth * CARD_SPREAD_VW);
  const rotateY = useTransform(dist, d => Math.max(-2.5, Math.min(2.5, d)) * MAX_ROT_Y);
  const scale   = useTransform(dist, d => Math.max(0.72, 1 - Math.abs(Math.max(-2.5, Math.min(2.5, d))) * 0.10));
  const opacity = useTransform(dist, d => {
    const abs = Math.abs(d);
    return abs > 2.5 ? 0 : Math.max(0, 1 - abs * 0.36);
  });
  const zIndex  = useTransform(dist, d => Math.round(100 - Math.abs(d) * 20));

  // Background year opacity: peaks at 0.07 when dist=0, reaches 0 at |dist|=0.9.
  // Each card owns its year text; only the active one is ever visible.
  const yearOpac = useTransform(dist, d => {
    const abs = Math.abs(d);
    return abs > 0.9 ? 0 : 0.07 * Math.max(0, 1 - abs / 0.9);
  });

  return (
    <>
      <motion.div
        id={`card-${index}-year-bg`}
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center"
        style={{ opacity: yearOpac }}
      >
        <span
          className="font-tertiary-semibold"
          style={{
            fontSize: 'clamp(120px, 28vw, 460px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: accent,
          }}
        >
          {extractYear(entry.period[lang])}
        </span>
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0, right: 0, margin: '0 auto',
          width: 'min(480px, 78vw)',
          paddingTop: `calc(${navbarH}px + 9vh)`,
          x, rotateY, scale, opacity, zIndex,
        }}
      >
        <div
          className="pl-7"
          style={{ borderLeft: `2px solid ${accent}50` }}
        >
          <CareerSlide entry={entry} index={index} total={n} lang={lang} />
        </div>
      </motion.div>
    </>
  );
};

// ─── Career ───────────────────────────────────────────────────────────────────

/**
 * @component Career
 * @description Career page. Vertical scroll drives a 3D card fan:
 * 1. All cards are stacked at the same centre position in the sticky viewport.
 * 2. Each card's x, rotateY, scale and opacity respond to its dist from scrollY.
 * 3. Active card is flat and readable; adjacent cards lean in 3D as previews.
 * 4. Background year text cross-fades between cards via per-card dist opacity.
 */
const Career = () => {
  const { currentLang }  = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);

  const [vpWidth,  setVpWidth]  = useState(typeof window !== 'undefined' ? window.innerWidth  : 1200);
  const [vpHeight, setVpHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [navbarH,  setNavbarH]  = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const n = careerTimeline.length;

  useEffect(() => {
    const update = () => {
      setVpWidth(window.innerWidth);
      setVpHeight(window.innerHeight);
      const navbar = document.getElementById('navbar-container');
      if (navbar) setNavbarH(navbar.offsetHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollY } = useScroll();

  // Height consumed by each card step in the scroll space.
  const slideH = vpHeight * SLIDE_H_FACTOR;

  // Total scroll distance to traverse all n cards.
  const scrollRange = (n - 1) * slideH;

  // Container height: full scroll range + one viewport to rest at the end.
  const containerH = scrollRange + vpHeight + navbarH;

  useMotionValueEvent(scrollY, 'change', v => {
    const p = scrollRange > 0 ? Math.max(0, Math.min(1, v / scrollRange)) : 0;
    setActiveIndex(Math.round(p * (n - 1)));
  });

  return (
    <PageTransition>
      <MetaTags
        title={`${careerPageContent.title[currentLang]} - ${author.firstName} ${author.lastName}`}
        description={careerPageContent.subtitle[currentLang]}
        keywords={CareerSEOConstants.keywords}
        ogUrl={CareerSEOConstants.ogUrl}
        canonical={CareerSEOConstants.canonical}
      />

      <div id="slider-container"
        style={{ height: `${containerH}px`, marginTop: `-${navbarH}px` }}
      >

        <div id="sticky-slider"
          style={{ perspective: `${PERSPECTIVE_PX}px` }}
          className={`
            ${styles.contentStartX}
            sticky 
            top-0
            h-screen 
            overflow-hidden
          `}
        >

          {careerTimeline.map((entry, i) => (
            <CareerCard3D
              key={`card-${i}`}
              entry={entry}
              index={i}
              n={n}
              scrollRange={scrollRange}
              scrollY={scrollY}
              vpWidth={vpWidth}
              navbarH={navbarH}
              lang={currentLang}
            />
          ))}

          <img
            src={coreImages.careerFigure.content[currentTheme]}
            alt={coreImages.careerFigure.alt}
            className="absolute bottom-0 right-0 w-[28vw] max-w-xs pointer-events-none select-none"
            style={{
              opacity: currentTheme === 'dark' ? 0.55 : 0.65,
              transform: 'scaleX(-1)',
            }}
          />

          <SlideIndicator count={n} active={activeIndex} />

          <motion.div
            className={`absolute bottom-8 right-[6%] ${styles.flexRow} items-center gap-2 text-(--color-quaternary)`}
            animate={{ opacity: activeIndex > 0 ? 0 : 0.35 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-secondary-regular text-3xs tracking-[0.2em] uppercase">scroll</span>
            <span className="text-base">↓</span>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Career;
