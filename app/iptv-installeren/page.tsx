import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { PageHero } from '../../components/PageHero';
import { Section, WaButton, gutter } from '../../components/Section';
import { JsonLd } from '../../components/JsonLd';
import { WA_HELLO, SITE } from '../../lib/site';

export const metadata: Metadata = {
  title: 'IPTV installeren: stappen per apparaat | iptvnederlandd',
  description: 'IPTV installeren op Smart TV, Android TV, Fire TV Stick, iPhone, Android, Windows en Mac. Drie stappen, en hulp via WhatsApp als het niet lukt.',
  alternates: { canonical: '/iptv-installeren/' },
  openGraph: { url: '/iptv-installeren/', title: 'IPTV installeren per apparaat' },
};

const BASE = [
  { t: 'Zet een IPTV-app klaar', d: 'Je haalt hem uit de appwinkel van je apparaat. Niet zeker welke? Zeg in WhatsApp wat je hebt, dan noemen we een app die erop werkt.' },
  { t: 'Log in met je gegevens', d: 'Die krijg je in WhatsApp na je betaling. Vraagt de app om een code of MAC-adres? Stuur een foto van het scherm, dan koppelen wij het.' },
  { t: 'Zap en kijk', d: 'De zenders en de gids laden vanzelf. Films en series staan bij het aanbod op aanvraag.' },
];

const DEVICES: { n: number; id: string; t: string; steps: string[]; tip?: string }[] = [
  {
    n: 711, id: 'smart-tv', t: 'Smart TV (Samsung, LG en andere)',
    steps: [
      'Open de appwinkel van je tv (op Samsung heet die Apps, op LG de LG Content Store).',
      'Zoek een IPTV-app, bijvoorbeeld SET IPTV of NET IPTV, en installeer hem.',
      'Open de app. Vraagt hij om een MAC-adres of een code? Stuur ons een foto van het scherm in WhatsApp.',
      'Wij koppelen je abonnement; daarna laadt de zenderlijst op je tv.',
    ],
    tip: 'Sommige tv-apps vragen na een proefperiode een eenmalige betaling aan de maker van de app. Dat staat los van je abonnement.',
  },
  {
    n: 712, id: 'android-tv', t: 'Android TV, Google TV en Android-kastjes',
    steps: [
      'Open de Google Play Store op je tv of kastje.',
      'Installeer een IPTV-player, zoals TiviMate of HotPlayer.',
      'Kies inloggen met je gegevens (of een playlist-link) en vul in wat je in WhatsApp hebt gekregen.',
      'Wacht tot de zenders en de gids geladen zijn, en kijk.',
    ],
  },
  {
    n: 713, id: 'fire-tv', t: 'Amazon Fire TV Stick',
    steps: [
      'Steek de stick in de HDMI-poort van je tv en verbind hem met je wifi.',
      'Installeer een IPTV-player via de appwinkel van de stick of via de stappen die wij je sturen.',
      'Vul je gegevens in de app in.',
      'Zet de stick zo dicht mogelijk bij je router, of gebruik een netwerkadapter voor het rustigste beeld.',
    ],
  },
  {
    n: 714, id: 'telefoon', t: 'iPhone, iPad en Android-telefoon',
    steps: [
      'Installeer een IPTV-player uit de App Store of Google Play.',
      'Vul je gegevens in.',
      'Kijk thuis via wifi of onderweg. Let op je databundel: live tv gebruikt veel data.',
    ],
  },
  {
    n: 715, id: 'computer', t: 'Windows en Mac',
    steps: [
      'Installeer een IPTV-player voor je computer, of gebruik een mediaspeler zoals VLC.',
      'Open de playlist-link of vul je gegevens in.',
      'Kies een zender. Met een netwerkkabel is het beeld het stabielst.',
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'HowTo', name: 'IPTV installeren', inLanguage: 'nl-NL', url: `${SITE}/iptv-installeren/`,
        step: BASE.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.t, text: s.d })),
      }} />
      <PageHero path="/iptv-installeren/" crumb="Installeren" title="IPTV installeren"
        intro="Drie stappen op je tv, stick, kastje, telefoon of computer. Kom je er niet uit? Stuur een bericht, we kijken mee." />

      <section className="pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto" style={gutter}>
          <ol className="grid md:grid-cols-3 gap-3">
            {BASE.map((s, k) => (
              <li key={s.t} className="panel p-6 rounded-[26px] text-ink">
                <span className="w-[52px] h-[52px] rounded-full bg-ink text-white font-display font-semibold text-[22px] flex items-center justify-center">{k + 1}</span>
                <h2 className="mt-4 title text-[22px]">{s.t}</h2>
                <p className="mt-1.5 text-[16px] text-mist">{s.d}</p>
              </li>
            ))}
          </ol>
          <nav aria-label="Kies je apparaat" className="mt-8 flex flex-wrap gap-2">
            {DEVICES.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="inline-flex items-center gap-2 h-11 px-4 rounded-full btn-ghost text-[15px] font-bold">
                {d.t.split(" (")[0]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {DEVICES.map((d) => (
        <Section key={d.id} id={d.id} title={d.t} className="py-10 sm:py-14">
          <ol className="max-w-3xl space-y-3">
            {d.steps.map((s, k) => (
              <li key={s} className="flex gap-4 p-4 rounded-[20px] panel">
                <span className="font-display font-semibold shrink-0 w-10 h-10 rounded-full bg-volt-tint text-volt text-[18px] leading-none flex items-center justify-center">{k + 1}</span>
                <span className="text-[17px] text-ink pt-1.5">{s}</span>
              </li>
            ))}
          </ol>
          {d.tip && <p className="mt-4 max-w-3xl text-[15px] text-mist">{d.tip}</p>}
        </Section>
      ))}

      <Section id="hulp" tone="night" title="Lukt het niet? Wij helpen" intro="Stuur een foto van je scherm en zeg welk apparaat je hebt. We antwoorden dag en nacht, in het Nederlands.">
        <div className="grid sm:flex gap-3">
          <WaButton href={WA_HELLO} label="Vraag hulp via WhatsApp" track="installeren-hulp" />
          <Link href="/android-tv-box/" className="inline-flex items-center justify-center h-14 px-7 rounded-full btn-ghost text-lg font-bold">Liever kant-en-klaar? Het kastje</Link>
        </div>
      </Section>
    </>
  );
}
