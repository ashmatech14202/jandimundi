import { useState, useCallback, useRef } from "react";
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

// Generate a dice roll sound using Web Audio API
const playRollSound = () => {
  try {
    const ctx = new AudioContext();

    // Multiple rapid "clack" hits that slow down — like dice bouncing
    const hits = [0, 0.05, 0.1, 0.16, 0.23, 0.31, 0.4, 0.5, 0.62];
    
    hits.forEach((time, i) => {
      const vol = 0.25 * Math.pow(0.75, i); // each hit quieter
      
      // Clack sound — short noise burst
      const bufLen = Math.floor(ctx.sampleRate * 0.03);
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < bufLen; j++) {
        const env = Math.exp(-j / (ctx.sampleRate * 0.008));
        d[j] = (Math.random() * 2 - 1) * env;
      }

      const src = ctx.createBufferSource();
      src.buffer = buf;

      // Bandpass for wooden "clack" tone
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 800 + Math.random() * 600;
      bp.Q.value = 2;

      const gain = ctx.createGain();
      gain.gain.value = vol;

      src.connect(bp);
      bp.connect(gain);
      gain.connect(ctx.destination);
      src.start(ctx.currentTime + time);
    });
  } catch (e) {
    // Audio not available
  }
};

const GameBoard = () => {
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    setResults([]);
    setIsRolling(true);
    playRollSound();

    setTimeout(() => {
      const newResults = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 6)
      );
      setResults(newResults);
      setTimeout(() => {
        setIsRolling(false);
      }, 500);
    }, 5000);
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="w-full bg-primary py-4 px-4 flex items-center justify-center relative">
        <h1 className="text-2xl font-bold text-primary-foreground tracking-wide">
          Jhandi Munda
        </h1>
        <div className="absolute right-4 flex items-center gap-3">
          <button className="text-primary-foreground opacity-80 hover:opacity-100 transition-opacity">
            <Volume2 size={22} />
          </button>
          <button
            className="text-primary-foreground opacity-80 hover:opacity-100 transition-opacity"
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
            className="mx-4 mt-2 p-4 bg-card rounded-xl border border-border text-sm text-foreground"
          >
            <p className="font-bold mb-1">How to play:</p>
            <p className="text-muted-foreground">
              Tap "Roll" to throw 6 dice. Each die shows one of 6 symbols randomly. 
              See how many singles, doubles, triples, or more you get!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-6">
        {/* 6 Symbol grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
          {results.length > 0
            ? results.map((symbolIndex, i) => {
                const SymbolComp = SYMBOLS[symbolIndex].Component;
                return (
                  <motion.div
                    key={`result-${i}`}
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.2, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <SymbolComp size={100} />
                  </motion.div>
                );
              })
            : SYMBOLS.map((symbol, i) => {
                const SymbolComp = symbol.Component;
                return (
                  <motion.div
                    key={`default-${i}`}
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <SymbolComp size={100} />
                  </motion.div>
                );
              })}
        </div>

        {/* Result badges */}
        <AnimatePresence>
          {results.length > 0 && !isRolling && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {Object.entries(counts).map(([idx, count]) => {
                const SymbolComp = SYMBOLS[Number(idx)].Component;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1.5"
                  >
                    <SymbolComp size={22} />
                    <span className="text-foreground font-bold text-xs">
                      {getCountLabel(count)}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex gap-4 w-full max-w-sm mt-2">
          <motion.button
            onClick={rollDice}
            disabled={isRolling}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            🎲 Roll
          </motion.button>
          <motion.button
            onClick={resetGame}
            disabled={isRolling || results.length === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed"
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
