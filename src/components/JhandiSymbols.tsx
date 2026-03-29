// Precise SVG symbols matching traditional Jhandi Munda / Langur Burja dice
// Colors: Black #1a1a1a, Dark Red #9B2D2D

const RED = "#9B2D2D";
const BLACK = "#1a1a1a";

// 1. CROWN (Mukut) - Black crown with red heart inside, dots around, cross on top
export const CrownSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cross on top */}
    <rect x="94" y="0" width="12" height="30" fill={BLACK} />
    <rect x="78" y="8" width="44" height="12" fill={BLACK} />
    {/* Cross end circles */}
    <circle cx="78" cy="14" r="6" fill={BLACK} />
    <circle cx="122" cy="14" r="6" fill={BLACK} />
    <circle cx="100" cy="2" r="6" fill={BLACK} />
    {/* Stem below cross */}
    <rect x="96" y="28" width="8" height="15" fill={BLACK} />
    {/* Circle below cross */}
    <circle cx="100" cy="48" r="8" fill={BLACK} />
    <circle cx="100" cy="48" r="4" fill="white" />
    {/* Arc of dots around crown */}
    {Array.from({ length: 13 }, (_, i) => {
      const angle = Math.PI + (Math.PI * i) / 12;
      const cx = 100 + Math.cos(angle) * 72;
      const cy = 115 + Math.sin(angle) * 65;
      return <circle key={i} cx={cx} cy={cy} r="8" fill={BLACK} />;
    })}
    {/* Crown body outline */}
    <path d="M45 130 L55 75 L78 105 L100 70 L122 105 L145 75 L155 130 Z" fill={BLACK} stroke={BLACK} strokeWidth="3" />
    {/* Red heart inside crown */}
    <path d="M75 110 C75 92, 100 85, 100 100 C100 85, 125 92, 125 110 C125 128, 100 140, 100 140 C100 140, 75 128, 75 110Z" fill={RED} />
    {/* Heart inner lines (curved stripes) */}
    <path d="M82 108 C82 97, 100 92, 100 100" fill="none" stroke={BLACK} strokeWidth="2.5" />
    <path d="M85 115 C85 102, 100 96, 100 104" fill="none" stroke={BLACK} strokeWidth="2.5" />
    <path d="M88 120 C88 108, 100 102, 100 108" fill="none" stroke={BLACK} strokeWidth="2.5" />
    <path d="M118 108 C118 97, 100 92, 100 100" fill="none" stroke={BLACK} strokeWidth="2.5" />
    <path d="M115 115 C115 102, 100 96, 100 104" fill="none" stroke={BLACK} strokeWidth="2.5" />
    <path d="M112 120 C112 108, 100 102, 100 108" fill="none" stroke={BLACK} strokeWidth="2.5" />
    {/* Crown base */}
    <rect x="40" y="148" width="120" height="18" rx="3" fill={BLACK} stroke={BLACK} strokeWidth="2" />
    {/* Base decorative ovals */}
    {[55, 72, 89, 106, 123, 140].map((x, i) => (
      <ellipse key={i} cx={x} cy="157" rx="5" ry="5" fill="white" />
    ))}
    {/* Base lines */}
    <line x1="42" y1="145" x2="158" y2="145" stroke={BLACK} strokeWidth="3" />
  </svg>
);

