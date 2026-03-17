/**
 * @fileoverview TickerTimeline - A minimalist, high-density terminal-style timeline.
 */

import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { tCustom } from '../../utils/translationUtils';

interface TickerTimelineProps {
  events: CareerEntry[];
  lang: string;
}

export const TickerTimeline = ({ events, lang }: TickerTimelineProps) => {
  const t = tCustom(lang);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<CareerEntry | null>(null);

  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative w-full py-12 bg-black/20 rounded-xl border border-white/5 overflow-hidden font-mono">
      {/* ── Terminal Header ── */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <span className="ml-4 text-[10px] text-white/30 uppercase tracking-widest">chronicle_stream.log</span>
      </div>

      {/* ── Main Ticker ── */}
      <div 
        ref={containerRef}
        className="flex items-center overflow-x-auto no-scrollbar gap-12 px-[10%] py-20 cursor-grab active:cursor-grabbing"
      >
        {events.map((event, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setActiveEvent(event)}
            onMouseLeave={() => setActiveEvent(null)}
            className="shrink-0 flex items-center gap-6 group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs text-white/20 group-hover:text-(--color-tertiary)/50 transition-colors">
              [{t(event.period)}]
            </span>
            <h3 className="text-sm md:text-md font-bold text-white/70 group-hover:text-(--color-tertiary) transition-colors whitespace-nowrap">
              {t(event.title)}
            </h3>
            <div className="w-8 h-[1px] bg-white/10 group-hover:bg-(--color-tertiary)/30 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* ── Detail Panel (Floating) ── */}
      <motion.div
        animate={{ 
          opacity: activeEvent ? 1 : 0,
          y: activeEvent ? 0 : 20,
          scale: activeEvent ? 1 : 0.95
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] p-6 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl pointer-events-none z-50"
      >
        {activeEvent && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-(--color-tertiary) border border-(--color-tertiary)/30 px-2 py-0.5 rounded">
                {activeEvent.type}
              </span>
              <span className="text-[10px] opacity-40">{t(activeEvent.organization)}</span>
            </div>
            <p className="text-xs leading-relaxed text-white/80 italic">
              &gt; {t(activeEvent.description)}
            </p>
            <div className="flex gap-2">
              {activeEvent.tags?.map(tag => (
                <span key={tag} className="text-[9px] text-white/30">#{tag}</span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Progress ── */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
        <motion.div className="h-full bg-(--color-tertiary)/50" style={{ scaleX, originX: 0 }} />
      </div>
    </div>
  );
};
