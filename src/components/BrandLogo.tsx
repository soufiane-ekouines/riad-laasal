import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'gold' | 'dark' | 'light';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "h-12",
  variant = 'gold',
  showTagline = false,
}) => {
  const isGold = variant === 'gold';
  const isLight = variant === 'light';

  const primaryFill = isGold ? "url(#goldGradient)" : isLight ? "#FFF8E7" : "#2B1A0E";
  const accentFill = isGold ? "url(#goldGradientSecondary)" : isLight ? "#D99A1E" : "#8A5A12";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 460 210"
        className="h-full w-auto max-h-full drop-shadow-sm overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo Riad El Aâssal"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFAD4A" />
            <stop offset="35%" stopColor="#D99A1E" />
            <stop offset="70%" stopColor="#B37710" />
            <stop offset="100%" stopColor="#8A5A12" />
          </linearGradient>
          <linearGradient id="goldGradientSecondary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5D07A" />
            <stop offset="50%" stopColor="#D99A1E" />
            <stop offset="100%" stopColor="#6C450B" />
          </linearGradient>
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D99A1E" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Bee Emblem (Top Right) */}
        <g transform="translate(330, 8)" filter="url(#subtleGlow)">
          {/* Head */}
          <circle cx="65" cy="18" r="9" fill={primaryFill} />
          {/* Antennae */}
          <path d="M60 11C57 5 52 3 48 6" stroke={accentFill} strokeWidth="3" strokeLinecap="round" />
          <path d="M70 11C73 5 78 3 82 6" stroke={accentFill} strokeWidth="3" strokeLinecap="round" />
          <circle cx="48" cy="6" r="2.5" fill={accentFill} />
          <circle cx="82" cy="6" r="2.5" fill={accentFill} />

          {/* Wings - Stylized loops */}
          <ellipse cx="40" cy="28" rx="26" ry="14" transform="rotate(-25 40 28)" stroke={accentFill} strokeWidth="4.5" fill="none" />
          <ellipse cx="90" cy="28" rx="26" ry="14" transform="rotate(25 90 28)" stroke={accentFill} strokeWidth="4.5" fill="none" />
          <ellipse cx="48" cy="40" rx="18" ry="9" transform="rotate(-10 48 40)" stroke={primaryFill} strokeWidth="3.5" fill="none" />
          <ellipse cx="82" cy="40" rx="18" ry="9" transform="rotate(10 82 40)" stroke={primaryFill} strokeWidth="3.5" fill="none" />

          {/* Bee Abdomen / Stripes */}
          <path d="M50 48C50 48 65 42 80 48C80 62 74 84 65 92C56 84 50 62 50 48Z" fill={primaryFill} />
          <path d="M53 58H77" stroke={isLight ? "#2B1A0E" : "#FFF8E7"} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M56 68H74" stroke={isLight ? "#2B1A0E" : "#FFF8E7"} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M60 78H70" stroke={isLight ? "#2B1A0E" : "#FFF8E7"} strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Arabic Calligraphy: "رياض" (Top Row) */}
        <g transform="translate(10, 5)">
          <text
            x="290"
            y="65"
            textAnchor="end"
            fontSize="78"
            fontWeight="bold"
            fontFamily="'Cormorant Garamond', 'Amiri', serif"
            fill={primaryFill}
            letterSpacing="2"
          >
            رياض
          </text>
        </g>

        {/* Arabic Calligraphy: "العسل" (Middle Row with architectural horizontal extension) */}
        <g transform="translate(10, 5)">
          <text
            x="320"
            y="135"
            textAnchor="end"
            fontSize="88"
            fontWeight="bold"
            fontFamily="'Cormorant Garamond', 'Amiri', serif"
            fill={primaryFill}
            letterSpacing="4"
          >
            العسل
          </text>
          {/* Calligraphic connecting underline flourish */}
          <path
            d="M20 142H320"
            stroke={accentFill}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Latin Typography: "RIAD EL AÂSSAL" (Bottom Row) */}
        <g transform="translate(15, 185)">
          <text
            x="0"
            y="0"
            fontSize="32"
            fontWeight="600"
            fontFamily="'Playfair Display', Georgia, serif"
            letterSpacing="9"
            fill={primaryFill}
          >
            RIAD EL AÂSSAL
          </text>
        </g>
      </svg>
      {showTagline && (
        <div className="hidden sm:flex flex-col border-l border-[#D99A1E]/30 pl-3">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#D99A1E]">Terroir Marocain</span>
          <span className="text-[9px] text-[#2B1A0E]/70 dark:text-[#FFF8E7]/70">Miels purs & Amlou</span>
        </div>
      )}
    </div>
  );
};
