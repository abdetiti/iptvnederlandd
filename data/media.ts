// Médias de www.iptvnederlandd.com (12/11/2026). Bandeau de logos comme sur les autres sites.
// ⚠️ Site Ads : si Google refuse l'annonce (« marques / streaming »), retirer <LogoMarquee /> de l'accueil (voir google-ads.md).
// Règles de l'utilisateur : pas d'image dans l'image, jamais une photo agrandie au-delà de sa taille réelle.
// Écartées : bg-apparaten / bg-familie / bg-hoe-bestellen (logos de streaming sur l'écran de la photo), bg-abonnement.
import type { Slide } from '../components/SwipeDeck';
const F = '/images/fonds';
const H = '/images/hero';

// Le carrousel « zapper » du hero
export const HERO_SLIDES: Slide[] = [
  { src: `${H}/hero-voetbal-thuis.webp`, w: 2000, h: 1601, pos: '50% 40%', alt: 'Vrienden kijken samen voetbal op de bank', title: 'Samen kijken', text: 'Live sport, films en series op je eigen tv.' },
  { src: `${F}/bg-formule-1.webp`, w: 736, h: 1308, pos: '50% 35%', alt: 'Formule 1-auto’s in een bocht, van bovenaf gezien', title: 'Formule 1 en meer', text: 'Voetbal, Formule 1 en andere live sport.' },
  { src: `${H}/hero-stadion.webp`, w: 1100, h: 733, pos: '50% 80%', alt: 'Vol voetbalstadion bij avondlicht', title: 'Grote wedstrijden', text: 'Premium draait op een krachtigere server.' },
  { src: `${F}/bg-bioscoop.webp`, w: 1000, h: 667, pos: '50% 60%', alt: 'Bioscoopzaal met rode stoelen', title: 'Films en series', text: 'Tot 200.000+ films en series op aanvraag.' },
];

export const PAYMENT_LOGOS = [
  { name: 'iDEAL', src: '/images/logos/paiement/ideal.svg' },
  { name: 'PayPal', src: '/images/logos/paiement/paypal.svg' },
  { name: 'Visa', src: '/images/logos/paiement/visa.svg' },
  { name: 'Mastercard', src: '/images/logos/paiement/mastercard.svg' },
  { name: 'Apple Pay', src: '/images/logos/paiement/apple-pay.svg' },
];

// Logos officiels (fichiers du réseau, jamais redessinés). Netflix : logo officiel posé sur fond noir.
export const PLATFORMS: { src?: string; svg?: string; alt: string }[] = [
  { svg: '/images/logos/plateformes/netflix-couleur.svg', alt: 'Netflix' },
  { src: '/images/plateformes/disney-plus.webp', alt: 'Disney+' },
  { src: '/images/plateformes/hbo-max.webp', alt: 'HBO Max' },
  { src: '/images/plateformes/prime-video.webp', alt: 'Prime Video' },
  { src: '/images/plateformes/apple-tv-plus.webp', alt: 'Apple TV+' },
  { src: '/images/plateformes/paramount-plus.webp', alt: 'Paramount+' },
  { src: '/images/plateformes/peacock.webp', alt: 'Peacock' },
  { src: '/images/plateformes/hulu.webp', alt: 'Hulu' },
  { src: '/images/plateformes/pluto-tv.webp', alt: 'Pluto TV' },
];

export const COMPETITIONS = [
  { src: '/images/sport-competitions/comp-eredivisie.webp', alt: 'Eredivisie' },
  { src: '/images/sport-competitions/comp-champions-league.webp', alt: 'UEFA Champions League' },
  { src: '/images/sport-competitions/comp-premier-league.webp', alt: 'Premier League' },
  { src: '/images/sport-competitions/comp-formule-1.webp', alt: 'Formule 1' },
  { src: '/images/sport-competitions/comp-la-liga.webp', alt: 'LaLiga' },
  { src: '/images/sport-competitions/comp-serie-a.webp', alt: 'Serie A' },
  { src: '/images/sport-competitions/comp-bundesliga.webp', alt: 'Bundesliga' },
  { src: '/images/sport-competitions/comp-ligue-1.webp', alt: 'Ligue 1' },
  { src: '/images/sport-competitions/comp-conference-league.webp', alt: 'UEFA Conference League' },
];

export const ILLUSTRATION_NOTE =
  'Afbeeldingen zijn ter illustratie; losse abonnementen op de getoonde streamingdiensten zijn niet inbegrepen.';
