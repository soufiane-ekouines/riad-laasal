import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SITE_CONFIG } from '../config';
import { Sparkles, Gift, ShieldCheck, Truck } from 'lucide-react';

export const PacksPage: React.FC = () => {
  const packs = PRODUCTS.filter((p) => p.category === 'packs');
  const limited = PRODUCTS.filter((p) => p.isLimited || p.category === 'limited');

  return (
    <div className="py-12 bg-[#FCF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF3E4] border border-[#D99A1E]/30 text-[#8A5A12] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D99A1E]" />
            <span>Sélection Haut de Gamme</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2B1A0E] tracking-tight mb-4">
            Coffrets Cadeaux & Éditions Limitées
          </h1>
          <p className="text-xs sm:text-sm text-[#2B1A0E]/70 max-w-xl mx-auto leading-relaxed">
            Pour offrir ou s'initier aux plus grands crus du terroir marocain. Présentés dans nos écrins cadeaux prestige avec cuillère en bois d'olivier sculptée main.
          </p>
        </div>

        {/* Section 1: Coffrets & Packs */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#D99A1E]/20">
            <Gift className="w-5 h-5 text-[#8A5A12]" />
            <h2 className="text-2xl font-serif font-bold text-[#2B1A0E]">Coffrets Dégustation Prestige</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Section 2: Limited Editions */}
        {limited.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#D99A1E]/20">
              <Sparkles className="w-5 h-5 text-[#8A5A12]" />
              <h2 className="text-2xl font-serif font-bold text-[#2B1A0E]">Récoltes Confidentielles & Rares</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {limited.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Corporate / Corporate Gift Banner */}
        <div className="bg-[#2B1A0E] text-[#FFF8E7] rounded-3xl p-8 sm:p-12 border border-[#D99A1E]/30 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F5D07A] block mb-2">
              Cadeaux d'Entreprise & Événements
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Personnalisation de Coffrets sur Mesure
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
              Vous êtes une entreprise, un organisateur d'événements ou souhaitez composer un cadeau de prestige aux couleurs du Maroc ? Nous personnalisons vos coffrets avec logo et message calligraphié.
            </p>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam Alaykoum, je souhaite un devis pour des coffrets cadeaux d'entreprise Riad El Aâssal.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-honey-wave inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D99A1E] text-[#2B1A0E] text-xs font-bold shadow-md"
            >
              Demander un devis personnalisé sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
