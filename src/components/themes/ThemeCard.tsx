import React from 'react';
import { cn } from '@/lib/utils';
import PmCard from '@/components/atoms/PmCard';
import PmProgress from '@/components/atoms/PmProgress';
import type { ThemeProgress } from '@/types/themes';
import { THEME_CONFIG } from '@/data/themesData';

export interface ThemeCardProps {
  progress: ThemeProgress;
  onClick?: () => void;
  className?: string;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ progress, onClick, className }) => {
  const config = THEME_CONFIG[progress.theme];
  const completionRate = Math.round((progress.completedLevels / progress.totalLevels) * 100);
  
  return (
    <PmCard 
      hoverable 
      className={cn('relative overflow-hidden', className)}
      onClick={onClick}
    >
      {/* 背景渐变 */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-r opacity-10',
        config.color
      )} />
      
      <div className="relative z-10">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{config.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-game-text">{config.title}</h3>
              <p className="text-sm text-game-muted">{config.description}</p>
            </div>
          </div>
          {!progress.isUnlocked && (
            <div className="text-2xl opacity-50">🔒</div>
          )}
        </div>

        {/* 进度信息 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-game-muted">进度</span>
            <span className="text-game-text font-medium">
              {progress.completedLevels}/{progress.totalLevels} 关卡
            </span>
          </div>
          
          <PmProgress 
            value={completionRate} 
            color="mint"
            size="sm"
          />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-game-lemon">⭐</span>
              <span className="text-sm font-medium text-game-text">
                {progress.earnedStars}/{progress.totalStars}
              </span>
            </div>
            <div className="text-sm text-game-muted">
              {completionRate}% 完成
            </div>
          </div>
        </div>
      </div>
    </PmCard>
  );
};

export default ThemeCard;