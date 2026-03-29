// SVG symbols for Jhandi Munda / Langur Burja game
// Matches traditional dice faces exactly

export const ClubSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top circle */}
    <circle cx="100" cy="55" r="45" fill="#1a1a1a" />
    <circle cx="100" cy="55" r="28" fill="white" />
    <circle cx="100" cy="55" r="15" fill="#1a1a1a" />
    {/* Left circle */}
    <circle cx="55" cy="125" r="45" fill="#1a1a1a" />
    <circle cx="55" cy="125" r="28" fill="white" />
    <circle cx="55" cy="125" r="15" fill="#1a1a1a" />
    {/* Right circle */}
    <circle cx="145" cy="125" r="45" fill="#1a1a1a" />
    <circle cx="145" cy="125" r="28" fill="white" />
    <circle cx="145" cy="125" r="15" fill="#1a1a1a" />
    {/* Center fill */}
    <circle cx="100" cy="95" r="20" fill="#1a1a1a" />
    {/* Stem triangle */}
    <polygon points="85,155 115,155 100,210" fill="#1a1a1a" />
  </svg>
);

export const CrownSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cross on top */}
    <rect x="95" y="0" width="10" height="35" fill="#1a1a1a" />
    <rect x="80" y="10" width="40" height="10" fill="#1a1a1a" />
    {/* Small circles on cross ends */}
    <circle cx="80" cy="15" r="5" fill="#1a1a1a" />
    <circle cx="120" cy="15" r="5" fill="#1a1a1a" />
    <circle cx="100" cy="2" r="5" fill="#1a1a1a" />
    {/* Crown top - dark green/black */}
    <path d="M40 120 L55 50 L100 85 L145 50 L160 120 Z" fill="#1a3a2a" stroke="#1a1a1a" strokeWidth="3" />
    {/* Dots around crown */}
    {[40, 55, 70, 85, 100, 115, 130, 145, 160].map((x, i) => (
      <circle key={i} cx={x} cy={125} r="6" fill="#1a3a2a" />
    ))}
    {/* Crown base */}
    <rect x="35" y="130" width="130" height="25" rx="3" fill="#1a3a2a" stroke="#1a1a1a" strokeWidth="2" />
    {/* Decorative lines on base */}
    <line x1="45" y1="137" x2="155" y2="137" stroke="#2a5a3a" strokeWidth="2" />
    <line x1="45" y1="142" x2="155" y2="142" stroke="#2a5a3a" strokeWidth="2" />
    <line x1="45" y1="147" x2="155" y2="147" stroke="#2a5a3a" strokeWidth="2" />
    {/* Heart in center of crown */}
    <path d="M82 85 C82 72, 100 65, 100 80 C100 65, 118 72, 118 85 C118 100, 100 112, 100 112 C100 112, 82 100, 82 85Z" fill="#c0392b" />
    {/* Inner heart lines */}
    <path d="M88 85 C88 78, 100 73, 100 82 C100 73, 112 78, 112 85 C112 95, 100 103, 100 103 C100 103, 88 95, 88 85Z" fill="none" stroke="#e74c3c" strokeWidth="2" />
  </svg>
);

export const SpadeSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main spade shape */}
    <path d="M100 5 C100 5, 20 80, 20 130 C20 165, 50 175, 75 160 C75 160, 70 175, 65 180 L100 180 L135 180 C130 175, 125 160, 125 160 C150 175, 180 165, 180 130 C180 80, 100 5, 100 5Z" fill="#1a1a1a" />
    {/* Horizontal stripes on top */}
    <line x1="70" y1="45" x2="130" y2="45" stroke="white" strokeWidth="3" />
    <line x1="55" y1="55" x2="145" y2="55" stroke="white" strokeWidth="3" />
    <line x1="45" y1="65" x2="155" y2="65" stroke="white" strokeWidth="3" />
    <line x1="38" y1="75" x2="162" y2="75" stroke="white" strokeWidth="3" />
    <line x1="32" y1="85" x2="168" y2="85" stroke="white" strokeWidth="3" />
    {/* Center line */}
    <line x1="100" y1="10" x2="100" y2="95" stroke="white" strokeWidth="2" />
    {/* Two white circle eyes */}
    <circle cx="70" cy="120" r="18" fill="white" />
    <circle cx="130" cy="120" r="18" fill="white" />
    {/* Inner dark pupils */}
    <circle cx="70" cy="120" r="8" fill="#1a1a1a" />
    <circle cx="130" cy="120" r="8" fill="#1a1a1a" />
  </svg>
);

