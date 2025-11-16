import { UserBet } from '@/types';
import { formatEther } from 'viem';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ShareBetButton from '@/components/betting/ShareBetButton';

interface BetCardProps {
  bet: UserBet;
}

const BetCard = ({ bet }: BetCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'pending':
        return 'bg-primary text-primary-foreground';
      case 'won':
        return 'bg-success text-success-foreground';
      case 'lost':
        return 'bg-danger text-danger-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'won':
        return 'Won';
      case 'lost':
        return 'Lost';
      default:
        return 'Unknown';
    }
  };

  const timeAgo = formatDistanceToNow(new Date(bet.timestamp), { addSuffix: true });

  return (
    <div className="glass-card p-6 rounded-xl space-y-4 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <h3
            className="text-lg font-bold text-foreground hover:text-primary cursor-pointer transition-colors"
            onClick={() => navigate(`/event/${bet.eventAddress}`)}
          >
            {bet.eventTitle}
          </h3>
          <p className="text-sm text-muted-foreground">
            Bet on: <span className="font-semibold text-foreground">{bet.outcomeLabel}</span>
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(bet.status)}`}>
          {getStatusLabel(bet.status)}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Bet Amount</p>
          <p className="text-base font-bold text-foreground">
            {formatEther(bet.amount)} CELO
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Potential Payout</p>
          <p className="text-base font-bold text-success">
            {formatEther(bet.potentialPayout)} CELO
          </p>
        </div>
        {bet.actualPayout && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Actual Payout</p>
            <p className={`text-base font-bold ${bet.status === 'won' ? 'text-success' : 'text-danger'}`}>
              {formatEther(bet.actualPayout)} CELO
            </p>
          </div>
        )}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Placed
          </p>
          <p className="text-sm font-medium text-foreground">{timeAgo}</p>
        </div>
      </div>

      {/* Potential Return */}
      {bet.status === 'active' && (
        <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-sm text-success font-semibold">
            Potential Return: {((Number(bet.potentialPayout) / Number(bet.amount)) * 100).toFixed(0)}%
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`https://alfajores.celoscan.io/tx/${bet.transactionHash}`, '_blank')}
            className="gap-2 text-muted-foreground hover:text-primary"
          >
            <ExternalLink className="w-4 h-4" />
            View Transaction
          </Button>
          <ShareBetButton bet={bet} />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/event/${bet.eventAddress}`)}
        >
          View Event
        </Button>
      </div>
    </div>
  );
};

export default BetCard;
