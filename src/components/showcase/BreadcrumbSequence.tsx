/**
 * @fileoverview BreadcrumbSequence - Text-based breadcrumb timeline.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerEntry } from '../../assets/dataTypes';
import { tCustom } from '../../utils/translationUtils';

interface BreadcrumbSequenceProps {
  events: CareerEntry[];
  lang: string;
}

export const BreadcrumbSequence = ({ events, lang }: BreadcrumbSequenceProps) => {
  const t = tCustom(lang);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="w-full py-24 px-[10%] flex flex-wrap items-center justify-center gap-x-4 gap-y-8">
      {events.map((event, i) => (
        <div key={i} className="flex items-center gap-4">
          <motion.div
            onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
            className={`
              relative cursor-pointer transition-all duration-300
              ${selectedIndex === i ? 'text-(--color-tertiary)' : 'text-white/40 hover:text-white'}
            `}
          >
            <span className="text-sm font-primary-bold uppercase tracking-wider">{t(event.title)}</span>
            
            <AnimatePresence>
              {selectedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="absolute top-8 left-0 w-[250px] bg-zinc-900 border border-white/5 p-4 rounded-lg shadow-2xl z-50 overflow-hidden"
                >
                  <p className="text-[10px] text-white/50 mb-2">{t(event.organization)}</p>
                  <p className="text-xs leading-relaxed text-white">{t(event.description)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {i < events.length - 1 && (
            <span className="text-white/10 font-mono">/</span>
          )}
        </div>
      ))}
    </div>
  );
};
