import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag, MessageCircle } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';

interface HoneyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HoneyQuizModal: React.FC<HoneyQuizModalProps> = ({ isOpen, onClose }) => {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const questions = [
    {
      title: "À quel moment de la journée dégustez-vous votre miel ?",
      subtitle: "Pour accorder l'énergie ou l'apaisement dont votre corps a besoin",
      options: [
        { label: "Au saut du lit à jeun (pour l'immunité et le tonus)", value: "cure", pointsTo: "miel-daghmouss-ait-baamrane" },
        { label: "Au petit-déjeuner tartiné sur du pain chaud ou crêpes", value: "gourmand", pointsTo: "amlou-aux-amandes-traditionnel" },
        { label: "En soirée dans une tisane pour se détendre", value: "soiree", pointsTo: "miel-oranger-taroudant" },
        { label: "Dès les premiers frissons ou maux de gorge", value: "sante", pointsTo: "miel-thym-errachidia" },
      ]
    },
    {
      title: "Quel bienfait naturel recherchez-vous en priorité ?",
      subtitle: "Chaque récolte du terroir marocain possède ses vertus spécifiques",
      options: [
        { label: "Apaiser la gorge et réchauffer les voies respiratoires", value: "gorge", pointsTo: "miel-daghmouss-ait-baamrane" },
        { label: "Faire le plein d'énergie saine (magnésium, argan, amandes)", value: "energie", pointsTo: "amlou-aux-amandes-traditionnel" },
        { label: "Favoriser un sommeil paisible et calmer le stress", value: "sommeil", pointsTo: "miel-oranger-taroudant" },
        { label: "Un trésor antiseptique et protecteur puissant", value: "antiseptique", pointsTo: "miel-thym-errachidia" },
      ]
    },
    {
      title: "Quel profil aromatique préfère votre palais ?",
      subtitle: "De la douceur florale au caractère piquant des plantes du désert",
      options: [
        { label: "Caractère piquant et chaud qui stimule la gorge", value: "piquant", pointsTo: "miel-daghmouss-ait-baamrane" },
        { label: "Saveur riche et toastée d'amandes torréfiées et argan", value: "roaste", pointsTo: "amlou-aux-amandes-traditionnel" },
        { label: "Parfum d'agrumes très doux, fleuri et subtil", value: "fruite", pointsTo: "miel-oranger-taroudant" },
        { label: "Herbacé intense, sauvage et aromatique de montagne", value: "herbace", pointsTo: "miel-thym-errachidia" },
      ]
    }
  ];

  const handleSelectOption = (pointsTo: string) => {
    soundManager.playDropSound();
    const nextAnswers = { ...answers, [currentStep]: pointsTo };
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent recommendation
      const counts: Record<string, number> = {};
      Object.values(nextAnswers).forEach((slug) => {
        counts[slug] = (counts[slug] || 0) + 1;
      });
      let bestSlug = pointsTo;
      let maxCount = 0;
      Object.entries(counts).forEach(([slug, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestSlug = slug;
        }
      });

      const matched = PRODUCTS.find((p) => p.id === bestSlug || p.slug === bestSlug) || PRODUCTS[0];
      setRecommendedProduct(matched);
      setCurrentStep(questions.length); // Results step
    }
  };

  const handleReset = () => {
    soundManager.playDropSound();
    setCurrentStep(0);
    setAnswers({});
    setRecommendedProduct(null);
  };

  if (!isOpen) return null;

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

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden border border-[#D99A1E]/30 z-10"
        >
          {/* Header */}
          <div className="bg-[#2B1A0E] text-[#FFF8E7] p-6 relative">
            <button
              onClick={() => {
                soundManager.playDropSound();
                onClose();
              }}
              className="absolute top-4 right-4 text-[#FFF8E7]/60 hover:text-white p-1 rounded-full"
              aria-label="Fermer le quiz"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99A1E]/20 text-[#D99A1E] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Guide Sensoriel
            </div>
            <h3 className="text-xl font-serif font-bold text-white">
              Quel miel du terroir est fait pour vous ?
            </h3>
            {currentStep < questions.length && (
              <div className="mt-3 flex items-center gap-2">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      i <= currentStep ? 'bg-[#D99A1E]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6">
            {currentStep < questions.length ? (
              <div>
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#8A5A12] block mb-1">
                  Question {currentStep + 1} sur {questions.length}
                </span>
                <h4 className="text-lg font-serif font-bold text-[#2B1A0E] mb-1">
                  {questions[currentStep].title}
                </h4>
                <p className="text-xs text-[#2B1A0E]/70 mb-5">
                  {questions[currentStep].subtitle}
                </p>

                <div className="space-y-3">
                  {questions[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.pointsTo)}
                      className="w-full text-left p-3.5 rounded-xl border border-[#D99A1E]/30 bg-white hover:bg-[#FAF3E4] hover:border-[#D99A1E] transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <span className="text-xs sm:text-sm font-medium text-[#2B1A0E] group-hover:text-[#8A5A12]">
                        {option.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#D99A1E] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : recommendedProduct ? (
              /* Recommendation Screen */
              <div className="text-center">
                <div className="inline-block p-2 rounded-full bg-[#FAF3E4] border border-[#D99A1E]/30 mb-3">
                  <span className="text-3xl">🍯</span>
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-1">
                  Votre accord parfait du terroir
                </span>
                <h4 className="text-2xl font-serif font-bold text-[#2B1A0E] mb-2">
                  {recommendedProduct.name}
                </h4>
                <p className="text-xs text-[#8A5A12] font-semibold mb-4">
                  Origine : {recommendedProduct.origin} · {recommendedProduct.arabicName}
                </p>

                <div className="p-4 bg-[#FAF3E4] rounded-2xl border border-[#D99A1E]/20 text-left mb-6 flex gap-4 items-center">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover bg-white border border-[#D99A1E]/30 shrink-0"
                  />
                  <div>
                    <p className="text-xs text-[#2B1A0E]/80 leading-relaxed line-clamp-2">
                      {recommendedProduct.description}
                    </p>
                    <div className="text-sm font-serif font-bold text-[#8A5A12] mt-2 tabular-nums">
                      {recommendedProduct.variants[0]?.price} {SITE_CONFIG.currency} ({recommendedProduct.variants[0]?.weight})
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    onClick={() => {
                      soundManager.playDropSound();
                      const v = recommendedProduct.variants[0];
                      addItem({
                        productId: recommendedProduct.id,
                        variantId: v.id,
                        name: recommendedProduct.name,
                        arabicName: recommendedProduct.arabicName,
                        weight: v.weight,
                        price: v.price,
                        quantity: 1,
                        image: recommendedProduct.image,
                        slug: recommendedProduct.slug,
                      });
                      onClose();
                    }}
                    className="btn-honey-wave py-2.5 px-4 rounded-xl bg-[#D99A1E] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter au panier</span>
                  </button>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Salam Alaykoum, j'ai fait le quiz sur votre site et mon accord idéal est le ${recommendedProduct.name}. Pouvez-vous me le livrer ?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playDropSound()}
                    className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Commander WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={handleReset}
                  className="text-xs text-[#2B1A0E]/60 hover:text-[#2B1A0E] inline-flex items-center gap-1 py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recommencer le test</span>
                </button>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
