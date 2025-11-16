import { BettingEvent, EventType } from '@/types';
import { formatEther } from 'viem';

interface OutcomeSelectorProps {
  event: BettingEvent;
  onOutcomeSelect: (outcomeIndex: number) => void;
}

const OutcomeSelector = ({ event, onOutcomeSelect }: OutcomeSelectorProps) => {
  const isBinary = event.eventType === EventType.BINARY;

  // Calculate odds for each outcome
  const calculateOdds = (outcomeIndex: number) => {
    const outcome = event.outcomes[outcomeIndex];
    if (outcome.totalBets === BigInt(0) || event.totalPool === BigInt(0)) {
      return 0;
    }
    const odds = Number(event.totalPool) / Number(outcome.totalBets);
    return odds;
  };

  if (isBinary) {
    // Kahoot-style binary buttons
    const colors = [
      'bg-gradient-to-br from-danger to-danger/80',
      'bg-gradient-to-br from-success to-success/80',
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {event.outcomes.map((outcome, index) => {
          const odds = calculateOdds(index);
          const percentage = event.totalPool > BigInt(0)
            ? (Number(outcome.totalBets) / Number(event.totalPool)) * 100
            : 0;

          return (
            <button
              key={index}
              onClick={() => onOutcomeSelect(index)}
              className={`outcome-button ${colors[index]} text-white hover:scale-105 transition-all duration-300 p-8 rounded-3xl shadow-2xl`}
            >
              <div className="space-y-4">
                <div className="text-4xl font-bold">{outcome.label}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span>Pool Share</span>
                    <span className="font-bold">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span>Odds</span>
                    <span className="font-bold">{odds > 0 ? `${odds.toFixed(2)}x` : 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span>Bettors</span>
                    <span className="font-bold">{outcome.bettorCount}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-lg font-semibold">
                    {formatEther(outcome.totalBets)} CELO
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // Multiple outcome grid
  const getColorClass = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-danger to-danger/80',
      'bg-gradient-to-br from-primary to-primary/80',
      'bg-gradient-to-br from-success to-success/80',
      'bg-gradient-to-br from-warning to-warning/80',
      'bg-gradient-to-br from-secondary to-secondary/80',
      'bg-gradient-to-br from-purple-500 to-purple-700',
      'bg-gradient-to-br from-pink-500 to-pink-700',
      'bg-gradient-to-br from-indigo-500 to-indigo-700',
      'bg-gradient-to-br from-teal-500 to-teal-700',
      'bg-gradient-to-br from-orange-500 to-orange-700',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {event.outcomes.map((outcome, index) => {
        const odds = calculateOdds(index);
        const percentage = event.totalPool > BigInt(0)
          ? (Number(outcome.totalBets) / Number(event.totalPool)) * 100
          : 0;

        return (
          <button
            key={index}
            onClick={() => onOutcomeSelect(index)}
            className={`outcome-button ${getColorClass(index)} text-white hover:scale-105 transition-all duration-300 p-6 rounded-2xl shadow-xl`}
          >
            <div className="space-y-3">
              <div className="text-2xl font-bold line-clamp-2">{outcome.label}</div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between opacity-90">
                  <span>Pool</span>
                  <span className="font-bold">{percentage.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between opacity-90">
                  <span>Odds</span>
                  <span className="font-bold">{odds > 0 ? `${odds.toFixed(2)}x` : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between opacity-90">
                  <span>Bettors</span>
                  <span className="font-bold">{outcome.bettorCount}</span>
                </div>
              </div>
              <div className="pt-1 border-t border-white/20">
                <div className="text-base font-semibold">
                  {formatEther(outcome.totalBets)} CELO
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default OutcomeSelector;
