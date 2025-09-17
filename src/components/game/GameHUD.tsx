import React from 'react';
import { cn } from '@/lib/utils';
import PmProgress from '@/components/atoms/PmProgress';
import PmBadge from '@/components/atoms/PmBadge';
import { Clock, Zap, Trophy } from 'lucide-react';

export interface GameHUDProps {
  progress: number;
  score: number;
  combo: number;
  timeLeft: number;
  className?: string;
}

const GameHUD: React.FC<GameHUDProps> = ({
  progress,
  score,
  combo,
  timeLeft,
  className
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 10) return 'text-red-500';
    if (timeLeft <= 30) return 'text-orange-500';
    return 'text-game-text';
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* Progress bar */}
      <PmProgress 
        value={progress} 
        color="mint" 
        size="md" 
        className="w-full"
      />
      
      {/* Stats row */}
      <div className="flex items-center justify-between">
        {/* Score */}
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-game-lemon" />
          <span className="text-lg font-bold text-game-text">
            {score.toLocaleString()}
          </span>
        </div>

        {/* Combo */}
        <div className={cn(
          'flex items-center gap-2',
          combo > 0 && 'animate-combo-bounce'
        )}>
          <Zap className="h-4 w-4 text-game-primary" />
          <PmBadge 
            label={`${combo}x`} 
            tone={combo >= 5 ? 'primary' : 'lemon'} 
            size="sm"
          />
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <Clock className={cn('h-4 w-4', getTimeColor())} />
          <span className={cn('text-lg font-mono font-bold', getTimeColor())}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;