export const DiamondSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer 4-pointed star */}
    <path d="M100 5 L130 40 L195 100 L130 160 L100 195 L70 160 L5 100 L70 40 Z" fill="none" stroke="#c0392b" strokeWidth="6" />
    {/* Inner diamond lines - creating the geometric pattern */}
    {/* Diagonal lines from center */}
    <line x1="100" y1="30" x2="100" y2="170" stroke="#c0392b" strokeWidth="4" />
    <line x1="30" y1="100" x2="170" y2="100" stroke="#c0392b" strokeWidth="4" />
    <line x1="60" y1="50" x2="140" y2="150" stroke="#c0392b" strokeWidth="3" />
    <line x1="140" y1="50" x2="60" y2="150" stroke="#c0392b" strokeWidth="3" />
    {/* Radiating lines from center */}
    <line x1="100" y1="100" x2="70" y2="40" stroke="#c0392b" strokeWidth="3" />
    <line x1="100" y1="100" x2="130" y2="40" stroke="#c0392b" strokeWidth="3" />
    <line x1="100" y1="100" x2="70" y2="160" stroke="#c0392b" strokeWidth="3" />
    <line x1="100" y1="100" x2="130" y2="160" stroke="#c0392b" strokeWidth="3" />
    <line x1="100" y1="100" x2="40" y2="70" stroke="#c0392b" strokeWidth="3" />
    <line x1="100" y1="100" x2="40" y2="130" stroke="#c0392b" strokeWidth="3" />
    <line x1="100" y1="100" x2="160" y2="70" stroke="#c0392b" strokeWidth="3" />
    <line x1="100" y1="100" x2="160" y2="130" stroke="#c0392b" strokeWidth="3" />
    {/* Center circle */}
    <circle cx="100" cy="100" r="15" fill="none" stroke="#c0392b" strokeWidth="4" />
    <circle cx="100" cy="100" r="5" fill="#c0392b" />
    {/* Small inner shapes */}
    <circle cx="100" cy="65" r="5" fill="none" stroke="#c0392b" strokeWidth="2" />
    <circle cx="100" cy="135" r="5" fill="none" stroke="#c0392b" strokeWidth="2" />
    <circle cx="65" cy="100" r="5" fill="none" stroke="#c0392b" strokeWidth="2" />
    <circle cx="135" cy="100" r="5" fill="none" stroke="#c0392b" strokeWidth="2" />
  </svg>
);

export const FlagSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Flag pole */}
    <line x1="70" y1="15" x2="70" y2="170" stroke="#1a1a1a" strokeWidth="5" />
    {/* Pole top */}
    <circle cx="70" cy="12" r="6" fill="#1a1a1a" />
    {/* Flag body - curved */}
    <path d="M73 20 Q130 25, 160 35 Q170 70, 155 100 Q130 110, 73 105 Z" fill="#c0392b" stroke="#1a1a1a" strokeWidth="4" />
    {/* Grid lines on flag - horizontal */}
    <line x1="75" y1="38" x2="158" y2="45" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="75" y1="55" x2="163" y2="58" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="75" y1="72" x2="162" y2="72" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="75" y1="88" x2="158" y2="88" stroke="#1a1a1a" strokeWidth="2" />
    {/* Grid lines on flag - vertical */}
    <line x1="95" y1="22" x2="93" y2="104" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="115" y1="25" x2="113" y2="103" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="135" y1="30" x2="133" y2="100" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="152" y1="35" x2="150" y2="96" stroke="#1a1a1a" strokeWidth="2" />
    {/* Crossed sticks at bottom */}
    <line x1="55" y1="210" x2="85" y2="155" stroke="#1a1a1a" strokeWidth="4" />
    <line x1="85" y1="210" x2="55" y2="155" stroke="#1a1a1a" strokeWidth="4" />
    {/* Arrow tips */}
    <polygon points="50,215 55,210 60,215 55,205" fill="#1a1a1a" />
    <polygon points="80,215 85,210 90,215 85,205" fill="#1a1a1a" />
  </svg>
);

export const HeartSymbol = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main heart/spade shape pointing down */}
    <path d="M100 10 C100 10, 30 50, 30 100 C30 140, 55 165, 75 170 L100 210 L125 170 C145 165, 170 140, 170 100 C170 50, 100 10, 100 10Z" fill="#c0392b" />
    {/* Horizontal stripes on top */}
    <line x1="65" y1="45" x2="135" y2="45" stroke="white" strokeWidth="3" />
    <line x1="52" y1="55" x2="148" y2="55" stroke="white" strokeWidth="3" />
    <line x1="43" y1="65" x2="157" y2="65" stroke="white" strokeWidth="3" />
    <line x1="38" y1="75" x2="162" y2="75" stroke="white" strokeWidth="3" />
    {/* Center vertical line */}
    <line x1="100" y1="15" x2="100" y2="85" stroke="white" strokeWidth="2" />
    {/* Two circle eyes */}
    <circle cx="70" cy="115" r="22" fill="#8b1a1a" />
    <circle cx="130" cy="115" r="22" fill="#8b1a1a" />
    <circle cx="70" cy="115" r="14" fill="#c0392b" />
    <circle cx="130" cy="115" r="14" fill="#c0392b" />
    <circle cx="70" cy="115" r="7" fill="#8b1a1a" />
    <circle cx="130" cy="115" r="7" fill="#8b1a1a" />
  </svg>
);
