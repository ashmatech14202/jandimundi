import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClubSymbol,
  CrownSymbol,
  SpadeSymbol,
  DiamondSymbol,
  FlagSymbol,
  HeartSymbol,
} from "./JhandiSymbols";

const SYMBOLS = [
  { name: "Club", Component: ClubSymbol },
  { name: "Crown", Component: CrownSymbol },
  { name: "Spade", Component: SpadeSymbol },
  { name: "Diamond", Component: DiamondSymbol },
  { name: "Flag", Component: FlagSymbol },
  { name: "Heart", Component: HeartSymbol },
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

  // Count occurrences
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
    if (count === 6) return "Six!";
    return "";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-secondary py-4 px-6 text-center shadow-md">
        <h1 className="text-2xl font-extrabold text-secondary-foreground tracking-tight">
          Jhandi Munda
        </h1>
      </div>

      <div className="flex flex-col items-center px-4 py-6 gap-5 w-full max-w-sm">
        {/* 6 Symbol grid */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {SYMBOLS.map((symbol, i) => {
            const count = counts[i] || 0;
            const isActive = results.length > 0 && count > 0;
            const SymbolComp = symbol.Component;
            return (
              <motion.div
                key={symbol.name}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 aspect-square ${
                  isActive
                    ? "border-primary bg-muted scale-105"
                    : "border-border bg-card"
                }`}
                animate={isActive ? { scale: [1, 1.08, 1.05] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <SymbolComp size={70} />
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-extrabold w-7 h-7 rounded-full flex items-center justify-center border-2 border-background"
                  >
                    ×{count}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mug */}
        <motion.div
          className="text-6xl"
          animate={
            mugTilted
              ? { rotate: [0, -30, -45, -30, 0], y: [0, -10, -5, 0] }
              : {}
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          🏺
        </motion.div>

        {/* Rolled results */}
        <div className="min-h-[80px] flex items-center justify-center gap-2 flex-wrap">
          <AnimatePresence>
            {results.map((symbolIndex, i) => {
              const SymbolComp = SYMBOLS[symbolIndex].Component;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -80, rotate: 360 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center shadow-md"
                >
                  <SymbolComp size={32} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Result summary */}
        {results.length > 0 && !isRolling && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-1"
          >
            {Object.entries(counts).map(([idx, count]) => (
              <p key={idx} className="text-foreground text-sm font-medium">
                {SYMBOLS[Number(idx)].name}:{" "}
                <span className="text-secondary font-bold">
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
            className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎲 Roll
          </motion.button>
          <motion.button
            onClick={resetGame}
            disabled={isRolling}
            className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↻ Reset
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
