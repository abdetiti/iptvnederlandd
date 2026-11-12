'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { WA_HELLO } from '../lib/site';
import { NAV } from '../lib/nav';

// Ressort sans rebond (apple-design : damping 1.0 par défaut)
const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.4 };

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 isolate transition-[border-color] duration-300 border-b ${solid || open ? 'chrome border-line' : 'border-transparent'}`} style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="max-w-6xl mx-auto h-[64px] flex items-center justify-between gap-3" style={{ paddingLeft: 'max(18px, env(safe-area-inset-left, 0px))', paddingRight: 'max(18px, env(safe-area-inset-right, 0px))' }}>
          <Link href="/" aria-label="iptvnederlandd, naar de homepage" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <nav aria-label="Hoofdmenu" className="hidden lg:flex items-center gap-1 text-[15px] font-semibold text-mist">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="px-3.5 py-2 rounded-full hover:bg-ink/[.05] hover:text-ink transition-colors inline-flex items-center gap-2">
                {n.label}
                {n.badge && <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-volt text-white">{n.badge}</span>}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" data-ref="header" aria-label="Stel je vraag via WhatsApp" className="btn-wa inline-flex items-center gap-2 h-11 px-4 rounded-full text-[15px] font-semibold">
              <img src="/images/logos/whatsapp/whatsapp-blanc.svg" alt="" className="w-[19px] h-[19px]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button type="button" className="lg:hidden w-11 h-11 rounded-full btn-ghost flex items-center justify-center" aria-label={open ? 'Menu sluiten' : 'Menu openen'} aria-expanded={open} aria-controls="mobiel-menu" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          // Le menu sort du bouton (en haut à droite) et y retourne par le même chemin (apple-design §7)
          <motion.div id="mobiel-menu" key="menu"
            initial={{ opacity: 0, scale: 0.96, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -8 }} transition={SPRING}
            style={{ transformOrigin: 'calc(100% - 40px) 0px' }}
            className="lg:hidden fixed inset-x-0 top-[calc(64px+env(safe-area-inset-top,0px))] bottom-0 z-[45] bg-snow overflow-y-auto overscroll-contain">
            <nav aria-label="Mobiel menu" className="flex flex-col px-5 pt-4 pb-32">
              {NAV.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.03 * i }}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-3.5 border-b border-line">
                    <span className="font-display text-[32px] font-semibold tracking-[-0.04em] leading-tight text-ink">{n.label}</span>
                    {n.badge && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-volt text-white">{n.badge}</span>}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-6 pt-6 text-[17px] text-mist font-semibold">
                <Link href="/goed-iptv/" onClick={() => setOpen(false)}>Goed IPTV</Link>
                <Link href="/over-ons/" onClick={() => setOpen(false)}>Over ons</Link>
                <Link href="/contact/" onClick={() => setOpen(false)}>Contact</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
