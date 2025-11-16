import { useAccount } from 'wagmi';
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MyBetsPanel from '@/components/dashboard/MyBetsPanel';
import UserStatsWidget from '@/components/dashboard/UserStatsWidget';
import EventsHistoryPanel from '@/components/dashboard/EventsHistoryPanel';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

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
          <h1 className="text-2xl font-bold text-gradient-primary">My Dashboard</h1>
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gradient-primary">
                Connect Your Wallet
              </h2>
              <p className="text-muted-foreground text-lg max-w-md">
                Connect your wallet to view your betting dashboard
              </p>
            </div>
            <ConnectWallet />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* User Stats */}
            <UserStatsWidget />

            {/* My Bets */}
            <MyBetsPanel />

            {/* Events History */}
            <EventsHistoryPanel />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
