import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus, Calculator, TrendingUp } from "lucide-react";

interface BetSlipItem {
  id: string;
  market: string;
  selection: string;
  odds: number;
  stake: number;
  category: string;
}

export const BettingSlip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [betSlipItems, setBetSlipItems] = useState<BetSlipItem[]>([
    {
      id: "1",
      market: "Super Bowl 2024 Winner",
      selection: "Kansas City Chiefs",
      odds: 2.5,
      stake: 50,
      category: "Sports"
    },
    {
      id: "2", 
      market: "Bitcoin Price Movement",
      selection: "Above $50K",
      odds: 1.85,
      stake: 100,
      category: "Crypto"
    }
  ]);

  const updateStake = (id: string, newStake: number) => {
    setBetSlipItems(items => 
      items.map(item => 
        item.id === id ? { ...item, stake: Math.max(0, newStake) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setBetSlipItems(items => items.filter(item => item.id !== id));
  };

  const totalStake = betSlipItems.reduce((sum, item) => sum + item.stake, 0);
  const totalPayout = betSlipItems.reduce((sum, item) => sum + (item.stake * item.odds), 0);
  const totalProfit = totalPayout - totalStake;

  return (
    <>
      {/* Floating Bet Slip Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full gradient-animated glow-primary shadow-2xl"
          size="icon"
        >
          <Calculator className="w-6 h-6" />
          {betSlipItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center bg-danger text-danger-foreground">
              {betSlipItems.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Betting Slip Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-end p-4">
          <Card className="w-full max-w-md h-full max-h-[90vh] glass-card border-0 overflow-hidden flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Betting Slip
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-surface-elevated"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {betSlipItems.length > 0 && (
                <Badge variant="secondary" className="w-fit">
                  {betSlipItems.length} Selection{betSlipItems.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {betSlipItems.length === 0 ? (
                <div className="text-center py-12">
                  <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Bets Selected</h3>
                  <p className="text-muted-foreground">Add selections to your betting slip to get started</p>
                </div>
              ) : (
                <>
                  {/* Bet Items */}
                  <div className="space-y-3">
                    {betSlipItems.map((item) => (
                      <div key={item.id} className="bg-surface rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Badge variant="outline" className="text-xs mb-2">
                              {item.category}
                            </Badge>
                            <p className="font-medium text-sm line-clamp-2">
                              {item.market}
                            </p>
                            <p className="text-primary text-sm font-semibold">
                              {item.selection}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="w-6 h-6 hover:bg-danger/20 hover:text-danger"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Odds</span>
                          <span className="font-bold text-success">{item.odds.toFixed(2)}</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Stake</span>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6"
                                onClick={() => updateStake(item.id, item.stake - 10)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.stake}
                                onChange={(e) => updateStake(item.id, Number(e.target.value))}
                                className="w-20 h-8 text-center bg-surface-elevated border-border"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6"
                                onClick={() => updateStake(item.id, item.stake + 10)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Potential Win</span>
                            <span className="font-bold text-success">
                              ${(item.stake * item.odds).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-border/30" />

                  {/* Summary */}
                  <div className="space-y-3 bg-surface-elevated rounded-lg p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Summary
                    </h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Stake</span>
                        <span className="font-medium">${totalStake.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Potential Payout</span>
                        <span className="font-medium text-success">${totalPayout.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between font-semibold">
                        <span>Potential Profit</span>
                        <span className="text-success">${totalProfit.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stake Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 25, 50, 100].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setBetSlipItems(items =>
                            items.map(item => ({ ...item, stake: amount }))
                          );
                        }}
                        className="glass-card"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>

                  {/* Place Bet Button */}
                  <Button 
                    size="lg" 
                    className="w-full gradient-animated glow-primary font-semibold"
                    disabled={totalStake === 0}
                  >
                    Place Bet - ${totalStake.toFixed(2)}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};