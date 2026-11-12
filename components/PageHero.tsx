import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { gutter } from './Section';
import { JsonLd, breadcrumb } from './JsonLd';
import { SITE } from '../lib/site';

/** En-tête des pages internes : fond blanc, grille fine qui s'efface, une onde de signal derrière le titre. */
export function PageHero({ path, crumb, title, intro, children }: {
  path: string; crumb: string; title: React.ReactNode; intro?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <JsonLd data={breadcrumb([['Home', `${SITE}/`], [crumb, `${SITE}${path}`]])} />
      <div aria-hidden="true" className="absolute inset-0 grid-bg" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(74,45,240,.16), transparent)' }} />
      <div className="relative max-w-6xl mx-auto pt-[112px] sm:pt-[140px] pb-12 sm:pb-16" style={gutter}>
        <nav aria-label="Kruimelpad" className="flex items-center gap-1.5 text-[15px] text-mist mb-6 font-semibold">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-ink">{crumb}</span>
        </nav>
        <h1 className="display text-[clamp(42px,11.5vw,88px)] text-ink max-w-4xl">{title}</h1>
        {intro && <p className="mt-5 text-[18px] sm:text-[20px] text-mist max-w-2xl">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
