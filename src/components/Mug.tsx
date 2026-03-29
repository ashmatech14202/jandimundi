import { motion } from "framer-motion";

interface MugProps {
  isShaking: boolean;
  onRoll: () => void;
  disabled: boolean;
}

const Mug = ({ isShaking, onRoll, disabled }: MugProps) => {
  return (
    <motion.button
      onClick={onRoll}
      disabled={disabled}
      className="relative flex flex-col items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      animate={
        isShaking
          ? {
              rotate: [0, -15, 15, -10, 10, -5, 5, 0],
              y: [0, -5, 0, -3, 0],
            }
          : {}
      }
      transition={{ duration: 0.6, ease: "easeInOut" }}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {/* Mug body */}
      <div className="relative">
        <div
          className="w-24 h-28 sm:w-28 sm:h-32 rounded-b-3xl rounded-t-lg border-2 border-gold flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, hsl(30 30% 35%), hsl(30 25% 22%))",
            boxShadow: "0 8px 30px hsl(0 0% 0% / 0.4), inset 0 2px 10px hsl(43 80% 55% / 0.1)",
          }}
        >
          <span className="text-4xl">🏺</span>
        </div>
        {/* Handle */}
        <div
          className="absolute top-4 -right-4 w-4 h-16 rounded-r-full border-2 border-l-0 border-gold"
          style={{
            background: "linear-gradient(90deg, hsl(30 25% 25%), hsl(30 30% 30%))",
          }}
        />
      </div>
      <span className="text-primary font-bold text-lg group-hover:text-gold-glow transition-colors">
        {isShaking ? "Rolling..." : "🎲 Roll Guti!"}
      </span>
    </motion.button>
  );
};

export default Mug;
