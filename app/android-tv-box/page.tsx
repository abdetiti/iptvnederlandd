import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { Check, Truck } from 'lucide-react';
import { PageHero } from '../../components/PageHero';
import { BoxGallery, DeliveryDate } from '../../components/BoxGallery';
import { Accordion } from '../../components/Accordion';
import { Section, WaButton, gutter } from '../../components/Section';
import { JsonLd, faqSchema } from '../../components/JsonLd';
import { BOX, BOX_FAQ, BOX_IMAGES, BOX_LINK } from '../../data/box';
import { SITE } from '../../lib/site';

export const metadata: Metadata = {
  title: `Android 14 TV Box + ${BOX.months} maanden Premium | €${BOX.price}`,
  description: `Android 14 TV Box met beeld tot 4K en HDR10, met ${BOX.months} maanden IPTV Premium, voor €${BOX.price}. Klaar voor gebruik, binnen ${BOX.deliveryDays} dagen in huis.`,
  alternates: { canonical: '/android-tv-box/' },
  openGraph: { url: '/android-tv-box/', images: [{ url: BOX_IMAGES[0].src, width: 1200, height: 1200 }] },
};

const POINTS = [
  `${BOX.months} maanden IPTV Premium zit erbij`,
  'Android 14',
  'Beeld tot 4K Ultra HD, met HDR10',
  '80.000+ zenders en 200.000+ films en series',
  'Aansluiten via HDMI, internet via wifi of netwerkkabel',
  'Hulp bij het instellen via WhatsApp',
];

export default function Page() {
  return (
    <>
      <JsonLd data={[
        {
          '@context': 'https://schema.org', '@type': 'Product', name: `Android 14 TV Box + ${BOX.months} maanden IPTV Premium`,
          image: BOX_IMAGES.map((i) => `${SITE}${i.src}`), description: `Android 14 TV Box met beeld tot 4K en HDR10, met ${BOX.months} maanden IPTV Premium.`,
          offers: { '@type': 'Offer', price: BOX.price.toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: `${SITE}/android-tv-box/` },
        },
        faqSchema(BOX_FAQ),
      ]} />
      <PageHero path="/android-tv-box/" crumb="TV Box" title={<>Android TV Box met {BOX.months} maanden Premium</>}
        intro="Heeft je tv geen apps, of wil je gewoon aanzetten en kijken? Eén kastje, één bedrag, en een jaar Premium erbij." />

      <section className="pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start" style={gutter}>
          <BoxGallery />
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[28px] bg-night text-white p-6">
              <p className="eyebrow text-volt-soft">Prijs</p>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-display font-semibold tracking-[-0.05em] text-[80px] leading-none text-white">€{BOX.price}</span>
                {BOX.oldPrice && <s className="text-2xl text-moon">€{BOX.oldPrice}</s>}
              </div>
              <p className="mt-2 text-[16px] text-moon">★ {BOX.rating} · {BOX.customers} tevreden klanten · één keer betalen</p>
            </div>
            <ul className="space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-[17px] text-ink">
                  <span className="w-6 h-6 rounded-full bg-volt text-white flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 stroke-[3]" /></span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="flex items-start gap-3 p-4 rounded-[20px] panel text-[16px] text-ink">
              <Truck className="w-6 h-6 shrink-0 text-volt" />
              <DeliveryDate />
            </p>
            <WaButton href={BOX_LINK} label="Bestel het kastje via WhatsApp" track="BOX-hero" className="w-full" />
            <p className="text-[15px] text-mist">Heb je al een Smart TV of een stick? Dan is een <Link href="/iptv-abonnement/" className="link">abonnement</Link> genoeg.</p>
          </div>
        </div>
      </section>

      <Section tone="white" title="Uit de doos, op de tv">
        <ol className="grid md:grid-cols-3 gap-3">
          {['Bestellen en betalen gaat in WhatsApp.', `Binnen ${BOX.deliveryDays} dagen wordt het kastje bij je bezorgd.`, 'HDMI-kabel in de tv, internet aansluiten, aanzetten. Vragen? Stuur een bericht.'].map((t, k) => (
            <li key={t} className="panel p-6 rounded-[26px]">
              <span className="w-[52px] h-[52px] rounded-full bg-ink text-white font-display font-semibold text-[22px] flex items-center justify-center">{k + 1}</span>
              <p className="mt-4 text-[17px] text-ink">{t}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Vragen over het kastje">
        <div className="max-w-3xl space-y-8">
          <Accordion items={BOX_FAQ} />
          <WaButton href={BOX_LINK} label="Bestel het kastje via WhatsApp" track="BOX-cta" className="w-full" />
        </div>
      </Section>
    </>
  );
}
