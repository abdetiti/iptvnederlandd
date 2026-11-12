import Link from 'next/link';
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { SwipeDeck } from '../SwipeDeck';
import { DdMark } from '../Logo';
import { gutter } from '../Section';
import { HERO_SLIDES } from '../../data/media';
import { orderLink, perMonth, PRICES, PROMO } from '../../lib/pricing';

/** L'antenne « dd » : le logo au centre, des ondes qui partent lentement (moment signature, après l'intro). */
export function SignalBadge({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-[-70%] w-[240%] h-[240%] overflow-visible">
        {[1, 2, 3].map((k) => <circle key={k} className={`wave wave-${k}`} cx="50" cy="50" r="40" fill="none" stroke="#4a2df0" strokeWidth="0.8" />)}
      </svg>
      <span className="relative w-full h-full rounded-full bg-white panel flex items-center justify-center"><DdMark className="w-[52%] h-auto" /></span>
    </span>
  );
}

export function Hero() {
  const from = perMonth(PRICES.Standard[1][12], 12);
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 grid-bg" />
      <div aria-hidden="true" className="absolute left-1/2 -top-40 w-[900px] h-[600px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(74,45,240,.12), transparent)' }} />
      <div className="relative max-w-6xl mx-auto pt-[92px] sm:pt-[124px] pb-14 sm:pb-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] gap-x-14 gap-y-6" style={gutter}>
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-card border border-line text-[14px] font-bold text-ink">
            <span className="live-dot w-2 h-2 rounded-full bg-volt text-volt" />Direct actief na je betaling
          </p>
          <h1 className="mt-5 display text-[clamp(52px,15vw,112px)] text-ink">IPTV Nederland</h1>
          <p className="mt-3 font-display title text-[clamp(24px,6.4vw,36px)] text-volt">Goed IPTV kopen, vandaag nog kijken.</p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:self-center relative min-w-0">
          <div className="hidden sm:block absolute -right-7 -top-7 z-10"><SignalBadge className="w-[86px] h-[86px]" /></div>
          <SwipeDeck slides={HERO_SLIDES} priority label="Wat je kunt kijken" frameClass="h-[clamp(300px,82vw,440px)] lg:h-[560px]" />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <p className="text-[18px] sm:text-[20px] text-mist max-w-xl">50.000+ zenders, films, series en live sport op je tv, telefoon of computer. Je bestelt in WhatsApp, betaalt via een veilige link en kijkt meteen.</p>
          <div className="mt-7 grid sm:flex gap-3">
            <a href={orderLink('Premium', 12, 1)} target="_blank" rel="noopener noreferrer" data-ref="hero" className="btn-wa inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full text-[18px] font-bold">
              <img src="/images/logos/whatsapp/whatsapp-blanc.svg" alt="" className="w-5 h-5" />Bestel via WhatsApp
            </a>
            <Link href="#prijzen" className="btn-ghost inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full text-[18px] font-bold">
              Bekijk de prijzen <ArrowDown className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-5 text-[15px] text-mist">Vanaf <strong className="text-ink">{from} per maand</strong> · bij 12 maanden kijk je er {PROMO.bonusMonths} bij.</p>
        </div>
      </div>
    </section>
  );
}
