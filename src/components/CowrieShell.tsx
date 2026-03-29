import { motion } from "framer-motion";

interface CowrieShellProps {
  faceUp: boolean;
  index: number;
  isRolling: boolean;
}

const CowrieShell = ({ faceUp, index, isRolling }: CowrieShellProps) => {
  return (
    <motion.div
      className="relative w-16 h-20 sm:w-20 sm:h-24"
      initial={{ opacity: 0, y: -200, x: 0, rotate: 0 }}
      animate={
        isRolling
          ? {
              opacity: 1,
              y: [−200, 20, −10, 0],
              x: [(index - 2.5) * 10, (index - 2.5) * 30],
              rotate: [0, 360 * (index % 2 === 0 ? 1 : -1), 720 * (index % 2 === 0 ? 1 : -1)],
            }
          : { opacity: 1, y: 0, x: 0, rotate: 0 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: "easeOut",
      }}
    >
      <div
        className={`w-full h-full rounded-[50%] border-2 flex items-center justify-center text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
          faceUp
            ? "bg-shell-light border-gold text-primary-foreground shadow-[0_0_15px_hsl(var(--gold)/0.4)]"
            : "bg-shell-dark border-border text-muted-foreground"
        }`}
        style={{
          boxShadow: faceUp
            ? "0 4px 20px hsl(var(--gold) / 0.3), inset 0 -2px 6px hsl(var(--gold) / 0.2)"
            : "0 4px 12px hsl(0 0% 0% / 0.3), inset 0 -2px 6px hsl(0 0% 0% / 0.2)",
        }}
      >
        {faceUp ? "🐚" : "●"}
      </div>
      <div className="text-center text-xs mt-1 text-muted-foreground">
        {faceUp ? "Open" : "Closed"}
      </div>
    </motion.div>
  );
};

export default CowrieShell;
