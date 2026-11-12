import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageHero } from '../../components/PageHero';
import { Pricing } from '../../components/Pricing';
import { Accordion } from '../../components/Accordion';
import { Section, WaButton, gutter } from '../../components/Section';
import { Reveal } from '../../components/Reveal';
import { JsonLd, faqSchema } from '../../components/JsonLd';
import { BUY_FAQ } from '../../data/faq';
import { PAYMENT_LOGOS } from '../../data/media';
import { orderLink, perMonth, PRICES, PROMO } from '../../lib/pricing';
import { SITE } from '../../lib/site';

export const metadata: Metadata = {
  title: 'IPTV kopen in Nederland: zo regel je het in 2 minuten',
  description: `IPTV kopen zonder account: pakket kiezen, WhatsApp-bericht sturen, veilig betalen en direct kijken. Vanaf ${perMonth(PRICES.Standard[1][12], 12)} per maand.`,
  alternates: { canonical: '/iptv-kopen/' },
  openGraph: { url: '/iptv-kopen/', title: 'IPTV kopen in Nederland' },
};

const STEPS = [
  { t: 'Kies wat je wilt kijken', d: 'Standard voor het gewone kijken, Premium voor het grootste aanbod en een krachtigere server. Kies daarna 3, 6 of 12 maanden en het aantal schermen.' },
  { t: 'Tik op de groene knop', d: 'WhatsApp opent met een bericht waarin je keuze al staat. Eén tik op verzenden en je bestelling is binnen.' },
  { t: 'Betaal via de betaallink', d: 'Je krijgt een beveiligde link en betaalt één keer voor de hele looptijd.' },
  { t: 'Kijk direct', d: 'Je inloggegevens komen meteen binnen, met de stappen voor jouw apparaat. Lukt het niet? We kijken met je mee.' },
];

const YOU_GET = [
  '50.000+ zenders (Standard) of 80.000+ zenders (Premium)',
  '140.000+ of 200.000+ films en series op aanvraag',
  'Nederlandse zenders, internationale tv en live sport',
  'Beeld in SD, HD, Full HD en 4K',
  'Programmagids (EPG)',
  'Hulp 24/7 in het Nederlands via WhatsApp',
];

export default function Page() {
  return (
    <>
      <JsonLd data={[
        { '@context': 'https://schema.org', '@type': 'HowTo', name: 'IPTV kopen', inLanguage: 'nl-NL', url: `${SITE}/iptv-kopen/`, step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.t, text: s.d })) },
        faqSchema(BUY_FAQ),
      ]} />
      <PageHero path="/iptv-kopen/" crumb="IPTV kopen" title="IPTV kopen"
        intro={<>Zonder account en zonder formulier. Je kiest hier, je regelt de rest in WhatsApp, en je kijkt direct na je betaling. Bij 12 maanden krijg je er {PROMO.bonusMonths} bij.</>}>
        <div className="mt-8 grid sm:flex gap-3">
          <WaButton href={orderLink('Premium', 12, 1)} label="IPTV kopen via WhatsApp" track="kopen-hero" />
          <a href="#pakket" className="btn-ghost inline-flex items-center justify-center h-14 px-7 rounded-full text-[18px] font-bold">Eerst kiezen</a>
        </div>
      </PageHero>

      <Section kicker="Zo werkt het" title="Van keuze tot eerste zender">
        <ol className="grid sm:grid-cols-2 gap-4">
          {STEPS.map((s, k) => (
            <Reveal as="li" key={s.t} delay={k * 70} className="panel rounded-[26px] p-6 flex gap-5">
              <span className="shrink-0 w-[52px] h-[52px] rounded-full bg-ink text-white font-display font-semibold text-[22px] flex items-center justify-center">{k + 1}</span>
              <span>
                <span className="block title text-[21px] text-ink">{s.t}</span>
                <span className="block mt-1.5 text-[16px] text-mist">{s.d}</span>
              </span>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="night" kicker="Wat je koopt" title="Dit zit in elk pakket">
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl">
          {YOU_GET.map((p) => (
            <li key={p} className="flex gap-3 text-[18px] text-white">
              <span className="w-7 h-7 rounded-full bg-volt flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-white stroke-[3]" /></span>{p}
            </li>
          ))}
        </ul>
      </Section>

      <section id="pakket" className="py-20 sm:py-28 scroll-mt-20 bg-card">
        <div className="max-w-6xl mx-auto" style={gutter}>
          <h2 className="display text-[clamp(36px,9vw,64px)] text-ink mb-10">Kies je pakket</h2>
          <Pricing refPrefix="kopen" />
        </div>
      </section>

      <Section kicker="Betalen" title="Veilig betalen, één keer" intro="Je betaalt via een beveiligde betaalpagina. Deze website neemt zelf geen betalingen aan en bewaart geen betaalgegevens.">
        <div className="flex flex-wrap gap-2">
          {PAYMENT_LOGOS.map((p) => <span key={p.name} className="h-12 px-3.5 rounded-xl bg-white border border-line flex items-center"><img src={p.src} alt={p.name} className="h-6 w-auto" loading="lazy" /></span>)}
        </div>
      </Section>

      <Section title="Vragen over IPTV kopen" className="pt-0 sm:pt-0">
        <div className="max-w-3xl space-y-6">
          <Accordion items={BUY_FAQ} />
          <Link href="/goed-iptv/" className="link inline-flex items-center gap-2 text-[17px]">Waar herken je goed IPTV aan? <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </Section>
    </>
  );
}
