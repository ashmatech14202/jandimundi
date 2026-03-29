import { useState, useCallback, useRef, useEffect } from "react";
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

// Generate a 12-second continuous dice rolling sound using Web Audio API
const playRollSound = () => {
  try {
    const ctx = new AudioContext();
    const duration = 8;

    // Continuous rattling noise — like dice shaking in a cup
    const sampleRate = ctx.sampleRate;
    const bufLen = Math.floor(sampleRate * duration);
    const buf = ctx.createBuffer(1, bufLen, sampleRate);
    const d = buf.getChannelData(0);

    // Generate rolling texture: rapid clicks that evolve over time
    let clickTimer = 0;
    let clickInterval = 0.015; // starts fast
    for (let i = 0; i < bufLen; i++) {
      const t = i / sampleRate;
      clickTimer += 1 / sampleRate;

      // Gradually slow down clicks in the last 2 seconds
      const slowFactor = t > 6 ? 1 + (t - 6) * 3 : 1;
      const currentInterval = clickInterval * slowFactor;

      if (clickTimer >= currentInterval) {
        clickTimer = 0;
        // Short click burst
        const burstLen = Math.min(Math.floor(sampleRate * 0.008), bufLen - i);
        for (let j = 0; j < burstLen && (i + j) < bufLen; j++) {
          const env = Math.exp(-j / (sampleRate * 0.003));
          d[i + j] += (Math.random() * 2 - 1) * env * 0.3;
        }
      }

      // Add subtle low rumble throughout
      const rumbleEnv = t > 6 ? Math.max(0, 1 - (t - 6) / 2) : 1;
      d[i] += Math.sin(t * 120 * Math.PI * 2) * 0.02 * rumbleEnv;
    }

    // Fade out last 1.5 seconds
    const fadeStart = Math.floor((duration - 1.5) * sampleRate);
    for (let i = fadeStart; i < bufLen; i++) {
      d[i] *= 1 - (i - fadeStart) / (bufLen - fadeStart);
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    // Bandpass filter for wooden tone
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1200;
    bp.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.value = 0.6;

    src.connect(bp);
    bp.connect(gain);
    gain.connect(ctx.destination);
    src.start();

    // Final "thud" landing sound at 12s
    setTimeout(() => {
      try {
        const thudLen = Math.floor(sampleRate * 0.15);
        const thudBuf = ctx.createBuffer(1, thudLen, sampleRate);
        const td = thudBuf.getChannelData(0);
        for (let i = 0; i < thudLen; i++) {
          const env = Math.exp(-i / (sampleRate * 0.04));
          td[i] = (Math.random() * 2 - 1) * env * 0.5 + Math.sin(i / sampleRate * 150 * Math.PI * 2) * env * 0.3;
        }
        const thudSrc = ctx.createBufferSource();
        thudSrc.buffer = thudBuf;
        const thudGain = ctx.createGain();
        thudGain.gain.value = 0.8;
        thudSrc.connect(thudGain);
        thudGain.connect(ctx.destination);
        thudSrc.start();
      } catch (e) {}
    }, duration * 1000);
  } catch (e) {
    // Audio not available
  }
};

const GameBoard = () => {
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [shufflingSymbols, setShufflingSymbols] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [shuffleRotations, setShuffleRotations] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [lockedDice, setLockedDice] = useState<boolean[]>([false, false, false, false, false, false]);
  const lockedRef = useRef<boolean[]>([false, false, false, false, false, false]);
  const [finalResults, setFinalResults] = useState<number[]>([]);
  const finalResultsRef = useRef<number[]>([]);
  const shuffleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rollStartRef = useRef<number>(0);

  // Rapidly shuffle symbols during rolling phase
  useEffect(() => {
    if (isRolling) {
      rollStartRef.current = Date.now();
      
      // Generate final results upfront
      const newFinalResults = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 6)
      );
      setFinalResults(newFinalResults);
      finalResultsRef.current = newFinalResults;
      const initLocked = [false, false, false, false, false, false];
      setLockedDice(initLocked);
      lockedRef.current = initLocked;

      // Staggered lock-in: each die locks at a random time in the last 3 seconds
      const lockTimes = [5000, 5400, 5800, 6200, 6600, 7200];
      const lockOrder = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
      
      lockOrder.forEach((dieIndex, i) => {
        setTimeout(() => {
          lockedRef.current = [...lockedRef.current];
          lockedRef.current[dieIndex] = true;
          setLockedDice([...lockedRef.current]);
          setShufflingSymbols(prev => {
            const next = [...prev];
            next[dieIndex] = newFinalResults[dieIndex];
            return next;
          });
          setShuffleRotations(prev => {
            const next = [...prev];
            next[dieIndex] = 0;
            return next;
          });
        }, lockTimes[i]);
      });

      const updateShuffle = () => {
        const elapsed = (Date.now() - rollStartRef.current) / 1000;
        const speed = Math.min(180, 60 + (elapsed / 8) * 120);
        
        setShufflingSymbols(prev => 
          prev.map((val, i) => lockedRef.current[i] ? finalResultsRef.current[i] : Math.floor(Math.random() * 6))
        );
        setShuffleRotations(prev =>
          prev.map((val, i) => lockedRef.current[i] ? 0 : (Math.random() - 0.5) * 30)
        );
        
        if (elapsed < 8) {
          shuffleRef.current = setTimeout(updateShuffle, speed);
        }
      };
      updateShuffle();
    } else {
      if (shuffleRef.current) {
        clearTimeout(shuffleRef.current);
        shuffleRef.current = null;
      }
    }
    return () => {
      if (shuffleRef.current) clearTimeout(shuffleRef.current);
    };
  }, [isRolling]);

  // Update shuffle to respect locked dice
  const rollDice = useCallback(() => {
    if (isRolling) return;
    setResults([]);
    setIsRolling(true);
    playRollSound();

    setTimeout(() => {
      setResults(finalResultsRef.current);
      setIsRolling(false);
      setLockedDice([false, false, false, false, false, false]);
      lockedRef.current = [false, false, false, false, false, false];
    }, 8000);
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
          {isRolling
            ? shufflingSymbols.map((symbolIndex, i) => {
                const SymbolComp = SYMBOLS[symbolIndex].Component;
                return (
                  <motion.div
                    key={`rolling-${i}`}
                    className="flex items-center justify-center"
                    animate={{ 
                      rotate: shuffleRotations[i],
                      scale: [1, 0.9, 1],
                    }}
                    transition={{
                      duration: 0.15,
                      ease: "easeInOut",
                    }}
                  >
                    <SymbolComp size={130} />
                  </motion.div>
                );
              })
            : results.length > 0
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
                      <SymbolComp size={130} />
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
                      <SymbolComp size={130} />
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
