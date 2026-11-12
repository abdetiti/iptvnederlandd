import React from 'react';

export const gutter: React.CSSProperties = {
  paddingLeft: 'max(18px, env(safe-area-inset-left, 0px))',
  paddingRight: 'max(18px, env(safe-area-inset-right, 0px))',
};

/** Bloc de section : titre (h2) + intro, puis le contenu. tone « night » = bande sombre. */
export function Section({ id, title, intro, children, className = '', tone = 'snow', kicker }: {
  id?: string; title: React.ReactNode; intro?: React.ReactNode; children: React.ReactNode; className?: string; tone?: 'snow' | 'white' | 'night'; kicker?: string;
}) {
  const night = tone === 'night';
  return (
    <section id={id} className={`py-20 sm:py-28 scroll-mt-20 ${tone === 'white' ? 'bg-card' : ''} ${night ? 'bg-night text-white on-night' : ''} ${className}`} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="max-w-6xl mx-auto" style={gutter}>
        <div className="mb-10 sm:mb-12 max-w-2xl">
          {kicker && <p className={`eyebrow mb-4 ${night ? 'text-volt-soft' : 'text-volt'}`}>{kicker}</p>}
          <h2 id={id ? `${id}-title` : undefined} className={`display text-[clamp(36px,9vw,64px)] ${night ? 'text-white' : 'text-ink'}`}>{title}</h2>
          {intro && <p className={`mt-5 text-[18px] sm:text-[19px] ${night ? 'text-moon' : 'text-mist'}`}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function WaButton({ href, label, track, className = '' }: { href: string; label: string; track?: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-ref={track} className={`btn-wa inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full text-[18px] font-semibold ${className}`}>
      <img src="/images/logos/whatsapp/whatsapp-blanc.svg" alt="" className="w-5 h-5" />
      {label}
    </a>
  );
}
