import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BettingCategories } from "@/components/BettingCategories";
import { FeaturedBets } from "@/components/FeaturedBets";
import { LiveDashboard } from "@/components/LiveDashboard";
import { StatsOverview } from "@/components/StatsOverview";
import { BettingSlip } from "@/components/BettingSlip";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-12">
        <HeroSection />
        <StatsOverview />
        <BettingCategories />
        <FeaturedBets />
        <LiveDashboard />
      </main>
      <BettingSlip />
    </div>
  );
};

export default Index;