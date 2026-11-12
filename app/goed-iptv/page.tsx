import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { Check, X } from 'lucide-react';
import { PageHero } from '../../components/PageHero';
import { Section, WaButton } from '../../components/Section';
import { Reveal } from '../../components/Reveal';
import { JsonLd } from '../../components/JsonLd';
import { orderLink } from '../../lib/pricing';
import { SITE } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Goed IPTV kiezen: hier let je op (checklist)',
  description: 'Goed IPTV herken je aan een stabiele server, een duidelijke prijs, hulp in het Nederlands en direct activeren. Een checklist voordat je koopt.',
  alternates: { canonical: '/goed-iptv/' },
  openGraph: { url: '/goed-iptv/', title: 'Goed IPTV kiezen: de checklist' },
};

const CHECKS = [
  { t: 'Een stabiele server', d: 'Bij goed IPTV blijft het beeld rustig, ook als veel mensen tegelijk kijken. Vraag welke server je krijgt: bij ons draait Premium op een krachtigere server dan Standard.' },
  { t: 'Een totaalprijs die klopt', d: 'Je wilt vooraf weten wat je betaalt voor de hele looptijd, zonder verrassingen achteraf. Kijk of de prijs per maand of voor de hele periode is.' },
  { t: 'Hulp van een mens, in je eigen taal', d: 'Bijna iedereen heeft wel eens een vraag bij het instellen. Een dienst zonder bereikbare hulp is geen goede dienst.' },
  { t: 'Direct kunnen kijken', d: 'Na je betaling hoort het snel te werken. Bij ons komen je gegevens meteen binnen.' },
  { t: 'Werkt op je eigen apparaten', d: 'Smart TV, stick, kastje, telefoon of computer: controleer of jouw apparaat erbij staat, en of er hulp is bij het installeren.' },
  { t: 'Een programmagids', d: 'Met een EPG zie je wat er nu en straks is. Zonder gids zap je in het blinde.' },
  { t: 'Veilig betalen', d: 'Betaal via een bekende, beveiligde betaalmethode. Wij werken met iDEAL, PayPal, Visa, Mastercard en Apple Pay.' },
];

const FLAGS = [
  'Geen prijs op de site, alleen “vraag naar de prijs”',
  'Beloftes als “alle zenders van de wereld” of “onbeperkt”',
  'Geen manier om iemand te spreken voor of na je aankoop',
  'Betalen op een manier die je niet kent',
];

export default function Page() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: 'Goed IPTV kiezen: hier let je op', inLanguage: 'nl-NL', url: `${SITE}/goed-iptv/`, author: { '@type': 'Organization', name: 'iptvnederlandd' } }} />
      <PageHero path="/goed-iptv/" crumb="Goed IPTV" title="Goed IPTV kiezen: hier let je op"
        intro="Het aanbod is groot en de verschillen zijn niet altijd te zien. Met deze checklist herken je goed IPTV voordat je betaalt." />

      <Section kicker="Checklist" title="Zeven dingen die goed IPTV heeft">
        <ol className="grid md:grid-cols-2 gap-4">
          {CHECKS.map((c, k) => (
            <Reveal as="li" key={c.t} delay={(k % 2) * 80} className="panel rounded-[26px] p-6">
              <p className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-volt flex items-center justify-center shrink-0"><Check className="w-5 h-5 text-white stroke-[3]" /></span>
                <span className="eyebrow text-mist">Punt {k + 1}</span>
              </p>
              <h2 className="mt-4 title text-[23px] text-ink">{c.t}</h2>
              <p className="mt-2 text-[16px] text-mist">{c.d}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="night" kicker="Let op" title="Hier haak je beter af">
        <ul className="grid sm:grid-cols-2 gap-3 max-w-4xl">
          {FLAGS.map((f) => (
            <li key={f} className="flex gap-3 rounded-[22px] bg-night-2 border border-white/10 p-5 text-[17px] text-white">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0"><X className="w-4 h-4 text-volt-soft stroke-[3]" /></span>{f}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Zo doen wij het" intro="Geen kleine lettertjes: de totaalprijs staat op de site, je kijkt direct na je betaling en je spreekt een mens via WhatsApp.">
        <div className="grid sm:flex gap-3">
          <WaButton href={orderLink('Premium', 12, 1)} label="Bestel via WhatsApp" track="goed-iptv" />
          <Link href="/iptv-abonnement/" className="btn-ghost inline-flex items-center justify-center h-14 px-7 rounded-full text-[18px] font-bold">Bekijk de prijzen</Link>
        </div>
      </Section>
    </>
  );
}
