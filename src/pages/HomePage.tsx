import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, ChevronDown, CheckCircle2, Star, Truck, Award } from 'lucide-react';
import { HoneyVideoBackground } from '../components/HoneyVideoBackground';
import { PRODUCTS, Product } from '../data/products';
import { EXCLUSIVE_OFFERS } from '../data/offers';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { BentoMosaicSection } from '../components/BentoMosaicSection';
import { MarqueePacksSection } from '../components/MarqueePacksSection';
import { StorytellingSection } from '../components/StorytellingSection';
import { HoneyQuizModal } from '../components/HoneyQuizModal';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';

export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const mainOffer = EXCLUSIVE_OFFERS[0];

  const testimonials = [
    {
      name: "Dr. Karim Berrada",
      city: "Casablanca",
      product: "Miel de Daghmouss & Thym",
      text: "La qualité du Daghmouss d'Aït Baâmrane est incomparable. Le piquant caractéristique en gorge est la preuve irréfutable d'un miel brut et non coupé. Livraison soignée et rapide en 24h.",
      rating: 5,
    },
    {
      name: "Fatima-Zahra Alami",
      city: "Rabat",
      product: "Amlou aux Amandes & Miel d'Oranger",
      text: "L'Amlou a le vrai goût de mon enfance dans le Souss : la torréfaction des amandes est parfaite et l'huile d'argan d'une pureté rare. Mes enfants ne veulent plus de pâtes industrielles.",
      rating: 5,
    },
    {
      name: "Mehdi Tazi",
      city: "Marrakech",
      product: "Coffret Prestige Dégustation",
      text: "Commandé pour un cadeau d'affaires. Le coffret émeraude avec les dorures est magnifique, et les 3 miels ont fait l'unanimité. Très bon échange sur WhatsApp pour la personnalisation.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "Comment savoir si un miel est 100% pur et naturel ?",
      a: "Tous nos miels sont récoltés à froid et ne subissent aucune pasteurisation ni adjonction de glucose ou de sucre. Un miel pur et vivant cristallise naturellement avec le temps et selon la température ambiante : c'est un gage absolu de qualité.",
    },
    {
      q: "Quels sont les délais et frais de livraison au Maroc ?",
      a: `Nous expédions partout au Maroc sous 24 à 48 heures. La livraison est 100% offerte dès ${SITE_CONFIG.freeShippingThreshold} ${SITE_CONFIG.currency} d'achat (ou ${SITE_CONFIG.standardShippingFee} ${SITE_CONFIG.currency} pour les commandes inférieures). Paiement à la réception en espèces.`,
    },
    {
      q: "Pourquoi le Miel de Daghmouss pique-t-il la gorge ?",
      a: "Le Miel de Daghmouss provient des fleurs d'euphorbe résinifère du Sud marocain. Sa substance active naturelle, la résinifératoxine végétale, procure cette sensation de chaleur et de léger picotement dans la gorge, très recherchée pour dégager les bronches.",
    },
    {
      q: "Comment conserver l'Amlou et les miels ?",
      a: "Conservez vos pots à température ambiante, à l'abri de l'humidité et de la lumière directe du soleil. Ne placez jamais le miel au réfrigérateur. Pour l'Amlou, mélangez avec une cuillère avant chaque dégustation pour homogénéiser l'huile d'argan.",
    },
  ];

  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Hypnotic Macro Honey Canvas Background */}
        <HoneyVideoBackground variant="hero" overlayOpacity="medium" />

        <div className="relative z-10 max-w-4xl mx-auto py-24 sm:py-32">
          {/* Natural Terroir Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E4]/15 border border-[#D99A1E]/40 text-[#F5D07A] text-xs font-semibold uppercase tracking-[0.2em] mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5D07A]" />
            <span>Terroir Apicole Marocain d'Exception</span>
          </motion.div>

          {/* Staggered Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-md text-balance"
          >
            L'Or Pur du Maroc, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE59E] via-[#F3C15D] to-[#E6A728]">
              de la Ruche à Votre Table.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-[#FFF8E7]/90 max-w-2xl mx-auto font-light leading-relaxed mb-10 text-balance"
          >
            Miels sauvages d'altitude non chauffés, Amlou traditionnel à l'huile d'argan pure et nectars rares récoltés dans le respect des abeilles de nos terroirs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/boutique"
              onClick={() => soundManager.playDropSound()}
              className="btn-honey-wave w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D99A1E] text-[#2B1A0E] font-bold text-sm shadow-xl shadow-[#D99A1E]/30 flex items-center justify-center gap-2 hover:scale-102"
            >
              <span>Découvrir nos miels</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam Alaykoum Riad El Aâssal, je souhaite avoir des conseils ou passer commande.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playDropSound()}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/30 flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>Commander sur WhatsApp</span>
            </a>
          </motion.div>

          {/* Quiz Button Teaser */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8"
          >
            <button
              onClick={() => {
                soundManager.playDropSound();
                setQuizOpen(true);
              }}
              className="inline-flex items-center gap-2 text-xs text-[#FFE59E] hover:text-white underline underline-offset-4 decoration-[#D99A1E] transition-colors"
            >
              <span>Hésitant ? Faites le test en 3 questions : « Quel miel est fait pour moi ? »</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center text-[#FFF8E7]/60 text-xs animate-bounce pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest mb-1">Découvrir</span>
          <ChevronDown className="w-4 h-4 text-[#D99A1E]" />
        </div>
      </section>

      {/* Drip Transition SVG between Hero and Trust Bar */}
      <div className="relative -mt-1 w-full overflow-hidden leading-none z-20 text-[#FCF9F2]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-10 sm:h-16 fill-current">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* 2. Trust Bar */}
      <section className="bg-[#FCF9F2] py-6 border-b border-[#D99A1E]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <span className="text-xl sm:text-2xl mb-1 block">🌿</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#2B1A0E]">100% Pur & Cru</h3>
              <p className="text-[11px] text-[#2B1A0E]/70">Récolte à froid sans additifs</p>
            </div>
            <div className="p-3">
              <span className="text-xl sm:text-2xl mb-1 block">📍</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#2B1A0E]">Origine Maroc Certifiée</h3>
              <p className="text-[11px] text-[#2B1A0E]/70">Terroirs préservés du Royaume</p>
            </div>
            <div className="p-3">
              <span className="text-xl sm:text-2xl mb-1 block">🚚</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#2B1A0E]">Livraison Express</h3>
              <p className="text-[11px] text-[#2B1A0E]/70">Offerte dès {SITE_CONFIG.freeShippingThreshold} DH</p>
            </div>
            <div className="p-3">
              <span className="text-xl sm:text-2xl mb-1 block">🤝</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#2B1A0E]">Paiement à Réception</h3>
              <p className="text-[11px] text-[#2B1A0E]/70">En espèces à la livraison</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Two Core Categories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
            Deux Univers Gourmands
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1A0E] tracking-tight">
            L'Excellence Apicole & la Tradition de l'Amlou
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Miels du Maroc */}
          <Link
            to="/boutique?cat=miel"
            onClick={() => soundManager.playDropSound()}
            className="group relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 sm:p-10 shadow-xl border border-[#D99A1E]/30"
          >
            <img
              src="/images/products/gamme-miels-400g-thym-oranger-lavande-eucalyptus.jpg"
              alt="Gamme de miels Riad El Aâssal : Thym, Oranger, Lavande et Eucalyptus"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201207]/90 via-[#201207]/45 to-transparent" />

            <div className="relative z-10 text-white">
              <span className="text-xs uppercase tracking-widest text-[#F5D07A] font-semibold block mb-2">
                Nectars Sauvages
              </span>
              <h3 className="text-3xl font-serif font-bold mb-2 group-hover:text-[#F5D07A] transition-colors">
                Nos Miels Purs & Rares
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md mb-6 leading-relaxed">
                Daghmouss piquant d'Aït Baâmrane, Thym des plateaux d'Errachidia, fleurs d'Oranger et Jujubier sauvage.
              </p>
              <span className="btn-honey-wave inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D99A1E] text-[#2B1A0E] text-xs font-bold shadow-md">
                <span>Explorer les Miels ({PRODUCTS.filter(p => p.category === 'miel').length} crus)</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Card 2: Pâtes à tartiner & Amlou */}
          <Link
            to="/boutique?cat=pate-a-tartiner"
            onClick={() => soundManager.playDropSound()}
            className="group relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 sm:p-10 shadow-xl border border-[#D99A1E]/30"
          >
            <img
              src={(PRODUCTS.find(p => p.category === 'pate-a-tartiner') ?? PRODUCTS[0]).image}
              alt="Pot d'Amlou aux Amandes Riad El Aâssal"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201207]/90 via-[#201207]/45 to-transparent" />

            <div className="relative z-10 text-white">
              <span className="text-xs uppercase tracking-widest text-[#F5D07A] font-semibold block mb-2">
                Pâtes à Tartiner du Terroir
              </span>
              <h3 className="text-3xl font-serif font-bold mb-2 group-hover:text-[#F5D07A] transition-colors">
                Le Véritable Amlou Beldi
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md mb-6 leading-relaxed">
                Amandes beldi grillées à point, huile d'argan cosmétique de première pression et miel pur. Zéro compromis.
              </p>
              <span className="btn-honey-wave inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D99A1E] text-[#2B1A0E] text-xs font-bold shadow-md">
                <span>Découvrir l'Amlou Artisanal</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Featured Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
              Les Incontournables
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1A0E] tracking-tight">
              Nos Récoltes Vedettes
            </h2>
          </div>
          <Link
            to="/boutique"
            onClick={() => soundManager.playDropSound()}
            className="text-xs sm:text-sm font-semibold text-[#8A5A12] hover:text-[#2B1A0E] flex items-center gap-1.5 mt-3 sm:mt-0"
          >
            <span>Voir tout le catalogue ({PRODUCTS.length} produits)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. Bento Mosaic Section */}
      <BentoMosaicSection />

      {/* 6. Storytelling Section "Du rucher au pot" */}
      <StorytellingSection />

      {/* 7. Marquee Infinite Showcase */}
      <MarqueePacksSection />

      {/* 8. Exclusive Offers Spotlight with Countdown */}
      {mainOffer && (
        <section className="py-20 bg-gradient-to-br from-[#241307] to-[#3B2211] text-[#FFF8E7] relative overflow-hidden">
          <HoneyVideoBackground variant="calm" overlayOpacity="dark" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#2D1B0F]/90 rounded-3xl p-8 sm:p-12 border border-[#D99A1E]/30 shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99A1E]/20 text-[#F5D07A] text-xs font-semibold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  {mainOffer.badge}
                </span>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  {mainOffer.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#FFF8E7]/80 leading-relaxed max-w-xl">
                  {mainOffer.description}
                </p>

                {/* Gifts included */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs uppercase font-bold text-[#F5D07A] tracking-wider block">
                    Inclus dans cette offre :
                  </span>
                  {mainOffer.giftsIncluded.map((gift, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                      <span>{gift}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-baseline gap-4">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#F5D07A] tabular-nums">
                    {mainOffer.discountPrice} {SITE_CONFIG.currency}
                  </span>
                  <span className="text-base text-white/40 line-through tabular-nums">
                    {mainOffer.originalPrice} {SITE_CONFIG.currency}
                  </span>
                  <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/20 px-2 py-0.5 rounded-sm">
                    Économisez {mainOffer.savings} {SITE_CONFIG.currency}
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    to={`/produit/${mainOffer.featuredProductSlug}`}
                    onClick={() => soundManager.playDropSound()}
                    className="btn-honey-wave w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D99A1E] text-[#2B1A0E] font-bold text-sm shadow-md"
                  >
                    Profiter de l'offre
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Salam Alaykoum, je souhaite commander l'offre spéciale : ${mainOffer.title} à ${mainOffer.discountPrice} ${SITE_CONFIG.currency}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1EBE5D] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Commander sur WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Offer visual box */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group max-w-sm rounded-2xl overflow-hidden border border-[#D99A1E]/40 shadow-2xl">
                  <img
                    src={PRODUCTS.find(p => p.slug === mainOffer.featuredProductSlug)?.image || PRODUCTS[0].image}
                    alt={mainOffer.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#D99A1E] text-[#2B1A0E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Code : {mainOffer.promoCode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. Verified Customer Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
            La Voix de nos Clients
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1A0E] tracking-tight">
            Ils Savourent Riad El Aâssal
          </h2>
          <p className="text-xs sm:text-sm text-[#2B1A0E]/70 mt-2">
            Des milliers de foyers au Maroc font confiance à l'authenticité de nos récoltes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#D99A1E]/20 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed italic mb-6">
                  « {t.text} »
                </p>
              </div>

              <div className="pt-4 border-t border-[#2B1A0E]/08">
                <h4 className="text-sm font-bold text-[#2B1A0E]">{t.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-[#8A5A12] mt-0.5">
                  <span>{t.city}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{t.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9.5 WhatsApp Newsletter Section */}
      <section className="py-14 bg-gradient-to-r from-[#241307] via-[#351D0C] to-[#241307] text-[#FFF8E7] border-y border-[#D99A1E]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#F5D07A] block mb-2">
            Privilège & Terroir
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            Recevoir nos Offres & Nouveautés sur WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-[#FFF8E7]/80 max-w-lg mx-auto mb-6 leading-relaxed">
            Rejoignez notre carnet d'adresses privilégié pour être prévenu en avant-première des récoltes de miel frais et bénéficier de réductions saisonnières.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              soundManager.playDropSound();
              const form = e.currentTarget as HTMLFormElement;
              const name = (form.elements.namedItem('wa_name') as HTMLInputElement)?.value;
              const phone = (form.elements.namedItem('wa_phone') as HTMLInputElement)?.value;
              const text = encodeURIComponent(`Bonjour ${SITE_CONFIG.name}, je m'appelle ${name} (${phone}) et je souhaite recevoir vos offres et nouveautés sur WhatsApp.`);
              window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="text"
              name="wa_name"
              required
              placeholder="Votre prénom"
              className="w-full sm:w-1/2 px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/40 text-xs border border-white/20 focus:outline-none focus:border-[#D99A1E]"
            />
            <input
              type="tel"
              name="wa_phone"
              required
              placeholder="N° WhatsApp (06...)"
              className="w-full sm:w-1/2 px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/40 text-xs border border-white/20 focus:outline-none focus:border-[#D99A1E]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shrink-0 transition-colors shadow-lg flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>S'inscrire</span>
            </button>
          </form>
          <p className="text-[11px] text-[#FFF8E7]/50 mt-3">
            Aucun spam. Désinscription possible à tout moment sur simple message WhatsApp.
          </p>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="py-16 bg-[#FAF4E8] border-t border-[#D99A1E]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
              Questions Fréquentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B1A0E]">
              Tout Savoir sur nos Miels & Commandes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#D99A1E]/20 shadow-2xs"
              >
                <h3 className="text-base font-serif font-bold text-[#2B1A0E] mb-2 flex items-start gap-2">
                  <span className="text-[#D99A1E] font-sans">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-xs text-[#2B1A0E]/70 mb-3">
              Vous avez une question spécifique sur une variété ou un format ?
            </p>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam Alaykoum, j'ai une question sur vos miels.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#128C7E] hover:underline"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Poser ma question à l'apiculteur sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Honey Quiz Modal */}
      <HoneyQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
      />
    </div>
  );
};
