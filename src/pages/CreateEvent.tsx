import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import EventCreationForm from '@/components/events/EventCreationForm';
import { SmartWalletButton } from '@/components/wallet/SmartWalletButton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <SmartWalletButton />
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
                You need to connect your wallet to create betting events
              </p>
            </div>
            <SmartWalletButton />
          </div>
        ) : (
          <EventCreationForm />
        )}
      </main>
    </div>
  );
};

export default CreateEvent;
