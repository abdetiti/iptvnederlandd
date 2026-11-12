import React from 'react';
import { PLATFORMS, COMPETITIONS, ILLUSTRATION_NOTE } from '../data/media';

/**
 * Bandeau de logos qui passe tout seul : plateformes (en haut) et compétitions (en bas, dans l'autre sens).
 * La liste est doublée pour boucler sans saut ; pause au survol ; immobile si « mouvements réduits ».
 */
export function LogoMarquee() {
  return (
    <section aria-label="Streamingdiensten en competities" className="py-10 sm:py-14 bg-card border-y border-line overflow-hidden">
      <div className="marquee">
        <ul className="marquee-track" style={{ animationDuration: '38s' }}>
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <li key={i} aria-hidden={i >= PLATFORMS.length} className="shrink-0">
              {p.svg ? (
                <span className="flex items-center justify-center w-[176px] sm:w-[208px] aspect-[16/9] rounded-2xl bg-black">
                  <img src={p.svg} alt={i < PLATFORMS.length ? p.alt : ''} className="w-[58%] h-auto" loading="lazy" />
                </span>
              ) : (
                <img src={p.src} alt={i < PLATFORMS.length ? p.alt : ''} width={640} height={360} className="w-[176px] sm:w-[208px] aspect-[16/9] object-cover rounded-2xl" loading="lazy" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="marquee mt-4">
        <ul className="marquee-track marquee-reverse" style={{ animationDuration: '46s' }}>
          {[...COMPETITIONS, ...COMPETITIONS].map((c, i) => (
            <li key={i} aria-hidden={i >= COMPETITIONS.length} className="shrink-0">
              <span className="flex items-center justify-center w-[92px] h-[92px] sm:w-[104px] sm:h-[104px] rounded-2xl bg-white border border-line">
                <img src={c.src} alt={i < COMPETITIONS.length ? c.alt : ''} width={400} height={400} className="w-[84%] h-[84%] object-contain" loading="lazy" />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="max-w-6xl mx-auto mt-6 text-[14px] text-mist" style={{ paddingLeft: 'max(18px, env(safe-area-inset-left, 0px))', paddingRight: 'max(18px, env(safe-area-inset-right, 0px))' }}>{ILLUSTRATION_NOTE}</p>
    </section>
  );
}
