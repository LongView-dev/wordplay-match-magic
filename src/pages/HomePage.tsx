import React from 'react';
import { useNavigate } from 'react-router-dom';
import PmCard from '@/components/atoms/PmCard';
import PmButton from '@/components/atoms/PmButton';
import PmProgress from '@/components/atoms/PmProgress';
import LevelRibbon from '@/components/game/LevelRibbon';
import { MOCK_USER, MOCK_THEMES } from '@/data/mockData';
import { 
  Play, 
  Users, 
  Target, 
  ShoppingBag, 
  BookOpen, 
  Clock,
  TrendingUp
} from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const todayProgress = 65; // Mock today's progress
  const bestScore = 1520; // Mock best score

  return (
    <div className="min-h-screen bg-game-bg p-4 pb-20 max-w-md mx-auto">
      {/* Header - User Profile Card */}
      <PmCard className="mb-6 p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={MOCK_USER.avatar}
              alt={MOCK_USER.nickname}
              className="w-16 h-16 rounded-full border-2 border-game-mint"
            />
            <div className="absolute -bottom-1 -right-1">
              <LevelRibbon rank={MOCK_USER.rank} showProgress={false} size="sm" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-game-text">{MOCK_USER.nickname}</h2>
            <div className="text-sm text-game-muted space-y-1">
              <div>已掌握 {MOCK_USER.masteredWords.toLocaleString()} 个单词</div>
              <div>总积分 {MOCK_USER.totalScore.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </PmCard>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <PmCard 
          hoverable 
          className="p-4 text-center"
          onClick={() => navigate('/game')}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-game-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Play className="h-6 w-6 text-game-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-game-text">每日挑战</h3>
              <p className="text-xs text-game-muted">90秒匹配挑战</p>
            </div>
          </div>
        </PmCard>

        <PmCard 
          hoverable 
          className="p-4 text-center"
          onClick={() => navigate('/themes')}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-game-mint/10 rounded-full flex items-center justify-center mx-auto">
              <Target className="h-6 w-6 text-game-mint" />
            </div>
            <div>
              <h3 className="font-semibold text-game-text">主题闯关</h3>
              <p className="text-xs text-game-muted">分类词汇训练</p>
            </div>
          </div>
        </PmCard>

        <PmCard 
          hoverable 
          className="p-4 text-center"
          onClick={() => navigate('/pk')}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-game-lemon/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-6 w-6 text-game-lemon" />
            </div>
            <div>
              <h3 className="font-semibold text-game-text">好友PK</h3>
              <p className="text-xs text-game-muted">实时对战</p>
            </div>
          </div>
        </PmCard>

        <PmCard 
          hoverable 
          className="p-4 text-center"
          onClick={() => navigate('/items')}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-game-text">道具中心</h3>
              <p className="text-xs text-game-muted">购买道具</p>
            </div>
          </div>
        </PmCard>
      </div>

      {/* Today's Progress */}
      <PmCard className="mb-6">
        <h3 className="font-semibold text-game-text mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5 text-game-mint" />
          今日进度
        </h3>
        <div className="space-y-3">
          <PmProgress value={todayProgress} color="mint" showLabel />
          <div className="flex justify-between text-sm text-game-muted">
            <span>今日目标: 100 个单词</span>
            <span>{Math.round(todayProgress)} 个已完成</span>
          </div>
        </div>
      </PmCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <PmCard className="p-4 text-center">
          <div className="space-y-2">
            <TrendingUp className="h-6 w-6 text-game-primary mx-auto" />
            <div className="text-xl font-bold text-game-text">{bestScore}</div>
            <div className="text-xs text-game-muted">历史最佳</div>
          </div>
        </PmCard>

        <PmCard className="p-4 text-center">
          <div className="space-y-2">
            <BookOpen className="h-6 w-6 text-game-mint mx-auto" />
            <div className="text-xl font-bold text-game-text">23</div>
            <div className="text-xs text-game-muted">错题本</div>
          </div>
        </PmCard>
      </div>

      {/* Quick Theme Access */}
      <PmCard className="mb-6">
        <h3 className="font-semibold text-game-text mb-3">热门主题</h3>
        <div className="space-y-3">
          {MOCK_THEMES.slice(0, 2).map((theme) => (
            <div 
              key={theme.id}
              className="flex items-center gap-3 p-3 rounded-game-md hover:bg-game-bg/50 cursor-pointer transition-colors"
              onClick={() => navigate(`/themes/${theme.id}`)}
            >
              <div className="text-2xl">{theme.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-game-text">{theme.name}</div>
                <div className="text-xs text-game-muted">{theme.description}</div>
                <PmProgress value={theme.progress} color="mint" size="sm" className="mt-1" />
              </div>
            </div>
          ))}
        </div>
      </PmCard>

      {/* Start Game CTA */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <PmButton
          variant="hero"
          fullWidth
          onClick={() => navigate('/game')}
          className="text-lg py-4"
        >
          开始今日挑战
        </PmButton>
      </div>
    </div>
  );
};

export default HomePage;