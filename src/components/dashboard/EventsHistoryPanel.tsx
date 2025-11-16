import { useMemo } from 'react';
import { useBettingStore } from '@/store';
import { useAccount } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BettingEvent } from '@/types';
import { Calendar, TrendingUp, Users, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatEther } from 'viem';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GameRulesBadges from '@/components/events/GameRulesBadges';

const EventsHistoryPanel = () => {
  const { userBets, getUserParticipatedEvents } = useBettingStore();
  const { address } = useAccount();
  const navigate = useNavigate();

  // Get events user has participated in
  const participatedEvents = useMemo(() => {
    if (!address) return [];
    return getUserParticipatedEvents();
  }, [address, getUserParticipatedEvents]);

  // Separate active and completed events
  const activeEvents = useMemo(() => {
    return participatedEvents.filter(
      event => event.status === 'active' || event.status === 'closing_soon'
    );
  }, [participatedEvents]);

  const completedEvents = useMemo(() => {
    return participatedEvents.filter(
      event => event.status === 'ended' || event.status === 'concluded'
    );
  }, [participatedEvents]);

  const EventCard = ({ event }: { event: BettingEvent }) => {
    const userBetsOnEvent = userBets.filter(bet => bet.eventAddress === event.address);
    const totalWagered = userBetsOnEvent.reduce((sum, bet) => sum + bet.amount, BigInt(0));
    const totalWon = userBetsOnEvent
      .filter(bet => bet.status === 'won')
      .reduce((sum, bet) => sum + (bet.actualPayout || BigInt(0)), BigInt(0));

    const getStatusColor = () => {
      switch (event.status) {
        case 'active':
          return 'bg-success text-success-foreground';
        case 'closing_soon':
          return 'bg-warning text-warning-foreground';
        case 'ended':
        case 'concluded':
          return 'bg-muted text-muted-foreground';
        default:
          return 'bg-primary text-primary-foreground';
      }
    };

    const getStatusLabel = () => {
      switch (event.status) {
        case 'active':
          return 'Active';
        case 'closing_soon':
          return 'Closing Soon';
        case 'ended':
          return 'Ended';
        case 'concluded':
          return 'Concluded';
        default:
          return 'Unknown';
      }
    };

    const timeInfo = event.endTime > Date.now() / 1000
      ? formatDistanceToNow(new Date(event.endTime * 1000), { addSuffix: true })
      : `Ended ${formatDistanceToNow(new Date(event.endTime * 1000), { addSuffix: true })}`;

    return (
      <div className="glass-card p-6 rounded-xl space-y-4 card-hover">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                {event.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor()}`}>
                {getStatusLabel()}
              </span>
            </div>
            <h3
              className="text-xl font-bold text-foreground hover:text-primary cursor-pointer transition-colors"
              onClick={() => navigate(`/event/${event.address}`)}
            >
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>

        {/* Game Rules */}
        {event.gameRules && event.gameRules.length > 0 && (
          <div className="flex items-center gap-2">
            <GameRulesBadges ruleIds={event.gameRules} maxDisplay={3} size="sm" />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <p className="text-xs">Time</p>
            </div>
            <p className="text-sm font-semibold text-foreground">{timeInfo}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <p className="text-xs">Total Pool</p>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {formatEther(event.totalPool)} CELO
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-3 h-3" />
              <p className="text-xs">Participants</p>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {event.participantCount}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <p className="text-xs">Your Bets</p>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {userBetsOnEvent.length}
            </p>
          </div>
        </div>

        {/* User's Participation Summary */}
        <div className="pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">You Wagered</p>
              <p className="text-lg font-bold text-foreground">
                {formatEther(totalWagered)} CELO
              </p>
            </div>
            {totalWon > BigInt(0) && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">You Won</p>
                <p className="text-lg font-bold text-success">
                  {formatEther(totalWon)} CELO
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => navigate(`/event/${event.address}`)}
          variant="outline"
          className="w-full"
        >
          View Event Details
        </Button>
      </div>
    );
  };

  return (
    <div className="glass-card p-8 rounded-2xl space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Events History</h2>
        <p className="text-muted-foreground">
          All events you've participated in
        </p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active">
            Active ({activeEvents.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          {activeEvents.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 mx-auto bg-surface rounded-full flex items-center justify-center">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  No Active Events
                </h3>
                <p className="text-muted-foreground mt-2">
                  You don't have any active events with bets
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {activeEvents.map((event) => (
                <EventCard key={event.address} event={event} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedEvents.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 mx-auto bg-surface rounded-full flex items-center justify-center">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  No Completed Events
                </h3>
                <p className="text-muted-foreground mt-2">
                  Your completed events will appear here
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {completedEvents.map((event) => (
                <EventCard key={event.address} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsHistoryPanel;
