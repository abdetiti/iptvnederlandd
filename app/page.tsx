import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { ArrowRight, Check, Tv, Smartphone, Monitor, Tablet, Cast, Box } from 'lucide-react';
import { Hero, SignalBadge } from '../components/home/Hero';
import { LogoMarquee } from '../components/LogoMarquee';
import { Pricing } from '../components/Pricing';
import { Accordion } from '../components/Accordion';
import { Section, WaButton, gutter } from '../components/Section';
import { Reveal, CountUp } from '../components/Reveal';
import { JsonLd, faqSchema } from '../components/JsonLd';
import { HOME_FAQ } from '../data/faq';
import { BOX, BOX_LINK } from '../data/box';
import { orderLink, PRICES, PROMO } from '../lib/pricing';
import { SITE, BRAND, WA_HELLO } from '../lib/site';

export const metadata: Metadata = {
  title: 'IPTV Nederland: goed IPTV kopen vanaf €4,92 p/m',
  description: 'IPTV Nederland: goed IPTV kopen zonder gedoe. 50.000+ zenders, films en series, tot 4K, 1 tot 4 schermen. Bestellen via WhatsApp, direct actief.',
  alternates: { canonical: '/' },
  openGraph: { url: '/', title: 'IPTV Nederland: goed IPTV kopen bij iptvnederlandd' },
};

const STATS = [
  { n: 80000, s: '+', t: 'zenders met Premium' },
  { n: 200000, s: '+', t: 'films en series met Premium' },
  { n: 4, s: 'K', t: 'beeld tot 4K, waar je apparaat het aankan' },
  { n: 24, s: '/7', t: 'hulp in het Nederlands via WhatsApp' },
];

const STEPS = [
  { t: 'Kies je pakket', d: 'Standard of Premium, 3, 6 of 12 maanden en 1 tot 4 schermen. De totaalprijs zie je meteen.' },
  { t: 'Stuur het bericht', d: 'Tik op de groene knop. WhatsApp opent met je keuze erin; jij tikt alleen op verzenden.' },
  { t: 'Betaal en kijk', d: 'Je krijgt een veilige betaallink. Meteen daarna staan je gegevens en de stappen in het gesprek.' },
];

const GOOD = [
  { t: 'Een duidelijke totaalprijs', d: 'Wat op de kaart staat, betaal je. Eén keer, voor de hele looptijd.' },
  { t: 'Direct actief', d: 'Geen dagen wachten: je gegevens komen meteen na je betaling binnen.' },
  { t: 'Een mens die helpt', d: 'Hulp in het Nederlands via WhatsApp, dag en nacht, ook na je bestelling.' },
  { t: 'Werkt op je eigen apparaten', d: 'Smart TV, Android TV, Fire TV Stick, telefoon, tablet en computer.' },
  { t: 'Een programmagids', d: 'Met de EPG zie je wat er nu en straks op elke zender is.' },
  { t: 'Een krachtige server', d: 'Premium draait op een krachtigere server dan Standard, voor drukke avonden.' },
];

const DEVICES = [
  { i: Tv, t: 'Smart TV' },
  { i: Cast, t: 'Fire TV Stick' },
  { i: Box, t: 'Android TV en kastjes' },
  { i: Smartphone, t: 'iPhone en Android' },
  { i: Tablet, t: 'iPad en tablets' },
  { i: Monitor, t: 'Windows en Mac' },
];

