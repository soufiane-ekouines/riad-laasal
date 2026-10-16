import { SITE_CONFIG } from '../config';

// Un prix à 0 signifie "pas encore renseigné" (voir src/data/products.ts).
export const hasPrice = (price: number | undefined): price is number =>
  typeof price === 'number' && price > 0;

export const formatPrice = (price: number | undefined): string =>
  hasPrice(price) ? `${price} ${SITE_CONFIG.currency}` : SITE_CONFIG.pricePlaceholder;

// Suffixe pour les messages WhatsApp : " à 120 DH" ou "" si le prix n'est pas défini.
export const whatsappPriceSuffix = (price: number | undefined, prefix = 'à'): string =>
  hasPrice(price) ? ` ${prefix} ${price} ${SITE_CONFIG.currency}` : '';