// 2. DIAMOND / BURJA - Red 4-pointed concave star with geometric sun pattern
export const DiamondSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer 4-pointed concave star */}
    <path d="M100 5 C115 45, 155 45, 195 100 C155 155, 115 155, 100 195 C85 155, 45 155, 5 100 C45 45, 85 45, 100 5Z" fill={RED} />
    {/* Inner white cutouts - radiating pattern */}
    {/* Center circle */}
    <circle cx="100" cy="100" r="16" fill="white" />
    <circle cx="100" cy="100" r="8" fill={RED} />
    {/* 8 radiating trapezoid cutouts */}
    {/* Top */}
    <path d="M93 25 L107 25 L108 78 L92 78Z" fill="white" />
    {/* Bottom */}
    <path d="M93 175 L107 175 L108 122 L92 122Z" fill="white" />
    {/* Left */}
    <path d="M25 93 L25 107 L78 108 L78 92Z" fill="white" />
    {/* Right */}
    <path d="M175 93 L175 107 L122 108 L122 92Z" fill="white" />
    {/* Top-right diagonal */}
    <path d="M140 30 L155 42 L115 110 L108 95Z" fill="white" />
    {/* Top-left diagonal */}
    <path d="M60 30 L45 42 L85 110 L92 95Z" fill="white" />
    {/* Bottom-right diagonal */}
    <path d="M140 170 L155 158 L115 90 L108 105Z" fill="white" />
    {/* Bottom-left diagonal */}
    <path d="M60 170 L45 158 L85 90 L92 105Z" fill="white" />
    {/* Small diamond cutouts between rays */}
    <polygon points="130,55 140,65 130,75 120,65" fill="white" />
    <polygon points="70,55 80,65 70,75 60,65" fill="white" />
    <polygon points="130,125 140,135 130,145 120,135" fill="white" />
    <polygon points="70,125 80,135 70,145 60,135" fill="white" />
  </svg>
);

// 3. HEART (Pan) - Red inverted teardrop with white stripes and two concentric circle eyes
export const HeartSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main teardrop/heart shape pointing UP at top, round bottom */}
    <path d="M100 10 L160 90 C170 110, 170 140, 150 160 C140 172, 120 180, 100 185 C80 180, 60 172, 50 160 C30 140, 30 110, 40 90 Z" fill={RED} stroke={RED} strokeWidth="2" />
    {/* White horizontal stripes at top triangle */}
    <line x1="72" y1="50" x2="128" y2="50" stroke="white" strokeWidth="3.5" />
    <line x1="62" y1="60" x2="138" y2="60" stroke="white" strokeWidth="3.5" />
    <line x1="55" y1="70" x2="145" y2="70" stroke="white" strokeWidth="3.5" />
    <line x1="48" y1="80" x2="152" y2="80" stroke="white" strokeWidth="3.5" />
    {/* Center vertical line in striped area */}
    <line x1="100" y1="15" x2="100" y2="90" stroke="white" strokeWidth="2" />
    {/* Left concentric circle eye */}
    <circle cx="72" cy="130" r="28" fill={RED} stroke="white" strokeWidth="4" />
    <circle cx="72" cy="130" r="18" fill={RED} stroke="white" strokeWidth="2.5" />
    <circle cx="72" cy="130" r="6" fill="white" />
    {/* Right concentric circle eye */}
    <circle cx="128" cy="130" r="28" fill={RED} stroke="white" strokeWidth="4" />
    <circle cx="128" cy="130" r="18" fill={RED} stroke="white" strokeWidth="2.5" />
    <circle cx="128" cy="130" r="6" fill="white" />
  </svg>
);

// 4. SPADE - Same as heart but RED outline style (bottom-left in ref is same as top-right)
// Actually looking at reference, spade/heart are the same symbol. 
// The 6 symbols are: Crown, Diamond, Heart, Heart(duplicate shown), Flag, Crown(duplicate)
// Real 6: Crown, Diamond, Spade(black), Heart(red), Flag, Club
// But reference shows only red hearts and black crowns - let me use the actual 6 traditional ones

// Spade (Hukum) - Same shape as heart but BLACK
export const SpadeSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main teardrop shape */}
    <path d="M100 10 L160 90 C170 110, 170 140, 150 160 C140 172, 120 180, 100 185 C80 180, 60 172, 50 160 C30 140, 30 110, 40 90 Z" fill={BLACK} stroke={BLACK} strokeWidth="2" />
    {/* White horizontal stripes at top */}
    <line x1="72" y1="50" x2="128" y2="50" stroke="white" strokeWidth="3.5" />
    <line x1="62" y1="60" x2="138" y2="60" stroke="white" strokeWidth="3.5" />
    <line x1="55" y1="70" x2="145" y2="70" stroke="white" strokeWidth="3.5" />
    <line x1="48" y1="80" x2="152" y2="80" stroke="white" strokeWidth="3.5" />
    {/* Center vertical line */}
    <line x1="100" y1="15" x2="100" y2="90" stroke="white" strokeWidth="2" />
    {/* Left eye */}
    <circle cx="72" cy="130" r="28" fill={BLACK} stroke="white" strokeWidth="4" />
    <circle cx="72" cy="130" r="18" fill={BLACK} stroke="white" strokeWidth="2.5" />
    <circle cx="72" cy="130" r="6" fill="white" />
    {/* Right eye */}
    <circle cx="128" cy="130" r="28" fill={BLACK} stroke="white" strokeWidth="4" />
    <circle cx="128" cy="130" r="18" fill={BLACK} stroke="white" strokeWidth="2.5" />
    <circle cx="128" cy="130" r="6" fill="white" />
  </svg>
);

