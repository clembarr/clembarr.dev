/**
 * @fileoverview SilentTrack - A vertical minimalist timeline with dots and hover info.
 */

import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { translate } from '../../utils/translationUtils';
import { ThemeContext } from '../theme/ThemeEngine';
import { LangContext } from '../language';

interface SilentTrackProps {
  events: CareerEntry[];
}

/**
 * @description Ultra-minimalist vertical timeline. Information only appears on hover.
 */
export const SilentTrack = ({ events }: SilentTrackProps) => {
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);
  const isDark = currentTheme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const colors = {
    primary: isDark ? '#7CFFC4' : '#479561',
    text: isDark ? '#71cbb3' : '#3D3E3C',
    line: isDark ? 'rgba(124, 255, 196, 0.1)' : 'rgba(71, 149, 97, 0.1)',
  };

  const getYears = (period: any) => {
    const str = translate(period, currentLang);
    const years = str.match(/\d{4}/g);
    return years ? years.join(' — ') : str;
  };

  return (
    <div 
      id={`silent-track-container`}
      className={`relative w-full max-h-[600px] overflow-y-auto overflow-x-hidden flex justify-center py-20 no-scrollbar`}
    >
      <div 
        id={`track-axis`}
        className={`absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2`}
        style={{ backgroundColor: colors.line, height: `${events.length * 150}px` }}
      />

      <div 
        id={`events-wrapper`}
        className={`relative w-full max-w-2xl flex flex-col items-center gap-32`}
        style={{ minHeight: `${events.length * 150}px` }}
      >
        {events.map((event, i) => (
          <div
            key={i}
            id={`event-node-${i}`}
            className={`relative flex items-center justify-center w-full`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              id={`marker-${i}`}
              className={`w-2 h-2 rounded-full cursor-crosshair z-10`}
              style={{ backgroundColor: hoveredIndex === i ? colors.primary : colors.text }}
              animate={{
                scale: hoveredIndex === i ? 2 : 1,
                boxShadow: hoveredIndex === i ? `0 0 15px ${colors.primary}` : 'none'
              }}
            />

            <div 
              id={`date-anchor-${i}`}
              className={`absolute opacity-20 text-[10px] font-mono pointer-events-none whitespace-nowrap right-1/2 mr-8`}
            > {getYears(event.period)} </div>
          </div>
        ))}
      </div>
    </div>
  );
};
