import { useBettingStore } from '@/store';
import { formatEther } from 'viem';
import { TrendingUp, Target, Trophy, Percent } from 'lucide-react';

const UserStatsWidget = () => {
  const { getUserStats } = useBettingStore();
  const stats = getUserStats();

  const statCards = [
    {
      icon: Target,
      label: 'Total Bets',
      value: stats.totalBets.toString(),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Trophy,
      label: 'Won Bets',
      value: stats.wonBets.toString(),
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: TrendingUp,
      label: 'Total Wagered',
      value: `${formatEther(stats.totalWagered)} CELO`,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Percent,
      label: 'Win Rate',
      value: `${stats.winRate.toFixed(1)}%`,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="glass-card p-8 rounded-2xl space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Your Stats</h2>
        <p className="text-muted-foreground">Track your betting performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="glass-card p-6 rounded-xl space-y-3 card-hover"
            >
              <div className={`p-3 ${stat.bgColor} rounded-lg w-fit`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Winnings Highlight */}
      {stats.totalWinnings > BigInt(0) && (
        <div className="p-6 bg-gradient-to-r from-success/20 to-success/5 border border-success/30 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Winnings</p>
              <p className="text-3xl font-bold text-success">
                {formatEther(stats.totalWinnings)} CELO
              </p>
            </div>
            <Trophy className="w-12 h-12 text-success opacity-50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStatsWidget;
