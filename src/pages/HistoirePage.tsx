import React from 'react';
import { HoneyVideoBackground } from '../components/HoneyVideoBackground';
import { SITE_CONFIG } from '../config';
import { ShieldCheck, Heart, Award, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HistoirePage: React.FC = () => {
  return (
    <div className="py-12 bg-[#FCF9F2] min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 sm:py-32 bg-[#201207] text-[#FFF8E7] overflow-hidden mb-16">
        <HoneyVideoBackground variant="calm" overlayOpacity="medium" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF3E4]/15 border border-[#D99A1E]/30 text-[#F5D07A] text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Depuis les Terroirs Apicoles du Maroc</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-6">
            L'Âme & La Pureté de Riad El Aâssal
          </h1>

          <p className="text-base sm:text-lg text-[#FFF8E7]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Une passion familiale consacrée à la sauvegarde des grands miels sauvages et de l'Amlou traditionnel du Royaume du Maroc.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Story Chapter 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12]">
              Chapitre 1 : Les Origines
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B1A0E]">
              La Rencontre avec le Génie des Abeilles Sahariennes
            </h2>
            <p className="text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed">
              L'histoire de Riad El Aâssal prend racine dans l'admiration de la biodiversité marocaine. L'abeille locale, l'<em>Apis mellifera sahariensis</em>, est un prodige de rusticité capable de butiner dans les conditions semi-désertiques les plus rudes pour en extraire des nectars d'une concentration thérapeutique inégalée.
            </p>
            <p className="text-xs sm:text-sm text-[#2B1A0E]/80 leading-relaxed">
              Face à la prolifération de miels industriels chauffés, pasteurisés ou coupés de sirop de sucre, notre maison est née d'un serment : ne jamais altérer la perfection du travail de la ruche.
            </p>
          </div>

          <div className="bg-[#FAF4E8] rounded-3xl p-8 border border-[#D99A1E]/30 shadow-xl">
            <div className="space-y-4 text-xs text-[#2B1A0E]/80">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D99A1E] shrink-0" />
                <span><strong>Récolte à froid exclusive :</strong> Pas de pasteurisation pour préserver 100% des enzymes vivantes.</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#D99A1E] shrink-0" />
                <span><strong>Respect de la ruche :</strong> Réserves hivernales intouchées, alimentation 100% naturelle.</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#D99A1E] shrink-0" />
                <span><strong>Traçabilité certifiée :</strong> Origine précise indiquée sur chaque bocal.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Chapter 2: The Regions */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
              Géographie Sacrée
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B1A0E]">
              Quatre Terroirs d'Exception
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-[#D99A1E]/20 shadow-xs">
              <MapPin className="w-5 h-5 text-[#D99A1E] mb-3" />
              <h3 className="text-base font-serif font-bold text-[#2B1A0E] mb-1">Aït Baâmrane</h3>
              <p className="text-xs text-[#8A5A12] font-semibold mb-2">Anti-Atlas Méridional</p>
              <p className="text-xs text-[#2B1A0E]/70 leading-relaxed">
                Le berceau du Miel de Daghmouss, où les euphorbes épineuses s'épanouissent sous l'influence des brumes atlantiques.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D99A1E]/20 shadow-xs">
              <MapPin className="w-5 h-5 text-[#D99A1E] mb-3" />
              <h3 className="text-base font-serif font-bold text-[#2B1A0E] mb-1">Errachidia</h3>
              <p className="text-xs text-[#8A5A12] font-semibold mb-2">Haut Atlas Oriental</p>
              <p className="text-xs text-[#2B1A0E]/70 leading-relaxed">
                Le terroir d'altitude du thym sauvage de montagne, aromatique, puissant et hautement antiseptique.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D99A1E]/20 shadow-xs">
              <MapPin className="w-5 h-5 text-[#D99A1E] mb-3" />
              <h3 className="text-base font-serif font-bold text-[#2B1A0E] mb-1">Taroudant</h3>
              <p className="text-xs text-[#8A5A12] font-semibold mb-2">Plaine du Souss</p>
              <p className="text-xs text-[#2B1A0E]/70 leading-relaxed">
                Les vergers d'agrumes où naît notre miel d'oranger doux, et la patrie ancestrale de la préparation de l'Amlou.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D99A1E]/20 shadow-xs">
              <MapPin className="w-5 h-5 text-[#D99A1E] mb-3" />
              <h3 className="text-base font-serif font-bold text-[#2B1A0E] mb-1">Oulmès</h3>
              <p className="text-xs text-[#8A5A12] font-semibold mb-2">Moyen Atlas Central</p>
              <p className="text-xs text-[#2B1A0E]/70 leading-relaxed">
                Plateaux calcaires et collines rocheuses parsemées de lavande sauvage stoechas au parfum délicat.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Boutique */}
        <div className="text-center pt-8">
          <Link
            to="/boutique"
            className="btn-honey-wave inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D99A1E] text-white font-bold text-xs sm:text-sm shadow-md"
          >
            Goûter à notre terroir dans la boutique
          </Link>
        </div>
      </div>
    </div>
  );
};
