import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Play, 
  Pause, 
  DollarSign,
  Users,
  Clock,
  Trophy,
  Target,
  Zap
} from "lucide-react";

interface LiveMatch {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  time: string;
  status: "live" | "halftime" | "paused";
  markets: LiveMarket[];
  volume: number;
}

interface LiveMarket {
  id: string;
  name: string;
  options: BettingOption[];
  category: string;
}

interface BettingOption {
  id: string;
  name: string;
  odds: number;
  trend: "up" | "down" | "stable";
  volume: number;
  lastUpdate: number;
}

export const LiveBettingInterface = () => {
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([
    {
      id: "1",
      sport: "Football",
      league: "Premier League",
      homeTeam: "Manchester City",
      awayTeam: "Arsenal",
      score: "2-1",
      time: "67:23",
      status: "live",
      volume: 2340000,
      markets: [
        {
          id: "m1",
          name: "Match Winner",
          category: "Main",
          options: [
            { id: "o1", name: "Man City", odds: 1.45, trend: "down", volume: 850000, lastUpdate: Date.now() - 1000 },
            { id: "o2", name: "Draw", odds: 4.20, trend: "up", volume: 230000, lastUpdate: Date.now() - 500 },
            { id: "o3", name: "Arsenal", odds: 6.50, trend: "up", volume: 180000, lastUpdate: Date.now() - 2000 }
          ]
        },
        {
          id: "m2", 
          name: "Next Goal",
          category: "Goals",
          options: [
            { id: "o4", name: "Man City", odds: 1.85, trend: "stable", volume: 420000, lastUpdate: Date.now() - 800 },
            { id: "o5", name: "Arsenal", odds: 2.10, trend: "down", volume: 380000, lastUpdate: Date.now() - 1200 },
            { id: "o6", name: "No Goal", odds: 3.40, trend: "up", volume: 150000, lastUpdate: Date.now() - 300 }
          ]
        }
      ]
    },
    {
      id: "2",
      sport: "Basketball",
      league: "NBA",
      homeTeam: "Lakers",
      awayTeam: "Warriors", 
      score: "89-92",
      time: "Q3 8:45",
      status: "live",
      volume: 1840000,
      markets: [
        {
          id: "m3",
          name: "Game Winner",
          category: "Main",
          options: [
            { id: "o7", name: "Lakers", odds: 2.15, trend: "up", volume: 620000, lastUpdate: Date.now() - 600 },
            { id: "o8", name: "Warriors", odds: 1.72, trend: "down", volume: 890000, lastUpdate: Date.now() - 400 }
          ]
        }
      ]
    }
  ]);

  // Simulate real-time odds updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatches(matches => 
        matches.map(match => ({
          ...match,
          markets: match.markets.map(market => ({
            ...market,
            options: market.options.map(option => ({
              ...option,
              odds: Math.max(1.01, option.odds + (Math.random() - 0.5) * 0.1),
              trend: Math.random() > 0.6 ? (Math.random() > 0.5 ? "up" : "down") : option.trend,
              lastUpdate: Date.now()
            }))
          }))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-danger";
      case "halftime": return "bg-warning";
      case "paused": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-success" />;
      case "down": return <TrendingDown className="w-3 h-3 text-danger" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card border-0 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger animate-pulse" />
              <h2 className="text-2xl font-bold">Live Betting</h2>
            </div>
            <Badge variant="secondary" className="animate-pulse">
              Real-time odds
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>12.4k active bettors</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>$8.2M volume</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {liveMatches.map((match) => (
            <Card key={match.id} className="glass-card border-border/50 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {match.sport}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{match.league}</span>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)} text-white`}>
                        {match.status === "live" && <Play className="w-3 h-3" />}
                        {match.status === "paused" && <Pause className="w-3 h-3" />}
                        <span className="capitalize">{match.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">
                          {match.homeTeam} vs {match.awayTeam}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            <span>{match.score}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{match.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Total Volume</div>
                        <div className="font-semibold text-success">
                          ${(match.volume / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {match.markets.map((market) => (
                  <div key={market.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        {market.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {market.category}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {market.options.map((option) => (
                        <Button
                          key={option.id}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-center gap-2 bg-surface hover:bg-surface-elevated border-border/50 hover:border-primary/50 transition-all group"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">{option.name}</span>
                            {getTrendIcon(option.trend)}
                          </div>
                          
                          <div className="flex items-center justify-between w-full">
                            <div className="text-left">
                              <div className="text-lg font-bold text-primary group-hover:text-primary-glow">
                                {option.odds.toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ${(option.volume / 1000).toFixed(0)}k vol
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-warning" />
                              <span className="text-xs text-muted-foreground">
                                {Math.floor((Date.now() - option.lastUpdate) / 1000)}s
                              </span>
                            </div>
                          </div>
                          
                          <Progress 
                            value={(option.volume / match.volume) * 100} 
                            className="w-full h-1"
                          />
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};