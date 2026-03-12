/**
 * @fileoverview SilentTrack - Ultra-minimalist dot-based timeline.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { tCustom } from '../../utils/translationUtils';

interface SilentTrackProps {
  events: CareerEntry[];
  lang: string;
}

export const SilentTrack = ({ events, lang }: SilentTrackProps) => {
  const t = tCustom(lang);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full py-32 flex flex-col items-center justify-center overflow-visible">
      {/* ── Main thin axis ── */}
      <div className="absolute w-full h-[1px] bg-white/10" />

      {/* ── Dots ── */}
      <div className="relative w-full flex justify-between px-[10%]">
        {events.map((event, i) => (
          <div 
            key={i} 
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* The Dot */}
            <motion.div 
              animate={{ 
                scale: hoveredIndex === i ? 2 : 1,
                backgroundColor: hoveredIndex === i ? 'var(--color-tertiary)' : 'rgba(255,255,255,0.2)'
              }}
              className="w-2 h-2 rounded-full cursor-pointer z-20"
            />

            {/* Year Label */}
            <span className="absolute top-6 text-[10px] font-mono opacity-30 whitespace-nowrap">
              {t(event.period).split(' ').pop()}
            </span>

            {/* Floating Tooltip */}
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-10 w-[200px] text-center flex flex-col items-center pointer-events-none"
                >
                  <h3 className="text-xs font-bold text-(--color-tertiary) mb-1">{t(event.title)}</h3>
                  <p className="text-[10px] text-white/50 leading-tight">{t(event.organization)}</p>
                  <div className="w-px h-4 bg-gradient-to-t from-(--color-tertiary) to-transparent mt-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
