import React from 'react';
import { cn } from '@/lib/utils';
import type { DailyProgress } from '@/types/progress';

interface ContributionGraphProps {
  dailyData: DailyProgress[];
  className?: string;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ dailyData, className }) => {
  // 获取过去一年的周数据结构
  const getWeeksData = () => {
    const weeks: DailyProgress[][] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
    
    // 找到一年前的周一
    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    
    let currentWeek: DailyProgress[] = [];
    const dataMap = new Map(dailyData.map(d => [d.date, d]));
    
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayData = dataMap.get(dateStr) || {
        date: dateStr,
        wordsLearned: 0,
        timeSpent: 0,
        accuracy: 0,
        streak: 0
      };
      
      currentWeek.push(dayData);
      
      // 每周日结束当前周
      if (d.getDay() === 0) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }
    
    // 添加最后一周（如果不完整）
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  // 根据单词数量获取颜色强度
  const getIntensityClass = (wordsLearned: number) => {
    if (wordsLearned === 0) return 'bg-gray-100';
    if (wordsLearned <= 10) return 'bg-green-200';
    if (wordsLearned <= 20) return 'bg-green-300';
    if (wordsLearned <= 35) return 'bg-green-500';
    return 'bg-green-700';
  };

  const weeks = getWeeksData();
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const weekdays = ['周一', '周三', '周五'];

  return (
    <div className={cn('overflow-x-auto', className)}>
      <div className="min-w-[800px] p-4">
        {/* 月份标签 */}
        <div className="flex mb-2 text-xs text-gray-500">
          {months.map((month, index) => (
            <div key={month} className="flex-1 text-center">
              {month}
            </div>
          ))}
        </div>
        
        <div className="flex">
          {/* 星期标签 */}
          <div className="flex flex-col mr-2 text-xs text-gray-500">
            <div className="h-3"></div> {/* 空白对齐 */}
            {weekdays.map((day, index) => (
              <div key={day} className="h-3 leading-3 mb-1">
                {index === 0 && day}
                {index === 1 && day}
                {index === 2 && day}
              </div>
            ))}
          </div>
          
          {/* 贡献度网格 */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const dayData = week[dayIndex];
                  if (!dayData) {
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className="w-3 h-3 bg-gray-50 rounded-sm"
                      />
                    );
                  }
                  
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={cn(
                        'w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-gray-400',
                        getIntensityClass(dayData.wordsLearned)
                      )}
                      title={`${dayData.date}: ${dayData.wordsLearned} 个单词`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {/* 图例 */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>过去一年的学习记录</span>
          <div className="flex items-center gap-1">
            <span>少</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
            </div>
            <span>多</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;