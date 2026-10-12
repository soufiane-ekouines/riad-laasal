export interface PopupConfig {
  enabled: boolean;
  delayMs: number; // Déclenchement après délai (ex: 8000ms)
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  discountCode: string;
  discountValue: string;
  buttonText: string;
  linkTo: string;
  disclaimer: string;
}

export const POPUP_CONFIG: PopupConfig = {
  enabled: true,
  delayMs: 8000,
  badge: "Bienvenue chez Riad El Aâssal",
  title: "10% de réduction sur votre 1ère commande",
  subtitle: "Recevez les saveurs du terroir marocain directement chez vous",
  description: "Entrez le code privilège lors de votre commande ou utilisez-le directement sur WhatsApp pour bénéficier d'une remise exclusive.",
  discountCode: "BIENVENUE10",
  discountValue: "-10%",
  buttonText: "Découvrir les offres exclusives",
  linkTo: "/offres",
  disclaimer: "Valable sans minimum d'achat sur tout notre catalogue de miels et amlou."
};
