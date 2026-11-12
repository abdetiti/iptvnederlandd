'use client';

import React, { useEffect, useRef, useState } from 'react';

/** Ajoute « is-in » quand le bloc entre à l'écran (une seule fois). Le contenu est complet sans JavaScript. */
export function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }: { children: React.ReactNode; className?: string; as?: React.ElementType; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'idle' | 'wait' | 'in'>('idle');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) { setState('in'); return; }
    setState('wait');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setState('in'); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = state === 'idle' ? '' : `reveal ${state === 'in' ? 'is-in' : ''}`;
  return <Tag ref={ref} className={`${cls} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</Tag>;
}

/** Un chiffre qui compte jusqu'à sa valeur quand il arrive à l'écran (ex. « 80.000+ »). */
export function CountUp({ to, suffix = '', className = '' }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    // Déjà à l'écran au chargement : on ne recompte pas (pas de saut de 80.000 à 0)
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      setN(0);
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} className={`tnum ${className}`}>{n.toLocaleString('nl-NL')}{suffix}</span>;
}
