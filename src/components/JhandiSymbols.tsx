// ═══════════════════════════════════════════════════════════════
// JHANDI MUNDA — EXACT TRADITIONAL GUTI REPRODUCTIONS
// ═══════════════════════════════════════════════════════════════
import crownImage from "@/assets/crown-guti.jpg";
// Flat vector, no shadows, no gradients
// Colors: Black #1A1A1A, Red #B7352A, White #FFFFFF
// Bold outlines, exact traditional shapes
// ═══════════════════════════════════════════════════════════════

const BK = "#1A1A1A";
const RD = "#B7352A";
const WH = "#FFFFFF";

// ── 1. CLUB (Chiria) ──────────────────────────────────────────
// Three circles in trefoil, each with concentric rings, triangle stem
export const ClubSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top circle - concentric rings */}
    <circle cx="100" cy="55" r="42" fill={BK} />
    <circle cx="100" cy="55" r="30" fill={WH} />
    <circle cx="100" cy="55" r="22" fill={BK} />
    <circle cx="100" cy="55" r="12" fill={WH} />
    <circle cx="100" cy="55" r="5" fill={BK} />

    {/* Bottom-left circle */}
    <circle cx="58" cy="125" r="42" fill={BK} />
    <circle cx="58" cy="125" r="30" fill={WH} />
    <circle cx="58" cy="125" r="22" fill={BK} />
    <circle cx="58" cy="125" r="12" fill={WH} />
    <circle cx="58" cy="125" r="5" fill={BK} />

    {/* Bottom-right circle */}
    <circle cx="142" cy="125" r="42" fill={BK} />
    <circle cx="142" cy="125" r="30" fill={WH} />
    <circle cx="142" cy="125" r="22" fill={BK} />
    <circle cx="142" cy="125" r="12" fill={WH} />
    <circle cx="142" cy="125" r="5" fill={BK} />

    {/* Center connector fill */}
    <circle cx="100" cy="95" r="20" fill={BK} />
    <circle cx="80" cy="85" r="14" fill={BK} />
    <circle cx="120" cy="85" r="14" fill={BK} />

    {/* Stem - pointed triangle */}
    <polygon points="88,158 112,158 100,200" fill={BK} />
  </svg>
);

// ── 2. SPADE (Hukum) ──────────────────────────────────────────
// Pointed top with horizontal white stripes, vertical center line, two circle eyes
export const SpadeSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main spade body */}
    <path
      d="M100 5 C100 5, 15 85, 15 130 C15 165, 48 178, 72 162 L68 185 L100 185 L132 185 L128 162 C152 178, 185 165, 185 130 C185 85, 100 5, 100 5Z"
      fill={BK}
    />

    {/* Horizontal white stripes in upper triangle */}
    <line x1="75" y1="42" x2="125" y2="42" stroke={WH} strokeWidth="4" />
    <line x1="65" y1="54" x2="135" y2="54" stroke={WH} strokeWidth="4" />
    <line x1="55" y1="66" x2="145" y2="66" stroke={WH} strokeWidth="4" />
    <line x1="47" y1="78" x2="153" y2="78" stroke={WH} strokeWidth="4" />
    <line x1="40" y1="90" x2="160" y2="90" stroke={WH} strokeWidth="4" />

    {/* Center vertical line through stripes */}
    <line x1="100" y1="10" x2="100" y2="98" stroke={WH} strokeWidth="2.5" />

    {/* Left eye - concentric */}
    <circle cx="62" cy="128" r="26" fill={BK} stroke={WH} strokeWidth="4" />
    <circle cx="62" cy="128" r="14" fill={BK} stroke={WH} strokeWidth="3" />
    <circle cx="62" cy="128" r="5" fill={WH} />

    {/* Right eye - concentric */}
    <circle cx="138" cy="128" r="26" fill={BK} stroke={WH} strokeWidth="4" />
    <circle cx="138" cy="128" r="14" fill={BK} stroke={WH} strokeWidth="3" />
    <circle cx="138" cy="128" r="5" fill={WH} />

    {/* Small triangle between eyes at bottom */}
    <polygon points="90,155 110,155 100,172" fill={BK} />
  </svg>
);

