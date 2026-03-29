const symbols = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const labels = ["1", "2", "3", "4", "5", "6"];

interface BettingPanelProps {
  selectedBet: number | null;
  onSelectBet: (bet: number) => void;
  disabled: boolean;
  betAmount: number;
  onBetAmountChange: (amount: number) => void;
  balance: number;
}

const BettingPanel = ({
  selectedBet,
  onSelectBet,
  disabled,
  betAmount,
  onBetAmountChange,
  balance,
}: BettingPanelProps) => {
  const betOptions = [10, 50, 100, 500];

  return (
    <div className="space-y-4">
      <h3 className="text-primary font-bold text-lg text-center">
        How many shells will open?
      </h3>
      <div className="grid grid-cols-6 gap-2">
        {labels.map((label, i) => (
          <button
            key={i}
            onClick={() => onSelectBet(i + 1)}
            disabled={disabled}
            className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedBet === i + 1
                ? "border-gold bg-muted shadow-[0_0_15px_hsl(var(--gold)/0.3)] scale-105"
                : "border-border bg-card hover:border-muted-foreground hover:scale-102"
            }`}
          >
            <span className="text-2xl">{symbols[i]}</span>
            <span
              className={`text-sm font-bold mt-1 ${
                selectedBet === i + 1 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm text-center">Bet Amount</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {betOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => onBetAmountChange(amount)}
              disabled={disabled || balance < amount}
              className={`px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                betAmount === amount
                  ? "border-gold bg-muted text-primary"
                  : "border-border bg-card text-foreground hover:border-muted-foreground"
              }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BettingPanel;
