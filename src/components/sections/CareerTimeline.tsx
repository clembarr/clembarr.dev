/**
 * @fileoverview CareerTimeline section — 'Meandering Path' design.
 * Breaks the rectilinear slider look with organic waves and floating milestones.
 */

import { useRef, useContext, useState, useMemo } from 'react';
import {
  motion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { LangContext } from '../language';
import { careerTimeline } from '../../assets/contents';
import { CareerEntry, CareerEntryType } from '../../assets/dataTypes';
import styles from '../../style';
import { tCustom } from '../../utils/translationUtils';

// ─── Config ───────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  CareerEntryType,
  { icon: string; accent: string; label: { fr: string; en: string } }
> = {
  [CareerEntryType.EDUCATION]:     { icon: '🎓', accent: '#7CFFC4', label: { fr: 'Formation', en: 'Education' } },
  [CareerEntryType.EXPERIENCE]:    { icon: '💼', accent: '#71cbb3', label: { fr: 'Expérience', en: 'Experience' } },
  [CareerEntryType.CERTIFICATION]: { icon: '🏆', accent: '#a8ffe5', label: { fr: 'Certification', en: 'Certification' } },
  [CareerEntryType.VOLUNTEERING]:  { icon: '🤝', accent: '#5ab578', label: { fr: 'Bénévolat', en: 'Volunteering' } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const MeanderingCard = ({
  entry,
  index,
  lang,
  isAbove,
}: {
  entry: CareerEntry;
  index: number;
  lang: string;
  isAbove: boolean;
}) => {
  const t = tCustom(lang);
  const config = TYPE_CONFIG[entry.type];
  const [hovered, setHovered] = useState(false);

  // Subtle random rotation to break the "perfect" look
  const randomRot = useMemo(() => (Math.random() - 0.5) * 4, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: isAbove ? 20 : -20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative shrink-0 w-[300px] md:w-[350px] flex flex-col ${isAbove ? 'justify-end' : 'justify-start'} px-6`}
      style={{ height: '100%' }}
    >
      {/* ── Floating Card ── */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ 
          rotate: hovered ? 0 : randomRot,
          y: hovered ? (isAbove ? -10 : 10) : 0 
        }}
        className={`
          relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500
          ${hovered ? 'z-50 shadow-2xl' : 'z-10'}
        `}
        style={{
          background: hovered 
            ? `linear-gradient(135deg, var(--color-surface) 0%, ${config.accent}15 100%)` 
            : 'var(--color-surface)',
          borderColor: hovered ? config.accent : 'var(--color-border)',
          boxShadow: hovered ? `0 20px 40px -15px ${config.accent}33` : 'none',
        }}
      >
        {/* Decor: Type Icon Floating outside */}
        <div 
          className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-(--color-secondary) border border-(--color-border) flex items-center justify-center text-lg shadow-lg"
          style={{ borderColor: `${config.accent}44` }}
        >
          {config.icon}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono opacity-50 tracking-tighter uppercase">
              {t(entry.period)}
            </span>
          </div>

          <h3 className="font-primary-bold text-sm md:text-md text-(--color-quaternary) leading-tight group-hover:text-(--color-tertiary)">
            {t(entry.title)}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.accent }} />
            <p className="text-[11px] font-primary-semibold text-(--color-tertiary) truncate">
              {t(entry.organization)}
            </p>
          </div>

          <motion.p 
            animate={{ height: hovered ? 'auto' : '3.2em', opacity: hovered ? 1 : 0.7 }}
            className="text-[11px] text-(--color-quaternary) leading-relaxed overflow-hidden"
          >
            {t(entry.description)}
          </motion.p>

          {entry.tags && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {entry.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/20">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Connector Line to Wave ── */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 w-[2px] ${isAbove ? 'bottom-1/2 h-[50%]' : 'top-1/2 h-[50%]'} bg-gradient-to-b from-transparent via-(--color-tertiary)/20 to-transparent pointer-events-none`}
        style={{ 
          background: isAbove 
            ? `linear-gradient(to top, ${config.accent}44, transparent)` 
            : `linear-gradient(to bottom, ${config.accent}44, transparent)` 
        }}
      />
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const CareerTimeline = () => {
  const { currentLang } = useContext(LangContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  // ── Drag Logic ──
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const stopDragging = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // ── SVG Path Generation ──
  const pathData = useMemo(() => {
    const points = careerTimeline.length;
    const step = 350; // card width
    let d = `M 0 250`;
    for (let i = 0; i <= points + 2; i++) {
      const x = i * step + 400;
      const y = i % 2 === 0 ? 150 : 350; // Wavy oscillation
      d += ` Q ${x - step/2} ${i % 2 === 0 ? 350 : 150}, ${x} ${y}`;
    }
    return d;
  }, []);

  return (
    <section id="career" className="relative py-32 overflow-hidden bg-transparent">
      {/* ── Section Header ── */}
      <div className={`${styles.sectionContainer} relative z-20 mb-16`}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className={styles.heading2}>
            {currentLang === 'fr' ? 'Le Fil de mes Chroniques' : 'Chronicle Threads'}
          </h2>
          <span className={styles.line} />
        </motion.div>
      </div>

      {/* ── Meandering Track ── */}
      <div className="relative h-[600px] group">
        {/* SVG Background Path */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 4000 500" preserveAspectRatio="none" className="w-full">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor="var(--color-tertiary)" />
                <stop offset="80%" stopColor="var(--color-tertiary)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <motion.path
              d={pathData}
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="2"
              strokeDasharray="10 10"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Scrollable Area */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={handleMouseMove}
          className="h-full flex items-center overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none px-[15vw]"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        >
          <div className="flex h-[500px] items-center">
            {careerTimeline.map((entry, i) => (
              <MeanderingCard
                key={i}
                index={i}
                entry={entry}
                lang={currentLang}
                isAbove={i % 2 === 0}
              />
            ))}
            
            {/* End Milestone */}
            <div className="shrink-0 w-[400px] flex items-center justify-center">
               <div className="w-4 h-4 rounded-full bg-(--color-tertiary) shadow-[0_0_20px_var(--color-tertiary)]" />
               <span className="ml-4 font-mono text-[10px] opacity-30 uppercase tracking-widest">
                 {currentLang === 'fr' ? 'À suivre...' : 'To be continued...'}
               </span>
            </div>
          </div>
        </div>

        {/* Progress Bar (at the bottom) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-(--color-border)">
          <motion.div 
            className="h-full bg-(--color-tertiary) shadow-[0_0_10px_var(--color-tertiary)]"
            style={{ scaleX, originX: 0 }}
          />
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-tertiary)/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-(--color-accent-cyber)/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default CareerTimeline;


