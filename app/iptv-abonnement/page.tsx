import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { PageHero } from '../../components/PageHero';
import { Pricing } from '../../components/Pricing';
import { Accordion } from '../../components/Accordion';
import { Section, WaButton, gutter } from '../../components/Section';
import { JsonLd, faqSchema } from '../../components/JsonLd';
import { PRICE_FAQ } from '../../data/faq';
import { PRICES, DEVICE_DISCOUNT, formatPrice, orderLink, perMonth, PROMO } from '../../lib/pricing';
import { SITE } from '../../lib/site';

export const metadata: Metadata = {
  title: 'IPTV abonnement: alle prijzen op een rij | iptvnederlandd',
  description: `IPTV abonnement in Nederland: Standard of Premium, 3, 6 of 12 maanden (+${PROMO.bonusMonths} extra), 1 tot 4 schermen. Vanaf ${perMonth(PRICES.Standard[1][12], 12)} per maand, bestellen via WhatsApp.`,
  alternates: { canonical: '/iptv-abonnement/' },
  openGraph: { url: '/iptv-abonnement/', title: 'IPTV abonnement: alle prijzen op een rij' },
};

const ROWS: [string, string, string][] = [
  ['Zenders', '50.000+', '80.000+'],
  ['Films en series', '140.000+', '200.000+'],
  ['Server', 'Standaard', 'Krachtiger'],
  ['Beeldkwaliteit', 'SD tot 4K', 'SD tot 4K'],
  ['Programmagids (EPG)', 'Ja', 'Ja'],
  ['Hulp 24/7 via WhatsApp', 'Ja', 'Ja'],
];

export default function Page() {
  const offers = (['Standard', 'Premium'] as const).flatMap((t) =>
    ([1, 2, 3, 4] as const).flatMap((d) => ([3, 6, 12] as const).map((m) => ({ '@type': 'Offer', name: `${t} ${m} maanden, ${d} apparaat${d > 1 ? 'en' : ''}`, price: PRICES[t][d][m].toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: `${SITE}/iptv-abonnement/` })))
  );
  return (
    <>
      <JsonLd data={[
        { '@context': 'https://schema.org', '@type': 'Product', name: 'IPTV abonnement', brand: { '@type': 'Brand', name: 'iptvnederlandd' }, description: 'IPTV-abonnement Standard of Premium, 3 tot 12 maanden, 1 tot 4 apparaten.', image: `${SITE}/og-image.jpg`, offers },
        faqSchema(PRICE_FAQ),
      ]} />
      <PageHero path="/iptv-abonnement/" crumb="Prijzen" title="IPTV abonnement in Nederland"
        intro={<>Kies Standard of Premium, de looptijd en het aantal schermen. De prijs op de kaart is wat je betaalt. Bij 12 maanden kijk je er {PROMO.bonusMonths} maanden bij.</>} />

      <section className="pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto" style={gutter}><Pricing refPrefix="prijzen" /></div>
      </section>

      <Section id="vergelijk" tone="white" title="Standard naast Premium" intro="Allebei met Nederlandse en internationale zenders, live sport, films en series. Premium geeft je meer van alles en een krachtigere server.">
        <div className="overflow-x-auto rounded-[24px] panel">
          <table className="w-full text-left text-[15px] sm:text-[17px]">
            <thead>
              <tr className="bg-snow text-ink">
                <th className="p-3 sm:p-4"><span className="sr-only">Kenmerk</span></th>
                <th className="p-3 sm:p-4 font-display text-[20px] font-semibold text-ink">Standard</th>
                <th className="p-3 sm:p-4 font-display text-[20px] font-semibold text-volt">Premium</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, s, p]) => (
                <tr key={k} className="border-t border-line">
                  <th scope="row" className="p-3 sm:p-4 font-semibold text-ink">{k}</th>
                  <td className="p-3 sm:p-4 text-mist">{s}</td>
                  <td className="p-3 sm:p-4 font-bold text-ink">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="schermen" title="Meer schermen, meer korting" intro="Kijkt de een voetbal in de woonkamer en de ander een serie op de tablet? Kies het aantal schermen dat tegelijk mag kijken.">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {([1, 2, 3, 4] as const).map((d) => (
            <li key={d} className="panel p-5 rounded-[22px] text-ink">
              <p className="font-display font-semibold tracking-[-0.05em] text-[44px] leading-none text-ink">{d}<span className="text-[20px] ml-1.5 tracking-normal text-mist">{d === 1 ? 'scherm' : 'schermen'}</span></p>
              <p className="mt-2 text-[15px] font-bold text-volt">{DEVICE_DISCOUNT[d] ? `${DEVICE_DISCOUNT[d]} % korting` : 'Basisprijs'}</p>
              <p className="mt-1 text-[16px]">Standard 12 mnd: <strong>{formatPrice(PRICES.Standard[d][12])}</strong></p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="vragen" title="Vragen over de prijzen" className="pt-0 sm:pt-0">
        <div className="max-w-3xl space-y-6">
          <Accordion items={PRICE_FAQ} />
          <WaButton href={orderLink('Premium', 12, 1)} label="Bestel via WhatsApp" track="prijzen-slot" className="w-full sm:w-auto" />
          <p className="text-[16px] text-mist">Hoe het bestellen precies gaat, lees je op <Link href="/bestellen/" className="link">bestellen</Link>.</p>
        </div>
      </Section>
    </>
  );
}
