import type { DailyProgress, YearlyProgress } from '@/types/progress';

// 生成过去一年的模拟数据
const generateDailyProgress = (): DailyProgress[] => {
  const data: DailyProgress[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
  
  let currentStreak = 0;
  
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    
    // 80% 的天数有学习记录
    const hasActivity = Math.random() > 0.2;
    
    if (hasActivity) {
      const wordsLearned = Math.floor(Math.random() * 50) + 5; // 5-55个单词
      const timeSpent = Math.floor(Math.random() * 60) + 10; // 10-70分钟
      const accuracy = Math.floor(Math.random() * 30) + 70; // 70-100%准确率
      currentStreak++;
      
      data.push({
        date: dateStr,
        wordsLearned,
        timeSpent,
        accuracy,
        streak: currentStreak
      });
    } else {
      // 没有学习的天数
      if (Math.random() > 0.7) { // 30% 概率完全没有记录
        currentStreak = 0;
        data.push({
          date: dateStr,
          wordsLearned: 0,
          timeSpent: 0,
          accuracy: 0,
          streak: 0
        });
      }
    }
  }
  
  return data;
};

export const MOCK_YEARLY_PROGRESS: YearlyProgress = {
  year: new Date().getFullYear(),
  dailyData: generateDailyProgress(),
  monthlyStats: [], // 可以后续计算
  totalWords: 0, // 可以后续计算
  totalDays: 0 // 可以后续计算
};

// 计算统计数据
const dailyData = MOCK_YEARLY_PROGRESS.dailyData;
MOCK_YEARLY_PROGRESS.totalWords = dailyData.reduce((sum, day) => sum + day.wordsLearned, 0);
MOCK_YEARLY_PROGRESS.totalDays = dailyData.filter(day => day.wordsLearned > 0).length;