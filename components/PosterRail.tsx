'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Poster } from '../data/media';

/*
 * Rangée d'affiches qui défile au doigt.
 * Défilement natif avec arrêt sur chaque affiche (scroll-snap) : c'est la vraie physique du téléphone
 * (élan, décélération, bords élastiques), la plus fluide possible (skill apple-design).
 * Flèches sur ordinateur ; elles avancent d'un écran.
 */
export function PosterRail({ items, label, night = false, wide = false }: { items: Poster[]; label: string; night?: boolean; wide?: boolean }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    on();
    el.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { el.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' });
  };

  const btn = `w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-30 ${night ? 'border border-white/25 text-white hover:border-white' : 'btn-ghost'}`;

  return (
    <div className="relative">
      <ul ref={ref} aria-label={label} className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-px-[18px] pb-2 -mx-[18px] px-[18px] lg:mx-0 lg:px-0 lg:scroll-px-0" style={{ overscrollBehaviorX: 'contain' }}>
        {items.map((p) => (
          <li key={p.src} className={`snap-start shrink-0 ${wide ? 'w-[64vw] sm:w-[260px]' : 'w-[42vw] sm:w-[200px]'}`}>
            <figure className="group">
              <div className={`relative overflow-hidden rounded-[20px] ${night ? 'bg-night-2' : 'bg-card border border-line'} aspect-[2/3] transition-transform duration-300 ease-out group-hover:-translate-y-1`}>
                <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" draggable={false} className="absolute inset-0 w-full h-full object-cover select-none" />
              </div>
              {p.label && <figcaption className={`mt-2.5 text-[16px] font-bold ${night ? 'text-white' : 'text-ink'}`}>{p.label}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
      <div className="hidden sm:flex justify-end gap-2 mt-4">
        <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Vorige" className={btn}><ChevronLeft className="w-5 h-5" /></button>
        <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Volgende" className={btn}><ChevronRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
}
