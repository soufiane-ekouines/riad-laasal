export interface ProductVariant {
  id: string;
  weight: string;
  // Prix en DH. Laisser à 0 tant que le prix n'est pas fixé : le site affiche alors
  // SITE_CONFIG.pricePlaceholder ("Prix sur demande") et la commande WhatsApp reste possible.
  price: number;
  oldPrice?: number;
  inStock: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  // 'contain' pour les packshots sur fond blanc (produit entier visible),
  // 'cover' pour les photos d'ambiance (cadrage plein).
  fit: 'cover' | 'contain';
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  arabicName: string;
  category: 'miel' | 'pate-a-tartiner' | 'packs' | 'limited';
  tagline: string;
  origin: string;
  colorTone: string;
  image: string;
  imageAlt: string;
  imageFit: ProductImage['fit'];
  // Images secondaires : 1ère image affichée au survol de la carte, toutes en vignettes sur la fiche produit.
  gallery?: ProductImage[];
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  description: string;
  benefits: string[];
  tastingNotes: string[];
  ingredients: string;
  usageTips: string;
  texture: string;
  featured?: boolean;
  isLimited?: boolean;
  batchNumber?: string;
}

const IMG = '/images/products';

const GAMME_400G: ProductImage = {
  src: `${IMG}/gamme-miels-400g-thym-oranger-lavande-eucalyptus.jpg`,
  alt: "Gamme de miels Riad El Aâssal 400 g : Thym (étiquette verte), Oranger (orange), Lavande (violette) et Eucalyptus (bleu clair)",
  fit: 'contain',
};

