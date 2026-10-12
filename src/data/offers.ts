export interface Offer {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  savings: number;
  promoCode: string;
  endDate: string; // ISO date format for countdown
  featuredProductSlug: string;
  inStock: boolean;
  giftsIncluded: string[];
}

export const EXCLUSIVE_OFFERS: Offer[] = [
  {
    id: "offre-ramadan-prestige",
    badge: "Offre Spéciale Saisonnière",
    title: "Coffret Terroir & Cuillère d'Olivier Offerte",
    subtitle: "Dégustation Royale des 3 Grands Crus du Maroc",
    description: "Profitez de 40 DH de réduction sur le coffret 3 miels (Daghmouss, Thym, Oranger) accompagné de sa cuillère en bois d'olivier sculptée main offerte et de la livraison express sans frais.",
    originalPrice: 330,
    discountPrice: 290,
    savings: 40,
    promoCode: "TERROIR40",
    endDate: "2026-10-31T23:59:59",
    featuredProductSlug: "coffret-decouverte-3-miels",
    inStock: true,
    giftsIncluded: [
      "Cuillère à miel en bois d'olivier véritable (valeur 45 DH)",
      "Livraison offerte à domicile",
      "Écrin cadeau vert émeraude et dorures à chaud"
    ]
  },
  {
    id: "duo-matin-gourmand",
    badge: "Duo Énergie & Bien-Être",
    title: "Duo Amlou Traditionnel 350g + Miel d'Oranger 400g",
    subtitle: "Le Rituel Petit-Déjeuner Authentique",
    description: "Le mariage gourmand par excellence : la richesse de l'amande beldi et de l'argan combinée à la douceur parfumée des orangers de Taroudant.",
    originalPrice: 270,
    discountPrice: 225,
    savings: 45,
    promoCode: "DUOAMANDES",
    endDate: "2026-10-25T23:59:59",
    featuredProductSlug: "amlou-aux-amandes-traditionnel",
    inStock: true,
    giftsIncluded: [
      "Économie immédiate de 45 DH",
      "Guide des recettes traditionnelles du terroir marocain (PDF)"
    ]
  },
  {
    id: "pack-immunite-daghmouss-thym",
    badge: "Bouclier Immunitaire Hivernal",
    title: "Duo Miels Puissants : Daghmouss + Thym Sauvage",
    subtitle: "Les Deux Récoltes aux Vertus Respiratoires Reconnues",
    description: "Deux pots de 400g de miels sauvages récoltés en altitude et dans le désert, reconnus pour réchauffer le corps et protéger la gorge.",
    originalPrice: 440,
    discountPrice: 385,
    savings: 55,
    promoCode: "BOUCLIER55",
    endDate: "2026-11-15T23:59:59",
    featuredProductSlug: "miel-daghmouss-ait-baamrane",
    inStock: true,
    giftsIncluded: [
      "Livraison express gratuite",
      "Échantillon découverte Pollen de fleurs 50g offert"
    ]
  }
];
