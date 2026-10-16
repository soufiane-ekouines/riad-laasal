import type { ProductImage } from '../data/products';

// Packshots (fond blanc) : produit entier visible, le fond blanc se fond dans le crème via multiply.
// Photos d'ambiance : cadrage plein.
export const imageFitClass = (fit: ProductImage['fit']): string =>
  fit === 'contain' ? 'object-contain p-4 mix-blend-multiply' : 'object-cover object-center';
