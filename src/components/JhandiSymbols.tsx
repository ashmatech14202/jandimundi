// ═══════════════════════════════════════════════════════════════
// JHANDI MUNDA — UNIFIED GUTI DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════
//
// DESIGN LANGUAGE:
//   - Base: Circular token with subtle gradient + soft shadow
//   - Inner: Clean, minimal symbol centered inside
//   - Palette: Charcoal (#2D2D2D) for dark pieces,
//             Crimson (#C62828) for red pieces,
//             White (#FFFFFF) for inner details
//   - Stroke: Consistent 2.5px across all symbols
//   - Style: Flat with soft depth (gradient ring + inner shadow)
//
// 6 TOKENS: Crown, Diamond, Heart, Spade, Flag, Club
// ═══════════════════════════════════════════════════════════════

const DARK = "#2D2D2D";
const DARK_LIGHT = "#444444";
const RED = "#C62828";
const RED_LIGHT = "#E53935";
const WHITE = "#FFFFFF";
const STROKE = 2.5;

// Shared circular token base
const TokenBase = ({
  children,
  color,
  colorLight,
  id,
  size,
}: {
  children: React.ReactNode;
  color: string;
  colorLight: string;
  id: string;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Outer ring gradient */}
      <radialGradient id={`ring-${id}`} cx="0.4" cy="0.35" r="0.7">
        <stop offset="0%" stopColor={colorLight} />
        <stop offset="100%" stopColor={color} />
      </radialGradient>
      {/* Inner shadow */}
      <radialGradient id={`inner-${id}`} cx="0.5" cy="0.45" r="0.5">
        <stop offset="0%" stopColor={WHITE} stopOpacity="0.12" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      {/* Drop shadow */}
      <filter id={`shadow-${id}`} x="-10%" y="-5%" width="120%" height="130%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Shadow layer */}
    <circle cx="60" cy="62" r="52" fill="rgba(0,0,0,0.15)" />

    {/* Outer ring */}
    <circle
      cx="60"
      cy="60"
      r="52"
      fill={`url(#ring-${id})`}
      filter={`url(#shadow-${id})`}
    />

    {/* Inner circle (lighter) */}
    <circle cx="60" cy="60" r="42" fill={color} />

    {/* Subtle highlight */}
    <circle cx="60" cy="60" r="42" fill={`url(#inner-${id})`} />

    {/* Inner ring accent */}
    <circle
      cx="60"
      cy="60"
      r="42"
      fill="none"
      stroke={WHITE}
      strokeWidth="1"
      strokeOpacity="0.15"
    />

    {/* Symbol content */}
    {children}
  </svg>
);

// ── 1. CROWN ──────────────────────────────────────────────────
export const CrownSymbol = ({ size = 80 }: { size?: number }) => (
  <TokenBase color={DARK} colorLight={DARK_LIGHT} id="crown" size={size}>
    {/* Simple modern crown */}
    <path
      d="M35 72 L35 55 L45 65 L53 48 L60 60 L67 48 L75 65 L85 55 L85 72 Z"
      fill={WHITE}
      stroke={WHITE}
      strokeWidth={STROKE}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    {/* Base bar */}
    <rect x="35" y="72" width="50" height="6" rx="2" fill={WHITE} />
    {/* Three dots on crown */}
    <circle cx="45" cy="54" r="2.5" fill={WHITE} />
    <circle cx="60" cy="47" r="2.5" fill={WHITE} />
    <circle cx="75" cy="54" r="2.5" fill={WHITE} />
  </TokenBase>
);

// ── 2. DIAMOND ────────────────────────────────────────────────
export const DiamondSymbol = ({ size = 80 }: { size?: number }) => (
  <TokenBase color={RED} colorLight={RED_LIGHT} id="diamond" size={size}>
    {/* 4-pointed star / diamond */}
    <path
      d="M60 30 L72 52 L92 60 L72 68 L60 90 L48 68 L28 60 L48 52 Z"
      fill={WHITE}
      stroke={WHITE}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
    {/* Inner diamond */}
    <path
      d="M60 42 L67 55 L78 60 L67 65 L60 78 L53 65 L42 60 L53 55 Z"
      fill={RED}
      stroke="none"
    />
    {/* Center dot */}
    <circle cx="60" cy="60" r="3" fill={WHITE} />
  </TokenBase>
);

// ── 3. HEART ──────────────────────────────────────────────────
export const HeartSymbol = ({ size = 80 }: { size?: number }) => (
  <TokenBase color={RED} colorLight={RED_LIGHT} id="heart" size={size}>
    {/* Clean heart shape */}
    <path
      d="M60 82 C60 82, 34 65, 34 50 C34 40, 42 34, 50 34 C55 34, 58 37, 60 40 C62 37, 65 34, 70 34 C78 34, 86 40, 86 50 C86 65, 60 82, 60 82Z"
      fill={WHITE}
      stroke={WHITE}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
  </TokenBase>
);

// ── 4. SPADE ──────────────────────────────────────────────────
export const SpadeSymbol = ({ size = 80 }: { size?: number }) => (
  <TokenBase color={DARK} colorLight={DARK_LIGHT} id="spade" size={size}>
    {/* Clean spade shape */}
    <path
      d="M60 32 C60 32, 34 52, 34 65 C34 75, 42 80, 50 76 C50 76, 48 82, 46 86 L60 86 L74 86 C72 82, 70 76, 70 76 C78 80, 86 75, 86 65 C86 52, 60 32, 60 32Z"
      fill={WHITE}
      stroke={WHITE}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
  </TokenBase>
);

// ── 5. FLAG ───────────────────────────────────────────────────
export const FlagSymbol = ({ size = 80 }: { size?: number }) => (
  <TokenBase color={RED} colorLight={RED_LIGHT} id="flag" size={size}>
    {/* Flag pole */}
    <line
      x1="42"
      y1="35"
      x2="42"
      y2="85"
      stroke={WHITE}
      strokeWidth={STROKE + 0.5}
      strokeLinecap="round"
    />
    {/* Flag body - clean pennant */}
    <path
      d="M44 35 L80 45 L44 58 Z"
      fill={WHITE}
      stroke={WHITE}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
    {/* Small base */}
    <line x1="36" y1="85" x2="48" y2="85" stroke={WHITE} strokeWidth={STROKE} strokeLinecap="round" />
  </TokenBase>
);

// ── 6. CLUB ───────────────────────────────────────────────────
export const ClubSymbol = ({ size = 80 }: { size?: number }) => (
  <TokenBase color={DARK} colorLight={DARK_LIGHT} id="club" size={size}>
    {/* Top circle */}
    <circle cx="60" cy="42" r="11" fill={WHITE} />
    {/* Left circle */}
    <circle cx="47" cy="58" r="11" fill={WHITE} />
    {/* Right circle */}
    <circle cx="73" cy="58" r="11" fill={WHITE} />
    {/* Center fill */}
    <circle cx="60" cy="52" r="6" fill={WHITE} />
    {/* Stem */}
    <path
      d="M56 64 L60 82 L64 64"
      fill={WHITE}
      stroke={WHITE}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
    {/* Base bar */}
    <line x1="52" y1="82" x2="68" y2="82" stroke={WHITE} strokeWidth={STROKE} strokeLinecap="round" />
  </TokenBase>
);
