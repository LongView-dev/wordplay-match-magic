import React from 'react';
import { cn } from '@/lib/utils';
import { PkMatch } from '@/types/domain';
import PmCard from '@/components/atoms/PmCard';
import { Clock, Zap } from 'lucide-react';

export interface PkScoreboardProps {
  match: PkMatch;
  userAvatar?: string;
  userName?: string;
  className?: string;
}

const PkScoreboard: React.FC<PkScoreboardProps> = ({
  match,
  userAvatar,
  userName = 'Me',
  className
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isWinning = match.meScore > match.rivalScore;
  const isTied = match.meScore === match.rivalScore;

  return (
    <PmCard className={cn('p-4', className)}>
      <div className="space-y-4">
        {/* Timer */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-game-muted" />
            <span className="text-xl font-mono font-bold text-game-text">
              {formatTime(match.timeLeft)}
            </span>
          </div>
          <div className="text-sm text-game-muted">PK 对战剩余时间</div>
        </div>

        {/* Score comparison */}
        <div className="flex items-center justify-between">
          {/* Me */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <img
                src={userAvatar || '/placeholder.svg'}
                alt={userName}
                className="w-12 h-12 rounded-full border-2 border-gray-200"
              />
              {isWinning && !isTied && (
                <Zap className="absolute -top-1 -right-1 h-5 w-5 text-game-lemon" />
              )}
            </div>
            <div className="text-center">
              <div className={cn(
                'text-2xl font-bold',
                isWinning && !isTied ? 'text-game-primary' : 'text-game-text'
              )}>
                {match.meScore}
              </div>
              <div className="text-xs text-game-muted">{userName}</div>
            </div>
          </div>

          {/* VS indicator */}
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-game-muted">VS</div>
            {isTied && (
              <div className="text-xs text-game-lemon font-medium">平局!</div>
            )}
          </div>

          {/* Rival */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <img
                src={match.rivalAvatar}
                alt={match.rivalName}
                className="w-12 h-12 rounded-full border-2 border-gray-200"
              />
              {!isWinning && !isTied && (
                <Zap className="absolute -top-1 -right-1 h-5 w-5 text-game-lemon" />
              )}
            </div>
            <div className="text-center">
              <div className={cn(
                'text-2xl font-bold',
                !isWinning && !isTied ? 'text-game-primary' : 'text-game-text'
              )}>
                {match.rivalScore}
              </div>
              <div className="text-xs text-game-muted">{match.rivalName}</div>
            </div>
          </div>
        </div>

        {/* Status message */}
        <div className="text-center text-sm">
          {match.status === 'playing' && (
            <span className="text-game-muted">
              {isWinning && !isTied && '🔥 你目前领先!'}
              {!isWinning && !isTied && '💪 加油追赶!'}
              {isTied && '⚡ 势均力敌!'}
            </span>
          )}
          {match.status === 'finished' && (
            <span className={cn(
              'font-medium',
              isWinning ? 'text-game-primary' : 'text-game-muted'
            )}>
              {isWinning ? '🎉 恭喜获胜!' : '😔 下次加油!'}
            </span>
          )}
        </div>
      </div>
    </PmCard>
  );
};

export default PkScoreboard;