// ── 3. FLAG (Jhandi) ──────────────────────────────────────────
// Waving flag with thick black outline, red checkered grid inside, pole with fork
export const FlagSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Flag cloth - thick outer black shape, angular waving */}
    <path
      d="M125 18 C90 12, 55 35, 35 30 C20 55, 25 95, 40 120 C65 115, 100 130, 130 122 C150 90, 148 50, 125 18Z"
      fill={BK}
      stroke={BK}
      strokeWidth="8"
      strokeLinejoin="round"
    />

    {/* Red fill inside with white border */}
    <path
      d="M118 28 C90 23, 62 42, 45 38 C33 58, 35 90, 48 112 C68 108, 98 120, 122 114 C138 86, 136 55, 118 28Z"
      fill={RD}
    />

    {/* Crosshatch grid - horizontal */}
    <line x1="46" y1="48" x2="128" y2="42" stroke={BK} strokeWidth="3" />
    <line x1="42" y1="58" x2="132" y2="53" stroke={BK} strokeWidth="3" />
    <line x1="39" y1="68" x2="134" y2="64" stroke={BK} strokeWidth="3" />
    <line x1="37" y1="78" x2="136" y2="75" stroke={BK} strokeWidth="3" />
    <line x1="38" y1="88" x2="135" y2="86" stroke={BK} strokeWidth="3" />
    <line x1="40" y1="98" x2="132" y2="97" stroke={BK} strokeWidth="3" />
    <line x1="44" y1="107" x2="128" y2="108" stroke={BK} strokeWidth="3" />

    {/* Crosshatch grid - vertical/diagonal */}
    <line x1="60" y1="35" x2="56" y2="112" stroke={BK} strokeWidth="3" />
    <line x1="75" y1="30" x2="72" y2="114" stroke={BK} strokeWidth="3" />
    <line x1="90" y1="27" x2="88" y2="116" stroke={BK} strokeWidth="3" />
    <line x1="105" y1="27" x2="104" y2="118" stroke={BK} strokeWidth="3" />
    <line x1="118" y1="30" x2="118" y2="116" stroke={BK} strokeWidth="3" />

    {/* Pole - thick */}
    <line x1="138" y1="22" x2="138" y2="180" stroke={BK} strokeWidth="7" strokeLinecap="round" />

    {/* Pole top hook */}
    <path d="M138 20 C138 12, 130 8, 124 14" stroke={BK} strokeWidth="6" fill="none" strokeLinecap="round" />

    {/* Three-pronged fork at bottom */}
    <line x1="138" y1="180" x2="120" y2="210" stroke={BK} strokeWidth="6" strokeLinecap="round" />
    <line x1="138" y1="180" x2="156" y2="210" stroke={BK} strokeWidth="6" strokeLinecap="round" />
    <line x1="138" y1="185" x2="138" y2="215" stroke={BK} strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// ── 4. CROWN (Mukut) ──────────────────────────────────────────
// Black crown with red heart inside, arc of dots, cross on top, decorative base
export const CrownSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cross on top - pointed tip */}
    <polygon points="100,0 95,10 105,10" fill={BK} />
    <rect x="96" y="8" width="8" height="22" fill={BK} />
    <rect x="82" y="13" width="36" height="9" fill={BK} />
    {/* Cross arm pointed ends */}
    <polygon points="82,17.5 76,11 76,24" fill={BK} />
    <polygon points="118,17.5 124,11 124,24" fill={BK} />

    {/* Stem */}
    <rect x="97" y="28" width="6" height="12" fill={BK} />

    {/* Circle ring connector */}
    <circle cx="100" cy="45" r="7" fill={BK} />
    <circle cx="100" cy="45" r="3.5" fill={WH} />

    {/* Arc of dots - semicircle, bold */}
    {Array.from({ length: 13 }, (_, i) => {
      const angle = Math.PI + (Math.PI * i) / 12;
      const cx = 100 + Math.cos(angle) * 70;
      const cy = 112 + Math.sin(angle) * 58;
      return <circle key={i} cx={cx} cy={cy} r="8.5" fill={BK} />;
    })}

    {/* Crown body - 3 rounded lobes like reference */}
    <path
      d="M40 148 L40 115 Q40 80, 62 80 Q78 80, 78 98 Q78 80, 100 72 Q122 80, 122 98 Q122 80, 138 80 Q160 80, 160 115 L160 148 Z"
      fill={BK}
    />

    {/* Red heart inside crown - larger, more prominent */}
    <path
      d="M65 116 C65 98, 82 88, 100 104 C118 88, 135 98, 135 116 C135 136, 100 155, 100 155 C100 155, 65 136, 65 116Z"
      fill={RD}
    />

    {/* Heart curved stripes - RED stripes visible on red heart (use lighter red / create depth) */}
    {/* Left curved lines */}
    <path d="M74 113 C74 100, 88 92, 100 104" fill="none" stroke={BK} strokeWidth="4" strokeLinecap="round" />
    <path d="M78 120 C78 106, 90 97, 100 110" fill="none" stroke={BK} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M82 127 C82 115, 92 106, 100 116" fill="none" stroke={BK} strokeWidth="3" strokeLinecap="round" />
    <path d="M88 134 C88 124, 94 116, 100 122" fill="none" stroke={BK} strokeWidth="2.5" strokeLinecap="round" />
    {/* Right curved lines (mirrored) */}
    <path d="M126 113 C126 100, 112 92, 100 104" fill="none" stroke={BK} strokeWidth="4" strokeLinecap="round" />
    <path d="M122 120 C122 106, 110 97, 100 110" fill="none" stroke={BK} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M118 127 C118 115, 108 106, 100 116" fill="none" stroke={BK} strokeWidth="3" strokeLinecap="round" />
    <path d="M112 134 C112 124, 106 116, 100 122" fill="none" stroke={BK} strokeWidth="2.5" strokeLinecap="round" />

    {/* Crown base bar with line above */}
    <rect x="36" y="148" width="128" height="6" fill={BK} />
    <rect x="36" y="154" width="128" height="18" rx="2" fill={BK} />

    {/* Base decorative ovals */}
    {[52, 66, 80, 94, 108, 122, 136, 150].map((x, i) => (
      <ellipse key={i} cx={x} cy="163" rx="4" ry="5.5" fill={WH} />
    ))}
  </svg>
);

