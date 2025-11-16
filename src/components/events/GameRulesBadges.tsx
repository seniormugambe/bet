import { getActiveRules } from '@/types/gameRules';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface GameRulesBadgesProps {
  ruleIds?: string[];
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
}

const GameRulesBadges = ({ ruleIds = [], maxDisplay = 3, size = 'md' }: GameRulesBadgesProps) => {
  if (!ruleIds || ruleIds.length === 0) return null;

  const activeRules = getActiveRules(ruleIds);
  const displayRules = activeRules.slice(0, maxDisplay);
  const remainingCount = activeRules.length - maxDisplay;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1.5 flex-wrap">
        {displayRules.map((rule) => (
          <Tooltip key={rule.id}>
            <TooltipTrigger asChild>
              <div
                className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-warning/20 to-warning/10 border border-warning/30 text-warning font-semibold cursor-help hover:scale-110 transition-transform flex items-center gap-1`}
              >
                <span className={iconSizes[size]}>{rule.icon}</span>
                <span className="hidden sm:inline">{rule.name.replace(/^[^\s]+\s/, '')}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-semibold">{rule.name}</p>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary font-semibold cursor-help hover:scale-110 transition-transform`}
              >
                +{remainingCount}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-2">
                <p className="font-semibold">More Game Rules:</p>
                {activeRules.slice(maxDisplay).map((rule) => (
                  <div key={rule.id} className="text-sm">
                    <span className="font-medium">{rule.name}</span>
                    <p className="text-muted-foreground">{rule.description}</p>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default GameRulesBadges;
