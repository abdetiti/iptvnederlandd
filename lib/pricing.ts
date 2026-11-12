import { waLink } from './site';

export type DurationMonths = 3 | 6 | 12;
export type DeviceCount = 1 | 2 | 3 | 4;
export type PlanTier = 'Standard' | 'Premium';

// Mêmes prix que sur tout le réseau (etat-site-iptv8k.md).
export const PRICES: Record<PlanTier, Record<DeviceCount, Record<DurationMonths, number>>> = {
  Standard: {
    1: { 3: 25.99, 6: 35.99, 12: 58.99 },
    2: { 3: 46.99, 6: 64.99, 12: 106.99 },
    3: { 3: 62.99, 6: 86.99, 12: 141.99 },
    4: { 3: 72.99, 6: 100.99, 12: 165.99 },
  },
  Premium: {
    1: { 3: 35.99, 6: 45.99, 12: 79.99 },
    2: { 3: 64.99, 6: 82.99, 12: 143.99 },
    3: { 3: 86.99, 6: 110.99, 12: 191.99 },
    4: { 3: 100.99, 6: 128.99, 12: 223.99 },
  },
};

// Actie : 12 mois + 3 mois gratuits. Mettre bonusMonths à 0 pour l'arrêter.
export const PROMO = { months: 12 as DurationMonths, bonusMonths: 3 };
export const promoActive = (m: DurationMonths) => PROMO.bonusMonths > 0 && m === PROMO.months;

export const PACKAGE_CONTENT: Record<PlanTier, { zenders: string; vod: string; extra?: string }> = {
  Standard: { zenders: '50.000+ zenders', vod: '140.000+ films en series' },
  Premium: {
    zenders: '80.000+ zenders',
    vod: '200.000+ films en series',
    extra: 'Krachtigere server dan Standard',
  },
};

// Détail des packs : uniquement des points confirmés sur le réseau (règle d'or n°1).
export const PACKAGE_FEATURES: Record<PlanTier, { title: string; items: string[] }[]> = {
  Premium: [
    { title: 'Aanbod', items: ['80.000+ zenders', '200.000+ films en series', 'Nederlandse zenders en internationale tv', 'Live sport: voetbal, Formule 1 en meer', 'Familie, kinderen en nieuws'] },
    { title: 'Kwaliteit', items: ['Krachtigere Premium-server', 'Beeld in SD, HD, Full HD en 4K', 'Programmagids (EPG)'] },
    { title: 'Service', items: ['Direct actief na je betaling', 'Hulp 24/7 in het Nederlands via WhatsApp', 'Installatiehulp op jouw apparaat', 'Werkt op Smart TV, box, Fire TV Stick, telefoon en computer'] },
  ],
  Standard: [
    { title: 'Aanbod', items: ['50.000+ zenders', '140.000+ films en series', 'Nederlandse zenders en internationale tv', 'Live sport: voetbal, Formule 1 en meer', 'Familie, kinderen en nieuws'] },
    { title: 'Kwaliteit', items: ['Beeld in SD, HD, Full HD en 4K', 'Programmagids (EPG)'] },
    { title: 'Service', items: ['Direct actief na je betaling', 'Hulp 24/7 in het Nederlands via WhatsApp', 'Installatiehulp op jouw apparaat', 'Werkt op Smart TV, box, Fire TV Stick, telefoon en computer'] },
  ],
};

export const DEVICE_DISCOUNT: Record<DeviceCount, number> = { 1: 0, 2: 10, 3: 20, 4: 30 };

export const getPrice = (t: PlanTier, d: DeviceCount, m: DurationMonths) => PRICES[t][d][m];

export const formatPrice = (n: number) => `€${n.toFixed(2).replace('.', ',')}`;
export const priceDigits = (n: number) => n.toFixed(2).replace('.', ',');
export const perMonth = (n: number, m: DurationMonths) => formatPrice(n / m);

export function orderLink(t: PlanTier, m: DurationMonths, d: DeviceCount): string {
  const dev = d === 1 ? '1 apparaat' : `${d} apparaten`;
  const bonus = promoActive(m) ? ` (+${PROMO.bonusMonths} maanden gratis)` : '';
  return waLink(`Hoi, ik wil graag een IPTV-abonnement: ${t}, ${m} maanden${bonus}, ${dev}.`);
}
