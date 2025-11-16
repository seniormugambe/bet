import { getActiveRules } from '@/types/gameRules';
import { Sparkles } from 'lucide-react';

interface GameRulesPanelProps {
  ruleIds?: string[];
}

const GameRulesPanel = ({ ruleIds = [] }: GameRulesPanelProps) => {
  if (!ruleIds || ruleIds.length === 0) return null;

  const activeRules = getActiveRules(ruleIds);

  return (
    <div className="glass-card p-6 rounded-2xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-warning/10 rounded-lg">
          <Sparkles className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Special Game Rules</h3>
          <p className="text-sm text-muted-foreground">
            This event has {activeRules.length} active {activeRules.length === 1 ? 'bonus' : 'bonuses'}!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeRules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 rounded-xl hover:scale-105 transition-transform"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{rule.icon}</div>
              <div className="flex-1 space-y-1">
                <h4 className="font-bold text-foreground">{rule.name}</h4>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
        <p className="text-sm text-success font-medium text-center">
          ✨ These bonuses can significantly increase your winnings! ✨
        </p>
      </div>
    </div>
  );
};

export default GameRulesPanel;
