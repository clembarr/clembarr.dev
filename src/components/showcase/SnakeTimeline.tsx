/**
 * @fileoverview SnakeTimeline - A compact, winding vertical timeline.
 */

import { useRef, useContext } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { tCustom } from '../../utils/translationUtils';
import { ThemeContext } from '../theme/ThemeEngine';

interface SnakeTimelineProps {
  events: CareerEntry[];
  lang: string;
}

/**
 * @description A vertical timeline that zig-zags (snake-like) for a compact and visual journey.
 */
export const SnakeTimeline = ({ events, lang }: SnakeTimelineProps) => {
  const t = tCustom(lang);
  const { currentTheme } = useContext(ThemeContext);
  const isDark = currentTheme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathDraw = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Theme colors
  const colors = {
    primary: isDark ? '#7CFFC4' : '#479561',
    secondary: isDark ? '#71cbb3' : '#5ab578',
    text: isDark ? '#71cbb3' : '#3D3E3C',
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    cardBg: isDark ? 'rgba(40, 41, 41, 0.7)' : 'rgba(245, 245, 245, 0.8)',
  };

  // SVG Constants
  const width = 1200; 
  const itemHeight = 250; 
  const height = events.length * itemHeight;
  const paddingX = 120; 
  const amplitude = (width / 2) - paddingX;

  const getPoint = (i: number) => {
    const y = (i + 0.5) * itemHeight;
    const isLeft = i % 2 === 0;
    const x = width / 2 + (isLeft ? -amplitude : amplitude);
    return { x, y, isLeft };
  };

  // Generate smooth cubic bezier path with rounded, ample turns
  let pathD = `M ${width / 2} 0`;
  for (let i = 0; i < events.length; i++) {
    const current = getPoint(i);
    const prevX = i === 0 ? width / 2 : getPoint(i - 1).x;
    const prevY = i === 0 ? 0 : getPoint(i - 1).y;
    
    // Pour des virages amples et ronds, on utilise un offset vertical important
    // qui "gonfle" la courbe vers le haut et le bas
    const curvature = itemHeight * 0.7; 
    const cp1Y = prevY + curvature;
    const cp2Y = current.y - curvature;
    
    pathD += ` C ${prevX} ${cp1Y}, ${current.x} ${cp2Y}, ${current.x} ${current.y}`;
  }
  // Extend path to bottom
  pathD += ` L ${width / 2} ${height + 50}`;

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto py-12 px-4 relative">
      <div className="relative" style={{ height: height + 50 }}>
        {/* ── Background & Animated Path ── */}
        <svg
          viewBox={`0 0 ${width} ${height + 50}`}
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          preserveAspectRatio="xMidYMin meet"
        >
          <defs>
            <filter id="snakeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Static Ghost Path */}
          <path
            d={pathD}
            fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Animated Main Path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: pathDraw }}
            filter="url(#snakeGlow)"
          />
        </svg>

        {/* ── Events ── */}
        {events.map((event, i) => {
          const { x, y, isLeft } = getPoint(i);
          
          return (
            <div
              key={i}
              className="absolute w-full flex items-center"
              style={{ top: y, transform: 'translateY(-50%)' }}
            >
              {/* Event Dot on Path */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-20"
                style={{ 
                  left: `${(x / width) * 100}%`,
                  borderColor: colors.primary,
                  backgroundColor: isDark ? '#1a1a1a' : '#fff',
                  boxShadow: `0 0 10px ${colors.primary}44`
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
              />

              {/* Card Container */}
              <motion.div
                initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`w-[38%] md:w-[38%] ${!isLeft ? 'mr-auto text-right pr-4' : 'ml-auto text-left pl-4'}`}
              >
                <div 
                  className="p-3 md:p-5 rounded-2xl border backdrop-blur-md transition-all hover:scale-[1.02] group"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.border,
                  }}
                >
                  {/* Period Label */}
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[10px] md:text-xs font-mono font-bold tracking-tighter opacity-40 uppercase">
                      {t(event.period)}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                  </div>

                  {/* Title & Org */}
                  <h3 className="text-xs md:text-base font-primary-bold leading-tight mb-1" style={{ color: colors.text }}>
                    {t(event.title)}
                  </h3>
                  <p className="text-[10px] md:text-xs font-secondary-semibold opacity-60 mb-2">
                    {t(event.organization)}
                  </p>

                  {/* Description */}
                  <p className="text-[9px] md:text-xs leading-relaxed opacity-50 line-clamp-3 md:line-clamp-none group-hover:opacity-80 transition-opacity">
                    {t(event.description)}
                  </p>

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className={`flex flex-wrap gap-1.5 mt-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      {event.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 rounded-full text-[8px] md:text-[9px] bg-white/5 dark:bg-black/20 border border-white/10 dark:border-black/10 opacity-40 group-hover:opacity-70 transition-opacity"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
