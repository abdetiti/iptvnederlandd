import Link from 'next/link';
import React from 'react';
import { Logo } from './Logo';
import { PAYMENT_LOGOS } from '../data/media';
import { BOX } from '../data/box';
import { WA_HELLO, DOMAIN } from '../lib/site';

const MAIN: [string, string][] = [
  ['/iptv-abonnement/', 'IPTV abonnement en prijzen'],
  ['/iptv-kopen/', 'IPTV kopen'],
  ['/goed-iptv/', 'Goed IPTV kiezen'],
  ['/bestellen/', 'Hoe bestellen'],
  ['/iptv-installeren/', 'IPTV installeren'],
  ['/android-tv-box/', 'Android TV Box'],
  ['/faq/', 'Veelgestelde vragen'],
  ['/over-ons/', 'Over ons'],
  ['/contact/', 'Contact'],
];
const LEGAL: [string, string][] = [
  ['/algemene-voorwaarden/', 'Algemene voorwaarden'],
  ['/privacybeleid/', 'Privacybeleid'],
  ['/cookiebeleid/', 'Cookiebeleid'],
  ['/retourbeleid/', 'Retourbeleid'],
  ['/disclaimer/', 'Disclaimer'],
];

export function Footer() {
  return (
    <footer className="bg-night text-white on-night pb-wa lg:pb-0">
      <div className="max-w-6xl mx-auto pt-12 pb-14 space-y-10" style={{ paddingLeft: 'max(18px, env(safe-area-inset-left, 0px))', paddingRight: 'max(18px, env(safe-area-inset-right, 0px))' }}>
        {/* Coin box (présent sur toutes les pages du réseau) */}
        <Link href="/android-tv-box/" className="group flex items-center gap-4 p-4 sm:p-5 rounded-[28px] bg-night-2 hover:bg-[#1d2033] transition-colors">
          <img src="/images/android-tv-box/box-en-afstandsbediening-thumb.webp" alt="Android 14 TV Box" width={72} height={72} className="w-[72px] h-[72px] rounded-2xl object-cover bg-white" loading="lazy" />
          <span className="flex-1 min-w-0">
            <span className="block text-[18px] font-semibold leading-tight text-white">Android TV Box met {BOX.months} maanden Premium</span>
            <span className="block text-[15px] text-moon">Klaar voor gebruik, binnen {BOX.deliveryDays} dagen in huis, €{BOX.price}</span>
          </span>
        </Link>

        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo size="lg" night />
            <p className="text-[15px] text-moon max-w-sm">IPTV kopen in Nederland, zonder gedoe. Bestellen, betalen en hulp bij het instellen gaan via WhatsApp, in het Nederlands, dag en nacht.</p>
            <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" data-ref="footer" className="btn-wa inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold">
              <img src="/images/logos/whatsapp/whatsapp-blanc.svg" alt="" className="w-5 h-5" />
              Stel je vraag via WhatsApp
            </a>
          </div>
          <ul className="space-y-2.5 text-[16px] text-moon">
            {MAIN.map(([href, label]) => <li key={href}><Link href={href} className="hover:text-white">{label}</Link></li>)}
          </ul>
          <ul className="space-y-2.5 text-[15px] text-moon">
            {LEGAL.map(([href, label]) => <li key={href}><Link href={href} className="hover:text-white">{label}</Link></li>)}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {PAYMENT_LOGOS.map((p) => (
            <span key={p.name} className="h-9 px-2.5 rounded-xl bg-white flex items-center">
              <img src={p.src} alt={p.name} className="h-5 w-auto" loading="lazy" />
            </span>
          ))}
        </div>
        <p className="text-sm text-moon leading-relaxed max-w-3xl">De foto’s op deze website zijn sfeerbeelden. Namen van zenders, competities, apps en apparaten zijn van hun eigenaren en worden alleen genoemd om te laten zien wat je kunt kijken en waarop.</p>
        <p className="text-sm text-moon">© {new Date().getFullYear()} {DOMAIN}. iptvnederlandd, met dubbele d. Contact alleen via WhatsApp.</p>
      </div>
    </footer>
  );
}
