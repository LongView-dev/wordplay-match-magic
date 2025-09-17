import React from 'react';
import { cn } from '@/lib/utils';
import { UserRank } from '@/types/domain';
import { Crown, Award, Star, Gem, Sparkles, Zap } from 'lucide-react';

export interface LevelRibbonProps {
  rank: UserRank;
  progress?: number; // 0-100, progress to next rank
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LevelRibbon: React.FC<LevelRibbonProps> = ({
  rank,
  progress = 0,
  showProgress = true,
  size = 'md',
  className
}) => {
  const getRankConfig = () => {
    switch (rank) {
      case 'bronze':
        return {
          icon: Award,
          label: '青铜',
          bgColor: 'bg-gradient-to-r from-amber-600 to-amber-700',
          textColor: 'text-white',
          progressColor: 'bg-amber-400'
        };
      case 'silver':
        return {
          icon: Star,
          label: '白银',
          bgColor: 'bg-gradient-to-r from-gray-400 to-gray-500',
          textColor: 'text-white',
          progressColor: 'bg-gray-300'
        };
      case 'gold':
        return {
          icon: Gem,
          label: '黄金',
          bgColor: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
          textColor: 'text-yellow-900',
          progressColor: 'bg-yellow-300'
        };
      case 'platinum':
        return {
          icon: Sparkles,
          label: '铂金',
          bgColor: 'bg-gradient-to-r from-blue-400 to-blue-500',
          textColor: 'text-white',
          progressColor: 'bg-blue-300'
        };
      case 'diamond':
        return {
          icon: Zap,
          label: '钻石',
          bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
          textColor: 'text-white',
          progressColor: 'bg-purple-300'
        };
      case 'king':
        return {
          icon: Crown,
          label: '王者',
          bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
          textColor: 'text-white',
          progressColor: 'bg-red-300'
        };
      default:
        return {
          icon: Award,
          label: '青铜',
          bgColor: 'bg-gradient-to-r from-amber-600 to-amber-700',
          textColor: 'text-white',
          progressColor: 'bg-amber-400'
        };
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'px-3 py-1.5',
          icon: 'h-4 w-4',
          text: 'text-sm font-medium',
          progressHeight: 'h-1'
        };
      case 'md':
        return {
          container: 'px-4 py-2',
          icon: 'h-5 w-5',
          text: 'text-base font-semibold',
          progressHeight: 'h-1.5'
        };
      case 'lg':
        return {
          container: 'px-6 py-3',
          icon: 'h-6 w-6',
          text: 'text-lg font-bold',
          progressHeight: 'h-2'
        };
      default:
        return {
          container: 'px-4 py-2',
          icon: 'h-5 w-5',
          text: 'text-base font-semibold',
          progressHeight: 'h-1.5'
        };
    }
  };

  const { icon: Icon, label, bgColor, textColor, progressColor } = getRankConfig();
  const { container, icon, text, progressHeight } = getSizeConfig();

  return (
    <div className={cn('inline-block', className)}>
      <div className={cn(
        'flex items-center gap-2 rounded-game-md shadow-md',
        container,
        bgColor,
        textColor
      )}>
        <Icon className={icon} />
        <span className={text}>{label}</span>
      </div>
      
      {showProgress && rank !== 'king' && (
        <div className="mt-2">
          <div className={cn('bg-gray-200 rounded-full overflow-hidden', progressHeight)}>
            <div
              className={cn('h-full transition-all duration-300', progressColor)}
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
          <div className="text-xs text-game-muted mt-1 text-center">
            距离下一段位 {100 - progress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelRibbon;