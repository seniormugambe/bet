import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, ArrowUp, ArrowDown, DollarSign, Zap, TrendingUp } from "lucide-react";

export const LiveDashboard = () => {
  const [activeTab, setActiveTab] = useState("live");

  const liveMarkets = [
    {
      id: 1,
      title: "Lakers vs Warriors",
      description: "NBA Regular Season",
      status: "Live",
      timeLeft: "Q3 8:42",
      currentOdds: {
        team1: { name: "Lakers", odds: 1.85, change: +0.05 },
        team2: { name: "Warriors", odds: 1.95, change: -0.03 }
      },
      volume: "$847K",
      lastUpdate: "2s ago"
    },
    {
      id: 2,
      title: "Bitcoin Price Movement",
      description: "Will BTC reach $50K by midnight?",
      status: "Live",
      timeLeft: "4h 23m",
      currentOdds: {
        team1: { name: "Yes", odds: 2.1, change: +0.15 },
        team2: { name: "No", odds: 1.75, change: -0.08 }
      },
      volume: "$234K",
      lastUpdate: "1s ago"
    },
    {
      id: 3,
      title: "Tesla Stock Close",
      description: "TSLA closing price prediction",
      status: "Live",
      timeLeft: "1h 45m",
      currentOdds: {
        team1: { name: "Above $200", odds: 1.65, change: -0.02 },
        team2: { name: "Below $200", odds: 2.25, change: +0.12 }
      },
      volume: "$567K",
      lastUpdate: "3s ago"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Alex_Trader",
      action: "placed $500 on",
      market: "Lakers +1.5",
      odds: "1.85",
      time: "2s ago",
      profit: true
    },
    {
      id: 2,
      user: "CryptoKing",
      action: "won $1,200 from",
      market: "BTC > $48K",
      odds: "2.10",
      time: "15s ago",
      profit: true
    },
    {
      id: 3,
      user: "SportsFan23",
      action: "placed $250 on",
      market: "Warriors ML",
      odds: "1.95",
      time: "23s ago",
      profit: false
    },
    {
      id: 4,
      user: "WallStreetBets",
      action: "placed $2,500 on",
      market: "TSLA < $200",
      odds: "2.25",
      time: "45s ago",
      profit: false
    }
  ];

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">Live</span> Dashboard
        </h2>
        <p className="text-muted-foreground">Real-time markets and betting activity</p>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto glass-card">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Live Markets
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {liveMarkets.map((market) => (
              <Card key={market.id} className="glass-card border-0 hover:bg-surface-elevated/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                      <div className="w-2 h-2 bg-success rounded-full mr-1 pulse-live" />
                      {market.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{market.lastUpdate}</span>
                  </div>
                  <CardTitle className="text-lg">{market.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{market.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Odds */}
                  <div className="space-y-2">
                    {Object.entries(market.currentOdds).map(([key, team]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer group">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {team.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">{team.odds}</span>
                          <div className={`flex items-center text-xs ${team.change > 0 ? 'text-success' : 'text-danger'}`}>
                            {team.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {Math.abs(team.change)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {market.volume}
                    </div>
                    <div className="text-sm font-medium text-warning">
                      {market.timeLeft}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-elevated transition-colors">
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-primary">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.market}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${activity.profit ? 'text-success' : 'text-primary'}`}>
                        @{activity.odds}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trending Markets</h3>
            <p className="text-muted-foreground">Discover the hottest betting opportunities right now</p>
            <Button className="mt-4 gradient-animated">
              Explore Trending
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};