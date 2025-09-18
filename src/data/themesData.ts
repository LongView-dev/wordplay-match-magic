import type { ThemeLevel, ThemeProgress } from '@/types/themes';
import type { Scene } from '@/types/domain';

export const THEME_LEVELS: ThemeLevel[] = [
  // 商务主题
  { id: 'biz_1', theme: 'business', level: 1, title: '办公室入门', description: '基础商务词汇', wordCount: 20, stars: 3, isUnlocked: true, isCompleted: true, bestScore: 950, targetAccuracy: 70 },
  { id: 'biz_2', theme: 'business', level: 2, title: '会议谈判', description: '会议场景必备', wordCount: 25, stars: 2, isUnlocked: true, isCompleted: true, bestScore: 820, targetAccuracy: 75 },
  { id: 'biz_3', theme: 'business', level: 3, title: '商务邮件', description: '邮件写作词汇', wordCount: 30, stars: 1, isUnlocked: true, isCompleted: true, bestScore: 680, targetAccuracy: 80 },
  { id: 'biz_4', theme: 'business', level: 4, title: '财务报告', description: '财务相关术语', wordCount: 35, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 85 },
  { id: 'biz_5', theme: 'business', level: 5, title: '高级商务', description: '高级商务场景', wordCount: 40, stars: 0, isUnlocked: false, isCompleted: false, targetAccuracy: 90 },
  
  // 考试主题
  { id: 'exam_1', theme: 'exam', level: 1, title: 'CET-4 基础', description: '四级核心词汇', wordCount: 30, stars: 3, isUnlocked: true, isCompleted: true, bestScore: 900, targetAccuracy: 70 },
  { id: 'exam_2', theme: 'exam', level: 2, title: 'CET-4 进阶', description: '四级高频词汇', wordCount: 35, stars: 2, isUnlocked: true, isCompleted: true, bestScore: 780, targetAccuracy: 75 },
  { id: 'exam_3', theme: 'exam', level: 3, title: 'CET-6 入门', description: '六级基础词汇', wordCount: 40, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 80 },
  { id: 'exam_4', theme: 'exam', level: 4, title: 'CET-6 核心', description: '六级核心词汇', wordCount: 45, stars: 0, isUnlocked: false, isCompleted: false, targetAccuracy: 85 },
  
  // 旅行主题
  { id: 'travel_1', theme: 'travel', level: 1, title: '机场酒店', description: '出行必备词汇', wordCount: 25, stars: 1, isUnlocked: true, isCompleted: true, bestScore: 720, targetAccuracy: 70 },
  { id: 'travel_2', theme: 'travel', level: 2, title: '餐厅购物', description: '用餐购物场景', wordCount: 30, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 75 },
  { id: 'travel_3', theme: 'travel', level: 3, title: '景点观光', description: '旅游观光词汇', wordCount: 35, stars: 0, isUnlocked: false, isCompleted: false, targetAccuracy: 80 },
  
  // 日常主题
  { id: 'daily_1', theme: 'daily', level: 1, title: '家庭生活', description: '日常家居词汇', wordCount: 20, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 70 },
  { id: 'daily_2', theme: 'daily', level: 2, title: '兴趣爱好', description: '爱好相关词汇', wordCount: 25, stars: 0, isUnlocked: false, isCompleted: false, targetAccuracy: 75 },
];

export const THEME_PROGRESS: ThemeProgress[] = [
  {
    theme: 'business',
    totalLevels: 5,
    completedLevels: 3,
    totalStars: 15,
    earnedStars: 6,
    isUnlocked: true
  },
  {
    theme: 'exam',
    totalLevels: 4,
    completedLevels: 2,
    totalStars: 12,
    earnedStars: 5,
    isUnlocked: true
  },
  {
    theme: 'travel',
    totalLevels: 3,
    completedLevels: 1,
    totalStars: 9,
    earnedStars: 1,
    isUnlocked: true
  },
  {
    theme: 'daily',
    totalLevels: 2,
    completedLevels: 0,
    totalStars: 6,
    earnedStars: 0,
    isUnlocked: true
  }
];

export const THEME_CONFIG: Record<Scene, { title: string; icon: string; color: string; description: string }> = {
  business: {
    title: '商务英语',
    icon: '💼',
    color: 'from-game-primary to-pink-500',
    description: '职场必备商务词汇'
  },
  exam: {
    title: '考试通关',
    icon: '📚',
    color: 'from-blue-500 to-game-mint',
    description: 'CET-4/6 考试词汇'
  },
  travel: {
    title: '旅行英语',
    icon: '✈️',
    color: 'from-green-500 to-game-lemon',
    description: '出国旅游实用词汇'
  },
  daily: {
    title: '日常生活',
    icon: '🏠',
    color: 'from-purple-500 to-pink-400',
    description: '生活场景常用词汇'
  }
};