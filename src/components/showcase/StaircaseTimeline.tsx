/**
 * @fileoverview StaircaseTimeline - Architectural diagonal progression.
 */

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { tCustom } from '../../utils/translationUtils';

interface StaircaseTimelineProps {
  events: CareerEntry[];
  lang: string;
}

export const StaircaseTimeline = ({ events, lang }: StaircaseTimelineProps) => {
  const t = tCustom(lang);
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({ container: containerRef });
  
  return (
    <div className="relative w-full h-[600px] bg-zinc-950/20 rounded-3xl border border-white/5 overflow-hidden">
      {/* ── Architectural Background Grid ── */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* ── Staircase container ── */}
      <div 
        ref={containerRef}
        className="h-full flex items-center overflow-x-auto no-scrollbar gap-0 px-[15vw] py-12 cursor-grab active:cursor-grabbing"
      >
        {events.map((event, i) => {
          // Each card is offset vertically by its index to create a staircase
          const verticalOffset = (i * -60); // 60px climb per step
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: verticalOffset + 100 }}
              whileInView={{ opacity: 1, y: verticalOffset }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="shrink-0 w-[320px] md:w-[400px] flex flex-col group relative"
            >
              {/* ── Connector "Step" ── */}
              <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              {/* ── Card ── */}
              <div className="p-8 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 transition-all duration-500 group-hover:border-(--color-tertiary)/40 group-hover:translate-y-[-10px] shadow-xl">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-lg bg-(--color-tertiary)/10 flex items-center justify-center text-sm border border-(--color-tertiary)/30">
                     {i + 1}
                   </div>
                   <span className="text-[10px] font-mono text-white/40">{t(event.period)}</span>
                 </div>

                 <h3 className="text-md md:text-lg font-bold text-white mb-2 group-hover:text-(--color-tertiary) transition-colors">{t(event.title)}</h3>
                 <p className="text-xs text-white/60 mb-6 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {t(event.description)}
                 </p>

                 <div className="flex justify-between items-center mt-auto">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">{t(event.organization)}</span>
                    <div className="flex gap-1">
                      {event.tags?.slice(0, 2).map(tag => (
                        <div key={tag} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      ))}
                    </div>
                 </div>
              </div>

              {/* ── Floor Shadow ── */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}

        {/* Padding at the end */}
        <div className="shrink-0 w-[300px]" />
      </div>

      {/* ── Info Overlay ── */}
      <div className="absolute top-8 left-8 flex items-center gap-4">
        <div className="w-1 h-12 bg-gradient-to-b from-(--color-tertiary) to-transparent" />
        <div className="flex flex-col">
          <span className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Growth Vector</span>
          <span className="text-xs text-white/50">{events.length} Milestones</span>
        </div>
      </div>
      
      {/* ── Visual Axis (the diagonal) ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
      </svg>
    </div>
  );
};
