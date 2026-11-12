import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { PageHero } from '../../components/PageHero';
import { Section, WaButton } from '../../components/Section';
import { WA_HELLO } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Over iptvnederlandd (met dubbele d)',
  description: 'Wie we zijn: iptvnederlandd verkoopt IPTV-abonnementen in Nederland. Bestellen en hulp via WhatsApp, in het Nederlands.',
  alternates: { canonical: '/over-ons/' },
};

const POINTS = [
  { t: 'De dubbele d', d: 'iptvnederlandd schrijven we met twee d’s. Geen typefout: het is onze naam, en ons logo.' },
  { t: 'Kopen zonder gedoe', d: 'Geen account en geen formulier. Je kiest op de site en regelt de rest in één WhatsApp-gesprek.' },
  { t: 'Prijzen zoals ze zijn', d: 'Op elke kaart staat de totaalprijs voor de hele looptijd. Dat bedrag betaal je, één keer.' },
  { t: 'Hulp van een mens', d: 'Dag en nacht, in het Nederlands. Ook als je al lang klant bent.' },
];

export default function Page() {
  return (
    <>
      <PageHero path="/over-ons/" crumb="Over ons" title="Over iptvnederlandd"
        intro="We verkopen IPTV-abonnementen aan kijkers in heel Nederland. Snel geregeld, direct kijken, en iemand die meedenkt als je hulp nodig hebt." />
      <Section title="Waar we voor staan">
        <ul className="grid sm:grid-cols-2 gap-4 max-w-4xl">
          {POINTS.map((p) => (
            <li key={p.t} className="panel rounded-[26px] p-6">
              <h3 className="title text-[22px]">{p.t}</h3>
              <p className="mt-1.5 text-[17px] text-mist">{p.d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid sm:flex gap-3">
          <WaButton href={WA_HELLO} label="Stuur ons een bericht" track="over-ons" />
          <Link href="/iptv-abonnement/" className="btn-ghost inline-flex items-center justify-center h-14 px-7 rounded-full text-[18px] font-bold">Bekijk de prijzen</Link>
        </div>
      </Section>
    </>
  );
}
