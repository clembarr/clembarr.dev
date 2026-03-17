/**
 * @fileoverview GhostPath - Wireframe-only timeline.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { tCustom } from '../../utils/translationUtils';

interface GhostPathProps {
  events: CareerEntry[];
  lang: string;
}

export const GhostPath = ({ events, lang }: GhostPathProps) => {
  const t = tCustom(lang);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full py-32 flex items-center justify-center overflow-x-auto no-scrollbar gap-12 px-[15vw]">
      {/* ── Background Wire ── */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />

      {/* ── Items ── */}
      <div className="flex gap-24 relative">
        {events.map((event, i) => (
          <div 
            key={i} 
            className="relative flex flex-col items-center justify-center shrink-0 w-[200px]"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Diamond Node */}
            <motion.div 
              animate={{ 
                rotate: 45,
                scale: activeIndex === i ? 1.5 : 1,
                borderColor: activeIndex === i ? 'var(--color-tertiary)' : 'rgba(255,255,255,0.1)'
              }}
              className="w-4 h-4 border-2 bg-transparent z-10 transition-colors"
            />

            {/* Content (Ghostly) */}
            <div className="absolute top-12 text-center flex flex-col items-center">
               <span className="text-[10px] font-mono opacity-20 uppercase tracking-tighter mb-1">
                 {t(event.period)}
               </span>
               <motion.h3 
                animate={{ opacity: activeIndex === i ? 1 : 0.4 }}
                className="text-xs font-bold text-white whitespace-nowrap"
               >
                 {t(event.title)}
               </motion.h3>
               
               <motion.div 
                animate={{ 
                  height: activeIndex === i ? 'auto' : 0,
                  opacity: activeIndex === i ? 1 : 0 
                }}
                className="overflow-hidden mt-4"
               >
                 <p className="text-[10px] text-white/30 leading-relaxed italic border-l border-white/10 pl-3 text-left">
                   {t(event.description)}
                 </p>
               </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
