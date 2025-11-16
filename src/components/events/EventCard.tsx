import { BettingEvent, EventStatus } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatEther } from 'viem';
import GameRulesBadges from './GameRulesBadges';
import ShareEventButton from './ShareEventButton';

interface EventCardProps {
  event: BettingEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
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

  const getStatusLabel = (status: EventStatus) => {
    switch (status) {
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

  const timeRemaining = event.endTime > Date.now() / 1000
    ? formatDistanceToNow(new Date(event.endTime * 1000), { addSuffix: true })
    : 'Ended';

  const handleClick = () => {
    navigate(`/event/${event.address}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-2 border-transparent hover:border-primary animate-fade-in"
    >
      {/* Status Badge and Share Button */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShareEventButton
            eventAddress={event.address}
            eventTitle={event.title}
            variant="ghost"
            size="icon"
          />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(event.status)}`}>
          {getStatusLabel(event.status)}
        </span>
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
          {event.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Time Remaining */}
        <div className="flex flex-col items-center p-3 bg-surface rounded-lg">
          <Clock className="w-5 h-5 text-primary mb-1" />
          <span className="text-xs text-muted-foreground">Time Left</span>
          <span className="text-sm font-bold text-foreground mt-1">{timeRemaining}</span>
        </div>

        {/* Total Pool */}
        <div className="flex flex-col items-center p-3 bg-surface rounded-lg">
          <TrendingUp className="w-5 h-5 text-success mb-1" />
          <span className="text-xs text-muted-foreground">Pool</span>
          <span className="text-sm font-bold text-foreground mt-1">
            {formatEther(event.totalPool)} CELO
          </span>
        </div>

        {/* Participants */}
        <div className="flex flex-col items-center p-3 bg-surface rounded-lg">
          <Users className="w-5 h-5 text-secondary mb-1" />
          <span className="text-xs text-muted-foreground">Players</span>
          <span className="text-sm font-bold text-foreground mt-1">{event.participantCount}</span>
        </div>
      </div>

      {/* Game Rules */}
      {event.gameRules && event.gameRules.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-semibold">Special Bonuses:</p>
          <GameRulesBadges ruleIds={event.gameRules} maxDisplay={2} size="sm" />
        </div>
      )}

      {/* Outcomes Preview */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-semibold">Outcomes:</p>
        <div className="flex flex-wrap gap-2">
          {event.outcomes.slice(0, 3).map((outcome) => (
            <span
              key={outcome.index}
              className="px-2 py-1 bg-surface-elevated rounded text-xs font-medium text-foreground"
            >
              {outcome.label}
            </span>
          ))}
          {event.outcomes.length > 3 && (
            <span className="px-2 py-1 bg-surface-elevated rounded text-xs font-medium text-muted-foreground">
              +{event.outcomes.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export default EventCard;
