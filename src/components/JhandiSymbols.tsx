import crownImage from "@/assets/crown-guti.jpg";
import clubImage from "@/assets/club-guti.jpg";
import spadeImage from "@/assets/spade-guti.jpg";
import heartImage from "@/assets/heart-guti.jpg";
import flagImage from "@/assets/flag-guti.jpg";
import diamondImage from "@/assets/diamond-guti.jpg";

const GutiImage = ({ src, alt, size = 80 }: { src: string; alt: string; size?: number }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    style={{ objectFit: "contain" }}
    className="drop-shadow-md"
  />
);

export const ClubSymbol = ({ size = 80 }: { size?: number }) => (
  <GutiImage src={clubImage} alt="Club" size={size} />
);

export const SpadeSymbol = ({ size = 80 }: { size?: number }) => (
  <GutiImage src={spadeImage} alt="Spade" size={size} />
);

export const FlagSymbol = ({ size = 80 }: { size?: number }) => (
  <GutiImage src={flagImage} alt="Flag" size={size} />
);

export const CrownSymbol = ({ size = 80 }: { size?: number }) => (
  <GutiImage src={crownImage} alt="Crown" size={size} />
);

export const HeartSymbol = ({ size = 80 }: { size?: number }) => (
  <GutiImage src={heartImage} alt="Heart" size={size} />
);

export const DiamondSymbol = ({ size = 80 }: { size?: number }) => (
  <GutiImage src={diamondImage} alt="Diamond" size={size} />
);
