import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingBag, MessageCircle } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';
import { formatPrice, hasPrice, whatsappPriceSuffix } from '../utils/price';
import { imageFitClass } from '../utils/image';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const defaultVariant = product.variants[0];
  const secondaryImage = product.gallery?.[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -5);
    setRotateY(((x - centerX) / centerX) * 5);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    soundManager.playDropSound();
    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      arabicName: product.arabicName,
      weight: defaultVariant.weight,
      price: defaultVariant.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
    });
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    soundManager.playDropSound();
    const text = encodeURIComponent(
      `Salam Alaykoum ${SITE_CONFIG.name}, je souhaite commander ${product.name} (${defaultVariant.weight})${whatsappPriceSuffix(defaultVariant.price)}.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="group relative flex flex-col bg-[#FFFDF9] rounded-2xl border border-[#D99A1E]/18 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
    >
      {/* Image container */}
      <Link
        to={`/produit/${product.slug}`}
        onClick={() => soundManager.playDropSound()}
        className="relative block aspect-[4/5] overflow-hidden bg-[#FBF7EE]"
      >
        {!imageError ? (
          <>
            <img
              src={product.image}
              alt={product.imageAlt}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className={`w-full h-full ${imageFitClass(product.imageFit)} group-hover:scale-105 transition-all duration-700 ease-out ${
                secondaryImage ? 'group-hover:opacity-0' : ''
              }`}
            />
            {secondaryImage && (
              <img
                src={secondaryImage.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full ${imageFitClass(secondaryImage.fit)} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out`}
              />
            )}
          </>
        ) : (
          /* Graceful Fallback Container with Honey Aesthetic (Zero Broken Images) */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF3E4] via-[#F3E5C8] to-[#EBD4A7] p-6 text-center">
            <span className="text-3xl mb-2">🏺</span>
            <span className="font-serif font-bold text-sm text-[#2B1A0E]">{product.name}</span>
            <span className="text-[11px] text-[#8A5A12] mt-1">{product.origin}</span>
          </div>
        )}

        {/* Limited edition or batch stamp */}
        {product.isLimited && (
          <div className="absolute top-3 left-3 bg-[#2B1A0E]/90 text-[#F5D07A] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm backdrop-blur-xs">
            Édition Rare
          </div>
        )}

        {/* Quick action overlay buttons */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                soundManager.playDropSound();
                onQuickView(product);
              }}
              className="py-1.5 px-3 rounded-lg bg-white/95 text-[#2B1A0E] text-xs font-semibold shadow-md hover:bg-white flex items-center gap-1.5 backdrop-blur-xs transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Aperçu</span>
            </button>
          )}

          <button
            onClick={handleWhatsAppClick}
            title="Commander via WhatsApp"
            className="p-2 rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-md transition-colors ml-auto"
            aria-label="Commander sur WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#8A5A12] font-medium mb-1">
            <span>{product.origin}</span>
            <span aria-hidden="true">·</span>
            <span>{defaultVariant.weight}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/produit/${product.slug}`}
            onClick={() => soundManager.playDropSound()}
            className="block text-base font-serif font-bold text-[#2B1A0E] hover:text-[#8A5A12] transition-colors leading-snug mb-1"
          >
            {product.name}
          </Link>

          {/* Arabic Name subtitle */}
          <p className="text-xs text-[#2B1A0E]/50 font-serif mb-2">
            {product.arabicName}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#2B1A0E]/06 flex items-center justify-between mt-2">
          <div>
            <span className="text-base font-serif font-bold text-[#2B1A0E] tabular-nums">
              {formatPrice(defaultVariant.price)}
            </span>
            {hasPrice(defaultVariant.oldPrice) && (
              <span className="text-xs text-[#2B1A0E]/40 line-through ml-1.5 tabular-nums">
                {defaultVariant.oldPrice} {SITE_CONFIG.currency}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-honey-wave px-3 py-1.5 rounded-lg bg-[#D99A1E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
