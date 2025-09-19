import type { ThemeLevel, ThemeProgress } from '@/types/themes';
import type { Scene } from '@/types/domain';

export const THEME_LEVELS: ThemeLevel[] = [
  // 英语四六级
  { id: 'cet_1', theme: 'cet', level: 1, title: 'CET-4 基础', description: '四级核心词汇', wordCount: 30, stars: 3, isUnlocked: true, isCompleted: true, bestScore: 900, targetAccuracy: 70 },
  { id: 'cet_2', theme: 'cet', level: 2, title: 'CET-4 进阶', description: '四级高频词汇', wordCount: 35, stars: 2, isUnlocked: true, isCompleted: true, bestScore: 780, targetAccuracy: 75 },
  { id: 'cet_3', theme: 'cet', level: 3, title: 'CET-6 入门', description: '六级基础词汇', wordCount: 40, stars: 1, isUnlocked: true, isCompleted: true, bestScore: 650, targetAccuracy: 80 },
  { id: 'cet_4', theme: 'cet', level: 4, title: 'CET-6 核心', description: '六级核心词汇', wordCount: 45, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 85 },
  { id: 'cet_5', theme: 'cet', level: 5, title: 'CET-6 进阶', description: '六级高分词汇', wordCount: 50, stars: 0, isUnlocked: false, isCompleted: false, targetAccuracy: 90 },
  
  // 托福考试
  { id: 'toefl_1', theme: 'toefl', level: 1, title: 'TOEFL 基础', description: '托福核心词汇', wordCount: 40, stars: 2, isUnlocked: true, isCompleted: true, bestScore: 820, targetAccuracy: 75 },
  { id: 'toefl_2', theme: 'toefl', level: 2, title: 'TOEFL 阅读', description: '阅读高频词汇', wordCount: 45, stars: 1, isUnlocked: true, isCompleted: true, bestScore: 750, targetAccuracy: 80 },
  { id: 'toefl_3', theme: 'toefl', level: 3, title: 'TOEFL 听力', description: '听力场景词汇', wordCount: 35, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 85 },
  { id: 'toefl_4', theme: 'toefl', level: 4, title: 'TOEFL 写作', description: '写作必备词汇', wordCount: 40, stars: 0, isUnlocked: false, isCompleted: false, targetAccuracy: 90 },
  
  // 雅思考试
  { id: 'ielts_1', theme: 'ielts', level: 1, title: 'IELTS 基础', description: '雅思核心词汇', wordCount: 35, stars: 1, isUnlocked: true, isCompleted: true, bestScore: 680, targetAccuracy: 75 },
  { id: 'ielts_2', theme: 'ielts', level: 2, title: 'IELTS 学术', description: '学术类词汇', wordCount: 40, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 80 },
  { id: 'ielts_3', theme: 'ielts', level: 3, title: 'IELTS 口语', description: '口语表达词汇', wordCount: 30, stars: 0, isUnlocked: false, isCompleted: false, targetAccuracy: 85 },
  { id: 'ielts_4', theme: 'ielts', level: 4, title: 'IELTS 写作', description: '写作高分词汇', wordCount: 45, stars: 0, isUnlocked: false, isCompleted: false, targetAccuracy: 90 },
  
  // 商务主题
  { id: 'biz_1', theme: 'business', level: 1, title: '办公室入门', description: '基础商务词汇', wordCount: 20, stars: 3, isUnlocked: true, isCompleted: true, bestScore: 950, targetAccuracy: 70 },
  { id: 'biz_2', theme: 'business', level: 2, title: '会议谈判', description: '会议场景必备', wordCount: 25, stars: 2, isUnlocked: true, isCompleted: true, bestScore: 820, targetAccuracy: 75 },
  { id: 'biz_3', theme: 'business', level: 3, title: '商务邮件', description: '邮件写作词汇', wordCount: 30, stars: 1, isUnlocked: true, isCompleted: true, bestScore: 680, targetAccuracy: 80 },
  { id: 'biz_4', theme: 'business', level: 4, title: '财务报告', description: '财务相关术语', wordCount: 35, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 85 },
  
  // 旅行主题
  { id: 'travel_1', theme: 'travel', level: 1, title: '机场酒店', description: '出行必备词汇', wordCount: 25, stars: 1, isUnlocked: true, isCompleted: true, bestScore: 720, targetAccuracy: 70 },
  { id: 'travel_2', theme: 'travel', level: 2, title: '餐厅购物', description: '用餐购物场景', wordCount: 30, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 75 },
  
  // 日常主题
  { id: 'daily_1', theme: 'daily', level: 1, title: '家庭生活', description: '日常家居词汇', wordCount: 20, stars: 0, isUnlocked: true, isCompleted: false, targetAccuracy: 70 },
];

export const THEME_PROGRESS: ThemeProgress[] = [
  {
    theme: 'cet',
    totalLevels: 5,
    completedLevels: 3,
    totalStars: 15,
    earnedStars: 6,
    isUnlocked: true
  },
  {
    theme: 'toefl',
    totalLevels: 4,
    completedLevels: 2,
    totalStars: 12,
    earnedStars: 3,
    isUnlocked: true
  },
  {
    theme: 'ielts',
    totalLevels: 4,
    completedLevels: 1,
    totalStars: 12,
    earnedStars: 1,
    isUnlocked: true
  },
  {
    theme: 'business',
    totalLevels: 4,
    completedLevels: 3,
    totalStars: 12,
    earnedStars: 6,
    isUnlocked: true
  },
  {
    theme: 'travel',
    totalLevels: 2,
    completedLevels: 1,
    totalStars: 6,
    earnedStars: 1,
    isUnlocked: true
  },
  {
    theme: 'daily',
    totalLevels: 1,
    completedLevels: 0,
    totalStars: 3,
    earnedStars: 0,
    isUnlocked: true
  }
];

export const THEME_CONFIG: Record<Scene, { title: string; icon: string; color: string; description: string }> = {
  cet: {
    title: '英语四六级',
    icon: '🎓',
    color: 'from-blue-500 to-indigo-600',
    description: 'CET-4/6 考试必备词汇'
  },
  toefl: {
    title: 'TOEFL托福',
    icon: '🌍',
    color: 'from-green-500 to-emerald-600',
    description: '托福考试核心词汇'
  },
  ielts: {
    title: 'IELTS雅思',
    icon: '🎯',
    color: 'from-red-500 to-rose-600',
    description: '雅思考试高分词汇'
  },
  business: {
    title: '商务英语',
    icon: '💼',
    color: 'from-purple-500 to-violet-600',
    description: '职场必备商务词汇'
  },
  travel: {
    title: '旅行英语',
    icon: '✈️',
    color: 'from-orange-500 to-amber-600',
    description: '出国旅游实用词汇'
  },
  daily: {
    title: '日常生活',
    icon: '🏠',
    color: 'from-pink-500 to-rose-500',
    description: '生活场景常用词汇'
  }
};