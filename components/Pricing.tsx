'use client';

import React, { useId, useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import {
  DurationMonths, DeviceCount, PlanTier, getPrice, priceDigits, perMonth, orderLink,
  promoActive, PROMO, PACKAGE_FEATURES, DEVICE_DISCOUNT,
} from '../lib/pricing';
import { PAYMENT_LOGOS } from '../data/media';

// Le curseur glisse vers le choix avec un ressort sans rebond, et repart de là où il est si on change d'avis en route.
const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.38 };

/** Le prix roule doucement quand on change un choix. */
function Price({ value, className = '' }: { value: number; className?: string }) {
  const s = priceDigits(value);
  return (
    <span className={`inline-flex items-start leading-none tnum ${className}`} aria-label={`€${s}`}>
      <span className="text-[0.42em] font-semibold mr-1 mt-[0.12em]">€</span>
      <motion.span key={s} initial={{ opacity: 0, y: '0.2em', filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={SPRING}>{s}</motion.span>
    </span>
  );
}

function Segmented<T extends number>({ legend, options, value, onChange, render, label }: {
  legend: string; options: T[]; value: T; onChange: (v: T) => void; render: (v: T, on: boolean) => React.ReactNode; label?: (v: T) => string;
}) {
  const id = useId();
  return (
    <fieldset>
      <legend className="text-[15px] font-bold text-ink mb-2.5">{legend}</legend>
      <div className={`grid p-1 rounded-full bg-card border border-line`} style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0,1fr))` }}>
        {options.map((x) => {
          const on = x === value;
          return (
            <button key={x} type="button" aria-pressed={on} aria-label={label?.(x)} onClick={() => onChange(x)}
              className={`relative h-12 rounded-full text-[16px] font-bold transition-colors duration-200 ${on ? 'text-white' : 'text-mist hover:text-ink'}`}>
              {on && <motion.span layoutId={`thumb-${id}`} transition={SPRING} className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative">{render(x, on)}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Pricing({ refPrefix = 'home' }: { refPrefix?: string }) {
  const [m, setM] = useState<DurationMonths>(12);
  const [d, setD] = useState<DeviceCount>(1);
  const devText = d === 1 ? '1 apparaat' : `${d} apparaten`;

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
        <Segmented<DurationMonths> legend="Looptijd" options={[12, 6, 3] as DurationMonths[]} value={m} onChange={setM}
          render={(x, on) => <>{x} mnd{promoActive(x) ? <span className={`ml-1 ${on ? 'text-volt-soft' : 'text-volt'}`}>+{PROMO.bonusMonths}</span> : null}</>} />
        <div>
          <Segmented<DeviceCount> legend="Schermen tegelijk" options={[1, 2, 3, 4] as DeviceCount[]} value={d} onChange={setD}
            label={(x) => (x === 1 ? '1 apparaat' : `${x} apparaten, ${DEVICE_DISCOUNT[x]} % korting`)} render={(x) => x} />
          <p className="mt-2 text-[14px] text-mist">{DEVICE_DISCOUNT[d] ? `${DEVICE_DISCOUNT[d]} % korting per scherm` : 'Meer schermen geeft korting per scherm.'}</p>
        </div>
      </div>
      {promoActive(m) && (
        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volt-tint text-volt text-[15px] font-bold">
          <span className="live-dot w-2 h-2 rounded-full bg-volt" />Actie: je kijkt 12 + {PROMO.bonusMonths} maanden, je betaalt 12.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {(['Premium', 'Standard'] as PlanTier[]).map((t) => {
          const total = getPrice(t, d, m);
          const premium = t === 'Premium';
          return (
            <div key={t} className={`relative rounded-[32px] p-7 sm:p-9 flex flex-col overflow-hidden ${premium ? 'bg-night text-white on-night' : 'panel'}`}>
              {premium && <div aria-hidden="true" className="absolute -top-28 -right-24 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(74,45,240,.55), transparent)' }} />}
              <div className="relative flex items-center justify-between gap-3">
                <h3 className={`font-display text-[30px] font-semibold tracking-[-0.04em] ${premium ? 'text-white' : 'text-ink'}`}>{t}</h3>
                {premium && <span className="px-3 py-1 rounded-full text-[13px] font-bold bg-volt text-white">Beste deal</span>}
              </div>
              <p className={`relative mt-1 text-[15px] ${premium ? 'text-moon' : 'text-mist'}`}>{promoActive(m) ? `${m} + ${PROMO.bonusMonths} maanden` : `${m} maanden`}, {devText}</p>
              <div className="relative mt-6">
                <Price value={total} className={`font-display font-semibold tracking-[-0.05em] text-[clamp(62px,17vw,86px)] ${premium ? 'text-white' : 'text-ink'}`} />
                <p className={`mt-2 text-[16px] font-bold ${premium ? 'text-volt-soft' : 'text-volt'}`}>Gemiddeld {perMonth(total, m)} per maand</p>
              </div>
              <div className="relative mt-7 space-y-5 flex-1">
                {PACKAGE_FEATURES[t].map((g) => (
                  <div key={g.title}>
                    <p className={`text-[14px] font-bold mb-2 ${premium ? 'text-moon' : 'text-mist'}`}>{g.title}</p>
                    <ul className="space-y-2 text-[16px]">
                      {g.items.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <Check className={`w-5 h-5 shrink-0 mt-0.5 stroke-[2.5] ${premium ? 'text-volt-soft' : 'text-volt'}`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a href={orderLink(t, m, d)} target="_blank" rel="noopener noreferrer" data-ref={`${refPrefix}-${t.toLowerCase()}-${m}m-${d}app`}
                className={`relative mt-8 h-14 rounded-full flex items-center justify-center gap-2.5 text-[18px] font-bold ${premium ? 'btn-wa' : 'btn-ghost'}`}>
                <img src={premium ? '/images/logos/whatsapp/whatsapp-blanc.svg' : '/images/logos/whatsapp/whatsapp-couleur.svg'} alt="" className="w-5 h-5" />
                Bestel {t} via WhatsApp
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-[15px] text-mist">Totaalprijs voor de hele looptijd, betaald via een veilige betaallink in WhatsApp.</p>
        <div className="flex flex-wrap gap-2">
          {PAYMENT_LOGOS.map((p) => (
            <span key={p.name} className="h-9 px-2.5 rounded-xl bg-white border border-line flex items-center"><img src={p.src} alt={p.name} className="h-5 w-auto" loading="lazy" /></span>
          ))}
        </div>
      </div>
    </div>
  );
}
