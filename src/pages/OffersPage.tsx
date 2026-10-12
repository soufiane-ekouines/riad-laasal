import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EXCLUSIVE_OFFERS, Offer } from '../data/offers';
import { PRODUCTS } from '../data/products';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';
import { useCart } from '../context/CartContext';
import { Tag, Clock, Check, ArrowRight, MessageCircle, Copy, Sparkles } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { addItem, showToast } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date("2026-10-31T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (code: string) => {
    soundManager.playDropSound();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Code promotionnel "${code}" copié !`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddOfferToCart = (offer: Offer) => {
    soundManager.playDropSound();
    const product = PRODUCTS.find((p) => p.slug === offer.featuredProductSlug);
    if (product) {
      const v = product.variants[0];
      addItem({
        productId: product.id,
        variantId: v.id,
        name: `${offer.title}`,
        arabicName: product.arabicName,
        weight: v.weight,
        price: offer.discountPrice,
        quantity: 1,
        image: product.image,
        slug: product.slug,
      });
    }
  };

  return (
    <div className="py-12 bg-[#FCF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#241307] via-[#4A2D16] to-[#2B1A0E] text-[#FFF8E7] p-8 sm:p-14 mb-14 shadow-2xl border border-[#D99A1E]/30">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D99A1E]/30 text-[#F5D07A] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privilèges & Récoltes Exceptionnelles</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-3">
              Offres Exclusives du Terroir
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed mb-6">
              Bénéficiez de remises éphémères, d'accessoires en bois d'olivier offerts et de la livraison gratuite partout au Maroc.
            </p>

            {/* Live Global Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 inline-flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5D07A] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#F5D07A] animate-pulse" />
                <span>Fin des offres dans :</span>
              </div>
              <div className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base tabular-nums text-white">
                <span className="bg-black/40 px-2 py-1 rounded">{timeLeft.days}j</span> :
                <span className="bg-black/40 px-2 py-1 rounded">{timeLeft.hours}h</span> :
                <span className="bg-black/40 px-2 py-1 rounded">{timeLeft.minutes}m</span> :
                <span className="bg-[#D99A1E] text-[#2B1A0E] px-2 py-1 rounded">{timeLeft.seconds}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="space-y-8">
          {EXCLUSIVE_OFFERS.map((offer) => {
            const product = PRODUCTS.find((p) => p.slug === offer.featuredProductSlug);

            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D99A1E]/20 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Offer Image */}
                <div className="lg:col-span-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF4E8] border border-[#D99A1E]/20">
                    <img
                      src={product?.image || PRODUCTS[0].image}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#D99A1E] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md">
                      {offer.badge}
                    </div>
                  </div>
                </div>

                {/* Offer Content */}
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#8A5A12]">
                    {offer.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#2B1A0E]">
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    {offer.giftsIncluded.map((gift, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#2B1A0E]/90">
                        <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span>{gift}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="lg:col-span-3 bg-[#FAF4E8] p-6 rounded-2xl border border-[#D99A1E]/20 flex flex-col justify-between text-center lg:text-left space-y-4">
                  <div>
                    <div className="flex items-baseline justify-center lg:justify-start gap-2">
                      <span className="text-3xl font-serif font-bold text-[#8A5A12] tabular-nums">
                        {offer.discountPrice} {SITE_CONFIG.currency}
                      </span>
                      <span className="text-sm text-[#2B1A0E]/40 line-through tabular-nums">
                        {offer.originalPrice} {SITE_CONFIG.currency}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#25D366] block mt-0.5">
                      Économie immédiate : {offer.savings} {SITE_CONFIG.currency}
                    </span>
                  </div>

                  {/* Promo code copy box */}
                  <div className="bg-white p-2.5 rounded-xl border border-dashed border-[#D99A1E]/40 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#2B1A0E] tracking-wider">{offer.promoCode}</span>
                    <button
                      onClick={() => handleCopyCode(offer.promoCode)}
                      className="text-[#8A5A12] hover:text-[#2B1A0E] flex items-center gap-1 font-semibold"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedCode === offer.promoCode ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddOfferToCart(offer)}
                      className="btn-honey-wave w-full py-2.5 px-4 rounded-xl bg-[#D99A1E] text-white text-xs font-bold shadow-xs hover:shadow"
                    >
                      Ajouter au panier
                    </button>

                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Salam Alaykoum, je souhaite commander l'offre spéciale : ${offer.title} avec le code ${offer.promoCode} au prix de ${offer.discountPrice} ${SITE_CONFIG.currency}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Commander sur WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
