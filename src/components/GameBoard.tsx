import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import symbolClub from "@/assets/symbol-club.png";
import symbolFlag from "@/assets/symbol-flag.png";
import symbolDiamond from "@/assets/symbol-diamond.png";
import symbolHeart from "@/assets/symbol-heart.png";
import symbolSpade from "@/assets/symbol-spade.png";
import symbolFlag2 from "@/assets/symbol-flag2.png";

const SYMBOLS = [
  { name: "Club", image: symbolClub },
  { name: "Flag", image: symbolFlag },
  { name: "Diamond", image: symbolDiamond },
  { name: "Heart", image: symbolHeart },
  { name: "Spade", image: symbolSpade },
  { name: "Jhandi", image: symbolFlag2 },
];

const GameBoard = () => {
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [mugTilted, setMugTilted] = useState(false);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    setResults([]);
    setIsRolling(true);
    setMugTilted(true);

    setTimeout(() => {
      const newResults = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 6)
      );
      setResults(newResults);
      setTimeout(() => {
        setIsRolling(false);
        setMugTilted(false);
      }, 600);
    }, 800);
  }, [isRolling]);

  const resetGame = () => {
    setResults([]);
    setIsRolling(false);
    setMugTilted(false);
  };

  // Count occurrences of each symbol
  const counts: Record<number, number> = {};
  results.forEach((r) => {
    counts[r] = (counts[r] || 0) + 1;
  });

  const getCountLabel = (count: number) => {
    if (count === 1) return "Single";
    if (count === 2) return "Double";
    if (count === 3) return "Triple";
    if (count === 4) return "Four";
    if (count === 5) return "Five";
    if (count === 6) return "Six";
    return "";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      {/* Header */}
      <div className="w-full bg-secondary rounded-b-2xl py-4 px-6 mb-6 text-center -mt-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-foreground tracking-tight">
          Jhandi Munda
        </h1>
      </div>

      {/* 6 Symbol display - grid */}
      <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-xs">
        {SYMBOLS.map((symbol, i) => {
          const count = counts[i] || 0;
          const isActive = results.length > 0 && count > 0;
          return (
            <motion.div
              key={symbol.name}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${
                isActive
                  ? "border-gold bg-muted shadow-[0_0_20px_hsl(var(--gold)/0.3)]"
                  : "border-border bg-card"
              }`}
              animate={isActive ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <img
                src={symbol.image}
                alt={symbol.name}
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
              <span className="text-xs text-muted-foreground mt-1 font-medium">
                {symbol.name}
              </span>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-extrabold px-2 py-0.5 rounded-full"
                >
                  ×{count}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Mug Animation */}
      <motion.div
        className="mb-4 text-6xl"
        animate={
          mugTilted
            ? { rotate: [0, -30, -45, -30, 0], y: [0, -10, -5, 0] }
            : {}
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        🏺
      </motion.div>

      {/* Rolled guti results */}
      <div className="min-h-[100px] flex items-center justify-center gap-2 flex-wrap mb-4 max-w-xs">
        <AnimatePresence>
          {results.map((symbolIndex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -80, rotate: 360 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center shadow-md"
            >
              <img
                src={SYMBOLS[symbolIndex].image}
                alt={SYMBOLS[symbolIndex].name}
                width={40}
                height={40}
                className="w-8 h-8 object-contain"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Result summary */}
      {results.length > 0 && !isRolling && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 space-y-1"
        >
          {Object.entries(counts).map(([idx, count]) => (
            <p key={idx} className="text-foreground text-sm font-medium">
              {SYMBOLS[Number(idx)].name}:{" "}
              <span className="text-primary font-bold">
                {getCountLabel(count)}
              </span>
            </p>
          ))}
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <motion.button
          onClick={rollDice}
          disabled={isRolling}
          className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-bold text-lg border-2 border-gold disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎲 Roll
        </motion.button>
        <motion.button
          onClick={resetGame}
          disabled={isRolling}
          className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-bold text-lg border-2 border-border disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ↻ Reset
        </motion.button>
      </div>
    </div>
  );
};

export default GameBoard;
