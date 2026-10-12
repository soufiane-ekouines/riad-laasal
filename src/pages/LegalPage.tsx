import React from 'react';
import { SITE_CONFIG } from '../config';

interface LegalPageProps {
  type: 'mentions' | 'cgv' | 'confidentialite';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const titles = {
    mentions: 'Mentions Légales',
    cgv: 'Conditions Générales de Vente (CGV)',
    confidentialite: 'Politique de Confidentialité',
  };

  return (
    <div className="py-16 bg-[#FCF9F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-3xl border border-[#D99A1E]/20 shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1A0E] mb-6">
          {titles[type]}
        </h1>

        {type === 'mentions' && (
          <div className="space-y-6 text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">1. Éditeur du Site & Service Client</h2>
              <p>
                Le site internet accessible à l'adresse <strong>{SITE_CONFIG.url}</strong> est édité par la maison <strong>{SITE_CONFIG.name}</strong>, spécialisée dans la valorisation des produits du terroir apicole marocain.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Siège social & Atelier : {SITE_CONFIG.address}</li>
                <li>Ligne et canal officiel de contact / commande : WhatsApp au {SITE_CONFIG.whatsappDisplay}</li>
                <li>Disponibilité du service client : Du lundi au samedi de 09h00 à 19h30</li>
                <li>Modalités de contact : Les demandes de renseignements, commandes et suivis s'effectuent directement via notre service certifié WhatsApp.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">2. Propriété Intellectuelle</h2>
              <p>
                L'ensemble des éléments figurant sur le site {SITE_CONFIG.name} (logo officiel en calligraphie arabe et emblème de l'abeille, photographies authentiques des bocaux de miel, textes descriptifs des terroirs marocains et recettes d'Amlou) sont protégés par le droit de la propriété intellectuelle en vigueur au Maroc.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">3. Hébergement</h2>
              <p>
                L'infrastructure web est hébergée sur des serveurs haute sécurité garantissant la disponibilité et l'intégrité de la boutique en ligne.
              </p>
            </section>
          </div>
        )}

        {type === 'cgv' && (
          <div className="space-y-6 text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">1. Objet & Commandes</h2>
              <p>
                Les présentes Conditions Générales de Vente régissent la commande et la livraison de nos miels purs et de notre Amlou artisanal. Toute commande initiée depuis la boutique en ligne est finalisée et confirmée via notre canal WhatsApp officiel.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">2. Authenticité & Pureté Garantie</h2>
              <p>
                Tous nos miels sont 100% purs, récoltés à froid et non pasteurisés. La cristallisation naturelle dans le temps est la signature des miels vivants non altérés.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">3. Tarifs & Paiement</h2>
              <p>
                Les prix sont indiqués en Dirhams Marocains ({SITE_CONFIG.currency}) TTC. Le paiement s'effectue exclusivement en espèces à la livraison (Cash on Delivery) après contrôle de votre colis par vos soins.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">4. Livraison au Maroc</h2>
              <p>
                Les expéditions sont opérées sous 24 à 48 heures ouvrées sur l'ensemble du territoire marocain. La livraison est offerte à compter de {SITE_CONFIG.freeShippingThreshold} {SITE_CONFIG.currency} d'achat. En-deçà, un forfait de {SITE_CONFIG.standardShippingFee} {SITE_CONFIG.currency} est appliqué.
              </p>
            </section>
          </div>
        )}

        {type === 'confidentialite' && (
          <div className="space-y-6 text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">1. Traitement des Données Personnelles</h2>
              <p>
                Les coordonnées transmises lors de votre commande ou prise de contact (Nom, numéro de téléphone WhatsApp, ville et adresse de livraison) sont exclusivement destinées à la logistique d'expédition et à notre communication avec vous sur WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">2. Confidentialité & Absence d'Envoi d'Email</h2>
              <p>
                Notre plateforme ne stocke aucun email et ne pratique aucun démarchage commercial intrusif. Vos échanges WhatsApp restent strictement confidentiels et protégés par le chiffrement de bout en bout de l'application WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">3. Sauvegarde Locale du Panier (localStorage)</h2>
              <p>
                Les produits placés dans votre panier sont sauvegardés localement sur votre appareil via le stockage interne du navigateur pour vous permettre de retrouver vos articles si vous quittez la page.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
