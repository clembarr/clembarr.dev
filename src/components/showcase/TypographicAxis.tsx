/**
 * @fileoverview TypographicAxis - Minimal text-only timeline.
 */

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { tCustom } from '../../utils/translationUtils';

interface TypographicAxisProps {
  events: CareerEntry[];
  lang: string;
}

export const TypographicAxis = ({ events, lang }: TypographicAxisProps) => {
  const t = tCustom(lang);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-x-auto no-scrollbar py-24 flex items-center gap-24 px-[20vw] cursor-grab active:cursor-grabbing"
    >
      {events.map((event, i) => {
        const year = t(event.period).split(' ').pop();
        const isActive = activeItem === i;
        
        return (
          <div 
            key={i} 
            className="relative flex flex-col justify-center items-center shrink-0 min-w-[200px]"
            onMouseEnter={() => setActiveItem(i)}
            onMouseLeave={() => setActiveItem(null)}
          >
            {/* Big Year Background */}
            <motion.h4 
              animate={{ opacity: isActive ? 0.3 : 0.05 }}
              className="text-8xl font-primary-bold text-white select-none pointer-events-none"
            >
              {year}
            </motion.h4>

            {/* Small Job Title */}
            <motion.div 
              animate={{ y: isActive ? -40 : -20 }}
              className="absolute text-center flex flex-col items-center"
            >
              <span className="text-xs font-bold text-(--color-tertiary) tracking-widest uppercase">
                {t(event.title)}
              </span>
              
              <motion.p 
                animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
                className="mt-4 text-[10px] text-white/40 max-w-[150px] overflow-hidden"
              >
                {t(event.description)}
              </motion.p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
