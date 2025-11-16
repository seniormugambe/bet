import { useEffect, useState } from 'react';
import { CheckCircle2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CelebrationOverlayProps {
  message: string;
  subMessage?: string;
  onShare?: () => void;
}

const CelebrationOverlay = ({ message, subMessage, onShare }: CelebrationOverlayProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1,
    }));
    setConfetti(particles);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      {/* Confetti */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            backgroundColor: [
              '#7C3AED', // primary
              '#3B82F6', // secondary
              '#10B981', // success
              '#F59E0B', // warning
              '#EF4444', // danger
            ][Math.floor(Math.random() * 5)],
          }}
        />
      ))}

      {/* Success Message */}
      <div className="relative z-10 text-center space-y-6 animate-scale-in">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <CheckCircle2 className="w-24 h-24 text-success" />
            </div>
            <CheckCircle2 className="w-24 h-24 text-success relative z-10" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-bold text-gradient-success animate-bounce">
            {message}
          </h2>
          {subMessage && (
            <p className="text-2xl text-muted-foreground">{subMessage}</p>
          )}
          {onShare && (
            <Button
              onClick={onShare}
              className="btn-kahoot-primary gap-2 mt-4"
              size="lg"
            >
              <Share2 className="w-5 h-5" />
              Share Your Bet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CelebrationOverlay;
