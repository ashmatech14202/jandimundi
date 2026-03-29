import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Save, Trash2, Shuffle, CheckCircle2, AlertCircle } from "lucide-react";
import {
  ClubSymbol,
  CrownSymbol,
  SpadeSymbol,
  DiamondSymbol,
  FlagSymbol,
  HeartSymbol,
} from "@/components/JhandiSymbols";

const SYMBOLS = [
  { name: "Crown", Component: CrownSymbol },
  { name: "Diamond", Component: DiamondSymbol },
  { name: "Heart", Component: HeartSymbol },
  { name: "Spade", Component: SpadeSymbol },
  { name: "Flag", Component: FlagSymbol },
  { name: "Club", Component: ClubSymbol },
];

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentResult, setCurrentResult] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [hasActiveResult, setHasActiveResult] = useState(false);
  const [activeResultId, setActiveResultId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showSavedConfirmation, setShowSavedConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
        return;
      }
      const { data } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (!data) {
        await supabase.auth.signOut();
        navigate("/admin-login");
        return;
      }
      setIsAdmin(true);
      setLoading(false);
      fetchActiveResult();
    };
    checkAdmin();
  }, [navigate]);

  const fetchActiveResult = async () => {
    const { data, error } = await supabase
      .from("pre_decided_results")
      .select("*")
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1);
    if (!error && data && data.length > 0) {
      setCurrentResult(data[0].results);
      setHasActiveResult(true);
      setActiveResultId(data[0].id);
    } else {
      setHasActiveResult(false);
      setActiveResultId(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSaving(false); return; }

    await supabase.from("pre_decided_results").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const { error } = await supabase.from("pre_decided_results").insert({
      results: currentResult,
      created_by: session.user.id,
    });

    setSaving(false);
    if (error) {
      toast.error("Failed to save result");
      return;
    }
    const savedNames = currentResult.map(idx => SYMBOLS[idx].name).join(", ");
    toast.success(`Result saved: ${savedNames}`, {
      description: "Every roll will now show this result.",
      duration: 4000,
      icon: "✅",
    });
    setShowSavedConfirmation(true);
    setTimeout(() => setShowSavedConfirmation(false), 5000);
    fetchActiveResult();
  };

  const handleClear = async () => {
    await supabase.from("pre_decided_results").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    toast.success("Cleared! Rolls will be random now.");
    setHasActiveResult(false);
    setActiveResultId(null);
    setCurrentResult([0, 0, 0, 0, 0, 0]);
  };

  const handleSetAll = (symbolIndex: number) => {
    setCurrentResult([symbolIndex, symbolIndex, symbolIndex, symbolIndex, symbolIndex, symbolIndex]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const handleSymbolChange = (dieIndex: number, symbolIndex: number) => {
    setCurrentResult(prev => {
      const next = [...prev];
      next[dieIndex] = symbolIndex;
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/30" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="w-full bg-primary py-3 px-4 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-bold text-primary-foreground tracking-tight">🎲 Admin Panel</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:bg-primary-foreground/10">
          <LogOut size={16} className="mr-1" /> Logout
        </Button>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-5">
        {/* Status Banner */}
        <div className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
          hasActiveResult
            ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
            : "bg-muted border-border"
        }`}>
          {hasActiveResult ? (
            <CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0" size={22} />
          ) : (
            <AlertCircle className="text-muted-foreground shrink-0" size={22} />
          )}
          <div>
            <p className={`text-sm font-semibold ${hasActiveResult ? "text-green-800 dark:text-green-300" : "text-foreground"}`}>
              {hasActiveResult ? "Pre-decided result is ACTIVE" : "No result set"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {hasActiveResult ? "Every roll will show the result below" : "All rolls are currently random"}
            </p>
          </div>
        </div>

        {/* Quick Set All */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-foreground text-sm">Quick Set (All 6 Dice)</h2>
          <div className="flex gap-2 justify-between">
            {SYMBOLS.map((sym, idx) => {
              const isSelected = currentResult.every(v => v === idx);
              return (
                <button
                  key={sym.name}
                  onClick={() => handleSetAll(idx)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-transparent hover:bg-muted"
                  }`}
                  title={`Set all to ${sym.name}`}
                >
                  <sym.Component size={32} />
                  <span className="text-[9px] text-muted-foreground font-medium">{sym.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Individual Die Selection */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-foreground text-sm">Set Each Die Individually</h2>
          <div className="grid grid-cols-6 gap-2">
            {currentResult.map((symbolIdx, dieIndex) => (
              <div key={dieIndex} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground font-bold">#{dieIndex + 1}</span>
                <button
                  onClick={() => handleSymbolChange(dieIndex, (symbolIdx - 1 + 6) % 6)}
                  className="text-muted-foreground hover:text-foreground text-base leading-none p-1 rounded hover:bg-muted transition-colors"
                >
                  ▲
                </button>
                <div className="w-11 h-11 flex items-center justify-center bg-muted/50 rounded-lg border border-border">
                  {(() => {
                    const SymComp = SYMBOLS[symbolIdx].Component;
                    return <SymComp size={34} />;
                  })()}
                </div>
                <button
                  onClick={() => handleSymbolChange(dieIndex, (symbolIdx + 1) % 6)}
                  className="text-muted-foreground hover:text-foreground text-base leading-none p-1 rounded hover:bg-muted transition-colors"
                >
                  ▼
                </button>
                <span className="text-[9px] text-muted-foreground">{SYMBOLS[symbolIdx].name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1 h-11" disabled={saving}>
            <Save size={16} className="mr-1.5" />
            {saving ? "Saving..." : "Save Result"}
          </Button>
          {hasActiveResult && (
            <Button variant="outline" onClick={handleClear} className="h-11 text-destructive border-destructive/30 hover:bg-destructive/10">
              <Trash2 size={16} className="mr-1.5" /> Clear
            </Button>
          )}
        </div>

        {/* Saved Confirmation Banner */}
        {showSavedConfirmation && (
          <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-400 dark:border-green-600 rounded-xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />
              <h2 className="font-bold text-green-800 dark:text-green-300 text-sm">Settings Saved Successfully!</h2>
            </div>
            <p className="text-xs text-center text-green-700 dark:text-green-400">Next roll will show:</p>
            <div className="flex justify-center gap-2 py-1">
              {currentResult.map((symbolIdx, i) => {
                const SymComp = SYMBOLS[symbolIdx].Component;
                return (
                  <div key={i} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-green-900/30 rounded-lg border-2 border-green-300 dark:border-green-600 shadow-sm">
                    <SymComp size={38} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Preview */}
        {!showSavedConfirmation && currentResult.some((_, i) => i >= 0) && (
          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            <h2 className="font-semibold text-foreground text-sm">Preview</h2>
            <div className="flex justify-center gap-2 py-2">
              {currentResult.map((symbolIdx, i) => {
                const SymComp = SYMBOLS[symbolIdx].Component;
                return (
                  <div key={i} className="w-12 h-12 flex items-center justify-center bg-muted rounded-lg border border-border">
                    <SymComp size={38} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