export const PRODUCTS: Product[] = [
  {
    id: "miel-thym-errachidia",
    slug: "miel-thym-errachidia",
    name: "Miel de Thym",
    arabicName: "عسل الزعتر - الرشيدية",
    category: "miel",
    tagline: "Le grand classique médicinal du terroir marocain",
    origin: "Errachidia",
    colorTone: "from-amber-700 to-amber-900",
    image: `${IMG}/miel-thym-errachidia-400g.jpg`,
    imageAlt: "Pot de Miel de Thym Riad El Aâssal 400 g, étiquette verte, origine Errachidia",
    imageFit: 'cover',
    gallery: [GAMME_400G],
    rating: 4.96,
    reviewCount: 164,
    variants: [
      { id: "thym-400", weight: "400g", price: 0, inStock: true },
    ],
    description: "Issu des fleurs de thym sauvage des reliefs d'Errachidia. Sa saveur est puissante, herbacée et aromatique. Réputé depuis des millénaires dans la pharmacopée marocaine pour son action antiseptique.",
    benefits: [
      "Antiseptique naturel pour la sphère respiratoire",
      "Action tonique générale contre les coups de froid",
      "Confort digestif et intestinal"
    ],
    tastingNotes: ["Herbacé intense et camphré", "Notes de garrigue et de résine", "Longueur en bouche aromatique"],
    ingredients: "100% miel pur de thym, origine Maroc.",
    usageTips: "Parfait le matin à jeun ou dilué dans du jus de citron pressé tiède.",
    texture: "Onctueux et consistant, teinte cuivrée.",
    featured: true,
  },
  {
    id: "miel-oranger-taroudant",
    slug: "miel-oranger-taroudant",
    name: "Miel d'Oranger",
    arabicName: "عسل البرتقال - تارودانت",
    category: "miel",
    tagline: "Douceur printanière apaisante aux arômes fruités d'agrumes",
    origin: "Taroudant",
    colorTone: "from-amber-400 to-amber-600",
    image: `${IMG}/miel-oranger-taroudant-400g.jpg`,
    imageAlt: "Pot de Miel d'Oranger Riad El Aâssal 400 g, étiquette orange, origine Taroudant",
    imageFit: 'cover',
    gallery: [GAMME_400G],
    rating: 4.90,
    reviewCount: 112,
    variants: [
      { id: "ora-400", weight: "400g", price: 0, inStock: true },
    ],
    description: "Récolté lors de la floraison printanière des vergers d'orangers de la vallée de Taroudant. Ce miel lumineux exhale une fragrance florale subtile et rafraîchissante très appréciée de toute la famille, notamment des enfants pour sa douceur veloutée.",
    benefits: [
      "Propriétés apaisantes et relaxantes pour favoriser l'endormissement",
      "Facilite la digestion après les repas",
      "Sublime les tisanes du soir sans masquer leurs parfums"
    ],
    tastingNotes: ["Arôme d'agrumes délicat", "Attaque fruitée très fraîche", "Texture fondante sur le palais"],
    ingredients: "100% miel pur de fleurs d'oranger, origine Maroc.",
    usageTips: "Une cuillère dans une infusion de verveine ou de camomille 30 minutes avant de dormir.",
    texture: "Fluide et limpide au départ, fine cristallisation claire avec le temps.",
    featured: true,
  },
  {
    id: "miel-lavande-oulmes",
    slug: "miel-lavande-oulmes",
    name: "Miel de Lavande",
    arabicName: "عسل الخزامى - أولماس",
    category: "miel",
    tagline: "Élégance florale des plateaux d'Oulmès",
    origin: "Oulmès",
    colorTone: "from-purple-900 to-amber-700",
    image: `${IMG}/miel-lavande-oulmes-400g.jpg`,
    imageAlt: "Pot de Miel de Lavande Riad El Aâssal 400 g, étiquette violette, origine Oulmès",
    imageFit: 'cover',
    gallery: [GAMME_400G],
    rating: 4.88,
    reviewCount: 78,
    variants: [
      { id: "lav-400", weight: "400g", price: 0, inStock: true },
    ],
    description: "Butiné sur les collines parfumées de lavande sauvage d'Oulmès. Un miel à la robe dorée, au parfum délicatement floral et aux vertus calmantes réputées.",
    benefits: [
      "Calmant traditionnel des toux sèches",
      "Aide au relâchement des tensions nerveuses",
      "Arôme raffiné pour accompagner le thé à la menthe"
    ],
    tastingNotes: ["Floral noble", "Arrière-goût discret de lavande fraîche", "Douceur crémeuse"],
    ingredients: "100% miel pur de lavande, origine Maroc.",
    usageTips: "Dans une tasse de thé chaud ou tartiné sur une tranche de pain complet.",
    texture: "Crémeux et velouté.",
    featured: true,
  },
  {
    id: "miel-eucalyptus-gharb",
    slug: "miel-eucalyptus-gharb",
    name: "Miel d'Eucalyptus",
    arabicName: "عسل الأوكالبتوس - الغرب",
    category: "miel",
    tagline: "Fraîcheur balsamique réconfortante des forêts du Gharb",
    origin: "Gharb",
    colorTone: "from-amber-600 to-amber-800",
    image: `${IMG}/miel-eucalyptus-gharb-400g.jpg`,
    imageAlt: "Pot de Miel d'Eucalyptus Riad El Aâssal 400 g, étiquette bleu clair, origine Gharb",
    imageFit: 'cover',
    gallery: [GAMME_400G],
    rating: 4.87,
    reviewCount: 86,
    variants: [
      { id: "euc-400", weight: "400g", price: 0, inStock: true },
    ],
    description: "Issu des forêts d'eucalyptus du Gharb. Sa teinte dorée cache un bouquet aromatique balsamique frais. Excellent allié de la saison hivernale.",
    benefits: [
      "Réconfortant pour les voies respiratoires",
      "Goût tonique et balsamique très agréable",
      "Excellente alternative au sucre pour les boissons chaudes"
    ],
    tastingNotes: ["Note de tête boisée", "Fraîcheur mentholée très discrète", "Finale caramélisée"],
    ingredients: "100% miel pur d'eucalyptus, origine Maroc.",
    usageTips: "Idéal avec du citron chaud ou du thé noir.",
    texture: "Dense et doré.",
    featured: false,
  },
  {
    id: "miel-euphorbe-ouazzane",
    slug: "miel-euphorbe-ouazzane",
    name: "Miel d'Euphorbe",
    arabicName: "عسل الزكوم - وزان",
    category: "miel",
    tagline: "Caractère sauvage et piquant des collines de Ouazzane",
    origin: "Ouazzane",
    colorTone: "from-emerald-900 to-amber-800",
    image: `${IMG}/miel-euphorbe-ouazzane-400g.jpg`,
    imageAlt: "Pot de Miel d'Euphorbe Riad El Aâssal 400 g, étiquette vert clair, origine Ouazzane, posé à côté d'un rayon de miel",
    imageFit: 'cover',
    rating: 4.94,
    reviewCount: 73,
    variants: [
      { id: "euph-400", weight: "400g", price: 0, inStock: true },
    ],
    description: "Ce miel d'euphorbe (zakkoum) récolté sur les hauteurs de Ouazzane se caractérise par sa robe foncée cuivrée et sa chaleur puissante en gorge. Très recherché dans le Nord pour fortifier l'organisme.",
    benefits: [
      "Action chauffante traditionnelle",
      "Tonifiant naturel",
      "Allié traditionnel contre les toux persistantes"
    ],
    tastingNotes: ["Herbacé piquant", "Saveur résineuse intense", "Chaleur vive et persistante"],
    ingredients: "100% miel pur d'euphorbe, origine Maroc.",
    usageTips: "Une cuillère le soir ou dans une tisane chaude de thym.",
    texture: "Épais et velouté.",
    featured: false,
  },
  {
    id: "miel-daghmouss-ait-baamrane",
    slug: "miel-daghmouss-ait-baamrane",
    name: "Miel de Daghmouss",
    arabicName: "عسل الدغموس - آيت باعمران",
    category: "miel",
    tagline: "La chaleur légendaire du Sud marocain aux vertus tonifiantes",
    origin: "Aït Baâmrane",
    colorTone: "from-amber-900 to-amber-700",
    image: `${IMG}/miel-daghmouss-ait-baamrane-400g-4x5.jpg`,
    imageAlt: "Pot de Miel de Daghmouss Riad El Aâssal 400 g, étiquette gris taupe, origine Aït Baâmrane",
    imageFit: 'cover',
    rating: 4.95,
    reviewCount: 148,
    variants: [
      { id: "dagh-400", weight: "400g", price: 0, inStock: true },
    ],
    description: "Le Miel de Daghmouss (euphorbe résinifère) est l'un des joyaux les plus réputés du patrimoine apicole marocain. Récolté dans les paysages sauvages d'Aït Baâmrane, il se distingue par sa robe ambrée foncée et sa sensation piquante caractéristique au fond de la gorge.",
    benefits: [
      "Apaise traditionnellement les maux de gorge",
      "Soutient les défenses naturelles",
      "Revitalisant contre la fatigue physique"
    ],
    tastingNotes: ["Note de tête florale douce", "Chaleur piquante progressive en gorge", "Finale boisée et persistante"],
    ingredients: "100% miel pur de daghmouss, origine Maroc.",
    usageTips: "Une cuillère à jeun le matin dans un verre d'eau tiède ou une infusion, ou pur pour apaiser la gorge.",
    texture: "Onctueux et dense, cristallisation fine naturelle dans le temps.",
    featured: true,
  },
  {
    id: "miel-jujubier-adarouch",
    slug: "miel-jujubier-adarouch",
    name: "Miel de Jujubier",
    arabicName: "عسل السدر الجبلي - أداروش",
    category: "miel",
    tagline: "Le miel des connaisseurs : prestige et pureté",
    origin: "Adarouch",
    colorTone: "from-amber-800 to-yellow-800",
    image: `${IMG}/miel-jujubier-adarouch-250g-4x5.jpg`,
    imageAlt: "Pot de Miel de Jujubier Riad El Aâssal 250 g, étiquette rouge orangé, origine Adarouch",
    imageFit: 'cover',
    rating: 4.99,
    reviewCount: 92,
    variants: [
      { id: "sidr-250", weight: "250g", price: 0, inStock: true },
    ],
    description: "Le Miel de Jujubier (sidr de montagne) récolté à Adarouch est un trésor rare du Moyen Atlas. Il offre un goût unique aux nuances de caramel boisé et de noisette.",
    benefits: [
      "Richesse minérale reconnue",
      "Soutient le rétablissement lors des convalescences",
      "Bien-être digestif"
    ],
    tastingNotes: ["Saveur riche aux nuances de caramel", "Plein en bouche sans acidité", "Longueur envoûtante"],
    ingredients: "100% miel pur de jujubier, origine Maroc.",
    usageTips: "Une cuillère le matin à jeun pour une cure régénérante.",
    texture: "Épais, sirupeux, cristallise très lentement.",
    featured: true,
  },
  {
    id: "pollen-fleurs",
    slug: "pollen-fleurs",
    name: "Pollen de Fleurs",
    arabicName: "حبوب اللقاح",
    category: "miel",
    tagline: "Le super-aliment naturel de la ruche pour vitalité et tonus",
    origin: "Maroc",
    colorTone: "from-yellow-500 to-amber-600",
    image: `${IMG}/pollen-de-fleurs-200g-4x5.jpg`,
    imageAlt: "Pot de Pollen de fleurs Riad El Aâssal 200 g, étiquette dorée",
    imageFit: 'cover',
    rating: 4.93,
    reviewCount: 65,
    variants: [
      { id: "pol-200", weight: "200g", price: 0, inStock: true },
    ],
    description: "Pollen d'abeilles récolté à l'entrée des ruches dans les zones florales du Maroc. Un concentré naturel de vitamines, enzymes et protéines végétales.",
    benefits: [
      "Revitalisant global riche en acides aminés",
      "Soutient la vitalité quotidienne",
      "Idéal pour les sportifs et les périodes de fatigue"
    ],
    tastingNotes: ["Grains croquants aux notes florales et miellées"],
    ingredients: "100% pollen de fleurs, origine Maroc.",
    usageTips: "Une cuillère à soupe saupoudrée chaque matin sur un yaourt, un smoothie ou dans du miel.",
    texture: "Petits grains dorés et multicolores croquants.",
    featured: false,
  },
  {
    id: "amlou-aux-amandes-traditionnel",
    slug: "amlou-aux-amandes-traditionnel",
    name: "Amlou aux Amandes",
    arabicName: "أملو باللوز - وصفة تقليدية",
    category: "pate-a-tartiner",
    tagline: "La pâte à tartiner berbère, recette traditionnelle",
    origin: "Recette traditionnelle",
    colorTone: "from-amber-800 to-yellow-900",
    image: `${IMG}/amlou-aux-amandes-350g-4x5.jpg`,
    imageAlt: "Pot d'Amlou aux Amandes Riad El Aâssal 350 g, recette traditionnelle, étiquette bordeaux",
    imageFit: 'cover',
    rating: 4.98,
    reviewCount: 215,
    variants: [
      { id: "amlou-350", weight: "350g", price: 0, inStock: true },
    ],
    description: "Notre Amlou aux amandes est préparé selon la recette traditionnelle du Souss : amandes torréfiées, huile d'argan et miel, pour une pâte à tartiner gourmande et authentique.",
    benefits: [
      "Concentré d'énergie naturelle",
      "Rassasiant et nutritif pour les petits-déjeuners gourmands",
      "Recette traditionnelle marocaine"
    ],
    tastingNotes: ["Saveur grillée de l'amande torréfiée", "Note soyeuse de l'argan", "Douceur miellée équilibrée"],
    ingredients: "Amandes, huile d'argan, miel (composition exacte à compléter d'après l'étiquette).",
    usageTips: "Bien mélanger avant dégustation. À savourer sur du pain chaud, des msemen ou à la cuillère.",
    texture: "Texture onctueuse avec de délicats éclats d'amandes.",
    featured: true,
  },
  {
    id: "coffret-cadeau-3-pots",
    slug: "coffret-cadeau-3-pots",
    name: "Coffret Cadeau 3 Pots",
    arabicName: "علبة هدايا - 3 برطمانات",
    category: "packs",
    tagline: "Trois miels du terroir marocain dans leur coffret vert à poignée",
    origin: "Maroc",
    colorTone: "from-emerald-900 to-amber-800",
    image: `${IMG}/coffret-cadeau-3-pots-4x5.jpg`,
    imageAlt: "Coffret cadeau Riad El Aâssal vert à poignée contenant 3 pots de miel",
    imageFit: 'cover',
    rating: 4.99,
    reviewCount: 189,
    variants: [
      { id: "coffret-3-pots", weight: "Coffret 3 pots", price: 0, inStock: true },
    ],
    description: "Présenté dans un coffret vert à poignée aux couleurs de Riad El Aâssal, ce coffret réunit trois de nos miels. Le cadeau idéal pour faire découvrir la diversité des terroirs apicoles marocains.",
    benefits: [
      "Cadeau raffiné pour les fêtes, réceptions et attentions gourmandes",
      "Permet de découvrir plusieurs terroirs apicoles marocains",
      "Coffret pratique à poignée, prêt à offrir"
    ],
    tastingNotes: ["Voyage sensoriel à travers trois miels du Maroc"],
    ingredients: "3 pots de miel pur (composition du coffret à préciser).",
    usageTips: "Idéal pour une dégustation comparative au petit-déjeuner ou à offrir.",
    texture: "Assortiment de textures.",
    featured: true,
  },
];
