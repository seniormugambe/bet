import { ConnectWallet } from "@/components/wallet/ConnectWallet";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gradient-primary">
              BetCelo
            </span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-8 p-8 max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold text-gradient-primary animate-fade-in">
              Celo Betting Platform
            </h1>
            <p className="text-2xl text-muted-foreground animate-slide-up">
              Decentralized betting on the Celo blockchain with gamified
              experience
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-scale-in">
              <ConnectWallet />
              <Link to="/betting">
                <button className="btn-kahoot-success">Explore Events</button>
              </Link>
              <Link to="/create">
                <button className="btn-kahoot-primary">Create Event</button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="glass-card p-8 rounded-2xl card-hover">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-5xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Active Events
                </div>
              </div>
              <div className="glass-card p-8 rounded-2xl card-hover">
                <div className="text-5xl font-bold text-success">0</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Total Pool (CELO)
                </div>
              </div>
              <div className="glass-card p-8 rounded-2xl card-hover">
                <Users className="w-12 h-12 text-warning mx-auto mb-4" />
                <div className="text-5xl font-bold text-warning">0</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Participants
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-primary mb-2">
                  🎮 Gamified Experience
                </h3>
                <p className="text-muted-foreground">
                  Kahoot-inspired design with animations, celebrations, and
                  achievements
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-success mb-2">
                  ⚡ Real-time Odds
                </h3>
                <p className="text-muted-foreground">
                  Live odds updates and transparent pool distribution
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-warning mb-2">
                  🔒 Secure & Transparent
                </h3>
                <p className="text-muted-foreground">
                  Smart contracts on Celo blockchain with automatic payouts
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-danger mb-2">
                  💰 Multiple Bet Types
                </h3>
                <p className="text-muted-foreground">
                  Binary and multiple outcome betting across all categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
