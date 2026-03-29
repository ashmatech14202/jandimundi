import { useState, useCallback, useEffect, useRef } from "react";
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

// ── SOUND EFFECTS ──────────────────────────────────────────────
const playRollSound = () => {
  try {
    const ctx = new AudioContext();
    // Rapid clacks that slow down — dice bouncing on wood
    const hits = [0, 0.04, 0.08, 0.13, 0.19, 0.26, 0.34, 0.43, 0.53, 0.64, 0.76, 0.9, 1.05, 1.2];
    hits.forEach((time, i) => {
      const vol = 0.2 * Math.pow(0.8, i);
      const bufLen = Math.floor(ctx.sampleRate * 0.025);
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < bufLen; j++) {
        d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.006));
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 700 + Math.random() * 800;
      bp.Q.value = 2;
      const gain = ctx.createGain();
      gain.gain.value = vol;
      src.connect(bp);
      bp.connect(gain);
      gain.connect(ctx.destination);
      src.start(ctx.currentTime + time);
    });
  } catch (e) {}
};

const playRevealSound = () => {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
};

// ── ROLL CONFIG ────────────────────────────────────────────────
const ROLL_DURATION = 1400; // 1.4s total
const FAST_PHASE = 900;     // 0.9s fast shuffle
const STAGGER_DELAY = 100;  // 0.1s between each die stopping

const GameBoard = () => {
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [shuffleSymbols, setShuffleSymbols] = useState<number[]>([]);
  const [stoppedDice, setStoppedDice] = useState<number[]>([]); // indices that stopped
  const [finalResults, setFinalResults] = useState<number[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<number | null>(null);
  const shuffleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef<"fast" | "slowing" | "stopped">("stopped");

  // Shuffle effect with speed phases
  useEffect(() => {
    if (isRolling && stoppedDice.length < 6) {
      const speed = phaseRef.current === "fast" ? 60 : 120;
      shuffleRef.current = setInterval(() => {
        setShuffleSymbols(
          Array.from({ length: 6 }, () => Math.floor(Math.random() * 6))
        );
      }, speed);
    } else {
      if (shuffleRef.current) {
        clearInterval(shuffleRef.current);
        shuffleRef.current = null;
      }
    }
    return () => {
      if (shuffleRef.current) clearInterval(shuffleRef.current);
    };
  }, [isRolling, stoppedDice.length]);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    setResults([]);
    setStoppedDice([]);
    setFinalResults([]);
    setIsRolling(true);
    phaseRef.current = "fast";
    playRollSound();

    // Generate final results upfront
    const newResults = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 6)
    );

    // After fast phase, start slowing down
    setTimeout(() => {
      phaseRef.current = "slowing";
    }, FAST_PHASE);

    // Stagger-stop each die
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        setStoppedDice((prev) => [...prev, i]);
        setFinalResults((prev) => {
          const next = [...prev];
          next[i] = newResults[i];
          return next;
        });
        playRevealSound();
      }, FAST_PHASE + i * STAGGER_DELAY);
    }

    // All done
    setTimeout(() => {
      setResults(newResults);
      setShuffleSymbols([]);
      phaseRef.current = "stopped";
      setTimeout(() => setIsRolling(false), 400);
    }, FAST_PHASE + 6 * STAGGER_DELAY + 100);
  }, [isRolling]);

  const resetGame = () => {
    setResults([]);
    setStoppedDice([]);
    setFinalResults([]);
    setIsRolling(false);
    setSelectedSymbol(null);
    phaseRef.current = "stopped";
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

  // Check if a symbol index is a "winner" (appears 2+ times)
  const isWinner = (symbolIndex: number) => (counts[symbolIndex] || 0) >= 2;

  // ── RENDER SINGLE DIE ─────────────────────────────────────────
  const renderDie = (dieIndex: number) => {
    const hasStopped = stoppedDice.includes(dieIndex);
    const hasResults = results.length > 0;

    // FINAL RESULTS shown
    if (hasResults) {
      const symbolIndex = results[dieIndex];
      const SymbolComp = SYMBOLS[symbolIndex].Component;
      const winner = isWinner(symbolIndex);

      return (
        <motion.div
          key={`result-${dieIndex}`}
          className="flex items-center justify-center relative"
          initial={{ scale: 1.3, rotate: -10 }}
          animate={{
            scale: winner ? [1.2, 1, 1.08, 1] : 1,
            rotate: 0,
            opacity: winner ? 1 : 0.6,
          }}
          transition={{
            delay: dieIndex * 0.05,
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {winner && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "radial-gradient(circle, rgba(255,200,50,0.3) 0%, transparent 70%)",
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <SymbolComp size={100} />
        </motion.div>
      );
    }

    // DIE HAS STOPPED (staggered reveal)
    if (isRolling && hasStopped && finalResults[dieIndex] !== undefined) {
      const SymbolComp = SYMBOLS[finalResults[dieIndex]].Component;
      return (
        <motion.div
          key={`stopped-${dieIndex}`}
          className="flex items-center justify-center"
          initial={{ scale: 1.4, rotate: 15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 12,
          }}
        >
          <SymbolComp size={100} />
        </motion.div>
      );
    }

    // ROLLING — fast shuffle with rotation
    if (isRolling && shuffleSymbols.length > 0) {
      const SymbolComp = SYMBOLS[shuffleSymbols[dieIndex] ?? 0].Component;
      return (
        <motion.div
          key={`shuffle-${dieIndex}`}
          className="flex items-center justify-center"
          style={{ filter: "blur(0.8px)" }}
          animate={{
            rotate: [0, -8, 10, -6, 8, 0],
            scale: [1, 1.08, 0.95, 1.1, 0.97, 1],
          }}
          transition={{
            duration: 0.25,
            repeat: Infinity,
            ease: "linear",
            delay: dieIndex * 0.02,
          }}
        >
          <SymbolComp size={100} />
        </motion.div>
      );
    }

    // IDLE — breathing animation
    const SymbolComp = SYMBOLS[dieIndex].Component;
    return (
      <motion.div
        key={`idle-${dieIndex}`}
        className="flex items-center justify-center"
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: dieIndex * 0.3,
        }}
      >
        <SymbolComp size={100} />
      </motion.div>
    );
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
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-center">
              {renderDie(i)}
            </div>
          ))}
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
                  <motion.div
                    key={idx}
                    className="flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: Number(idx) * 0.08 }}
                  >
                    <SymbolComp size={22} />
                    <span className="text-foreground font-bold text-xs">
                      {getCountLabel(count)}
                    </span>
                  </motion.div>
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
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRolling && (
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
            🎲 Roll
          </motion.button>
          <motion.button
            onClick={resetGame}
            disabled={isRolling || results.length === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.03 }}
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
