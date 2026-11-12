import React from 'react';

// Le symbole « dd » : deux D en miroir qui forment un disque (une antenne qui capte le signal).
// Logo original, dessiné en code (règle d'or n°2) ; il ne reprend aucune marque existante.
export const D_LEFT = 'M20 2H14A14 14 0 0 0 14 30H20ZM15 9H14A7 7 0 0 0 14 23H15Z';
export const D_RIGHT = 'M24 2H30A14 14 0 0 1 30 30H24ZM29 9H30A7 7 0 0 1 30 23H29Z';

export function DdMark({ className = 'w-[38px] h-[28px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 32" className={className} aria-hidden="true">
      <path d={D_LEFT} fill="#0a0c14" fillRule="evenodd" />
      <path d={D_RIGHT} fill="#4a2df0" fillRule="evenodd" />
    </svg>
  );
}

/** Logo : le symbole + « iptvnederlan » en encre et « dd » en ultraviolet (la marque). */
export function Logo({ size = 'md', night = false }: { size?: 'md' | 'lg'; night?: boolean }) {
  const text = size === 'lg' ? 'text-[24px]' : 'text-[19px]';
  return (
    <span className="inline-flex items-center gap-2.5 select-none" aria-label="iptvnederlandd">
      <DdMark className={size === 'lg' ? 'w-[46px] h-[34px]' : 'w-[36px] h-[26px]'} />
      <span aria-hidden="true" className={`font-display font-semibold tracking-[-0.035em] leading-none ${text} ${night ? 'text-white' : 'text-ink'}`}>
        iptvnederlan<span className={night ? 'text-volt-soft' : 'text-volt'}>dd</span>
      </span>
    </span>
  );
}
