// Réglages du site www.iptvnederlandd.com (site Ads, construit le 12/11/2026).
// Le double « dd » est voulu : c'est la marque (décision de l'utilisateur, 12/11/2026), pas une faute de frappe.
export const SITE = 'https://www.iptvnederlandd.com';
export const DOMAIN = 'www.iptvnederlandd.com';
export const BRAND = 'iptvnederlandd';

// Numéro WhatsApp (règle d'or n°3 : jamais affiché, seulement dans les liens wa.me).
export const WA_NUMBER = '447456060918';
// Repère propre à ce site à la fin de chaque message : un emoji + un petit texte (l'emoji peut arriver cassé, le texte non).
export const SITE_MARK = '📶';
export const SITE_TAG = '(NLDD)';

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`${message} ${SITE_TAG} ${SITE_MARK}`)}`;
}

export const WA_HELLO = waLink('Hoi, ik heb een vraag over IPTV.');