// 5. FLAG (Jhandi) - Black outlined flag with red checkered grid, on a pole with arrow bottom
export const FlagSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pole */}
    <line x1="145" y1="20" x2="145" y2="175" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
    {/* Pole top curve */}
    <path d="M145 20 C145 15, 140 12, 135 15" stroke={BLACK} strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Flag body - waving shape */}
    <path d="M135 18 C110 15, 80 30, 50 25 C35 50, 40 80, 50 105 C80 100, 110 115, 140 110 Z" fill="white" stroke={BLACK} strokeWidth="6" />
    {/* Red fill inside flag */}
    <path d="M128 26 C108 24, 82 35, 56 32 C44 52, 47 76, 56 98 C82 94, 108 106, 132 104 Z" fill={RED} />
    {/* Grid lines - horizontal */}
    <line x1="55" y1="45" x2="132" y2="42" stroke="white" strokeWidth="2" />
    <line x1="50" y1="58" x2="135" y2="55" stroke="white" strokeWidth="2" />
    <line x1="48" y1="70" x2="137" y2="68" stroke="white" strokeWidth="2" />
    <line x1="50" y1="82" x2="135" y2="82" stroke="white" strokeWidth="2" />
    <line x1="53" y1="94" x2="133" y2="95" stroke="white" strokeWidth="2" />
    {/* Grid lines - vertical */}
    <line x1="70" y1="28" x2="68" y2="100" stroke="white" strokeWidth="2" />
    <line x1="85" y1="26" x2="84" y2="102" stroke="white" strokeWidth="2" />
    <line x1="100" y1="25" x2="100" y2="105" stroke="white" strokeWidth="2" />
    <line x1="115" y1="27" x2="116" y2="106" stroke="white" strokeWidth="2" />
    {/* Arrow at bottom of pole */}
    <line x1="145" y1="175" x2="125" y2="200" stroke={BLACK} strokeWidth="5" strokeLinecap="round" />
    <line x1="145" y1="175" x2="165" y2="200" stroke={BLACK} strokeWidth="5" strokeLinecap="round" />
    <line x1="145" y1="185" x2="145" y2="210" stroke={BLACK} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// 6. CLUB (Chiria) - Black clover/trefoil with concentric circle eyes
export const ClubSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top circle */}
    <circle cx="100" cy="50" r="42" fill={BLACK} />
    <circle cx="100" cy="50" r="26" fill="white" />
    <circle cx="100" cy="50" r="14" fill={BLACK} />
    {/* Left circle */}
    <circle cx="58" cy="120" r="42" fill={BLACK} />
    <circle cx="58" cy="120" r="26" fill="white" />
    <circle cx="58" cy="120" r="14" fill={BLACK} />
    {/* Right circle */}
    <circle cx="142" cy="120" r="42" fill={BLACK} />
    <circle cx="142" cy="120" r="26" fill="white" />
    <circle cx="142" cy="120" r="14" fill={BLACK} />
    {/* Center fill connecting the three circles */}
    <circle cx="100" cy="90" r="22" fill={BLACK} />
    <circle cx="78" cy="82" r="12" fill={BLACK} />
    <circle cx="122" cy="82" r="12" fill={BLACK} />
    {/* Stem/triangle at bottom */}
    <polygon points="85,150 115,150 100,210" fill={BLACK} />
  </svg>
);
