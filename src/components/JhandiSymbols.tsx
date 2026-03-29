// ═══════════════════════════════════════════════════════════════
// JHANDI MUNDA — EXACT TRADITIONAL GUTI REPRODUCTIONS
// ═══════════════════════════════════════════════════════════════
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
    {/* Cross on top */}
    <rect x="94" y="0" width="12" height="28" fill={BK} />
    <rect x="78" y="8" width="44" height="12" fill={BK} />
    {/* Cross end dots */}
    <circle cx="78" cy="14" r="6" fill={BK} />
    <circle cx="122" cy="14" r="6" fill={BK} />
    <circle cx="100" cy="2" r="6" fill={BK} />

    {/* Stem between cross and crown */}
    <rect x="96" y="26" width="8" height="16" fill={BK} />

    {/* Circle connector */}
    <circle cx="100" cy="47" r="8" fill={BK} />
    <circle cx="100" cy="47" r="4" fill={WH} />

    {/* Arc of dots around crown (semicircle) */}
    {Array.from({ length: 15 }, (_, i) => {
      const angle = Math.PI + (Math.PI * i) / 14;
      const cx = 100 + Math.cos(angle) * 75;
      const cy = 118 + Math.sin(angle) * 62;
      return <circle key={i} cx={cx} cy={cy} r="7.5" fill={BK} />;
    })}

    {/* Crown body */}
    <path
      d="M38 140 L48 72 L75 105 L100 68 L125 105 L152 72 L162 140 Z"
      fill={BK}
      stroke={BK}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* Red heart inside crown */}
    <path
      d="M72 112 C72 95, 100 86, 100 102 C100 86, 128 95, 128 112 C128 132, 100 148, 100 148 C100 148, 72 132, 72 112Z"
      fill={RD}
    />

    {/* Heart inner curved stripes (left side) */}
    <path d="M80 110 C80 100, 100 94, 100 103" fill="none" stroke={BK} strokeWidth="3" />
    <path d="M84 118 C84 106, 100 99, 100 108" fill="none" stroke={BK} strokeWidth="3" />
    <path d="M88 124 C88 114, 100 108, 100 114" fill="none" stroke={BK} strokeWidth="3" />
    {/* Right side mirrored */}
    <path d="M120 110 C120 100, 100 94, 100 103" fill="none" stroke={BK} strokeWidth="3" />
    <path d="M116 118 C116 106, 100 99, 100 108" fill="none" stroke={BK} strokeWidth="3" />
    <path d="M112 124 C112 114, 100 108, 100 114" fill="none" stroke={BK} strokeWidth="3" />

    {/* Crown base bar */}
    <rect x="35" y="148" width="130" height="20" rx="3" fill={BK} />

    {/* Base decorative ovals */}
    {[52, 68, 84, 100, 116, 132, 148].map((x, i) => (
      <ellipse key={i} cx={x} cy="158" rx="4.5" ry="6" fill={WH} />
    ))}

    {/* Horizontal line above base */}
    <rect x="35" y="143" width="130" height="5" fill={BK} />
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
