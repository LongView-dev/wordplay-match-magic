import type { Scene } from './domain';

export interface ThemeLevel {
  id: string;
  theme: Scene;
  level: number;
  title: string;
  description: string;
  wordCount: number;
  stars: number; // 0-3
  isUnlocked: boolean;
  isCompleted: boolean;
  bestScore?: number;
  targetAccuracy: number; // 通关要求准确率
}

export interface ThemeProgress {
  theme: Scene;
  totalLevels: number;
  completedLevels: number;
  totalStars: number;
  earnedStars: number;
  isUnlocked: boolean;
}

// 重新导出已有类型
export type { Scene, WordLevel } from './domain';