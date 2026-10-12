import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, ArrowRight, Copy, Check } from 'lucide-react';
import { POPUP_CONFIG } from '../data/popup';
import { SITE_CONFIG } from '../config';
import { Link } from 'react-router-dom';
import { soundManager } from '../utils/sound';

export const PromoPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!POPUP_CONFIG.enabled) return;

    // Check if shown in this session
    const seen = sessionStorage.getItem('riad_promo_seen');
    if (seen) return;

    // Timer trigger
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('riad_promo_seen', 'true');
    }, POPUP_CONFIG.delayMs || 8000);

    // Exit intent trigger
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('riad_promo_seen')) {
        setIsOpen(true);
        sessionStorage.setItem('riad_promo_seen', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleCopyCode = () => {
    soundManager.playDropSound();
    navigator.clipboard.writeText(POPUP_CONFIG.discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden border border-[#D99A1E]/30 z-10"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playDropSound();
              setIsOpen(false);
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-[#2B1A0E] hover:bg-white shadow-sm z-20 transition-colors"
            aria-label="Fermer la promotion"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Golden Header Banner */}
          <div className="bg-gradient-to-br from-[#2B1A0E] via-[#4A2D16] to-[#8A5A12] text-[#FFF8E7] p-8 text-center relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D99A1E]/20 rounded-full blur-2xl" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99A1E]/30 text-[#FFF8E7] text-xs font-semibold uppercase tracking-wider mb-3">
              <Gift className="w-3.5 h-3.5 text-[#F5D07A]" />
              {POPUP_CONFIG.badge}
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 leading-tight">
              {POPUP_CONFIG.title}
            </h3>
            <p className="text-sm text-[#FFF8E7]/80 max-w-xs mx-auto">
              {POPUP_CONFIG.subtitle}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 text-center">
            <p className="text-sm text-[#2B1A0E]/80 mb-5 leading-relaxed">
              {POPUP_CONFIG.description}
            </p>

            {/* Discount Code Box */}
            <div className="bg-[#FAF3E4] border-2 border-dashed border-[#D99A1E]/50 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] uppercase font-bold text-[#8A5A12] block tracking-wider">
                  Votre Code Privilège
                </span>
                <span className="text-xl font-mono font-bold tracking-widest text-[#2B1A0E]">
                  {POPUP_CONFIG.discountCode}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="btn-honey-wave px-3.5 py-2 rounded-xl bg-[#D99A1E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Salam Alaykoum ${SITE_CONFIG.name}, je souhaite profiter du code privilège ${POPUP_CONFIG.discountCode} (-10%) sur ma première commande.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  soundManager.playDropSound();
                  setIsOpen(false);
                }}
                className="w-full py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>Commander avec mon code sur WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to={POPUP_CONFIG.linkTo}
                onClick={() => {
                  soundManager.playDropSound();
                  setIsOpen(false);
                }}
                className="btn-honey-wave w-full py-2.5 px-6 rounded-xl bg-[#2B1A0E] text-white font-medium text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>{POPUP_CONFIG.buttonText}</span>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-[#2B1A0E]/50 hover:text-[#2B1A0E] pt-1"
              >
                Non merci, continuer ma visite
              </button>
            </div>

            <p className="text-[11px] text-[#2B1A0E]/50 mt-4">
              {POPUP_CONFIG.disclaimer}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
