import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@fontsource-variable/sora';
import '@fontsource-variable/manrope';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppBar } from '../components/WhatsAppBar';
import { WhatsAppTracking, CookieBanner } from '../components/SiteScripts';
import { Intro } from '../components/Intro';
import { SITE } from '../lib/site';

// GA4 / Google Ads / Search Console : à renseigner dans Vercel (variables d'environnement).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
// Balise Google Ads du compte de ce site : à renseigner dans Vercel (NEXT_PUBLIC_ADS_ID = AW-…) quand l'utilisateur l'envoie.
const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID || '';
const TAG_ID = GA_ID || ADS_ID;
const GSC = process.env.NEXT_PUBLIC_GSC_VERIFICATION || '';
// Google Tag Manager, conteneur envoyé par l'utilisateur le 13/11/2026. GA4 (et les balises Ads si besoin) se règlent DANS GTM :
// ne pas remplir NEXT_PUBLIC_GA_ID dans Vercel pour ce site, sinon chaque visite est comptée deux fois.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P5K8J64D';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'IPTV Nederland: goed IPTV kopen vanaf €4,92 p/m', template: '%s' },
  description: 'IPTV kopen in Nederland: 50.000+ zenders, films en series op je tv, telefoon of pc. Bestellen via WhatsApp, direct actief na je betaling.',
  applicationName: 'iptvnederlandd',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'iptvnederlandd',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'iptvnederlandd: IPTV in Nederland' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  ...(GSC ? { verification: { google: GSC } } : {}),
};

export const viewport: Viewport = { themeColor: '#f5f6f9', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body>
        <Intro />
        <Script id="consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
          try { if (localStorage.getItem('nldd_cookie_consent') === 'accepted') { gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' }); } } catch (e) {}
        `}</Script>
        {GTM_ID && (
          // Google Tag Manager : chargé APRÈS le Consent Mode v2 ci-dessus (cookies refusés tant que le visiteur n'accepte pas).
          <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
        )}
        {GTM_ID && (
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="Google Tag Manager" /></noscript>
        )}
        {TAG_ID && (
          <>
            {/* Google tag (gtag.js) : GA4 si présent, et la balise Google Ads. Chargé après le Consent Mode v2 (tout refusé tant que le visiteur n'accepte pas). */}
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`} strategy="afterInteractive" />
            <Script id="google-tag" strategy="afterInteractive">{`gtag('js', new Date());${GA_ID ? ` gtag('config', '${GA_ID}');` : ''}${ADS_ID ? ` gtag('config', '${ADS_ID}');` : ''}`}</Script>
          </>
        )}
        <a href="#inhoud" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-white focus:rounded-lg">Naar de inhoud</a>
        <Header />
        <main id="inhoud">{children}</main>
        <Footer />
        <WhatsAppBar />
        <WhatsAppTracking />
        <CookieBanner />
      </body>
    </html>
  );
}