// ── 5. HEART (Pan) ────────────────────────────────────────────
// Same shape as spade but in RED - pointed top, horizontal stripes, two circle eyes
export const HeartSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main body - same shape as spade but red */}
    <path
      d="M100 5 C100 5, 15 85, 15 130 C15 165, 48 178, 72 162 L68 185 L100 185 L132 185 L128 162 C152 178, 185 165, 185 130 C185 85, 100 5, 100 5Z"
      fill={RD}
    />

    {/* Red outline */}
    <path
      d="M100 5 C100 5, 15 85, 15 130 C15 165, 48 178, 72 162 L68 185 L100 185 L132 185 L128 162 C152 178, 185 165, 185 130 C185 85, 100 5, 100 5Z"
      fill="none"
      stroke={RD}
      strokeWidth="2"
    />

    {/* Horizontal white stripes */}
    <line x1="75" y1="42" x2="125" y2="42" stroke={WH} strokeWidth="4" />
    <line x1="65" y1="54" x2="135" y2="54" stroke={WH} strokeWidth="4" />
    <line x1="55" y1="66" x2="145" y2="66" stroke={WH} strokeWidth="4" />
    <line x1="47" y1="78" x2="153" y2="78" stroke={WH} strokeWidth="4" />
    <line x1="40" y1="90" x2="160" y2="90" stroke={WH} strokeWidth="4" />

    {/* Center vertical line */}
    <line x1="100" y1="10" x2="100" y2="98" stroke={WH} strokeWidth="2.5" />

    {/* Left eye - concentric */}
    <circle cx="62" cy="128" r="26" fill={RD} stroke={WH} strokeWidth="4" />
    <circle cx="62" cy="128" r="14" fill={RD} stroke={WH} strokeWidth="3" />
    <circle cx="62" cy="128" r="5" fill={WH} />

    {/* Right eye - concentric */}
    <circle cx="138" cy="128" r="26" fill={RD} stroke={WH} strokeWidth="4" />
    <circle cx="138" cy="128" r="14" fill={RD} stroke={WH} strokeWidth="3" />
    <circle cx="138" cy="128" r="5" fill={WH} />
  </svg>
);

// ── 6. DIAMOND (Burja) ────────────────────────────────────────
// Red 4-pointed concave star with geometric lattice/sunburst pattern
export const DiamondSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer 4-pointed concave star shape - deeper concavity */}
    <path
      d="M100 5 C112 35, 165 35, 195 100 C165 165, 112 165, 100 195 C88 165, 35 165, 5 100 C35 35, 88 35, 100 5Z"
      fill={RD}
    />

    {/* Radiating white lines from center to tips - creating lattice */}
    {/* Cardinal directions */}
    <line x1="100" y1="15" x2="100" y2="185" stroke={WH} strokeWidth="5" />
    <line x1="15" y1="100" x2="185" y2="100" stroke={WH} strokeWidth="5" />

    {/* Diagonal lines to corners */}
    <line x1="48" y1="38" x2="152" y2="162" stroke={WH} strokeWidth="4.5" />
    <line x1="152" y1="38" x2="48" y2="162" stroke={WH} strokeWidth="4.5" />

    {/* Additional radiating lines between main axes */}
    <line x1="32" y1="62" x2="168" y2="138" stroke={WH} strokeWidth="4" />
    <line x1="168" y1="62" x2="32" y2="138" stroke={WH} strokeWidth="4" />
    <line x1="62" y1="32" x2="138" y2="168" stroke={WH} strokeWidth="4" />
    <line x1="138" y1="32" x2="62" y2="168" stroke={WH} strokeWidth="4" />

    {/* Inner ring of white to create lattice effect */}
    <circle cx="100" cy="100" r="45" fill="none" stroke={WH} strokeWidth="4" />

    {/* Center circle */}
    <circle cx="100" cy="100" r="14" fill={WH} />
    <circle cx="100" cy="100" r="7" fill={RD} />
    <circle cx="100" cy="100" r="3" fill={WH} />
  </svg>
);
