import { useNavigate } from 'react-router-dom';
import EventGrid from '@/components/events/EventGrid';
import { useMockEvents } from '@/hooks/useMockEvents';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SmartWalletButton } from '@/components/wallet/SmartWalletButton';

const Betting = () => {
  const navigate = useNavigate();
  // Load mock events for testing
  useMockEvents();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient-primary">BetCelo</h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/create')}
              className="btn-kahoot-primary gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Button>
            <SmartWalletButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <EventGrid />
      </div>
    </div>
  );
};

export default Betting;