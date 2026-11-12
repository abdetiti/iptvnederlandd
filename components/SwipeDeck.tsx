'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type Slide = { src: string; alt: string; title: string; text: string; pos?: string; w: number; h: number };

/*
 * « Afstemmen » : on change de chaîne en glissant le doigt (skill apple-design, 12/11/2026).
 * - Suivi 1:1 du doigt, en gardant l'endroit où on a attrapé (drag de Motion).
 * - Bords élastiques au lieu d'un arrêt sec (dragElastic).
 * - Au lâcher : on projette l'élan (décélération 0,998, comme le défilement d'Apple), on choisit la carte la plus proche
 *   de ce point d'arrivée, puis un ressort part avec la vitesse du doigt (pas de cassure entre geste et animation).
 * - Rebond léger seulement après un coup de doigt ; sans rebond pour les flèches et les puces.
 * - Rattrapable à tout moment : un nouveau geste repart de la position affichée.
 */
const project = (v: number, rate = 0.998) => ((v / 1000) * rate) / (1 - rate);

export function SwipeDeck({ slides, className = '', frameClass = 'h-[420px]', label = 'Foto’s', hud = true, priority = false }: {
  slides: Slide[]; className?: string; frameClass?: string; label?: string; hud?: boolean; priority?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [i, setI] = useState(0);
  const x = useMotionValue(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Garder la carte en place si la largeur change (rotation du téléphone)
  useEffect(() => { if (w) x.set(-i * w); }, [w]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback((k: number, velocity = 0, flick = false) => {
    const n = Math.max(0, Math.min(slides.length - 1, k));
    setI(n);
    if (reduced.current) { x.set(-n * w); return; }
    animate(x, -n * w, { type: 'spring', velocity, bounce: flick ? 0.18 : 0, duration: 0.45 });
  }, [slides.length, w, x]);

  return (
    <div className={`relative min-w-0 ${className}`} role="region" aria-roledescription="carrousel" aria-label={label}>
      <div ref={frame} className={`relative w-full overflow-hidden rounded-[28px] bg-ink ${frameClass}`} style={{ touchAction: 'pan-y' }}>
        <motion.ul className="flex h-full cursor-grab active:cursor-grabbing" style={{ x, width: w ? w * slides.length : `${slides.length * 100}%` }}
          drag="x" dragElastic={0.16} dragMomentum={false}
          dragConstraints={{ left: -(slides.length - 1) * w, right: 0 }}
          onDragEnd={(_, info) => {
            const v = info.velocity.x;
            const target = x.get() + project(v);
            const k = Math.round(-target / (w || 1));
            // Une carte par geste ; deux au maximum sur un coup de doigt franc
            const span = Math.abs(v) > 900 ? 2 : 1;
            const next = Math.max(i - span, Math.min(i + span, k));
            go(next, v, Math.abs(v) > 300);
          }}>
          {slides.map((s, k) => (
            <li key={s.src} className="relative h-full shrink-0" style={{ width: w || `${100 / slides.length}%` }} aria-hidden={k !== i} aria-label={`${k + 1} van ${slides.length}: ${s.title}`}>
              <img src={s.src} alt={s.alt} width={s.w} height={s.h} draggable={false}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" style={{ objectPosition: s.pos || '50% 50%' }}
                loading={priority && k === 0 ? 'eager' : 'lazy'} fetchPriority={priority && k === 0 ? 'high' : 'auto'} />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%]" style={{ background: 'linear-gradient(180deg, transparent, rgba(10,12,20,.82))' }} />
              <div className="absolute left-5 right-5 bottom-5 sm:left-6 sm:right-6 sm:bottom-6 text-white">
                <p className="font-display text-[24px] sm:text-[28px] font-semibold tracking-[-0.035em] leading-tight">{s.title}</p>
                <p className="mt-1 text-[15px] sm:text-[16px] text-white/85 max-w-[34ch]">{s.text}</p>
              </div>
            </li>
          ))}
        </motion.ul>

        {hud && (
          <div aria-hidden="true" className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full bg-white/90 text-ink text-[13px] font-bold tnum">
              <span className="live-dot w-2 h-2 rounded-full bg-volt text-volt" />
              Kanaal {String(i + 1).padStart(2, '0')}
            </span>
            <span className="sm:hidden h-8 px-3 rounded-full bg-black/45 text-white text-[13px] font-semibold flex items-center">Veeg om te zappen</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-1.5" role="tablist" aria-label="Kies een foto">
          {slides.map((s, k) => (
            <button key={s.src} type="button" role="tab" aria-selected={k === i} aria-label={s.title} onClick={() => go(k)}
              className="h-11 flex items-center px-1">
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-8 bg-volt' : 'w-3 bg-ink/20'}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Vorige" className="w-11 h-11 rounded-full btn-ghost flex items-center justify-center disabled:opacity-35"><ChevronLeft className="w-5 h-5" /></button>
          <button type="button" onClick={() => go(i + 1)} disabled={i === slides.length - 1} aria-label="Volgende" className="w-11 h-11 rounded-full btn-ghost flex items-center justify-center disabled:opacity-35"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}
