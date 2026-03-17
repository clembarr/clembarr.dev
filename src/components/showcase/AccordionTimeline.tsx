/**
 * @fileoverview AccordionTimeline - A high-density folder-like interaction.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { tCustom } from '../../utils/translationUtils';

interface AccordionTimelineProps {
  events: CareerEntry[];
  lang: string;
}

export const AccordionTimeline = ({ events, lang }: AccordionTimelineProps) => {
  const t = tCustom(lang);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="flex h-[400px] w-full gap-2 p-2 bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden">
      {events.map((event, i) => {
        const isExpanded = expandedIndex === i;
        return (
          <motion.div
            key={i}
            onMouseEnter={() => setExpandedIndex(i)}
            animate={{ 
              width: isExpanded ? '100%' : '60px',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              relative h-full rounded-xl overflow-hidden cursor-pointer
              ${isExpanded ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'}
              border border-white/10
              flex flex-col
            `}
          >
            {/* ── Vertical Title (collapsed) ── */}
            {!isExpanded && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <span className="text-[10px] font-bold text-white/20 whitespace-nowrap -rotate-90 uppercase tracking-[0.2em]">
                  {t(event.title)}
                </span>
              </div>
            )}

            {/* ── Content (expanded) ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-mono text-(--color-tertiary) px-3 py-1 bg-(--color-tertiary)/10 rounded-full border border-(--color-tertiary)/20">
                      {t(event.period)}
                    </span>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">{event.type}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t(event.title)}</h3>
                  <p className="text-sm font-semibold text-(--color-tertiary) mb-6">{t(event.organization)}</p>
                  
                  <p className="text-sm md:text-md text-white/60 leading-relaxed max-w-2xl">
                    {t(event.description)}
                  </p>

                  <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap gap-2">
                    {event.tags?.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 rounded-md border border-white/10 text-white/40">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* ── Index Indicator ── */}
            {!isExpanded && (
               <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-mono opacity-20">
                 0{i + 1}
               </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
