import { useNavigate } from 'react-router-dom';
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import StakingDashboard from '@/components/staking/StakingDashboard';

const Staking = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gradient-primary">Staking</h1>
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="glass-card p-8 rounded-2xl text-center space-y-4">
            <h2 className="text-4xl font-bold text-gradient-primary">
              Stake & Earn Rewards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stake your CELO tokens to earn passive rewards and unlock exclusive tier benefits
              including fee discounts and boosted payouts on your bets.
            </p>
          </div>

          {/* Staking Dashboard */}
          <StakingDashboard />
        </div>
      </main>
    </div>
  );
};

export default Staking;
