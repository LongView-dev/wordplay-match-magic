import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import PmButton from '@/components/atoms/PmButton';
import ThemeCard from '@/components/themes/ThemeCard';
import LevelCard from '@/components/themes/LevelCard';
import { THEME_PROGRESS, THEME_LEVELS, THEME_CONFIG } from '@/data/themesData';
import type { Scene } from '@/types/domain';

const ThemePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<Scene | null>(null);
  
  // 如果没有选择主题，显示主题选择页面
  if (!selectedTheme) {
    const totalStars = THEME_PROGRESS.reduce((sum, theme) => sum + theme.earnedStars, 0);
    const totalCompletedLevels = THEME_PROGRESS.reduce((sum, theme) => sum + theme.completedLevels, 0);
    
    return (
      <div className="min-h-screen bg-game-bg">
        {/* 头部导航 */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <PmButton
              variant="ghost"
              icon={<ArrowLeft className="h-5 w-5" />}
              onClick={() => navigate('/')}
            />
            <h1 className="text-lg font-semibold text-game-text">主题闯关</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* 总体统计 */}
        <div className="px-4 py-6">
          <div className="bg-white rounded-game-xl p-6 shadow-game-card mb-6">
            <div className="text-center mb-4">
              <div className="text-2xl mb-2">🏆</div>
              <h2 className="text-xl font-bold text-game-text mb-1">闯关统计</h2>
              <p className="text-game-muted">挑战不同主题，提升英语水平</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-5 w-5 text-game-lemon fill-game-lemon" />
                  <span className="text-2xl font-bold text-game-text">{totalStars}</span>
                </div>
                <div className="text-sm text-game-muted">获得星星</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="h-5 w-5 text-game-primary" />
                  <span className="text-2xl font-bold text-game-text">{totalCompletedLevels}</span>
                </div>
                <div className="text-sm text-game-muted">完成关卡</div>
              </div>
            </div>
          </div>

          {/* 主题列表 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-game-text">选择主题</h3>
            {THEME_PROGRESS.map((progress) => (
              <ThemeCard
                key={progress.theme}
                progress={progress}
                onClick={() => progress.isUnlocked && setSelectedTheme(progress.theme)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 显示选中主题的关卡列表
  const themeLevels = THEME_LEVELS.filter(level => level.theme === selectedTheme);
  const themeProgress = THEME_PROGRESS.find(p => p.theme === selectedTheme);
  const themeConfig = THEME_CONFIG[selectedTheme];

  return (
    <div className="min-h-screen bg-game-bg">
      {/* 头部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <PmButton
            variant="ghost"
            icon={<ArrowLeft className="h-5 w-5" />}
            onClick={() => setSelectedTheme(null)}
          />
          <h1 className="text-lg font-semibold text-game-text">{themeConfig.title}</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* 主题信息 */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-game-xl p-6 shadow-game-card mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">{themeConfig.icon}</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-game-text mb-1">{themeConfig.title}</h2>
              <p className="text-game-muted">{themeConfig.description}</p>
            </div>
          </div>
          
          {themeProgress && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-game-text">
                  {themeProgress.completedLevels}/{themeProgress.totalLevels}
                </div>
                <div className="text-sm text-game-muted">完成关卡</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-game-lemon fill-game-lemon" />
                  <span className="text-lg font-bold text-game-text">
                    {themeProgress.earnedStars}/{themeProgress.totalStars}
                  </span>
                </div>
                <div className="text-sm text-game-muted">获得星星</div>
              </div>
            </div>
          )}
        </div>

        {/* 关卡列表 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-game-text">关卡列表</h3>
          {themeLevels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              onClick={() => {
                // 跳转到游戏页面，传递主题和关卡信息
                navigate(`/game?theme=${selectedTheme}&level=${level.level}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemePage;