import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';
import { formatPrice } from '../utils/price';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS.slice(0, 4)); // Popular suggestions
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.arabicName.includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.benefits.some((b) => b.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  const handleSelectProduct = (slug: string) => {
    soundManager.playDropSound();
    onClose();
    navigate(`/produit/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl shadow-2xl overflow-hidden border border-[#D99A1E]/30 z-10"
          >
            {/* Input Bar */}
            <div className="p-4 border-b border-[#2B1A0E]/10 flex items-center gap-3 bg-[#FAF3E4]">
              <Search className="w-5 h-5 text-[#8A5A12]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un miel (Daghmouss, Thym...), Amlou, bienfaits..."
                className="flex-1 bg-transparent text-base text-[#2B1A0E] placeholder:text-[#2B1A0E]/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-[#2B1A0E]/50 hover:text-[#2B1A0E] px-2 py-1"
                >
                  Effacer
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-full text-[#2B1A0E]/70 hover:bg-black/5"
                aria-label="Fermer la recherche"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Suggestions / Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A5A12] mb-3 px-2">
                {query.trim() ? `Résultats (${results.length})` : 'Suggestions du terroir'}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-10 text-sm text-[#2B1A0E]/60">
                  Aucun trésor trouvé pour « {query} ». Essayez avec <em>Daghmouss</em>, <em>Amlou</em>, ou <em>Oranger</em>.
                </div>
              ) : (
                <div className="grid gap-2">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="w-full p-2.5 rounded-xl hover:bg-[#F8F1E2] text-left flex items-center gap-3 transition-colors group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-white border border-[#D99A1E]/20"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between">
                          <h4 className="text-sm font-semibold text-[#2B1A0E] group-hover:text-[#8A5A12] truncate">
                            {product.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#2B1A0E] ml-2 tabular-nums">
                            {formatPrice(product.variants[0]?.price)}
                          </span>
                        </div>
                        <p className="text-xs text-[#8A5A12] truncate">{product.tagline}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#D99A1E] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Filter tags */}
            <div className="p-3 bg-[#F5ECDC]/50 border-t border-[#2B1A0E]/08 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#8A5A12] font-medium">Recherches rapides :</span>
              {['Daghmouss', 'Amlou', 'Thym', 'Immunité', 'Sidr'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 rounded-md bg-white text-[#2B1A0E] hover:bg-[#D99A1E] hover:text-white transition-colors border border-[#2B1A0E]/10"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
