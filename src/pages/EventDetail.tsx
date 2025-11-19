import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useBettingStore } from '@/store';
import { SmartWalletButton } from '@/components/wallet/SmartWalletButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatEther } from 'viem';
import { useState } from 'react';
import BetPlacementModal from '@/components/betting/BetPlacementModal';
import OutcomeSelector from '@/components/betting/OutcomeSelector';
import PoolDistribution from '@/components/betting/PoolDistribution';
import ShareEventButton from '@/components/events/ShareEventButton';
import GameRulesPanel from '@/components/events/GameRulesPanel';

const EventDetail = () => {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { events } = useBettingStore();
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null);

  const event = events.find((e) => e.address === address);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Event Not Found</h2>
          <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/betting')} className="btn-kahoot-primary">
            Browse Events
          </Button>
        </div>
      </div>
    );
  }

  const timeRemaining = event.endTime > Date.now() / 1000
    ? formatDistanceToNow(new Date(event.endTime * 1000), { addSuffix: true })
    : 'Ended';

  const isActive = event.status === 'active' || event.status === 'closing_soon';

  const handleOutcomeSelect = (outcomeIndex: number) => {
    setSelectedOutcome(outcomeIndex);
    setIsBetModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/betting')}
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
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Event Header */}
          <div className="glass-card p-8 rounded-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {event.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    event.status === 'active' ? 'bg-success text-success-foreground' :
                    event.status === 'closing_soon' ? 'bg-warning text-warning-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {event.status === 'active' ? 'Active' :
                     event.status === 'closing_soon' ? 'Closing Soon' :
                     event.status === 'ended' ? 'Ended' : 'Concluded'}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-foreground">{event.title}</h1>
                <p className="text-lg text-muted-foreground">{event.description}</p>
              </div>
              <ShareEventButton
                eventAddress={event.address}
                eventTitle={event.title}
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-4 p-4 bg-surface rounded-xl">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Remaining</p>
                  <p className="text-xl font-bold text-foreground">{timeRemaining}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-surface rounded-xl">
                <div className="p-3 bg-success/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Pool</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatEther(event.totalPool)} CELO
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-surface rounded-xl">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-xl font-bold text-foreground">{event.participantCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Rules */}
          <GameRulesPanel ruleIds={event.gameRules} />

          {/* Pool Distribution */}
          <PoolDistribution event={event} />

          {/* Outcome Selector */}
          <div className="glass-card p-8 rounded-2xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Place Your Bet</h2>
              <p className="text-muted-foreground">
                {isActive
                  ? 'Select an outcome to place your bet'
                  : 'Betting is closed for this event'}
              </p>
            </div>

            {!isConnected ? (
              <div className="text-center py-8 space-y-4">
                <p className="text-muted-foreground">Connect your wallet to place a bet</p>
                <SmartWalletButton />
              </div>
            ) : !isActive ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">This event is no longer accepting bets</p>
              </div>
            ) : (
              <OutcomeSelector
                event={event}
                onOutcomeSelect={handleOutcomeSelect}
              />
            )}
          </div>
        </div>
      </main>

      {/* Bet Placement Modal */}
      {selectedOutcome !== null && (
        <BetPlacementModal
          event={event}
          outcomeIndex={selectedOutcome}
          isOpen={isBetModalOpen}
          onClose={() => {
            setIsBetModalOpen(false);
            setSelectedOutcome(null);
          }}
        />
      )}
    </div>
  );
};

export default EventDetail;
