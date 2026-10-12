import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { soundManager } from '../utils/sound';

export const AbandonedCartBanner: React.FC = () => {
  const {
    hasAbandonedCartNotice,
    abandonedCartItemCount,
    restoreAbandonedCart,
    dismissAbandonedCartNotice,
  } = useCart();

  if (!hasAbandonedCartNotice || abandonedCartItemCount <= 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-40 bg-[#2B1A0E] text-[#FFF8E7] rounded-2xl p-4 shadow-2xl border border-[#D99A1E]/40 backdrop-blur-md"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D99A1E]/20 flex items-center justify-center shrink-0 border border-[#D99A1E]/40 text-[#D99A1E]">
            <ShoppingBag className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <h4 className="text-sm font-semibold text-[#FFF8E7] flex items-center gap-1.5">
              <span>Trésors retrouvés !</span>
              <span className="text-[11px] bg-[#D99A1E] text-[#2B1A0E] font-bold px-1.5 py-0.5 rounded-sm">
                {abandonedCartItemCount} {abandonedCartItemCount > 1 ? 'articles' : 'article'}
              </span>
            </h4>
            <p className="text-xs text-[#FFF8E7]/80 mt-1 leading-relaxed">
              Vous aviez laissé des miels et saveurs du terroir dans votre panier lors de votre précédente visite.
            </p>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => {
                  soundManager.playDropSound();
                  restoreAbandonedCart();
                }}
                className="btn-honey-wave px-3.5 py-1.5 rounded-lg bg-[#D99A1E] text-[#2B1A0E] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow"
              >
                <span>Reprendre ma commande</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  soundManager.playDropSound();
                  dismissAbandonedCartNotice();
                }}
                className="px-2.5 py-1.5 text-xs text-[#FFF8E7]/60 hover:text-white transition-colors"
              >
                Ignorer
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playDropSound();
              dismissAbandonedCartNotice();
            }}
            className="absolute top-3 right-3 text-[#FFF8E7]/60 hover:text-white transition-colors"
            aria-label="Fermer la notification de panier"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
