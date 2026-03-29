import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Save } from "lucide-react";
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
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Delete all existing results first
    await supabase.from("pre_decided_results").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // Insert the new active result
    const { error } = await supabase.from("pre_decided_results").insert({
      results: currentResult,
      created_by: session.user.id,
    });

    if (error) {
      toast.error("Failed to save result");
      return;
    }
    toast.success("Pre-decided result saved! Every roll will now show this.");
    fetchActiveResult();
  };

  const handleClear = async () => {
    await supabase.from("pre_decided_results").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    toast.success("Pre-decided result cleared. Rolls will be random now.");
    setHasActiveResult(false);
    setActiveResultId(null);
    setCurrentResult([0, 0, 0, 0, 0, 0]);
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
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full bg-primary py-3 px-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-primary-foreground">Admin Panel</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:text-primary-foreground/80">
          <LogOut size={18} className="mr-1" /> Logout
        </Button>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Status */}
        <div className={`p-3 rounded-lg text-center text-sm font-medium ${hasActiveResult ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
          {hasActiveResult ? "✅ Pre-decided result is ACTIVE — every roll will show this" : "No pre-decided result set — rolls are random"}
        </div>

        {/* Set pre-decided result */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <h2 className="font-bold text-foreground text-base">Set Pre-Decided Result</h2>
          <p className="text-xs text-muted-foreground">Select what each die should show on every roll:</p>
          
          <div className="grid grid-cols-3 gap-3">
            {currentResult.map((symbolIdx, dieIndex) => (
              <div key={dieIndex} className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground font-medium">Die {dieIndex + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSymbolChange(dieIndex, (symbolIdx - 1 + 6) % 6)}
                    className="text-muted-foreground hover:text-foreground text-lg px-1"
                  >
                    ‹
                  </button>
                  <div className="w-12 h-12 flex items-center justify-center">
                    {(() => {
                      const SymComp = SYMBOLS[symbolIdx].Component;
                      return <SymComp size={40} />;
                    })()}
                  </div>
                  <button
                    onClick={() => handleSymbolChange(dieIndex, (symbolIdx + 1) % 6)}
                    className="text-muted-foreground hover:text-foreground text-lg px-1"
                  >
                    ›
                  </button>
                </div>
                <span className="text-[10px] text-muted-foreground">{SYMBOLS[symbolIdx].name}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex-1">
              <Save size={16} className="mr-1" /> Save Result
            </Button>
            {hasActiveResult && (
              <Button variant="outline" onClick={handleClear} className="flex-1">
                Clear (Random)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
