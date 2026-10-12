import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const defaultMessage = encodeURIComponent(
    `Salam Alaykoum ${SITE_CONFIG.name}, je souhaite me renseigner ou passer commande d'un de vos miels purs / amlou.`
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2 pointer-events-auto">
      {/* Tooltip speech bubble */}
      {tooltipVisible && (
        <div className="relative bg-white text-[#2B1A0E] text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl border border-[#D99A1E]/30 flex items-center gap-2 max-w-[220px] animate-bounce">
          <span>Besoin d'un conseil ou commander ? 🍯</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTooltipVisible(false);
            }}
            className="text-black/40 hover:text-black/80 ml-1"
            aria-label="Fermer l'infobulle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-[#D99A1E]/30 transform rotate-45" />
        </div>
      )}

      {/* Pulsing Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundManager.playDropSound()}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl shadow-[#25D366]/40 transition-transform duration-300 hover:scale-105 active:scale-95"
        aria-label="Commander sur WhatsApp"
      >
        {/* Pulsing halo */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>
    </div>
  );
};
