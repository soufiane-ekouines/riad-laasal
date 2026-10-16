import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { soundManager } from '../utils/sound';
import { SlidersHorizontal, Search } from 'lucide-react';
import { SITE_CONFIG } from '../config';

export const BoutiquePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    soundManager.playDropSound();
    setActiveCategory(category);
    if (category === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', category);
    }
    setSearchParams(searchParams);
  };

  // Filter & Sort
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category match
    if (activeCategory === 'miel' && product.category !== 'miel') return false;
    if (activeCategory === 'pate-a-tartiner' && product.category !== 'pate-a-tartiner') return false;
    if (activeCategory === 'packs' && product.category !== 'packs') return false;
    if (activeCategory === 'limited' && !product.isLimited) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchArabic = product.arabicName.includes(q);
      const matchOrigin = product.origin.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      return matchName || matchArabic || matchOrigin || matchDesc;
    }

    return true;
  }).sort((a, b) => {
    const priceA = a.variants[0]?.price || 0;
    const priceB = b.variants[0]?.price || 0;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const categories = [
    { id: 'all', label: 'Tout le Terroir', count: PRODUCTS.length },
    { id: 'miel', label: 'Miel', count: PRODUCTS.filter(p => p.category === 'miel').length },
    { id: 'pate-a-tartiner', label: 'Pâte à tartiner', count: PRODUCTS.filter(p => p.category === 'pate-a-tartiner').length },
    { id: 'packs', label: 'Coffrets', count: PRODUCTS.filter(p => p.category === 'packs').length },
    { id: 'limited', label: 'Éditions Rares', count: PRODUCTS.filter(p => p.isLimited).length },
  ].filter((cat) => cat.count > 0);

  return (
    <div className="py-12 bg-[#FCF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
            Notre Épicerie Fine du Maroc
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2B1A0E] tracking-tight mb-3">
            Boutique Riad El Aâssal
          </h1>
          <p className="text-xs sm:text-sm text-[#2B1A0E]/70 max-w-xl mx-auto leading-relaxed">
            Miels purs récoltés à froid et amlou artisanal d'exception. Tous nos produits sont expédiés avec soin partout au Maroc avec paiement à la livraison.
          </p>
        </div>

        {/* Filter Controls Bar (Interactive Tab Buttons) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-[#D99A1E]/15">
          {/* Category Tabs (Clean Segmented Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2E8D5] rounded-xl w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#2B1A0E] text-white shadow-sm'
                    : 'text-[#2B1A0E]/80 hover:text-[#2B1A0E] hover:bg-white/50'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 text-[11px] opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-[#8A5A12] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrer..."
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white border border-[#D99A1E]/20 text-[#2B1A0E] placeholder:text-[#2B1A0E]/40 focus:outline-none focus:border-[#D99A1E]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0 bg-white border border-[#D99A1E]/20 rounded-xl px-3 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8A5A12]" />
              <select
                value={sortBy}
                onChange={(e) => {
                  soundManager.playDropSound();
                  setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating');
                }}
                className="text-xs bg-transparent font-medium text-[#2B1A0E] focus:outline-none cursor-pointer"
              >
                <option value="featured">En vedette</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
              </select>
            </div>
          </div>
        </div>

        {/* Free shipping reassurance banner */}
        <div className="mb-8 p-3 rounded-xl bg-[#F8F1E2] border border-[#D99A1E]/20 flex items-center justify-between text-xs text-[#8A5A12]">
          <span>🚚 <strong>Livraison offerte</strong> sur toutes les commandes de plus de {SITE_CONFIG.freeShippingThreshold} {SITE_CONFIG.currency}.</span>
          <span className="font-semibold text-[#2B1A0E]">Paiement à la livraison au Maroc</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#D99A1E]/15 p-8 max-w-md mx-auto">
            <span className="text-4xl block mb-3">🍯</span>
            <h3 className="text-lg font-serif font-bold text-[#2B1A0E] mb-2">Aucun trésor trouvé</h3>
            <p className="text-xs text-[#2B1A0E]/70 mb-4">
              Aucun produit ne correspond à vos filtres actuels.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="btn-honey-wave px-4 py-2 rounded-xl bg-[#D99A1E] text-white text-xs font-bold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
