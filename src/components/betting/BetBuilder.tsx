import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Minus, 
  Target, 
  TrendingUp, 
  Calculator,
  Zap,
  Shield,
  Sparkles,
  X,
  CheckCircle
} from "lucide-react";

interface BetSelection {
  id: string;
  market: string;
  selection: string;
  odds: number;
  category: string;
  match: string;
  correlation: number;
}

interface BetType {
  id: string;
  name: string;
  description: string;
  minSelections: number;
  maxSelections: number;
  icon: any;
}

export const BetBuilder = () => {
  const [betSelections, setBetSelections] = useState<BetSelection[]>([]);
  const [betType, setBetType] = useState("accumulator");
  const [stake, setStake] = useState(50);
  const [cashOutEnabled, setCashOutEnabled] = useState(true);
  const [boostApplied, setBoostApplied] = useState(false);

  const betTypes: BetType[] = [
    {
      id: "single",
      name: "Single",
      description: "One selection per bet",
      minSelections: 1,
      maxSelections: 1,
      icon: Target
    },
    {
      id: "accumulator", 
      name: "Accumulator",
      description: "All selections must win",
      minSelections: 2,
      maxSelections: 20,
      icon: TrendingUp
    },
    {
      id: "system",
      name: "System",
      description: "Combination of multiple accumulators",
      minSelections: 3,
      maxSelections: 15,
      icon: Calculator
    },
    {
      id: "chain",
      name: "Chain",
      description: "Progressive betting with reinvestment",
      minSelections: 2,
      maxSelections: 10,
      icon: Zap
    }
  ];

  const availableSelections = [
    {
      id: "s1",
      market: "Match Winner",
      selection: "Manchester City",
      odds: 1.45,
      category: "Football",
      match: "Man City vs Arsenal",
      correlation: 0.85
    },
    {
      id: "s2", 
      market: "Over 2.5 Goals",
      selection: "Yes",
      odds: 1.72,
      category: "Football",
      match: "Man City vs Arsenal", 
      correlation: 0.65
    },
    {
      id: "s3",
      market: "Game Winner",
      selection: "Lakers",
      odds: 2.15,
      category: "Basketball",
      match: "Lakers vs Warriors",
      correlation: 0.0
    },
    {
      id: "s4",
      market: "Total Points Over",
      selection: "Over 220.5",
      odds: 1.91,
      category: "Basketball", 
      match: "Lakers vs Warriors",
      correlation: 0.0
    }
  ];

  const addSelection = (selection: any) => {
    if (!betSelections.find(s => s.id === selection.id)) {
      setBetSelections([...betSelections, selection]);
    }
  };

  const removeSelection = (id: string) => {
    setBetSelections(betSelections.filter(s => s.id !== id));
  };

  const calculateOdds = () => {
    if (betSelections.length === 0) return 1.0;
    
    switch (betType) {
      case "single":
        return betSelections[0]?.odds || 1.0;
      case "accumulator":
        return betSelections.reduce((acc, sel) => acc * sel.odds, 1.0);
      case "system":
        // Simplified system calculation
        return betSelections.reduce((acc, sel) => acc * sel.odds, 1.0) * 0.8;
      case "chain":
        return betSelections.reduce((acc, sel) => acc * (sel.odds * 0.95), 1.0);
      default:
        return 1.0;
    }
  };

  const totalOdds = calculateOdds();
  const potentialPayout = stake * totalOdds;
  const boostMultiplier = boostApplied ? 1.1 : 1.0;
  const finalPayout = potentialPayout * boostMultiplier;
  
  const currentBetType = betTypes.find(bt => bt.id === betType);
  const isValidBet = betSelections.length >= (currentBetType?.minSelections || 1) && 
                     betSelections.length <= (currentBetType?.maxSelections || 20);

  const getCorrelationRisk = () => {
    if (betSelections.length < 2) return "low";
    const avgCorrelation = betSelections.reduce((sum, sel) => sum + sel.correlation, 0) / betSelections.length;
    if (avgCorrelation > 0.7) return "high";
    if (avgCorrelation > 0.4) return "medium"; 
    return "low";
  };

  return (
    <div className="space-y-6">
      <div className="glass-card border-0 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Advanced Bet Builder</h2>
          <Badge variant="secondary">AI Powered</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Selections */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Available Markets</h3>
            <div className="space-y-3">
              {availableSelections.map((selection) => (
                <Card key={selection.id} className="glass-card border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                      onClick={() => addSelection(selection)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">
                          {selection.category}
                        </Badge>
                        <p className="font-medium text-sm">{selection.match}</p>
                        <p className="text-xs text-muted-foreground">{selection.market}</p>
                        <p className="font-semibold text-primary">{selection.selection}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-success">{selection.odds.toFixed(2)}</div>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bet Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Your Bet Slip</h3>
              {betSelections.length > 0 && (
                <Badge variant={isValidBet ? "default" : "destructive"}>
                  {betSelections.length} selection{betSelections.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Bet Type Selection */}
            <div className="space-y-3">
              <Label>Bet Type</Label>
              <Select value={betType} onValueChange={setBetType}>
                <SelectTrigger className="bg-surface border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {betTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Bets */}
            {betSelections.length > 0 ? (
              <div className="space-y-3">
                <Label>Selections</Label>
                <div className="space-y-2">
                  {betSelections.map((selection) => (
                    <div key={selection.id} className="flex items-center justify-between bg-surface rounded-lg p-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{selection.selection}</p>
                        <p className="text-xs text-muted-foreground">{selection.market}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-success">{selection.odds.toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-danger/20 hover:text-danger"
                          onClick={() => removeSelection(selection.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select markets to build your bet</p>
              </div>
            )}

            {/* Risk Assessment */}
            {betSelections.length > 1 && (
              <div className="space-y-3">
                <Label>Risk Assessment</Label>
                <div className="flex items-center justify-between bg-surface rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Correlation Risk</span>
                  </div>
                  <Badge variant={getCorrelationRisk() === "high" ? "destructive" : 
                                 getCorrelationRisk() === "medium" ? "secondary" : "default"}>
                    {getCorrelationRisk().toUpperCase()}
                  </Badge>
                </div>
              </div>
            )}

            {/* Stake & Settings */}
            {betSelections.length > 0 && (
              <div className="space-y-4">
                <Separator />
                
                <div className="space-y-3">
                  <Label>Stake Amount</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setStake(Math.max(1, stake - 10))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      value={stake}
                      onChange={(e) => setStake(Number(e.target.value))}
                      className="text-center bg-surface border-border/50"
                    />
                    <Button
                      variant="ghost"
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => setStake(stake + 10)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <Label>Cash Out Available</Label>
                    </div>
                    <Switch
                      checked={cashOutEnabled}
                      onCheckedChange={setCashOutEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-warning" />
                      <Label>Apply 10% Boost</Label>
                    </div>
                    <Switch
                      checked={boostApplied}
                      onCheckedChange={setBoostApplied}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-surface-elevated rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Odds</span>
                    <span className="font-bold text-primary">{totalOdds.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Stake</span>
                    <span>${stake.toFixed(2)}</span>
                  </div>
                  {boostApplied && (
                    <div className="flex justify-between text-sm text-warning">
                      <span>Boost (10%)</span>
                      <span>+${(finalPayout - potentialPayout).toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Potential Payout</span>
                    <span className="text-success">${finalPayout.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full gradient-animated glow-primary font-semibold"
                  disabled={!isValidBet}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Place Bet - ${stake.toFixed(2)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};