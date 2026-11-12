'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import type { Faq } from '../data/faq';

const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.42 };

/** Questions fréquentes : une seule ouverte à la fois ; l'ouverture est un ressort qu'on peut interrompre. */
export function Accordion({ items, night = false }: { items: Faq[]; night?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const line = night ? 'border-white/12' : 'border-line';
  return (
    <ul className={`border-t ${line}`}>
      {items.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.question} className={`border-b ${line}`}>
            <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="w-full flex items-start justify-between gap-4 py-5 text-left group">
              <span className={`text-[19px] sm:text-[21px] font-bold leading-snug tracking-[-0.01em] ${night ? 'text-white' : 'text-ink'}`}>{f.question}</span>
              <motion.span aria-hidden="true" animate={{ rotate: on ? 45 : 0 }} transition={SPRING}
                className={`shrink-0 mt-0.5 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${on ? 'bg-volt text-white' : night ? 'bg-night-2 text-white' : 'bg-card border border-line text-ink'}`}>
                <Plus className="w-5 h-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={SPRING} className="overflow-hidden">
                  <p className={`pb-6 pr-12 text-[17px] ${night ? 'text-moon' : 'text-mist'}`}>{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
