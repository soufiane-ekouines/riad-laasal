import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

export const HoneyLoader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [show, setShow] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('riad_intro_seen');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem('riad_intro_seen', 'true');
      } catch (e) {
        console.error(e);
      }
      if (onComplete) onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] bg-[#1F1208] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle honey gradient background */}
          <div className="absolute inset-0 bg-radial from-[#D99A1E]/15 via-transparent to-black pointer-events-none" />

          {/* Logo container with liquid honey fill effect */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6">
            <div className="relative mb-6">
              {/* Background outline logo */}
              <div className="opacity-25 grayscale">
                <BrandLogo className="h-20" variant="light" />
              </div>

              {/* Liquid Honey Fill Layer */}
              <motion.div
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0"
              >
                <BrandLogo className="h-20" variant="gold" />
              </motion.div>
            </div>

            {/* Text reveal */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xs uppercase tracking-[0.25em] text-[#D99A1E] font-medium text-center"
            >
              Terroir Apicole d'Exception
            </motion.p>

            {/* Honey progress bar */}
            <div className="w-36 h-0.5 bg-[#4A2D16] mt-4 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#D99A1E] via-[#F3C15D] to-[#8A5A12]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
