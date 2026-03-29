import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, GripVertical } from "lucide-react";
import {
  ClubSymbol,
  CrownSymbol,
  SpadeSymbol,
  DiamondSymbol,
  FlagSymbol,
  HeartSymbol,
} from "@/components/JhandiSymbols";

const SYMBOLS = [
  { name: "Club", Component: ClubSymbol },
  { name: "Crown", Component: CrownSymbol },
  { name: "Heart", Component: HeartSymbol },
  { name: "Spade", Component: SpadeSymbol },
  { name: "Flag", Component: FlagSymbol },
  { name: "Diamond", Component: DiamondSymbol },
];

type PreDecidedResult = {
  id: string;
  results: number[];
  used: boolean;
  sort_order: number;
  created_at: string;
};

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<PreDecidedResult[]>([]);
  const [newResult, setNewResult] = useState<number[]>([0, 0, 0, 0, 0, 0]);
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
      fetchResults();
    };
    checkAdmin();
  }, [navigate]);

  const fetchResults = async () => {
    const { data, error } = await supabase
      .from("pre_decided_results")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (!error && data) setResults(data);
  };

  const handleAddResult = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const maxOrder = results.length > 0 ? Math.max(...results.map(r => r.sort_order)) + 1 : 0;
    
    const { error } = await supabase.from("pre_decided_results").insert({
      results: newResult,
      sort_order: maxOrder,
      created_by: session.user.id,
    });

    if (error) {
      toast.error("Failed to add result");
      return;
    }
    toast.success("Result added to queue");
    setNewResult([0, 0, 0, 0, 0, 0]);
    fetchResults();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("pre_decided_results").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
      return;
    }
    toast.success("Deleted");
    fetchResults();
  };

  const handleResetUsed = async () => {
    const { error } = await supabase
      .from("pre_decided_results")
      .update({ used: false })
      .eq("used", true);
    if (error) {
      toast.error("Failed to reset");
      return;
    }
    toast.success("All results reset to unused");
    fetchResults();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const handleSymbolChange = (dieIndex: number, symbolIndex: number) => {
    setNewResult(prev => {
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
      {/* Header */}
      <div className="w-full bg-primary py-3 px-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-primary-foreground">Admin Panel</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:text-primary-foreground/80">
          <LogOut size={18} className="mr-1" /> Logout
        </Button>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Add new pre-decided result */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <h2 className="font-bold text-foreground text-base">Add Pre-Decided Roll</h2>
          <p className="text-xs text-muted-foreground">Select what each die (1-6) should show:</p>
          
          <div className="grid grid-cols-3 gap-3">
            {newResult.map((symbolIdx, dieIndex) => (
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

          <Button onClick={handleAddResult} className="w-full">
            <Plus size={16} className="mr-1" /> Add to Queue
          </Button>
        </div>

        {/* Queue of pre-decided results */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-base">
              Result Queue ({results.filter(r => !r.used).length} pending)
            </h2>
            {results.some(r => r.used) && (
              <Button variant="outline" size="sm" onClick={handleResetUsed} className="text-xs">
                Reset Used
              </Button>
            )}
          </div>

          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No pre-decided results. Rolls will be random.
            </p>
          ) : (
            <div className="space-y-2">
              {results.map((result, idx) => (
                <div
                  key={result.id}
                  className={`flex items-center gap-2 p-2 rounded-lg border ${
                    result.used 
                      ? "bg-muted/50 border-border opacity-50" 
                      : "bg-background border-border"
                  }`}
                >
                  <GripVertical size={14} className="text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground w-5">#{idx + 1}</span>
                  <div className="flex gap-1 flex-1">
                    {result.results.map((symbolIdx, i) => {
                      const SymComp = SYMBOLS[symbolIdx]?.Component;
                      return SymComp ? (
                        <div key={i} className="w-7 h-7 flex items-center justify-center">
                          <SymComp size={24} />
                        </div>
                      ) : null;
                    })}
                  </div>
                  {result.used && (
                    <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Used</span>
                  )}
                  <button
                    onClick={() => handleDelete(result.id)}
                    className="text-destructive hover:text-destructive/80 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
