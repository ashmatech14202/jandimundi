import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CowrieShell from "./CowrieShell";
import Mug from "./Mug";
import BettingPanel from "./BettingPanel";

const TOTAL_SHELLS = 6;

const GameBoard = () => {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(50);
  const [selectedBet, setSelectedBet] = useState<number | null>(null);
  const [shells, setShells] = useState<boolean[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [result, setResult] = useState<{ won: boolean; faceUpCount: number; payout: number } | null>(null);
  const [history, setHistory] = useState<{ bet: number; result: number; won: boolean; payout: number }[]>([]);

  const rollShells = useCallback(() => {
    if (selectedBet === null || isRolling) return;

    setResult(null);
    setShells([]);
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
      const newShells = Array.from({ length: TOTAL_SHELLS }, () => Math.random() > 0.5);
      const faceUpCount = newShells.filter(Boolean).length;
      const won = faceUpCount === selectedBet;
      const payout = won ? betAmount * selectedBet : -betAmount;

      setShells(newShells);
      setIsRolling(true);

      setTimeout(() => {
        setIsRolling(false);
        setBalance((prev) => prev + payout);
        setResult({ won, faceUpCount, payout });
        setHistory((prev) => [
          { bet: selectedBet, result: faceUpCount, won, payout },
          ...prev.slice(0, 9),
        ]);
      }, 1200);
    }, 700);
  }, [selectedBet, betAmount, isRolling]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6 gap-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
          🎯 Jhandi Munda
        </h1>
        <p className="text-muted-foreground text-sm">Roll the guti from the mug!</p>
      </div>

      {/* Balance */}
      <div
        className="px-6 py-3 rounded-xl border-2 border-gold"
        style={{
          background: "linear-gradient(135deg, hsl(var(--card)), hsl(var(--muted)))",
          boxShadow: "0 4px 20px hsl(var(--gold) / 0.15)",
        }}
      >
        <span className="text-muted-foreground text-sm">Balance: </span>
        <span className="text-primary font-extrabold text-2xl">₹{balance}</span>
      </div>

      {/* Betting Panel */}
      <BettingPanel
        selectedBet={selectedBet}
        onSelectBet={setSelectedBet}
        disabled={isRolling || isShaking}
        betAmount={betAmount}
        onBetAmountChange={setBetAmount}
        balance={balance}
      />

      {/* Mug */}
      <Mug
        isShaking={isShaking}
        onRoll={rollShells}
        disabled={selectedBet === null || isRolling || isShaking || balance < betAmount}
      />

      {/* Shells Area */}
      <div className="min-h-[140px] flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <AnimatePresence>
          {shells.map((faceUp, i) => (
            <CowrieShell key={i} faceUp={faceUp} index={i} isRolling={isRolling} />
          ))}
        </AnimatePresence>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`text-center px-8 py-4 rounded-xl border-2 ${
              result.won
                ? "border-win bg-muted text-win"
                : "border-lose bg-muted text-lose"
            }`}
            style={{
              boxShadow: result.won
                ? "0 0 30px hsl(var(--win) / 0.3)"
                : "0 0 30px hsl(var(--lose) / 0.2)",
            }}
          >
            <p className="text-2xl font-extrabold">
              {result.won ? "🎉 YOU WIN!" : "😞 You Lose"}
            </p>
            <p className="text-sm mt-1">
              {result.faceUpCount} shells opened •{" "}
              {result.won ? `+₹${result.payout}` : `-₹${betAmount}`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      {history.length > 0 && (
        <div className="w-full max-w-md space-y-2">
          <h3 className="text-muted-foreground text-sm font-bold">Recent Rolls</h3>
          <div className="space-y-1">
            {history.map((h, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-3 py-2 rounded-lg bg-card border border-border text-sm"
              >
                <span className="text-muted-foreground">
                  Bet: {h.bet} → Got: {h.result}
                </span>
                <span className={h.won ? "text-win font-bold" : "text-lose"}>
                  {h.won ? `+₹${h.payout}` : `−₹${Math.abs(h.payout)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game Over */}
      {balance <= 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-3"
        >
          <p className="text-lose text-xl font-bold">💸 Game Over!</p>
          <button
            onClick={() => {
              setBalance(1000);
              setHistory([]);
              setResult(null);
              setShells([]);
              setSelectedBet(null);
            }}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-gold-glow transition-colors"
          >
            Restart (₹1000)
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default GameBoard;
