import React from 'react';
import { cn } from '@/lib/utils';
import { GameResult } from '@/types/domain';
import PmCard from '@/components/atoms/PmCard';
import PmButton from '@/components/atoms/PmButton';
import PmBadge from '@/components/atoms/PmBadge';
import { Trophy, Clock, Zap, BookOpen, Gift } from 'lucide-react';

export interface RewardModalProps {
  result: GameResult;
  onAgain: () => void;
  onHome: () => void;
  visible?: boolean;
}

const RewardModal: React.FC<RewardModalProps> = ({
  result,
  onAgain,
  onHome,
  visible = true
}) => {
  if (!visible) return null;

  const getAccuracyColor = () => {
    if (result.accuracy >= 80) return 'text-game-mint';
    if (result.accuracy >= 60) return 'text-game-lemon';
    return 'text-red-500';
  };

  const getScoreRating = () => {
    if (result.score >= 1000) return { emoji: '🔥', text: '完美表现!' };
    if (result.score >= 500) return { emoji: '⭐', text: '表现优秀!' };
    if (result.score >= 200) return { emoji: '👍', text: '不错哦!' };
    return { emoji: '💪', text: '继续加油!' };
  };

  const { emoji, text } = getScoreRating();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <PmCard className="w-full max-w-sm animate-in slide-in-from-bottom-4 duration-300">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="text-4xl">{emoji}</div>
            <h2 className="text-xl font-bold text-game-text">{text}</h2>
            <p className="text-game-muted text-sm">本次游戏成绩统计</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="h-4 w-4 text-game-lemon" />
                <span className="text-2xl font-bold text-game-text">
                  {result.score.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-game-muted">总分</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1">
                <span className={cn('text-2xl font-bold', getAccuracyColor())}>
                  {result.accuracy}%
                </span>
              </div>
              <div className="text-xs text-game-muted">正确率</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4 text-game-muted" />
                <span className="text-lg font-semibold text-game-text">
                  {Math.floor(result.timeUsed / 60)}:{(result.timeUsed % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="text-xs text-game-muted">用时</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1">
                <Zap className="h-4 w-4 text-game-primary" />
                <span className="text-lg font-semibold text-game-text">
                  {result.comboMax}x
                </span>
              </div>
              <div className="text-xs text-game-muted">最高连击</div>
            </div>
          </div>

          {/* New words mastered */}
          {result.newMastered > 0 && (
            <div className="flex items-center justify-center gap-2 p-3 bg-game-mint/10 rounded-game-md">
              <BookOpen className="h-5 w-5 text-game-mint" />
              <span className="text-game-text">
                新掌握 <span className="font-bold text-game-mint">{result.newMastered}</span> 个单词
              </span>
            </div>
          )}

          {/* Rewards */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-5 w-5 text-game-primary" />
              <span className="font-semibold text-game-text">获得奖励</span>
            </div>
            <PmBadge 
              label={result.rewardText} 
              tone="lemon" 
              size="md" 
              variant="soft"
            />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <PmButton variant="outline" onClick={onHome} fullWidth>
              返回主页
            </PmButton>
            <PmButton variant="primary" onClick={onAgain} fullWidth>
              再玩一次
            </PmButton>
          </div>
        </div>
      </PmCard>
    </div>
  );
};

export default RewardModal;