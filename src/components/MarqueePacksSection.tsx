import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { soundManager } from '../utils/sound';
import { SITE_CONFIG } from '../config';

export const MarqueePacksSection: React.FC = () => {
  const packsAndLimited = PRODUCTS.filter(
    (p) => p.category === 'packs' || p.category === 'limited' || p.isLimited || p.featured
  );

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...packsAndLimited, ...packsAndLimited];

  return (
    <div className="py-14 bg-[#23150A] text-[#FFF8E7] overflow-hidden border-y border-[#D99A1E]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#D99A1E] text-lg">✨</span>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D99A1E]">
            Collections Rares & Packs Privilèges
          </span>
        </div>
        <Link
          to="/packs"
          onClick={() => soundManager.playDropSound()}
          className="text-xs font-semibold text-[#FFF8E7]/70 hover:text-white hover:underline transition-colors"
        >
          Tout voir →
        </Link>
      </div>

      {/* Infinite marquee ticker */}
      <div className="relative w-full flex overflow-x-hidden">
        <div className="flex gap-6 animate-[marquee_38s_linear_infinite] shrink-0 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to={`/produit/${item.slug}`}
              onClick={() => soundManager.playDropSound()}
              className="group flex items-center gap-4 bg-[#2D1B0F] p-3 pr-6 rounded-2xl border border-[#D99A1E]/20 hover:border-[#D99A1E]/50 transition-all shrink-0 w-80 shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover bg-white/5 border border-[#D99A1E]/30 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 flex-1">
                {item.isLimited && (
                  <span className="text-[10px] uppercase font-bold text-[#F5D07A] block tracking-wider">
                    Édition Limitée
                  </span>
                )}
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#F5D07A] truncate transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#FFF8E7]/60 truncate">{item.origin}</span>
                  <span className="text-xs font-semibold text-[#F5D07A] font-mono tabular-nums ml-2">
                    {item.variants[0]?.price} {SITE_CONFIG.currency}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
