import type { Metadata } from 'next';
import React from 'react';
import { PageHero } from '../../components/PageHero';
import { Accordion } from '../../components/Accordion';
import { Section, WaButton } from '../../components/Section';
import { JsonLd, faqSchema } from '../../components/JsonLd';
import { FAQ_GROUPS } from '../../data/faq';
import { WA_HELLO } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Vragen over IPTV kopen en kijken | iptvnederlandd',
  description: 'Antwoorden over IPTV in Nederland: wat het is, kopen en betalen, Standard of Premium, apparaten, installeren en beeldkwaliteit.',
  alternates: { canonical: '/faq/' },
  openGraph: { url: '/faq/', title: 'Vragen over IPTV kopen en kijken' },
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_GROUPS.flatMap((g) => g.items))} />
      <PageHero path="/faq/" crumb="Vragen" title="Vragen over IPTV" intro="Alles over kopen, betalen, pakketten, apparaten en beeld. Mis je iets? Vraag het in WhatsApp." />
      <nav aria-label="Rubrieken" className="max-w-6xl mx-auto flex flex-wrap gap-2 pb-4" style={{ paddingLeft: 'max(18px, env(safe-area-inset-left, 0px))', paddingRight: 'max(18px, env(safe-area-inset-right, 0px))' }}>
        {FAQ_GROUPS.map((g) => <a key={g.id} href={`#${g.id}`} className="btn-ghost inline-flex items-center h-11 px-4 rounded-full text-[15px] font-bold">{g.title}</a>)}
      </nav>
      {FAQ_GROUPS.map((g) => (
        <Section key={g.id} id={g.id} title={g.title} className="py-10 sm:py-14">
          <div className="max-w-3xl"><Accordion items={g.items} /></div>
        </Section>
      ))}
      <Section title="Staat je vraag er niet bij?" intro="Stel hem in WhatsApp. We antwoorden dag en nacht, in het Nederlands." className="pt-4 sm:pt-6">
        <WaButton href={WA_HELLO} label="Stel je vraag via WhatsApp" track="faq" />
      </Section>
    </>
  );
}
