import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'gold' | 'dark' | 'light';
  showTagline?: boolean;
}

// Logo officiel (doré, fond transparent) : lisible sur fond clair comme sur fond sombre.
// 'dark' l'assombrit pour les rares fonds dorés/clairs où l'or manquerait de contraste.
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "h-12",
  variant = 'gold',
  showTagline = false,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src="/images/logo-riad-el-aassal.png"
        alt="Riad El Aâssal – رياض العسل"
        width={480}
        height={299}
        decoding="async"
        draggable={false}
        className={`h-full w-auto max-h-full drop-shadow-sm ${variant === 'dark' ? 'brightness-50' : ''}`}
      />
      {showTagline && (
        <div className="hidden sm:flex flex-col border-l border-[#D99A1E]/30 pl-3">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#D99A1E]">Terroir Marocain</span>
          <span className="text-[9px] text-[#2B1A0E]/70 dark:text-[#FFF8E7]/70">Miels purs & Amlou</span>
        </div>
      )}
    </div>
  );
};
