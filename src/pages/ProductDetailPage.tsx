import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';
import { Star, ShoppingBag, MessageCircle, Share2, Check, ShieldCheck, Truck, Clock, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, showToast } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  // If not found, handle gracefully
  useEffect(() => {
    if (!product) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [product]);

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [shared, setShared] = useState(false);

  if (!product) {
    return (
      <div className="py-24 text-center px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif font-bold text-[#2B1A0E] mb-2">Produit introuvable</h2>
        <p className="text-sm text-[#2B1A0E]/70 mb-6">Ce cru du terroir n'est plus disponible ou l'adresse a changé.</p>
        <Link to="/boutique" className="btn-honey-wave px-6 py-2.5 rounded-xl bg-[#D99A1E] text-white text-xs font-bold">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : ([product.image, product.secondaryImage].filter(Boolean) as string[]);

  // Related products from same category or featured
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.featured)).slice(0, 3);

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
  };

  const handleWhatsAppOrder = () => {
    soundManager.playDropSound();
    const text = encodeURIComponent(
      `Salam Alaykoum ${SITE_CONFIG.name},\nJe souhaite commander le produit suivant :\n- ${product.name} (${product.arabicName})\n- Format : ${currentVariant.weight}\n- Quantité : ${quantity}\n- Montant : ${currentVariant.price * quantity} ${SITE_CONFIG.currency}\n\nPouvez-vous me confirmer la disponibilité et la livraison ?`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    soundManager.playDropSound();
    const url = window.location.href;
    const text = encodeURIComponent(`Regarde ce trésor du terroir marocain chez Riad El Aâssal : ${product.name} (${product.tagline}) : ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  // Structured Data JSON-LD for this product
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": SITE_CONFIG.name
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_CONFIG.url}/produit/${product.slug}`,
      "priceCurrency": "MAD",
      "price": currentVariant.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  return (
    <div className="py-10 bg-[#FCF9F2] min-h-screen">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8A5A12] mb-6">
          <Link to="/" className="hover:text-[#2B1A0E] transition-colors">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link to="/boutique" className="hover:text-[#2B1A0E] transition-colors">Boutique</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#2B1A0E] font-medium truncate">{product.name}</span>
        </nav>

        {/* Contiguous Purchase Module (PDP Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Gallery (Left: 6 cols) */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#D99A1E]/20 shadow-lg">
              <img
                src={images[activeImageIdx] || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.isLimited && (
                <div className="absolute top-4 left-4 bg-[#2B1A0E] text-[#F5D07A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                  Édition Limitée · {product.batchNumber || 'Récolte Rare'}
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundManager.playDropSound();
                      setActiveImageIdx(i);
                    }}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === i ? 'border-[#D99A1E] shadow-sm scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchase Module (Right: 6 cols) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-3xl border border-[#D99A1E]/20 shadow-xl space-y-6">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A5A12] mb-1">
                <span>{product.origin}</span>
                <span aria-hidden="true">·</span>
                <span className="font-serif">{product.arabicName}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1A0E] leading-tight mb-2">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#8A5A12] font-medium leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#2B1A0E]/06 text-xs text-[#2B1A0E]/70">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#2B1A0E]">{product.rating} / 5</span>
                <span>({product.reviewCount} avis vérifiés de connaisseurs)</span>
              </div>
            </div>

            {/* Price Module */}
            <div className="p-4 bg-[#FAF4E8] rounded-2xl border border-[#D99A1E]/20 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-[#8A5A12] block tracking-wider mb-0.5">
                  Prix au pot ({currentVariant.weight})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-[#2B1A0E] tabular-nums">
                    {currentVariant.price * quantity} {SITE_CONFIG.currency}
                  </span>
                  {currentVariant.oldPrice && (
                    <span className="text-sm text-[#2B1A0E]/40 line-through tabular-nums">
                      {currentVariant.oldPrice * quantity} {SITE_CONFIG.currency}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                En stock · Récolte fraîche
              </span>
            </div>

            {/* Variant / Weight Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B1A0E] mb-2">
                Sélectionnez le format :
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      soundManager.playDropSound();
                      setSelectedVariantIdx(idx);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedVariantIdx === idx
                        ? 'border-[#2B1A0E] bg-[#2B1A0E] text-white shadow-md'
                        : 'border-[#D99A1E]/30 bg-[#FFFDF9] hover:bg-[#FAF4E8] text-[#2B1A0E]'
                    }`}
                  >
                    <span className="block text-xs font-bold">{v.weight}</span>
                    <span className={`block text-xs mt-0.5 tabular-nums ${selectedVariantIdx === idx ? 'text-[#F5D07A]' : 'text-[#8A5A12]'}`}>
                      {v.price} {SITE_CONFIG.currency}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2B1A0E]">Quantité :</span>
              <div className="flex items-center border border-[#2B1A0E]/20 rounded-xl bg-white shadow-xs">
                <button
                  onClick={() => {
                    soundManager.playDropSound();
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="px-3.5 py-2 font-bold text-sm text-[#2B1A0E] hover:bg-[#F5ECDC] rounded-l-xl transition-colors"
                >
                  −
                </button>
                <span className="px-4 text-xs font-bold tabular-nums text-[#2B1A0E]">{quantity}</span>
                <button
                  onClick={() => {
                    soundManager.playDropSound();
                    setQuantity(quantity + 1);
                  }}
                  className="px-3.5 py-2 font-bold text-sm text-[#2B1A0E] hover:bg-[#F5ECDC] rounded-r-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="btn-honey-wave py-3.5 px-6 rounded-xl bg-[#D99A1E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D99A1E]/20 hover:scale-101"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-101"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Commander sur WhatsApp</span>
                </button>
              </div>

              {/* Share on WhatsApp */}
              <button
                onClick={handleShareWhatsApp}
                className="w-full py-2.5 rounded-xl border border-[#2B1A0E]/15 hover:bg-[#FAF4E8] text-[#2B1A0E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#128C7E]" />
                <span>{shared ? 'Lien copié dans WhatsApp !' : 'Partager ce produit sur WhatsApp avec un proche'}</span>
              </button>
            </div>

            {/* Reassurance Icons */}
            <div className="pt-4 border-t border-[#2B1A0E]/10 grid grid-cols-3 gap-2 text-center text-[11px] text-[#2B1A0E]/80">
              <div className="p-2 bg-[#FAF4E8] rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#D99A1E] mx-auto mb-1" />
                <span className="block font-semibold">100% Brut & Pur</span>
              </div>
              <div className="p-2 bg-[#FAF4E8] rounded-xl">
                <Truck className="w-4 h-4 text-[#D99A1E] mx-auto mb-1" />
                <span className="block font-semibold">Livraison 24-48h</span>
              </div>
              <div className="p-2 bg-[#FAF4E8] rounded-xl">
                <Clock className="w-4 h-4 text-[#D99A1E] mx-auto mb-1" />
                <span className="block font-semibold">Paiement à Réception</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Information Tabs / Details */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D99A1E]/20 shadow-xl mb-20 space-y-10">
          {/* Description */}
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B1A0E] mb-3">
              Description & Origine du Terroir
            </h3>
            <p className="text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed max-w-4xl">
              {product.description}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B1A0E] mb-4">
              Bienfaits & Propriétés Naturelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF4E8] border border-[#D99A1E]/15">
                  <Check className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#2B1A0E]/90 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tasting Notes & Ingredients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#2B1A0E]/10">
            <div>
              <h4 className="text-base font-serif font-bold text-[#2B1A0E] mb-2">Profil de Dégustation</h4>
              <ul className="space-y-1.5 text-xs text-[#2B1A0E]/80">
                {product.tastingNotes.map((note, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99A1E]" />
                    <span>{note}</span>
                  </li>
                ))}
                <li className="pt-2">
                  <strong className="text-[#8A5A12]">Texture :</strong> {product.texture}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-serif font-bold text-[#2B1A0E] mb-2">Ingrédients & Conseils</h4>
              <p className="text-xs text-[#2B1A0E]/80 mb-3">
                <strong className="text-[#8A5A12]">Composition :</strong> {product.ingredients}
              </p>
              <p className="text-xs text-[#2B1A0E]/80">
                <strong className="text-[#8A5A12]">Conseils d'utilisation :</strong> {product.usageTips}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-bold text-[#2B1A0E] mb-6">
              Vous Aimerez Aussi ces Miels du Maroc
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Purchase Bar on Mobile (<15% viewport height cap compliant) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#D99A1E]/30 p-3 z-30 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[11px] text-[#8A5A12] block font-semibold truncate max-w-[130px]">{product.name}</span>
          <span className="text-base font-serif font-bold text-[#2B1A0E] tabular-nums">
            {currentVariant.price * quantity} {SITE_CONFIG.currency}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="btn-honey-wave px-3.5 py-2 rounded-xl bg-[#D99A1E] text-white text-xs font-bold shadow-sm"
          >
            Ajouter
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="p-2 rounded-xl bg-[#25D366] text-white shadow-sm"
            aria-label="Commander sur WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
