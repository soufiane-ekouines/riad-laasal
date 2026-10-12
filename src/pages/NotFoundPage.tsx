import React from 'react';
import { Link } from 'react-router-dom';
import { soundManager } from '../utils/sound';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-28 px-4 text-center min-h-[70vh] flex flex-col items-center justify-center bg-[#FCF9F2]">
      <div className="w-24 h-24 rounded-full bg-[#FAF3E4] border border-[#D99A1E]/30 flex items-center justify-center text-4xl mb-6 shadow-inner">
        🍯
      </div>
      <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
        Erreur 404 · Page Égarée
      </span>
      <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2B1A0E] mb-3">
        Même les abeilles butineuses s'égarent parfois
      </h1>
      <p className="text-xs sm:text-sm text-[#2B1A0E]/70 max-w-md mx-auto leading-relaxed mb-8">
        La page ou le nectar que vous cherchez n'existe plus ou a été déplacé vers une autre vallée de notre ruche.
      </p>
      <Link
        to="/"
        onClick={() => soundManager.playDropSound()}
        className="btn-honey-wave px-8 py-3.5 rounded-xl bg-[#D99A1E] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <span>Retourner à l'accueil du Riad</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
