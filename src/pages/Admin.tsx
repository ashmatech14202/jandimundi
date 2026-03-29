import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Save, Trash2, Shuffle, CheckCircle2, AlertCircle, Zap } from "lucide-react";
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

// Common presets: patterns that admin might want quickly
const PRESETS = [
  { label: "3 Crown + 3 Heart", result: [0, 0, 0, 2, 2, 2] },
  { label: "3 Diamond + 3 Spade", result: [1, 1, 1, 3, 3, 3] },
  { label: "3 Flag + 3 Club", result: [4, 4, 4, 5, 5, 5] },
  { label: "All Different", result: [0, 1, 2, 3, 4, 5] },
  { label: "Random Mix", result: "random" as const },
];

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentResult, setCurrentResult] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [hasActiveResult, setHasActiveResult] = useState(false);
  const [activeResultId, setActiveResultId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
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
    toast("Okay", { duration: 2000 });
    fetchActiveResult();
  };

  // Quick save: set all to one symbol AND save in one tap
  const handleQuickSave = async (symbolIndex: number) => {
    const result = [symbolIndex, symbolIndex, symbolIndex, symbolIndex, symbolIndex, symbolIndex];
    setCurrentResult(result);

    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSaving(false); return; }

    await supabase.from("pre_decided_results").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const { error } = await supabase.from("pre_decided_results").insert({
      results: result,
      created_by: session.user.id,
    });

    setSaving(false);
    if (error) {
      toast.error("Failed to save");
      return;
    }
    toast("Okay", { duration: 2000 });
    fetchActiveResult();
  };

  const handlePreset = (preset: typeof PRESETS[number]) => {
    if (preset.result === "random") {
      const randomResult = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6));
      setCurrentResult(randomResult);
    } else {
      setCurrentResult([...preset.result]);
    }
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

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Status Banner */}
        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
          hasActiveResult
            ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
            : "bg-muted border-border"
        }`}>
          {hasActiveResult ? (
            <CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0" size={20} />
          ) : (
            <AlertCircle className="text-muted-foreground shrink-0" size={20} />
          )}
          <div className="flex-1">
            <p className={`text-sm font-semibold ${hasActiveResult ? "text-green-800 dark:text-green-300" : "text-foreground"}`}>
              {hasActiveResult ? "Result is ACTIVE ✅" : "No result set"}
            </p>
            <p className="text-xs text-muted-foreground">
              {hasActiveResult ? "Every roll shows this result" : "All rolls are random"}
            </p>
          </div>
          {hasActiveResult && (
            <Button variant="outline" size="sm" onClick={handleClear} className="text-destructive border-destructive/30 hover:bg-destructive/10 h-8 text-xs">
              <Trash2 size={14} className="mr-1" /> Clear
            </Button>
          )}
        </div>

        {/* ⚡ One-Tap: Set & Save All Same */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            <h2 className="font-semibold text-foreground text-sm">One-Tap Set & Save</h2>
          </div>
          <p className="text-xs text-muted-foreground">Tap a symbol to instantly set all 6 dice and save:</p>
          <div className="grid grid-cols-6 gap-2">
            {SYMBOLS.map((sym, idx) => (
              <button
                key={sym.name}
                onClick={() => handleQuickSave(idx)}
                disabled={saving}
                className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 active:scale-95 transition-all disabled:opacity-50"
                title={`Set all to ${sym.name} & save`}
              >
                <sym.Component size={36} />
                <span className="text-[9px] text-muted-foreground font-medium">{sym.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Presets */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-foreground text-sm">Quick Presets</h2>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePreset(preset)}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-muted/50 hover:bg-primary/10 hover:border-primary/30 active:scale-95 transition-all"
              >
                {preset.result === "random" && <Shuffle size={12} className="inline mr-1 -mt-0.5" />}
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Individual Die Selection */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-foreground text-sm">Set Each Die</h2>
          <div className="grid grid-cols-6 gap-2">
            {currentResult.map((symbolIdx, dieIndex) => (
              <div key={dieIndex} className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] text-muted-foreground font-bold">#{dieIndex + 1}</span>
                <button
                  onClick={() => handleSymbolChange(dieIndex, (symbolIdx - 1 + 6) % 6)}
                  className="text-muted-foreground hover:text-foreground text-sm leading-none p-1 rounded hover:bg-muted transition-colors"
                >
                  ▲
                </button>
                <div className="w-10 h-10 flex items-center justify-center bg-muted/50 rounded-lg border border-border">
                  {(() => {
                    const SymComp = SYMBOLS[symbolIdx].Component;
                    return <SymComp size={30} />;
                  })()}
                </div>
                <button
                  onClick={() => handleSymbolChange(dieIndex, (symbolIdx + 1) % 6)}
                  className="text-muted-foreground hover:text-foreground text-sm leading-none p-1 rounded hover:bg-muted transition-colors"
                >
                  ▼
                </button>
                <span className="text-[8px] text-muted-foreground">{SYMBOLS[symbolIdx].name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save & Preview */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-foreground text-sm">Preview & Save</h2>
          <div className="flex justify-center gap-2 py-1">
            {currentResult.map((symbolIdx, i) => {
              const SymComp = SYMBOLS[symbolIdx].Component;
              return (
                <div key={i} className="w-11 h-11 flex items-center justify-center bg-muted rounded-lg border border-border">
                  <SymComp size={34} />
                </div>
              );
            })}
          </div>
          <Button onClick={handleSave} className="w-full h-11" disabled={saving}>
            <Save size={16} className="mr-1.5" />
            {saving ? "Saving..." : "Save This Result"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
