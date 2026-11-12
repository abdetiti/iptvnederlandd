import { waLink } from '../lib/site';

// ── Réglages de l'offre box (même objet BOX que sur les autres sites du réseau) ──
export const BOX = {
  price: 200,
  oldPrice: 280 as number | null,
  months: 12,
  deliveryDays: 3,
  rating: '4,8',
  customers: '1.200+',
};

const IMG = '/images/android-tv-box';
export const BOX_IMAGES = [
  { src: `${IMG}/box-en-afstandsbediening.webp`, thumb: `${IMG}/box-en-afstandsbediening-thumb.webp`, alt: 'Android 14 TV Box met de bijgeleverde afstandsbediening' },
  { src: `${IMG}/aansluitingen-achterkant.webp`, thumb: `${IMG}/aansluitingen-achterkant-thumb.webp`, alt: 'Achterkant van de Android 14 TV Box met HDMI-, USB-, netwerk- en stroomaansluiting' },
  { src: `${IMG}/zijkant.webp`, thumb: `${IMG}/zijkant-thumb.webp`, alt: 'Zijaanzicht van de compacte Android 14 TV Box' },
  { src: `${IMG}/afstandsbediening.webp`, thumb: `${IMG}/afstandsbediening-thumb.webp`, alt: 'De afstandsbediening die bij de Android 14 TV Box hoort' },
];

export const BOX_FAQ = [
  { question: 'Wat krijg ik voor €200?', answer: `Het kastje (Android 14 TV Box), de afstandsbediening en een Premium-abonnement van ${BOX.months} maanden. Er komen geen maandkosten bij: je betaalt één bedrag.` },
  { question: 'Werkt het kastje op mijn tv?', answer: 'Ja, als je tv een HDMI-ingang heeft. Dat hebben bijna alle tv’s van de laatste vijftien jaar. Een Smart TV is niet nodig: het kastje brengt de apps zelf mee.' },
  { question: 'Kan ik 4K kijken met het kastje?', answer: 'Het kastje speelt 4K Ultra HD met HDR10 af. Daarvoor heb je ook een 4K-tv, een HDMI-kabel die 4K ondersteunt en een stabiele internetverbinding nodig.' },
  { question: 'Hoe snel is het kastje er?', answer: `We leveren binnen ${BOX.deliveryDays} dagen na je bestelling, overal in Nederland. Je bestelt en betaalt via WhatsApp.` },
];

export const BOX_LINK = waLink(`Hoi, ik wil graag de Android 14 TV Box met ${BOX.months} maanden Premium bestellen (€${BOX.price}).`);
