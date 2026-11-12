'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const SOURCE_KEY = 'nldd_source';
const CONSENT_KEY = 'nldd_cookie_consent';

/** Retient gclid / utm_source à l'arrivée (une fois par session). */
function sourceCode(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get('gclid');
    const utm = params.get('utm_source');
    if (gclid) sessionStorage.setItem(SOURCE_KEY, `G-${gclid.slice(-6)}`);
    else if (utm) sessionStorage.setItem(SOURCE_KEY, `U-${utm.slice(0, 12)}`);
    return sessionStorage.getItem(SOURCE_KEY);
  } catch {
    return null;
  }
}

/**
 * Suivi de tous les liens WhatsApp du site : événement GA4 `whatsapp_click` (page + ref),
 * et code de campagne ajouté au message quand le visiteur vient d'une annonce.
 */
export function WhatsAppTracking() {
  const pathname = usePathname();

  useEffect(() => {
    sourceCode();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
      if (!a) return;
      const payload = { page: window.location.pathname, ref: a.dataset.ref || 'link' };
      // Conversion Google Ads directe (si l'étiquette du nouveau compte est renseignée dans Vercel : NEXT_PUBLIC_ADS_WA_SEND_TO = AW-…/…)
      const sendTo = process.env.NEXT_PUBLIC_ADS_WA_SEND_TO;
      if (sendTo && typeof window.gtag === 'function') window.gtag('event', 'conversion', { send_to: sendTo });
      if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', payload);
      else (window.dataLayer = window.dataLayer || []).push({ event: 'whatsapp_click', ...payload });

      const code = sourceCode();
      if (code && !a.dataset.tagged) {
        try {
          const url = new URL(a.href);
          const text = url.searchParams.get('text') || '';
          url.searchParams.set('text', `${text} [${code}]`);
          a.href = url.toString();
          a.dataset.tagged = '1';
        } catch {}
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Remonter en haut à chaque changement de page
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}

/** Bandeau cookies (Consent Mode v2 : tout est refusé tant que le visiteur n'accepte pas). */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try { consent = localStorage.getItem(CONSENT_KEY); } catch {}
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (value: 'accepted' | 'essential') => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch {}
    if (value === 'accepted') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed left-3 right-3 bottom-3 lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-[420px] z-[60] fade-in" role="dialog" aria-label="Cookievoorkeuren" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {/* Carte sombre : elle se détache bien du site blanc (leçon du 10/11) */}
      <div className="p-5 rounded-[24px] bg-night text-white shadow-[0_24px_60px_-12px_rgba(10,12,20,.55)] space-y-4">
        <p className="text-[16px] font-semibold">Cookies</p>
        <p className="-mt-2 text-[15px] leading-relaxed text-moon">
          We gebruiken cookies om de website te analyseren en onze advertenties te meten. Jij kiest of je dat toestaat. Meer in ons{' '}
          <a href="/cookiebeleid/" className="underline font-semibold text-white">cookiebeleid</a>.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => choose('accepted')} className="h-12 rounded-full bg-white text-ink text-[15px] font-semibold active:scale-[.97] transition-transform">
            Accepteren
          </button>
          <button type="button" onClick={() => choose('essential')} className="h-12 rounded-full border-[1.5px] border-white/35 text-white text-[15px] font-semibold active:scale-[.97] transition-transform">
            Alleen nodig
          </button>
        </div>
      </div>
    </div>
  );
}
