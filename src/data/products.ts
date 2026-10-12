export interface ProductVariant {
  id: string;
  weight: string;
  price: number; // en DH
  oldPrice?: number;
  inStock: boolean;
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
  secondaryImage?: string;
  gallery?: string[];
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

export const PRODUCTS: Product[] = [
  {
    id: "miel-daghmouss-ait-baamrane",
    slug: "miel-daghmouss-ait-baamrane",
    name: "Miel de Daghmouss (Euphorbe)",
    arabicName: "عسل الدغموس - أيت با عمران",
    category: "miel",
    tagline: "La chaleur légendaire du Sud marocain aux vertus tonifiantes",
    origin: "Aït Baâmrane (Anti-Atlas)",
    colorTone: "from-amber-900 to-amber-700",
    image: "/images/miel-daghmouss.jpg",
    secondaryImage: "/images/ferme-apicole.jpg",
    gallery: ["/images/miel-daghmouss.jpg", "/images/ferme-apicole.jpg", "/images/miel-oranger.jpg"],
    rating: 4.95,
    reviewCount: 148,
    variants: [
      { id: "dagh-250", weight: "250g", price: 140, inStock: true },
      { id: "dagh-400", weight: "400g", price: 210, oldPrice: 230, inStock: true },
      { id: "dagh-900", weight: "900g", price: 440, inStock: true },
    ],
    description: "Le Miel de Daghmouss (Euphorbe résinifère) est l'un des joyaux les plus réputés du patrimoine apicole marocain. Récolté dans les paysages sauvages et arides d'Aït Baâmrane, il se distingue par sa robe ambrée foncée et sa sensation thermique piquante caractéristique au fond de la gorge, témoignage de sa pureté et de sa haute concentration en principes actifs.",
    benefits: [
      "Soutien des voies respiratoires et apaise les maux de gorge tenaces",
      "Stimule les défenses immunitaires naturelles",
      "Revitalisant intense pour lutter contre la fatigue physique",
      "Propriétés antibactériennes et chauffantes traditionnelles"
    ],
    tastingNotes: ["Note de tête florale douce", "Chaleur piquante progressive en gorge", "Finale boisée et persistante"],
    ingredients: "100% miel pur de Daghmouss (Euphorbia resinifera) sauvage du Maroc. Récolté à froid, non pasteurisé, sans additifs.",
    usageTips: "Une cuillère à jeun le matin dans un verre d'eau tiède ou une infusion, ou pur pour apaiser la gorge.",
    texture: "Onctueux et dense, cristallisation fine naturelle dans le temps.",
    featured: true,
  },
  {
    id: "amlou-aux-amandes-traditionnel",
    slug: "amlou-aux-amandes-traditionnel",
    name: "Amlou Artisanal aux Amandes & Argan",
    arabicName: "أملو باللوز - وصفة تقليدية",
    category: "pate-a-tartiner",
    tagline: "La pâte à tartiner berbère d'exception : amandes grillées, argan pur & miel",
    origin: "Souss-Massa & Taroudant",
    colorTone: "from-amber-800 to-yellow-900",
    image: "/images/amlou-amandes.jpg",
    secondaryImage: "/images/coffret-prestige.jpg",
    gallery: ["/images/amlou-amandes.jpg", "/images/coffret-prestige.jpg", "/images/ferme-apicole.jpg"],
    rating: 4.98,
    reviewCount: 215,
    variants: [
      { id: "amlou-350", weight: "350g", price: 110, oldPrice: 125, inStock: true },
      { id: "amlou-750", weight: "750g", price: 220, inStock: true },
    ],
    description: "Notre Amlou traditionnel est façonné selon la recette ancestrale des femmes du Souss. Préparé avec des amandes beldi doucement torréfiées à la flamme, de l'huile d'argan cosmétique alimentaire de première pression à froid et notre miel pur de fleurs d'oranger. Zéro huile de palme, zéro sucre raffiné.",
    benefits: [
      "Concentré d'énergie pure riche en vitamine E et oméga 6 & 9",
      "Rassasiant et naturellement nutritif pour les petits-déjeuners gourmands",
      "100% végétal et antioxydant grâce à l'huile d'argan authentique",
      "Sans aucun conservateur, émulsifiant ni additif"
    ],
    tastingNotes: ["Saveur grillée de l'amande torréfiée", "Note soyeuse de noisette apportée par l'argan", "Douceur miellée équilibrée"],
    ingredients: "Amandes marocaines torréfiées (55%), Huile d'Argan pure extra-vierge (25%), Miel pur naturel (20%). Rien d'autre.",
    usageTips: "Bien mélanger avant dégustation avec une cuillère propre. À savourer sur du pain chaud tafarnout, des crêpes msemen ou à la cuillère.",
    texture: "Texture semi-liquide soyeuse avec de délicats éclats d'amandes concassées.",
    featured: true,
  },
  {
    id: "miel-oranger-taroudant",
    slug: "miel-oranger-taroudant",
    name: "Miel de Fleurs d'Oranger",
    arabicName: "عسل البرتقال - تارودانت",
    category: "miel",
    tagline: "Douceur printanière apaisante aux arômes fruités d'agrumes",
    origin: "Plaines de Taroudant",
    colorTone: "from-amber-400 to-amber-600",
    image: "/images/miel-oranger.jpg",
    secondaryImage: "/images/ferme-apicole.jpg",
    gallery: ["/images/miel-oranger.jpg", "/images/ferme-apicole.jpg"],
    rating: 4.90,
    reviewCount: 112,
    variants: [
      { id: "ora-250", weight: "250g", price: 85, inStock: true },
      { id: "ora-400", weight: "400g", price: 130, oldPrice: 145, inStock: true },
      { id: "ora-900", weight: "900g", price: 270, inStock: true },
    ],
    description: "Récolté lors de la floraison printanière des vergers d'orangers dans la fertile vallée de Taroudant. Ce miel lumineux et limpide exhale une fragrance florale subtile et rafraîchissante très appréciée de toute la famille, notamment des enfants pour sa douceur veloutée.",
    benefits: [
      "Propriétés apaisantes et relaxantes pour favoriser l'endormissement",
      "Idéal pour soulager la nervosité et l'anxiété passagère",
      "Facilite la digestion après les repas",
      "Sublime les tisanes du soir sans masquer leurs parfums"
    ],
    tastingNotes: ["Arôme d'agrumes délicat", "Attaque fruitée très fraîche", "Texture fondante sur le palais"],
    ingredients: "100% miel pur de fleurs d'oranger (Citrus sinensis) du Maroc.",
    usageTips: "Une cuillère dans une infusion de verveine ou de camomille 30 minutes avant de dormir.",
    texture: "Fluide et limpide au départ, fine cristallisation claire avec le temps.",
    featured: true,
  },
  {
    id: "miel-thym-errachidia",
    slug: "miel-thym-errachidia",
    name: "Miel de Thym Sauvage de l'Atlas",
    arabicName: "عسل الزعتر - الرشيدية",
    category: "miel",
    tagline: "Le grand classique médicinal du terroir hauturier marocain",
    origin: "Errachidia / Haut Atlas",
    colorTone: "from-amber-700 to-amber-900",
    image: "/images/miel-oranger.jpg",
    secondaryImage: "/images/miel-daghmouss.jpg",
    gallery: ["/images/miel-oranger.jpg", "/images/miel-daghmouss.jpg"],
    rating: 4.96,
    reviewCount: 164,
    variants: [
      { id: "thym-250", weight: "250g", price: 135, inStock: true },
      { id: "thym-400", weight: "400g", price: 210, inStock: true },
      { id: "thym-900", weight: "900g", price: 430, inStock: true },
    ],
    description: "Issu des fleurs de thym sauvage croissant à plus de 1500 mètres d'altitude dans les reliefs d'Errachidia. Sa saveur est puissante, herbacée et aromatique. Réputé depuis des millénaires dans la pharmacopée marocaine pour son action antiseptique et cicatrisante exceptionnelle.",
    benefits: [
      "Puissant antiseptique naturel pour la sphère respiratoire",
      "Aide reconnue pour la cicatrisation et la régénération cutanée",
      "Action tonique générale contre les coups de froid",
      "Confort digestif et intestinal"
    ],
    tastingNotes: ["Herbacé intense et camphré", "Notes de garrigue et de résine", "Longueur en bouche aromatique"],
    ingredients: "100% miel pur de thym sauvage (Thymus capitatus) récolté au Maroc.",
    usageTips: "Parfait le matin à jeun ou dilué dans du jus de citron pressé tiède.",
    texture: "Onctueux et consistant, teinte cuivrée.",
    featured: true,
  },
  {
    id: "miel-lavande-oulmes",
    slug: "miel-lavande-oulmes",
    name: "Miel de Lavande Sauvage",
    arabicName: "عسل الخزامى - أولماس",
    category: "miel",
    tagline: "Élégance florale des plateaux rocheux d'Oulmès",
    origin: "Plateaux d'Oulmès",
    colorTone: "from-purple-900 to-amber-700",
    image: "/images/miel-lavande.jpg",
    secondaryImage: "/images/miel-oranger.jpg",
    gallery: ["/images/miel-lavande.jpg", "/images/miel-oranger.jpg"],
    rating: 4.88,
    reviewCount: 78,
    variants: [
      { id: "lav-250", weight: "250g", price: 95, inStock: true },
      { id: "lav-400", weight: "400g", price: 155, inStock: true },
    ],
    description: "Butiné sur les collines parfumées de lavande sauvage stoechas d'Oulmès. Un miel à la robe dorée nacrée, au parfum délicatement floral et aux vertus calmantes réputées pour la toux sèche et les maux de tête.",
    benefits: [
      "Antispasmodique naturel et calmant des toux sèches",
      "Aide au relâchement des tensions nerveuses",
      "Arôme raffiné pour accompagner le thé à la menthe ou au jasmin"
    ],
    tastingNotes: ["Floral noble", "Arrière-goût discret de lavande fraîche", "Douceur crémeuse"],
    ingredients: "100% miel pur de lavande sauvage (Lavandula stoechas) d'Oulmès.",
    usageTips: "Dans une tasse de thé chaud ou tartiné sur une tranche de pain complet.",
    texture: "Crémeux et velouté.",
    featured: true,
  },
  {
    id: "miel-jujubier-adarouch",
    slug: "miel-jujubier-adarouch",
    name: "Miel de Jujubier Sauvage (Sidr)",
    arabicName: "عسل السدر الجبلي - أداروش",
    category: "miel",
    tagline: "Le miel des connaisseurs : prestige, pureté et puissance bienfaisante",
    origin: "Région d'Adarouch (Moyen Atlas)",
    colorTone: "from-amber-800 to-yellow-800",
    image: "/images/miel-jujubier.jpg",
    secondaryImage: "/images/miel-daghmouss.jpg",
    gallery: ["/images/miel-jujubier.jpg", "/images/miel-daghmouss.jpg"],
    rating: 4.99,
    reviewCount: 92,
    variants: [
      { id: "sidr-250", weight: "250g", price: 165, inStock: true },
      { id: "sidr-400", weight: "400g", price: 260, inStock: true },
    ],
    description: "Le Miel de Jujubier (Sidr sauvage) récolté à Adarouch est un trésor rare. Les fleurs d'arbustes épineux du Moyen Atlas donnent un miel au goût unique de caramel boisé et de noisette, réputé pour sa richesse exceptionnelle en minéraux et son action bienfaisante sur le foie et l'immunité.",
    benefits: [
      "Richesse minérale supérieure et propriétés hépatoprotectrices",
      "Soutient le rétablissement lors des convalescences",
      "Bien-être digestif et rééquilibrage de la flore intestinale"
    ],
    tastingNotes: ["Saveur riche aux nuances de caramel et de mélasse", "Plein en bouche sans acidité", "Longueur envoûtante"],
    ingredients: "100% miel pur de jujubier sauvage (Ziziphus lotus) d'Adarouch.",
    usageTips: "Une cuillère le matin à jeun pour une cure régénérante de 3 semaines.",
    texture: "Épais, sirupeux, cristallise très lentement.",
    featured: true,
  },
  {
    id: "miel-eucalyptus-gharb",
    slug: "miel-eucalyptus-gharb",
    name: "Miel d'Eucalyptus",
    arabicName: "عسل الأوكالبتوس - الغرب",
    category: "miel",
    tagline: "Fraîcheur balsamique réconfortante des forêts du Gharb",
    origin: "Forêts du Gharb",
    colorTone: "from-amber-600 to-amber-800",
    image: "/images/miel-eucalyptus.jpg",
    secondaryImage: "/images/ferme-apicole.jpg",
    gallery: ["/images/miel-eucalyptus.jpg", "/images/ferme-apicole.jpg"],
    rating: 4.87,
    reviewCount: 86,
    variants: [
      { id: "euc-250", weight: "250g", price: 80, inStock: true },
      { id: "euc-400", weight: "400g", price: 125, inStock: true },
    ],
    description: "Issu des vastes forêts d'eucalyptus du Gharb baignées de brume atlantique. Sa teinte dorée claire cache un bouquet aromatique balsamique frais. Excellent allié de la saison hivernale.",
    benefits: [
      "Libère les voies respiratoires encombrées",
      "Goût tonique et balsamique très agréable",
      "Excellente alternative saine au sucre pour les boissons chaudes"
    ],
    tastingNotes: ["Note de tête boisée", "Fraîcheur mentholée très discrète", "Finale caramélisée"],
    ingredients: "100% miel pur d'eucalyptus récolté au Maroc.",
    usageTips: "Idéal avec du citron chaud ou du thé noir.",
    texture: "Dense et doré.",
    featured: true,
  },
  {
    id: "miel-euphorbe-ouezzane",
    slug: "miel-euphorbe-ouezzane",
    name: "Miel d'Euphorbe (Zakkoum)",
    arabicName: "عسل الزكوم - وزان",
    category: "miel",
    tagline: "Caractère sauvage et piquant des collines pré-rifaines",
    origin: "Collines de Ouezzane",
    colorTone: "from-emerald-900 to-amber-800",
    image: "/images/miel-euphorbe.jpg",
    secondaryImage: "/images/miel-daghmouss.jpg",
    gallery: ["/images/miel-euphorbe.jpg", "/images/miel-daghmouss.jpg"],
    rating: 4.94,
    reviewCount: 73,
    variants: [
      { id: "euph-400", weight: "400g", price: 215, inStock: true },
    ],
    description: "Ce miel rare d'euphorbe sauvage récolté sur les hauteurs de Ouezzane se caractérise par sa robe foncée cuivrée et sa chaleur puissante en gorge. Très recherché dans le Nord pour purifier les bronches et fortifier l'organisme.",
    benefits: [
      "Action thermique bienfaisante sur les poumons",
      "Puissant tonifiant naturel",
      "Aide précieuse contre les toux persistantes"
    ],
    tastingNotes: ["Herbacé piquant", "Saveur résineuse intense", "Chaleur vive et persistante"],
    ingredients: "100% miel pur de zakkoum sauvage de Ouezzane.",
    usageTips: "Une cuillère le soir ou dans une tisane chaude de thym.",
    texture: "Épais et velouté.",
    featured: false,
  },
  {
    id: "pollen-fleurs-pur",
    slug: "pollen-fleurs-pur",
    name: "Pollen de Fleurs Polyfloral Pur",
    arabicName: "حبوب اللقاح - منتوج طبيعي 100%",
    category: "miel",
    tagline: "Le super-aliment naturel de la ruche pour vitalité et tonus",
    origin: "Moyen Atlas & Souss",
    colorTone: "from-yellow-500 to-amber-600",
    image: "/images/pollen-fleurs.jpg",
    secondaryImage: "/images/ferme-apicole.jpg",
    gallery: ["/images/pollen-fleurs.jpg", "/images/ferme-apicole.jpg"],
    rating: 4.93,
    reviewCount: 65,
    variants: [
      { id: "pol-200", weight: "200g", price: 95, inStock: true },
    ],
    description: "Pollen d'abeilles minutieusement récolté à l'entrée des ruches dans les zones florales sauvages du Maroc. Séché à température ambiante pour conserver 100% de ses vitamines, enzymes et protéines végétales.",
    benefits: [
      "Revitalisant global et concentré d'acides aminés essentiels",
      "Équilibre le transit intestinal et la vitalité quotidienne",
      "Soutient les sportifs et les personnes en période de fatigue intense"
    ],
    tastingNotes: ["Grains croquants aux notes florales et miellées"],
    ingredients: "100% grains de pollen d'abeilles séché naturel.",
    usageTips: "Une cuillère à soupe saupoudrée chaque matin sur un yaourt, un smoothie ou dans du miel.",
    texture: "Petits grains dorés et multicolores croquants.",
    featured: false,
  },
  {
    id: "coffret-decouverte-3-miels",
    slug: "coffret-decouverte-3-miels",
    name: "Coffret Prestige Dégustation 3 Miels",
    arabicName: "علبة الهدايا الفاخرة - 3 أصناف",
    category: "packs",
    tagline: "Le trio emblématique du terroir marocain dans son écrin vert émeraude & or",
    origin: "Maroc (Sélection de 3 Terroirs)",
    colorTone: "from-emerald-900 to-amber-800",
    image: "/images/coffret-prestige.jpg",
    secondaryImage: "/images/miel-oranger.jpg",
    gallery: ["/images/coffret-prestige.jpg", "/images/miel-oranger.jpg", "/images/miel-daghmouss.jpg"],
    rating: 4.99,
    reviewCount: 189,
    variants: [
      { id: "pack-3x150", weight: "Coffret 3 x 150g", price: 195, oldPrice: 220, inStock: true },
      { id: "pack-3x250", weight: "Coffret 3 x 250g", price: 290, oldPrice: 330, inStock: true },
    ],
    description: "Présenté dans un magnifique coffret rigide vert émeraude orné de dorures à chaud inspirées de l'artisanat marocain. Ce coffret réunit les 3 fleurons de notre maison : le Miel de Daghmouss piquant d'Aït Baâmrane, le Miel de Thym Sauvage d'Errachidia et le Miel d'Oranger doux de Taroudant. Livré avec une cuillère à miel en bois d'olivier sculptée main.",
    benefits: [
      "Cadeau raffiné idéal pour les fêtes, réceptions et attentions gourmandes",
      "Permet de découvrir toute la diversité des terroirs apicoles marocains",
      "Inclus : cuillère en bois d'olivier artisanale offerte",
      "Emballage prestige protecteur et élégant"
    ],
    tastingNotes: ["Voyage sensoriel : de la douceur fruitée de l'oranger à la puissance du thym et au piquant chaud du daghmouss"],
    ingredients: "3 pots de miels purs garantis non pasteurisés.",
    usageTips: "Idéal pour une dégustation comparative sur une belle planche apéritive ou au petit-déjeuner.",
    texture: "Assortiment de textures onctueuses et crémeuses.",
    featured: true,
  },
  {
    id: "pack-famille-immunite-terroir",
    slug: "pack-famille-immunite-terroir",
    name: "Pack Grand Terroir & Vitalité",
    arabicName: "باقة العائلة والمناعة الكبرى",
    category: "packs",
    tagline: "L'alliance parfaite de la ruche et de l'amandier pour toute la famille",
    origin: "Terroirs du Sud et de l'Atlas",
    colorTone: "from-amber-900 to-amber-700",
    image: "/images/coffret-prestige.jpg",
    secondaryImage: "/images/amlou-amandes.jpg",
    gallery: ["/images/coffret-prestige.jpg", "/images/amlou-amandes.jpg", "/images/pollen-fleurs.jpg"],
    rating: 4.97,
    reviewCount: 142,
    variants: [
      { id: "pack-famille", weight: "Pack 4 Produits", price: 380, oldPrice: 440, inStock: true },
    ],
    description: "Le pack complet pensé pour le bien-être de votre foyer : 1x Miel de Daghmouss 400g, 1x Miel d'Oranger 400g, 1x Amlou Artisanal 350g et 1x Pollen de Fleurs 200g. Livraison offerte incluse dans ce pack.",
    benefits: [
      "Livraison offerte partout au Maroc",
      "Économie immédiate de 60 DH par rapport à l'achat unitaire",
      "Convient aux petits comme aux grands",
      "Cuillère à miel en bois d'olivier offerte"
    ],
    tastingNotes: ["Variété complète pour le petit-déjeuner et les cures saisonnières"],
    ingredients: "Sélection complète certifiée 100% naturelle.",
    usageTips: "Conserver à température ambiante à l'abri de l'humidité.",
    texture: "Varié.",
    featured: true,
  },
  {
    id: "miel-blanc-montagne-limited",
    slug: "miel-blanc-montagne-limited",
    name: "Édition Limitée : Miel Blanc de l'Atlas",
    arabicName: "إصدار محدود - عسل الأطلس الأبيض",
    category: "limited",
    tagline: "Récolte confidentielle de haute altitude à la texture de velours nacré",
    origin: "Hauts plateaux de l'Atlas (2200m)",
    colorTone: "from-amber-200 to-amber-500",
    image: "/images/miel-oranger.jpg",
    secondaryImage: "/images/ferme-apicole.jpg",
    gallery: ["/images/miel-oranger.jpg", "/images/ferme-apicole.jpg"],
    rating: 5.0,
    reviewCount: 37,
    variants: [
      { id: "blanc-350", weight: "350g Numéroté", price: 290, inStock: true },
    ],
    description: "Une récolte exceptionnelle produite en quantité très limitée à plus de 2200m d'altitude dans les vallées reculées du Haut Atlas. Ce miel blanc naturel possède une robe ivoire nacrée et une texture fondante comparable à une crème fouettée, avec des arômes délicats de fleur de sureau et de vanille sauvage.",
    benefits: [
      "Édition numérotée limitée à seulement 300 pots par saison",
      "Texture onctueuse unique, douceur exceptionnelle",
      "Plaisir gastronomique rare très recherché des amateurs"
    ],
    tastingNotes: ["Notes de vanille douce et fleurs alpines", "Fondant absolu sur la langue", "Zéro acidité"],
    ingredients: "100% miel pur de flore d'altitude sauvage de l'Atlas. Cru et non chauffé.",
    usageTips: "À savourer pur à la cuillère pour en apprécier la texture aérienne.",
    texture: "Nacré, blanc ivoire, texture de crème fouettée.",
    featured: true,
    isLimited: true,
    batchNumber: "Lot 2026-N°184/300",
  }
];
