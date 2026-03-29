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
// Waving flag with thick black outline, red checkered grid inside, pole with arrow fork
export const FlagSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Flag cloth - outer black shape */}
    <path
      d="M130 15 C95 10, 55 30, 40 28 C25 55, 30 90, 45 115 C70 110, 105 125, 135 118 C155 85, 150 45, 130 15Z"
      fill={BK}
      stroke={BK}
      strokeWidth="5"
      strokeLinejoin="round"
    />

    {/* White inner border */}
    <path
      d="M125 23 C95 19, 60 36, 47 34 C35 56, 38 85, 50 108 C72 104, 102 117, 128 112 C145 82, 142 50, 125 23Z"
      fill={WH}
    />

    {/* Red fill inside */}
    <path
      d="M120 30 C94 27, 65 41, 53 39 C43 58, 45 82, 55 102 C74 99, 100 110, 123 106 C137 80, 135 55, 120 30Z"
      fill={RD}
    />

    {/* Grid lines horizontal */}
    <line x1="52" y1="50" x2="130" y2="45" stroke={WH} strokeWidth="2.5" />
    <line x1="48" y1="62" x2="133" y2="58" stroke={WH} strokeWidth="2.5" />
    <line x1="46" y1="74" x2="135" y2="72" stroke={WH} strokeWidth="2.5" />
    <line x1="48" y1="86" x2="133" y2="85" stroke={WH} strokeWidth="2.5" />
    <line x1="52" y1="97" x2="128" y2="98" stroke={WH} strokeWidth="2.5" />

    {/* Grid lines vertical */}
    <line x1="70" y1="34" x2="66" y2="104" stroke={WH} strokeWidth="2.5" />
    <line x1="88" y1="30" x2="85" y2="108" stroke={WH} strokeWidth="2.5" />
    <line x1="105" y1="29" x2="104" y2="110" stroke={WH} strokeWidth="2.5" />
    <line x1="120" y1="32" x2="120" y2="108" stroke={WH} strokeWidth="2.5" />

    {/* Pole */}
    <line x1="140" y1="20" x2="140" y2="178" stroke={BK} strokeWidth="6" strokeLinecap="round" />

    {/* Pole top hook/curve */}
    <path d="M140 18 C140 12, 134 10, 130 14" stroke={BK} strokeWidth="5" fill="none" strokeLinecap="round" />

    {/* Arrow fork at bottom */}
    <line x1="140" y1="178" x2="125" y2="205" stroke={BK} strokeWidth="5" strokeLinecap="round" />
    <line x1="140" y1="178" x2="155" y2="205" stroke={BK} strokeWidth="5" strokeLinecap="round" />
    <line x1="140" y1="190" x2="140" y2="210" stroke={BK} strokeWidth="5" strokeLinecap="round" />
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
// Red 4-pointed concave star with geometric sun/flower cutout pattern
export const DiamondSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer 4-pointed concave star shape */}
    <path
      d="M100 5 C118 42, 158 42, 195 100 C158 158, 118 158, 100 195 C82 158, 42 158, 5 100 C42 42, 82 42, 100 5Z"
      fill={RD}
    />

    {/* Radiating white cutout lines from center */}
    {/* Vertical */}
    <line x1="100" y1="22" x2="100" y2="82" stroke={WH} strokeWidth="5" />
    <line x1="100" y1="118" x2="100" y2="178" stroke={WH} strokeWidth="5" />
    {/* Horizontal */}
    <line x1="22" y1="100" x2="82" y2="100" stroke={WH} strokeWidth="5" />
    <line x1="118" y1="100" x2="178" y2="100" stroke={WH} strokeWidth="5" />

    {/* Diagonal lines */}
    <line x1="55" y1="40" x2="88" y2="88" stroke={WH} strokeWidth="4" />
    <line x1="145" y1="40" x2="112" y2="88" stroke={WH} strokeWidth="4" />
    <line x1="55" y1="160" x2="88" y2="112" stroke={WH} strokeWidth="4" />
    <line x1="145" y1="160" x2="112" y2="112" stroke={WH} strokeWidth="4" />

    {/* Additional radiating lines */}
    <line x1="38" y1="62" x2="85" y2="92" stroke={WH} strokeWidth="3.5" />
    <line x1="162" y1="62" x2="115" y2="92" stroke={WH} strokeWidth="3.5" />
    <line x1="38" y1="138" x2="85" y2="108" stroke={WH} strokeWidth="3.5" />
    <line x1="162" y1="138" x2="115" y2="108" stroke={WH} strokeWidth="3.5" />

    {/* Center circle */}
    <circle cx="100" cy="100" r="18" fill={WH} />
    <circle cx="100" cy="100" r="10" fill={RD} />
    <circle cx="100" cy="100" r="4" fill={WH} />

    {/* Small diamond cutouts between main rays */}
    <polygon points="130,52 140,62 130,72 120,62" fill={WH} />
    <polygon points="70,52 80,62 70,72 60,62" fill={WH} />
    <polygon points="130,128 140,138 130,148 120,138" fill={WH} />
    <polygon points="70,128 80,138 70,148 60,138" fill={WH} />
  </svg>
);
