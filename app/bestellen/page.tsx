import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { PageHero } from '../../components/PageHero';
import { Section, WaButton } from '../../components/Section';
import { Reveal } from '../../components/Reveal';
import { JsonLd } from '../../components/JsonLd';
import { PAYMENT_LOGOS } from '../../data/media';
import { orderLink } from '../../lib/pricing';
import { SITE } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Bestellen via WhatsApp | iptvnederlandd',
  description: 'Bestellen gaat via WhatsApp: pakket kiezen, bericht versturen, betalen via een veilige link en direct je gegevens ontvangen.',
  alternates: { canonical: '/bestellen/' },
  openGraph: { url: '/bestellen/', title: 'Bestellen via WhatsApp' },
};

const STEPS = [
  { t: 'Kies op de prijzenpagina', d: 'Pakket, looptijd en schermen. Je ziet meteen het totaalbedrag.' },
  { t: 'Verstuur het bericht', d: 'De groene knop opent WhatsApp met je keuze erin. Jij tikt op verzenden.' },
  { t: 'Betaal met een veilige link', d: 'iDEAL, PayPal, Visa, Mastercard of Apple Pay. Eén betaling voor de hele looptijd.' },
  { t: 'Ontvang je gegevens', d: 'Meteen na je betaling, in hetzelfde gesprek, met de stappen voor jouw apparaat.' },
  { t: 'Zet het aan en kijk', d: 'Volg de stappen of laat ons meekijken, dag en nacht.' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'HowTo', name: 'Bestellen via WhatsApp', inLanguage: 'nl-NL', url: `${SITE}/bestellen/`,
        step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.t, text: s.d })),
      }} />
      <PageHero path="/bestellen/" crumb="Bestellen" title="Bestellen via WhatsApp"
        intro="Je bestelt in een gewoon gesprek, met een mens aan de andere kant. Geen account, geen wachtrij." />

      <Section title="Vijf stappen, een paar minuten">
        <ol className="relative max-w-3xl">
          <span aria-hidden="true" className="absolute left-[25px] top-6 bottom-6 w-[2px] bg-line" />
          {STEPS.map((s, k) => (
            <Reveal as="li" key={s.t} delay={k * 60} className="relative flex gap-5 py-3">
              <span className="relative z-10 shrink-0 w-[52px] h-[52px] rounded-full bg-ink text-white font-display font-semibold text-[22px] flex items-center justify-center ring-[6px] ring-snow">{k + 1}</span>
              <span className="pt-1.5">
                <span className="block title text-[21px] text-ink">{s.t}</span>
                <span className="block mt-1 text-[17px] text-mist">{s.d}</span>
              </span>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8 grid sm:flex gap-3">
          <WaButton href={orderLink('Premium', 12, 1)} label="Start je bestelling" track="bestellen" />
          <Link href="/iptv-abonnement/" className="btn-ghost inline-flex items-center justify-center h-14 px-7 rounded-full text-[18px] font-bold">Eerst de prijzen</Link>
        </div>
      </Section>

      <Section tone="white" title="Betaalmethoden" intro="Je betaalt op een beveiligde betaalpagina. Deze website neemt zelf geen betalingen aan.">
        <div className="flex flex-wrap gap-2">
          {PAYMENT_LOGOS.map((p) => (
            <span key={p.name} className="h-12 px-3.5 rounded-xl bg-white border border-line flex items-center"><img src={p.src} alt={p.name} className="h-6 w-auto" loading="lazy" /></span>
          ))}
        </div>
      </Section>
    </>
  );
}
