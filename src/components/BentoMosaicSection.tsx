import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { soundManager } from '../utils/sound';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config';

export const BentoMosaicSection: React.FC = () => {
  const daghmouss = PRODUCTS.find((p) => p.slug === 'miel-daghmouss-ait-baamrane') || PRODUCTS[0];
  const amlou = PRODUCTS.find((p) => p.slug === 'amlou-aux-amandes-traditionnel') || PRODUCTS[1];
  const oranger = PRODUCTS.find((p) => p.slug === 'miel-oranger-taroudant') || PRODUCTS[2];
  const pack = PRODUCTS.find((p) => p.slug === 'coffret-decouverte-3-miels') || PRODUCTS[8];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
            La Galerie du Terroir
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1A0E] tracking-tight">
            Mosaïque des Trésors Marocains
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#2B1A0E]/70 max-w-md mt-3 md:mt-0">
          Chaque pot raconte une région, un climat et un savoir-faire préservé. Des contreforts du Haut Atlas aux plaines du Souss.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Large Bento Card 1: Daghmouss Hero Tile (7 cols) */}
        <Link
          to={`/produit/${daghmouss.slug}`}
          onClick={() => soundManager.playDropSound()}
          className="md:col-span-7 group relative rounded-3xl overflow-hidden min-h-[380px] bg-[#1F1208] text-white flex flex-col justify-end p-8 border border-[#D99A1E]/30 shadow-lg hover:shadow-2xl transition-all"
        >
          <img
            src={daghmouss.image}
            alt={daghmouss.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#F5D07A] font-semibold block mb-1">
              Grand Cru · Aït Baâmrane
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 group-hover:text-[#F5D07A] transition-colors">
              {daghmouss.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg mb-4 line-clamp-2">
              {daghmouss.tagline}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-white/20">
              <span className="font-serif font-bold text-lg text-[#F5D07A] tabular-nums">
                À partir de {daghmouss.variants[0]?.price} {SITE_CONFIG.currency}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline">
                Découvrir ce cru <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* Bento Card 2: Amlou Artisanal (5 cols) */}
        <Link
          to={`/produit/${amlou.slug}`}
          onClick={() => soundManager.playDropSound()}
          className="md:col-span-5 group relative rounded-3xl overflow-hidden min-h-[380px] bg-[#2B1A0E] text-white flex flex-col justify-end p-8 border border-[#D99A1E]/30 shadow-lg hover:shadow-2xl transition-all"
        >
          <img
            src={amlou.image}
            alt={amlou.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#F5D07A] font-semibold block mb-1">
              Pâte à Tartiner Pure · Souss
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-[#F5D07A] transition-colors">
              {amlou.name}
            </h3>
            <p className="text-xs text-white/80 line-clamp-2 mb-4">
              Amandes beldi grillées, huile d'argan extra-vierge et miel pur d'oranger.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-white/20">
              <span className="font-serif font-bold text-base text-[#F5D07A] tabular-nums">
                {amlou.variants[0]?.price} {SITE_CONFIG.currency}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline">
                Déguster <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* Bento Card 3: Coffret Cadeau Prestige (5 cols) */}
        <Link
          to={`/produit/${pack.slug}`}
          onClick={() => soundManager.playDropSound()}
          className="md:col-span-5 group relative rounded-3xl overflow-hidden min-h-[320px] bg-[#1F1208] text-white flex flex-col justify-end p-8 border border-[#D99A1E]/30 shadow-lg hover:shadow-2xl transition-all"
        >
          <img
            src={pack.image}
            alt={pack.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#F5D07A] font-semibold block mb-1">
              Idée Cadeau Raffinée
            </span>
            <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-[#F5D07A] transition-colors">
              {pack.name}
            </h3>
            <p className="text-xs text-white/80 line-clamp-2 mb-3">
              3 pots d'exception réunis dans notre écrin signature vert émeraude et dorures à chaud.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-[#F5D07A] tabular-nums">
                {pack.variants[0]?.price} {SITE_CONFIG.currency}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
                Offrir <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* Bento Card 4: Miel d'Oranger & Citronnier (7 cols) */}
        <Link
          to={`/produit/${oranger.slug}`}
          onClick={() => soundManager.playDropSound()}
          className="md:col-span-7 group relative rounded-3xl overflow-hidden min-h-[320px] bg-[#2B1A0E] text-white flex flex-col justify-end p-8 border border-[#D99A1E]/30 shadow-lg hover:shadow-2xl transition-all"
        >
          <img
            src={oranger.image}
            alt={oranger.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#F5D07A] font-semibold block mb-1">
              Douceur Apaisante · Taroudant
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-[#F5D07A] transition-colors">
              {oranger.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-3 max-w-lg">
              Une robe dorée et un parfum fleuri d'agrumes qui émerveille petits et grands.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-white/20">
              <span className="font-serif font-bold text-base text-[#F5D07A] tabular-nums">
                À partir de {oranger.variants[0]?.price} {SITE_CONFIG.currency}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline">
                Voir le produit <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
