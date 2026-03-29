import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Info } from "lucide-react";
import {
  ClubSymbol,
  CrownSymbol,
  SpadeSymbol,
  DiamondSymbol,
  FlagSymbol,
  HeartSymbol,
} from "./JhandiSymbols";

const SYMBOLS = [
  { name: "Crown", Component: CrownSymbol },
  { name: "Diamond", Component: DiamondSymbol },
  { name: "Heart", Component: HeartSymbol },
  { name: "Spade", Component: SpadeSymbol },
  { name: "Flag", Component: FlagSymbol },
  { name: "Club", Component: ClubSymbol },
];

const GameBoard = () => {
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    setResults([]);
    setIsRolling(true);

    setTimeout(() => {
      const newResults = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 6)
      );
      setResults(newResults);
      setTimeout(() => {
        setIsRolling(false);
      }, 500);
    }, 600);
  }, [isRolling]);

  const resetGame = () => {
    setResults([]);
    setIsRolling(false);
  };

  // Count occurrences
  const counts: Record<number, number> = {};
  results.forEach((r) => {
    counts[r] = (counts[r] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Green bar */}
      <div className="w-full bg-primary py-3 px-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold text-primary-foreground tracking-wide">
          Jhandi Munda
        </h1>
        <div className="flex items-center gap-3">
          <button className="text-primary-foreground opacity-80 hover:opacity-100">
            <Volume2 size={22} />
          </button>
          <button
            className="text-primary-foreground opacity-80 hover:opacity-100"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info size={22} />
          </button>
        </div>
      </div>

      {/* Info popup */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 p-3 bg-card rounded-lg border border-border text-sm text-foreground shadow-lg"
          >
            <p className="font-bold mb-1">How to play:</p>
            <p>Tap "Roll" to throw 6 dice from the mug. Each die shows one of 6 symbols. See how many singles, doubles, triples, or more you get!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 gap-4">
        {/* 6 Symbol grid - showing results or default */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          {results.length > 0
            ? results.map((symbolIndex, i) => {
                const SymbolComp = SYMBOLS[symbolIndex].Component;
                return (
                  <motion.div
                    key={i}
                    className="flex items-center justify-center aspect-square"
                    initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <SymbolComp size={90} />
                  </motion.div>
                );
              })
            : SYMBOLS.map((symbol, i) => {
                const SymbolComp = symbol.Component;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center aspect-square"
                  >
                    <SymbolComp size={90} />
                  </div>
                );
              })}
        </div>

        {/* Result summary */}
        {results.length > 0 && !isRolling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {Object.entries(counts).map(([idx, count]) => {
              const SymbolComp = SYMBOLS[Number(idx)].Component;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-card border border-border rounded-full px-3 py-1"
                >
                  <SymbolComp size={20} />
                  <span className="text-foreground font-bold text-sm">
                    ×{count}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2 w-full max-w-[200px] mt-2">
          <motion.button
            onClick={rollDice}
            disabled={isRolling}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-lg">🎲</span> Roll
          </motion.button>
          <motion.button
            onClick={resetGame}
            disabled={isRolling}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-secondary/80 text-secondary-foreground font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ↻ Reset
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
