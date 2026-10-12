import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/sound';

export const StorytellingSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Les Fleurs & Terroirs Sauvages",
      arabic: "أزهار الطبيعة المغربية العذراء",
      tagline: "Une flore endémique unique entre océan, plaines et montagnes",
      description: "Nos ruches sont installées dans les sanctuaires floraux les plus purs du Maroc : les euphorbes piquantes d'Aït Baâmrane balayées par les brumes océaniques, les forêts de thym hauturier d'Errachidia, et les vallées embaumées d'orangers de Taroudant.",
      detail: "Zéro pesticide, éloignement garanti de toute pollution urbaine ou industrielle.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#D99A1E]" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M50 85V45M50 45C42 45 35 38 35 30C35 22 50 15 50 15C50 15 65 22 65 30C65 38 58 45 50 45Z" fill="rgba(217,154,30,0.15)"/>
          <path d="M50 60C38 60 25 50 25 50C25 50 38 40 50 40M50 70C62 70 75 60 75 60C75 60 62 50 50 50"/>
        </svg>
      )
    },
    {
      num: "02",
      title: "L'Abeille & L'Apiculture Raisonnée",
      arabic: "النحل البلدي ورعاية الخلية",
      tagline: "Le respect absolu des colonies et du rythme naturel",
      description: "Nous travaillons avec l'abeille locale marocaine (Apis mellifera sahariensis et intermissa), parfaitement adaptée à nos climats extrêmes. Nous laissons toujours à nos abeilles une réserve généreuse de miel pour leur propre alimentation hivernale.",
      detail: "Pas de nourrissement artificiel au sucre : leur miel est le leur avant d'être le nôtre.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#D99A1E]" fill="none" stroke="currentColor" strokeWidth="2.5">
          <ellipse cx="50" cy="50" rx="20" ry="14" fill="rgba(217,154,30,0.2)"/>
          <path d="M40 50H60M38 44H62M42 56H58" strokeLinecap="round"/>
          <ellipse cx="36" cy="30" rx="14" ry="8" transform="rotate(-30 36 30)"/>
          <ellipse cx="64" cy="30" rx="14" ry="8" transform="rotate(30 64 30)"/>
          <circle cx="50" cy="30" r="5" fill="currentColor"/>
        </svg>
      )
    },
    {
      num: "03",
      title: "La Récolte à Froid & Décantation",
      arabic: "الجني على البارد بدون تسخين",
      tagline: "Extraction manuelle pour préserver enzymes et saveurs",
      description: "Les cadres de miel sont désoperculés à la main puis centrifugés à froid sans jamais dépasser la température naturelle de la ruche (35°C). Le miel repose ensuite plusieurs semaines en cuves de décantation en inox alimentaire pour laisser remonter les micro-bulles.",
      detail: "Non pasteurisé, non micro-filtré : tous les grains de pollen et principes actifs restent intacts.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#D99A1E]" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M30 30L50 15L70 30V75C70 80 62 85 50 85C38 85 30 80 30 75V30Z" fill="rgba(217,154,30,0.15)"/>
          <path d="M40 45C45 42 55 42 60 45M40 55C45 52 55 52 60 55M50 65V75"/>
          <circle cx="50" cy="78" r="3" fill="currentColor"/>
        </svg>
      )
    },
    {
      num: "04",
      title: "La Mise en Pot Pure & Terroir Garanti",
      arabic: "التعليب الأصيل وضمان الجودة",
      tagline: "Du rucher jusqu'à votre table avec traçabilité totale",
      description: "Chaque bocal est scellé avec notre ruban d'inviolabilité garantissant l'origine précise (Taroudant, Aït Baâmrane, Oulmès...). Un trésor brut prêt à illuminer vos petits-déjeuners et sublimer vos rituels de santé au quotidien.",
      detail: "Conservation optimale dans du verre noble avec couvercle doré protecteur.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#D99A1E]" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="32" y="24" width="36" height="12" rx="3" fill="currentColor"/>
          <rect x="26" y="36" width="48" height="50" rx="8" fill="rgba(217,154,30,0.2)"/>
          <path d="M50 48V68M44 54H56M46 62H54" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-[#FAF4E8] relative overflow-hidden border-y border-[#D99A1E]/15">
      {/* Decorative Honeycomb SVG in background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
            Notre Savoir-Faire Artisanal
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1A0E] tracking-tight">
            Du Rucher au Pot : Le Chemin de la Pureté
          </h2>
          <p className="text-sm text-[#2B1A0E]/70 mt-3 leading-relaxed">
            Découvrez les 4 étapes méticuleuses qui font de chaque pot Riad El Aâssal un grand cru d'exception.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          {steps.map((step, idx) => (
            <button
              key={step.num}
              onClick={() => {
                soundManager.playDropSound();
                setActiveStep(idx);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                activeStep === idx
                  ? 'bg-[#2B1A0E] text-[#FFF8E7] shadow-md scale-102'
                  : 'bg-white text-[#2B1A0E]/80 hover:bg-[#F3E7D3] border border-[#D99A1E]/20'
              }`}
            >
              <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                activeStep === idx ? 'bg-[#D99A1E] text-white' : 'bg-[#FAF4E8] text-[#8A5A12]'
              }`}>
                {step.num}
              </span>
              <span>{step.title.split(' : ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Step Content Display */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#D99A1E]/20 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
            >
              <div className="flex flex-col items-center justify-center p-8 bg-[#FCF9F2] rounded-2xl border border-[#D99A1E]/20 text-center">
                <div className="p-4 bg-white rounded-full shadow-md mb-4 border border-[#D99A1E]/30">
                  {steps[activeStep].icon}
                </div>
                <span className="text-2xl font-serif font-bold text-[#8A5A12] block">
                  Étape {steps[activeStep].num}
                </span>
                <span className="text-xs text-[#2B1A0E]/60 font-serif mt-1">
                  {steps[activeStep].arabic}
                </span>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h3 className="text-2xl font-serif font-bold text-[#2B1A0E]">
                  {steps[activeStep].title}
                </h3>
                <p className="text-sm font-semibold text-[#8A5A12]">
                  {steps[activeStep].tagline}
                </p>
                <p className="text-sm text-[#2B1A0E]/80 leading-relaxed">
                  {steps[activeStep].description}
                </p>
                <div className="pt-3 border-t border-[#2B1A0E]/10 flex items-center gap-2 text-xs font-medium text-[#2B1A0E]/90 bg-[#FAF4E8] p-3 rounded-xl">
                  <span className="text-[#D99A1E] text-base">🍯</span>
                  <span>{steps[activeStep].detail}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
