import { useState } from "react";
import { Header } from "@/components/Header";
import { BettingSlip } from "@/components/BettingSlip";
import { LiveBettingInterface } from "@/components/betting/LiveBettingInterface";
import { BetBuilder } from "@/components/betting/BetBuilder";
import { BettingFilters } from "@/components/betting/BettingFilters";
import { BettingStats } from "@/components/betting/BettingStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Betting = () => {
  const [activeTab, setActiveTab] = useState("live");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="glass-card border-0 rounded-xl p-6">
          <h1 className="text-3xl font-bold gradient-text mb-2">Advanced Betting Center</h1>
          <p className="text-muted-foreground">
            Professional betting tools with real-time odds, bet builders, and advanced analytics
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-card border-0 grid w-full grid-cols-4">
            <TabsTrigger value="live" className="data-[state=active]:bg-primary/20">
              Live Betting
            </TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-primary/20">
              Bet Builder
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/20">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary/20">
              My Bets
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <BettingFilters />
            </div>
            
            <div className="lg:col-span-3 space-y-6">
              <TabsContent value="live" className="mt-0">
                <LiveBettingInterface />
              </TabsContent>
              
              <TabsContent value="builder" className="mt-0">
                <BetBuilder />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <BettingStats />
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <div className="glass-card border-0 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Betting History</h3>
                  <p className="text-muted-foreground">Feature coming soon...</p>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>
      
      <BettingSlip />
    </div>
  );
};

export default Betting;