export default function Home() {
  return (
    <>
      <JsonLd data={[
        { '@context': 'https://schema.org', '@type': 'Organization', name: BRAND, url: `${SITE}/`, logo: `${SITE}/icon-512.png` },
        { '@context': 'https://schema.org', '@type': 'WebSite', name: BRAND, url: `${SITE}/`, inLanguage: 'nl-NL' },
        faqSchema(HOME_FAQ),
      ]} />

      <Hero />
      <LogoMarquee />

      {/* Ce que tu reçois, en chiffres */}
      <section aria-label="In cijfers" className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3" style={gutter}>
          {STATS.map((s, k) => (
            <Reveal key={s.t} delay={k * 70} className="panel rounded-[24px] p-5 sm:p-6">
              <p className="font-display font-semibold tracking-[-0.05em] leading-none text-[clamp(28px,7.4vw,52px)] text-ink">
                <CountUp to={s.n} />{s.s}
              </p>
              <p className="mt-3 text-[15px] sm:text-[16px] text-mist leading-snug">{s.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Section id="prijzen" kicker="IPTV abonnement" title="Kies je pakket" intro={<>Twee pakketten, drie looptijden, 1 tot 4 schermen. Bij 12 maanden kijk je {PROMO.bonusMonths} maanden extra.</>} tone="white">
        <Pricing refPrefix="home" />
      </Section>

      <Section id="kopen" kicker="IPTV kopen" title="In drie stappen geregeld" intro="Geen account, geen formulier. Je koopt IPTV in een gewoon WhatsApp-gesprek.">
        <Reveal as="ol" className="relative grid md:grid-cols-3 gap-4">
          <svg aria-hidden="true" className="hidden md:block absolute left-[8%] right-[8%] top-[38px] w-[84%] h-4 overflow-visible" viewBox="0 0 100 4" preserveAspectRatio="none">
            <path className="signal-line" pathLength={1} d="M0 2 H100" stroke="#4a2df0" strokeWidth="2" strokeDasharray="1" vectorEffect="non-scaling-stroke" fill="none" />
          </svg>
          {STEPS.map((s, k) => (
            <li key={s.t} className="relative panel rounded-[26px] p-6">
              <span className="relative z-10 w-[52px] h-[52px] rounded-full bg-ink text-white font-display font-semibold text-[22px] flex items-center justify-center">{k + 1}</span>
              <h3 className="mt-5 title text-[22px] text-ink">{s.t}</h3>
              <p className="mt-2 text-[16px] text-mist">{s.d}</p>
            </li>
          ))}
        </Reveal>
        <div className="mt-8 grid sm:flex gap-3">
          <WaButton href={orderLink('Premium', 12, 1)} label="Start in WhatsApp" track="home-stappen" />
          <Link href="/iptv-kopen/" className="btn-ghost inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full text-[18px] font-bold">Meer over IPTV kopen <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </Section>

      <Section id="goed-iptv" tone="night" kicker="Goed IPTV" title="Zo herken je goed IPTV" intro="Zes dingen om op te letten voordat je koopt. Bij ons zitten ze er allemaal in.">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GOOD.map((g, k) => (
            <Reveal as="li" key={g.t} delay={k * 60} className="rounded-[24px] bg-night-2 border border-white/10 p-6">
              <span className="w-9 h-9 rounded-full bg-volt flex items-center justify-center"><Check className="w-5 h-5 text-white stroke-[3]" /></span>
              <h3 className="mt-4 title text-[21px] text-white">{g.t}</h3>
              <p className="mt-1.5 text-[16px] text-moon">{g.d}</p>
            </Reveal>
          ))}
        </ul>
        <Link href="/goed-iptv/" className="mt-8 btn-ghost inline-flex items-center gap-2 h-14 px-7 rounded-full text-[18px] font-bold">Lees hoe je goed IPTV kiest <ArrowRight className="w-5 h-5" /></Link>
      </Section>

      <Section id="apparaten" kicker="Apparaten" title="Kijk op wat je al hebt" intro="Eén abonnement, al je schermen. Met 2 tot 4 schermen kijkt iedereen in huis tegelijk.">
        <ul className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {DEVICES.map(({ i: Icon, t }) => (
            <li key={t} className="panel rounded-[22px] p-5 flex flex-col gap-4">
              <Icon className="w-7 h-7 text-volt" strokeWidth={1.8} />
              <span className="text-[16px] font-bold text-ink leading-snug">{t}</span>
            </li>
          ))}
        </ul>
        <Link href="/iptv-installeren/" className="mt-6 link inline-block text-[17px]">Zo installeer je IPTV per apparaat</Link>
      </Section>

      <Section id="box" tone="white" kicker="Nieuw" title="Liever alles in één doos?" intro={`Android 14 TV Box met ${BOX.months} maanden Premium erbij. Aansluiten op je tv en kijken.`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <img src="/images/android-tv-box/box-en-afstandsbediening.webp" alt="Android 14 TV Box met afstandsbediening" width={1200} height={1200} loading="lazy" className="w-full max-w-[520px] aspect-square object-cover rounded-[32px] border border-line bg-white" />
          <div className="space-y-5">
            <p className="flex items-baseline gap-3">
              <span className="font-display font-semibold tracking-[-0.05em] text-[72px] leading-none text-ink">€{BOX.price}</span>
              {BOX.oldPrice && <s className="text-[24px] text-mist">€{BOX.oldPrice}</s>}
            </p>
            <ul className="space-y-2.5 text-[17px] text-ink">
              {[`${BOX.months} maanden IPTV Premium inbegrepen`, 'Android 14, beeld tot 4K met HDR10', `Binnen ${BOX.deliveryDays} dagen in huis`, 'Hulp bij het instellen via WhatsApp'].map((p) => (
                <li key={p} className="flex gap-2.5"><Check className="w-5 h-5 shrink-0 mt-0.5 text-volt stroke-[2.5]" />{p}</li>
              ))}
            </ul>
            <div className="grid sm:flex gap-3">
              <WaButton href={BOX_LINK} label="Bestel het kastje" track="home-box" />
              <Link href="/android-tv-box/" className="btn-ghost inline-flex items-center justify-center h-14 px-7 rounded-full text-[18px] font-bold">Bekijk het kastje</Link>
            </div>
          </div>
        </div>
      </Section>

      <Section id="vragen" kicker="Vragen" title="Wat je wilt weten">
        <div className="max-w-3xl"><Accordion items={HOME_FAQ} /></div>
      </Section>

      <section className="pb-24 sm:pb-28">
        <div className="max-w-6xl mx-auto" style={gutter}>
          <div className="relative overflow-hidden rounded-[36px] bg-night text-white on-night px-6 py-14 sm:px-14 sm:py-20 text-center">
            <SignalBadge className="w-[84px] h-[84px] mx-auto" />
            <h2 className="mt-10 display text-[clamp(36px,9vw,64px)]">Klaar om te kijken?</h2>
            <p className="mt-4 text-[18px] text-moon max-w-xl mx-auto">Stuur ons een bericht. We helpen je kiezen, je betaalt via een veilige link en je kijkt direct. Vanaf €{PRICES.Standard[1][3].toFixed(2).replace('.', ',')} voor 3 maanden.</p>
            <div className="mt-8 grid sm:flex sm:justify-center gap-3">
              <WaButton href={orderLink('Premium', 12, 1)} label="Bestel via WhatsApp" track="home-slot" />
              <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" data-ref="home-vraag" className="btn-ghost inline-flex items-center justify-center h-14 px-7 rounded-full text-[18px] font-bold">Eerst een vraag stellen</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
