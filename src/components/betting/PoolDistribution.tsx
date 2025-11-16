import { BettingEvent } from '@/types';
import { formatEther } from 'viem';

interface PoolDistributionProps {
  event: BettingEvent;
}

const PoolDistribution = ({ event }: PoolDistributionProps) => {
  const totalPool = Number(event.totalPool);

  return (
    <div className="glass-card p-8 rounded-2xl space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Pool Distribution</h2>
        <p className="text-muted-foreground">
          See how bets are distributed across outcomes
        </p>
      </div>

      <div className="space-y-4">
        {event.outcomes.map((outcome, index) => {
          const percentage = totalPool > 0
            ? (Number(outcome.totalBets) / totalPool) * 100
            : 0;

          const colors = [
            'bg-danger',
            'bg-primary',
            'bg-success',
            'bg-warning',
            'bg-secondary',
            'bg-purple-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-teal-500',
            'bg-orange-500',
          ];

          const color = colors[index % colors.length];

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${color}`} />
                  <span className="font-semibold text-foreground">{outcome.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">
                    {formatEther(outcome.totalBets)} CELO
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {outcome.bettorCount} {outcome.bettorCount === 1 ? 'bettor' : 'bettors'}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className={`progress-fill ${color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{percentage.toFixed(1)}% of pool</span>
                <span className="text-muted-foreground">
                  Odds: {totalPool > 0 && outcome.totalBets > BigInt(0)
                    ? `${(totalPool / Number(outcome.totalBets)).toFixed(2)}x`
                    : 'N/A'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoolDistribution;
