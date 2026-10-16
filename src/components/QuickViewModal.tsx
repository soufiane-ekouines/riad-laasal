import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Check, ShoppingBag, MessageCircle, Shield, Truck } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';
import { formatPrice, hasPrice, whatsappPriceSuffix } from '../utils/price';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleAddToCart = () => {
    soundManager.playDropSound();
    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      name: product.name,
      arabicName: product.arabicName,
      weight: currentVariant.weight,
      price: currentVariant.price,
      quantity,
      image: product.image,
      slug: product.slug,
    });
    onClose();
  };

  const handleWhatsAppOrder = () => {
    soundManager.playDropSound();
    const text = encodeURIComponent(
      `Salam Alaykoum ${SITE_CONFIG.name}, je souhaite commander ${quantity}x ${product.name} (${currentVariant.weight})${whatsappPriceSuffix(currentVariant.price * quantity, 'au prix de')}.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden border border-[#D99A1E]/30 z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playDropSound();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#2B1A0E] shadow-sm transition-colors"
            aria-label="Fermer l'aperçu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="md:w-1/2 relative bg-[#F8F1E2] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#D99A1E]/15">
            <img
              src={product.image}
              alt={product.imageAlt}
              decoding="async"
              className={`aspect-[4/5] max-h-72 w-auto rounded-2xl ${
                product.imageFit === 'contain' ? 'object-contain mix-blend-multiply' : 'object-cover shadow-md'
              }`}
            />
            {product.isLimited && (
              <span className="absolute top-4 left-4 bg-[#8A5A12] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                Édition Limitée
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8A5A12] font-semibold mb-1">
                <span>{product.origin}</span>
                <span aria-hidden="true">·</span>
                <span className="font-arabic">{product.arabicName}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B1A0E] mb-1">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs text-[#2B1A0E]/70 mb-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#2B1A0E]">{product.rating}</span>
                <span>({product.reviewCount} avis certifiés)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-serif font-bold text-[#8A5A12] tabular-nums">
                  {formatPrice(currentVariant.price * quantity)}
                </span>
                {hasPrice(currentVariant.oldPrice) && (
                  <span className="text-sm text-[#2B1A0E]/40 line-through tabular-nums">
                    {currentVariant.oldPrice * quantity} {SITE_CONFIG.currency}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#2B1A0E]/80 leading-relaxed mb-4 line-clamp-3">
                {product.description}
              </p>

              {/* Format / Weight Selector */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#2B1A0E] mb-2 uppercase tracking-wide">
                  Format / Poids :
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        soundManager.playDropSound();
                        setSelectedVariantIndex(idx);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedVariantIndex === idx
                          ? 'bg-[#2B1A0E] text-white shadow-sm'
                          : 'bg-[#F5ECDC] text-[#2B1A0E] hover:bg-[#EAE0CD]'
                      }`}
                    >
                      {v.weight}{hasPrice(v.price) && ` — ${formatPrice(v.price)}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold text-[#2B1A0E] uppercase tracking-wide">Quantité :</span>
                <div className="flex items-center border border-[#2B1A0E]/20 rounded-lg bg-white">
                  <button
                    onClick={() => {
                      soundManager.playDropSound();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="px-2.5 py-1 text-sm font-bold text-[#2B1A0E] hover:bg-[#F5ECDC] rounded-l"
                  >
                    −
                  </button>
                  <span className="px-3 text-xs font-semibold tabular-nums text-[#2B1A0E]">{quantity}</span>
                  <button
                    onClick={() => {
                      soundManager.playDropSound();
                      setQuantity(quantity + 1);
                    }}
                    className="px-2.5 py-1 text-sm font-bold text-[#2B1A0E] hover:bg-[#F5ECDC] rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#2B1A0E]/10">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="btn-honey-wave py-2.5 px-4 rounded-xl bg-[#D99A1E] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp direct</span>
                </button>
              </div>

              <Link
                to={`/produit/${product.slug}`}
                onClick={() => {
                  soundManager.playDropSound();
                  onClose();
                }}
                className="block text-center text-xs text-[#8A5A12] hover:underline font-medium py-1"
              >
                Voir la fiche complète avec tous les bienfaits →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
