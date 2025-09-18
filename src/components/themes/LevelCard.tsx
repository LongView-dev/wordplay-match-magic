import React from 'react';
import { cn } from '@/lib/utils';
import PmCard from '@/components/atoms/PmCard';
import PmBadge from '@/components/atoms/PmBadge';
import { Lock, Star, Clock, Target } from 'lucide-react';
import type { ThemeLevel } from '@/types/themes';

export interface LevelCardProps {
  level: ThemeLevel;
  onClick?: () => void;
  className?: string;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, onClick, className }) => {
  const getStarDisplay = () => {
    const stars = [];
    for (let i = 0; i < 3; i++) {
      stars.push(
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < level.stars 
              ? 'text-game-lemon fill-game-lemon' 
              : 'text-gray-300'
          )}
        />
      );
    }
    return stars;
  };

  return (
    <PmCard 
      hoverable={level.isUnlocked}
      className={cn(
        'relative',
        !level.isUnlocked && 'opacity-60',
        className
      )}
      onClick={level.isUnlocked ? onClick : undefined}
    >
      {/* 锁定状态覆盖 */}
      {!level.isUnlocked && (
        <div className="absolute top-2 right-2 z-10">
          <Lock className="h-5 w-5 text-game-muted" />
        </div>
      )}

      <div className="space-y-3">
        {/* 头部信息 */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <PmBadge label={`第${level.level}关`} tone="lemon" />
              {level.isCompleted && (
                <PmBadge label="已完成" tone="mint" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-game-text mb-1">
              {level.title}
            </h3>
            <p className="text-sm text-game-muted">
              {level.description}
            </p>
          </div>
        </div>

        {/* 关卡信息 */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1 text-game-muted">
            <Target className="h-4 w-4" />
            <span>{level.wordCount} 词汇</span>
          </div>
          <div className="flex items-center gap-1 text-game-muted">
            <Clock className="h-4 w-4" />
            <span>{level.targetAccuracy}% 通关</span>
          </div>
        </div>

        {/* 星级和最佳成绩 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {getStarDisplay()}
          </div>
          {level.bestScore && (
            <div className="text-sm font-medium text-game-primary">
              最佳: {level.bestScore}
            </div>
          )}
        </div>
      </div>
    </PmCard>
  );
};

export default LevelCard;