import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ContributionGraph from './ContributionGraph';
import { MOCK_YEARLY_PROGRESS } from '@/data/progressData';

interface ProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ open, onOpenChange }) => {
  const { dailyData, totalWords, totalDays } = MOCK_YEARLY_PROGRESS;
  
  // 计算当前连续天数
  const getCurrentStreak = () => {
    const sortedData = [...dailyData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 0;
    for (const day of sortedData) {
      if (day.wordsLearned > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  // 计算本周数据
  const getThisWeekStats = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1);
    
    const thisWeekData = dailyData.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= weekStart && dayDate <= today;
    });
    
    return {
      totalWords: thisWeekData.reduce((sum, day) => sum + day.wordsLearned, 0),
      activeDays: thisWeekData.filter(day => day.wordsLearned > 0).length,
      averageAccuracy: thisWeekData.length > 0 
        ? Math.round(thisWeekData.reduce((sum, day) => sum + day.accuracy, 0) / thisWeekData.length)
        : 0
    };
  };

  const currentStreak = getCurrentStreak();
  const thisWeek = getThisWeekStats();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">📊 我的学习进度</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalWords}</div>
              <div className="text-sm text-blue-500">总单词数</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{totalDays}</div>
              <div className="text-sm text-green-500">学习天数</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{currentStreak}</div>
              <div className="text-sm text-orange-500">连续天数</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{thisWeek.totalWords}</div>
              <div className="text-sm text-purple-500">本周单词</div>
            </div>
          </div>

          {/* 贡献度图表 */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">学习活跃度</h3>
            <ContributionGraph dailyData={dailyData} />
          </div>

          {/* 本周详细统计 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">📅 本周表现</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-indigo-600">{thisWeek.totalWords}</div>
                <div className="text-sm text-gray-600">学习单词</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">{thisWeek.activeDays}</div>
                <div className="text-sm text-gray-600">活跃天数</div>
              </div>
              <div>
                <div className="text-xl font-bold text-pink-600">{thisWeek.averageAccuracy}%</div>
                <div className="text-sm text-gray-600">平均准确率</div>
              </div>
            </div>
          </div>

          {/* 学习建议 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">💡 学习建议</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {currentStreak >= 7 && (
                <p>🔥 太棒了！你已经连续学习{currentStreak}天了，保持这个节奏！</p>
              )}
              {currentStreak < 3 && (
                <p>💪 建议每天至少学习10个单词，养成良好的学习习惯</p>
              )}
              {thisWeek.averageAccuracy < 80 && (
                <p>🎯 本周准确率还有提升空间，可以多复习错误的单词</p>
              )}
              {thisWeek.totalWords < 50 && (
                <p>📈 本周学习量较少，建议增加每日学习时间</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressModal;