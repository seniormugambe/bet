import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import heroBg from "@/assets/hero-betting-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-success/10" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-success/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 bg-surface-elevated/50 backdrop-blur-xl border border-primary/20 rounded-full px-4 py-2 text-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span>Real-time betting platform</span>
            <span className="w-2 h-2 bg-success rounded-full pulse-live" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Bet on{" "}
            <span className="bg-gradient-to-r from-primary via-primary-glow to-success bg-clip-text text-transparent">
              Anything
            </span>
            {" "}Anywhere
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The future of prediction markets. Sports, politics, entertainment, personal challenges - 
            create and participate in betting markets on any event, anywhere in the world.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-animated glow-primary group">
              Start Betting Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="glass-card">
              Explore Markets
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-border/30">
            <div className="flex items-center justify-center space-x-3 text-muted-foreground">
              <Zap className="w-5 h-5 text-primary" />
              <span>Real-time Odds</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-muted-foreground">
              <Shield className="w-5 h-5 text-success" />
              <span>Secure & Compliant</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-muted-foreground">
              <Globe className="w-5 h-5 text-warning" />
              <span>Global Markets</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};