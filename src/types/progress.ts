export interface DailyProgress {
  date: string; // YYYY-MM-DD format
  wordsLearned: number;
  timeSpent: number; // minutes
  accuracy: number; // percentage
  streak: number;
}

export interface WeeklyStats {
  totalWords: number;
  totalTime: number;
  averageAccuracy: number;
  daysActive: number;
}

export interface MonthlyStats {
  totalWords: number;
  totalTime: number;
  averageAccuracy: number;
  longestStreak: number;
  currentStreak: number;
}

export interface YearlyProgress {
  year: number;
  dailyData: DailyProgress[];
  monthlyStats: MonthlyStats[];
  totalWords: number;
  totalDays: number;
}