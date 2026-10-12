import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#2B1A0E] text-[#FFF8E7] px-5 py-3 rounded-2xl shadow-2xl border border-[#D99A1E]/40 text-xs font-semibold flex items-center gap-2 max-w-sm text-center"
        >
          <span>🍯</span>
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
