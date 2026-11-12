'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/media';

const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.42 };

/*
 * Avis : de vraies captures de conversations WhatsApp (noms et numéros floutés).
 * Un toucher agrandit la capture : elle grandit depuis sa place et y retourne (apple-design §7),
 * le fond s'assombrit ; fermer = toucher n'importe où, la croix ou Échap.
 */
export function Reviews() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <ul aria-label="Gesprekken met klanten" className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-[18px] px-[18px] scroll-px-[18px] pb-2 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {REVIEWS.map((r, i) => (
          <li key={r.src} className="snap-start shrink-0 w-[62vw] sm:w-[250px] lg:w-auto">
            <button type="button" onClick={() => setOpen(i)} aria-label={`Bekijk gesprek: ${r.label}`} className="block w-full text-left group">
              <motion.div layoutId={`review-${i}`} transition={SPRING} className="relative rounded-[30px] bg-ink p-2 shadow-[0_24px_60px_-30px_rgba(10,12,20,.5)]">
                <img src={r.src} alt={`Gesprek met een klant via WhatsApp: ${r.label}`} width={600} height={1304} loading="lazy" className="w-full aspect-[600/1100] object-cover object-top rounded-[23px]" />
              </motion.div>
              <p className="mt-3 text-[16px] font-bold text-ink">“{r.quote}”</p>
              <p className="text-[14px] text-mist">{r.label}</p>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-center gap-2 text-[14px] text-mist"><ShieldCheck className="w-4 h-4 text-volt" />Echte gesprekken. Namen en nummers zijn onherkenbaar gemaakt.</p>

      <AnimatePresence>
        {open !== null && (
          <motion.div key="lb" className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={REVIEWS[open].label}
            initial={{ opacity: 1 }} exit={{ opacity: 1 }} onClick={() => setOpen(null)}>
            <motion.div className="absolute inset-0 bg-night/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={SPRING} />
            <motion.div layoutId={`review-${open}`} transition={SPRING} className="relative rounded-[34px] bg-ink p-2.5 max-h-[88svh] w-auto">
              <img src={REVIEWS[open].src} alt={`Gesprek met een klant via WhatsApp: ${REVIEWS[open].label}`} width={600} height={1304} className="max-h-[calc(88svh-20px)] w-auto rounded-[26px]" />
            </motion.div>
            <button type="button" onClick={() => setOpen(null)} aria-label="Sluiten" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center" style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}><X className="w-5 h-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
