import { useState } from 'react';
import { BettingEvent, UserBet, BetStatus } from '@/types';
import { useBettingStore } from '@/store';
import { useAccount, useBalance } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, TrendingUp, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import CelebrationOverlay from '@/components/gamification/CelebrationOverlay';
import ShareBetButton from '@/components/betting/ShareBetButton';

interface BetPlacementModalProps {
  event: BettingEvent;
  outcomeIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const BetPlacementModal = ({
  event,
  outcomeIndex,
  isOpen,
  onClose,
}: BetPlacementModalProps) => {
  const [betAmount, setBetAmount] = useState('');
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [placedBet, setPlacedBet] = useState<UserBet | null>(null);
  const [showSharePopover, setShowSharePopover] = useState(false);
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { addUserBet, updateEvent, addNotification } = useBettingStore();

  const outcome = event.outcomes[outcomeIndex];
  const betAmountBigInt = betAmount ? parseEther(betAmount) : BigInt(0);

  // Calculate potential payout
  const calculatePayout = () => {
    if (betAmountBigInt === BigInt(0)) return BigInt(0);
    const newTotalPool = event.totalPool + betAmountBigInt;
    const newOutcomeBets = outcome.totalBets + betAmountBigInt;
    const payout = (betAmountBigInt * newTotalPool) / newOutcomeBets;
    return payout;
  };

  const potentialPayout = calculatePayout();
  const potentialProfit = potentialPayout > betAmountBigInt 
    ? potentialPayout - betAmountBigInt 
    : BigInt(0);

  const quickAmounts = ['1', '5', '10', '25'];

  const handleQuickAmount = (amount: string) => {
    setBetAmount(amount);
  };

  const handleMaxAmount = () => {
    if (balance) {
      // Leave some for gas
      const maxAmount = balance.value > parseEther('0.01') 
        ? balance.value - parseEther('0.01')
        : BigInt(0);
      setBetAmount(formatEther(maxAmount));
    }
  };

  const handlePlaceBet = async () => {
    if (!address || betAmountBigInt === BigInt(0)) return;

    if (balance && betAmountBigInt > balance.value) {
      toast.error('Insufficient balance', {
        description: 'You don\'t have enough CELO to place this bet.',
      });
      return;
    }

    setIsPlacingBet(true);

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create bet record
      const betId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const newBet: UserBet = {
        id: betId,
        eventAddress: event.address,
        eventTitle: event.title,
        outcomeIndex,
        outcomeLabel: outcome.label,
        amount: betAmountBigInt,
        potentialPayout,
        timestamp: Date.now(),
        status: BetStatus.ACTIVE,
        transactionHash: `0x${Math.random().toString(16).slice(2)}`,
      };

      addUserBet(newBet);
      setPlacedBet(newBet);

      // Update event with new bet
      updateEvent(event.address, {
        totalPool: event.totalPool + betAmountBigInt,
        outcomes: event.outcomes.map((o, i) =>
          i === outcomeIndex
            ? {
                ...o,
                totalBets: o.totalBets + betAmountBigInt,
                bettorCount: o.bettorCount + 1,
              }
            : o
        ),
        participantCount: event.participantCount + 1,
      });

      addNotification({
        type: 'success',
        title: 'Bet Placed!',
        message: `You bet ${betAmount} CELO on "${outcome.label}"`,
      });

      toast.success('Bet placed successfully!', {
        description: `You bet ${betAmount} CELO on "${outcome.label}"`,
      });

      // Show celebration
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        onClose();
      }, 3500);

    } catch (error) {
      console.error('Error placing bet:', error);
      toast.error('Failed to place bet', {
        description: 'Please try again or check your wallet connection.',
      });
    } finally {
      setIsPlacingBet(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Place Your Bet</DialogTitle>
            <DialogDescription>
              Betting on: <span className="font-semibold text-foreground">{outcome.label}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Wallet Balance */}
            <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Your Balance</span>
              </div>
              <span className="font-bold text-foreground">
                {balance ? formatEther(balance.value) : '0'} CELO
              </span>
            </div>

            {/* Bet Amount Input */}
            <div className="space-y-3">
              <Label htmlFor="betAmount" className="text-base font-semibold">
                Bet Amount (CELO)
              </Label>
              <Input
                id="betAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="text-lg h-12"
              />

              {/* Quick Amount Buttons */}
              <div className="flex gap-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAmount(amount)}
                    className="flex-1"
                  >
                    {amount}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleMaxAmount}
                  className="flex-1"
                >
                  Max
                </Button>
              </div>
            </div>

            {/* Potential Payout */}
            {betAmountBigInt > BigInt(0) && (
              <div className="space-y-3 p-4 bg-success/10 border border-success/20 rounded-xl">
                <div className="flex items-center gap-2 text-success">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Potential Returns</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Payout</span>
                    <span className="font-bold text-foreground">
                      {formatEther(potentialPayout)} CELO
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Profit</span>
                    <span className="font-bold text-success">
                      +{formatEther(potentialProfit)} CELO
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-success/20">
                    <span className="text-sm text-muted-foreground">Return</span>
                    <span className="font-bold text-success">
                      {betAmountBigInt > BigInt(0)
                        ? `${((Number(potentialPayout) / Number(betAmountBigInt)) * 100).toFixed(0)}%`
                        : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Place Bet Button */}
            <Button
              onClick={handlePlaceBet}
              disabled={isPlacingBet || betAmountBigInt === BigInt(0)}
              className="w-full btn-kahoot-success text-lg py-6"
            >
              {isPlacingBet ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Placing Bet...
                </>
              ) : (
                `Place Bet: ${betAmount || '0'} CELO`
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Celebration Overlay */}
      {showCelebration && placedBet && (
        <CelebrationOverlay
          message="Bet Placed!"
          subMessage={`${betAmount} CELO on ${outcome.label}`}
          onShare={() => setShowSharePopover(true)}
        />
      )}

      {/* Share Popover (shown after celebration) */}
      {showSharePopover && placedBet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="glass-card p-8 rounded-2xl max-w-md w-full mx-4 space-y-6 animate-scale-in">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Share Your Bet! 🎉</h3>
              <p className="text-muted-foreground">
                Let your friends know about your prediction
              </p>
            </div>
            <div className="flex justify-center">
              <ShareBetButton bet={placedBet} variant="default" size="lg" />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setShowSharePopover(false);
                onClose();
              }}
              className="w-full"
            >
              Skip for Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BetPlacementModal;
