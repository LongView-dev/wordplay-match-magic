export type WordLevel = 'primary' | 'CET-4' | 'CET-6' | 'business';
export type Scene = 'exam' | 'business' | 'travel' | 'daily';

export interface Word {
  id: string;
  en: string;
  zh: string;
  level: WordLevel;
  scene: Scene;
  example?: string;
  phonetic?: string;
}

export interface Candidate {
  id: string;
  label: string;
  correct: boolean;
}

export interface GameResult {
  accuracy: number;
  timeUsed: number;
  comboMax: number;
  newMastered: number;
  rewardText: string;
  score: number;
}

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  rank: UserRank;
  masteredWords: number;
  totalScore: number;
}

export type UserRank = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'king';

export interface PkMatch {
  id: string;
  meScore: number;
  rivalScore: number;
  rivalName: string;
  rivalAvatar: string;
  timeLeft: number;
  status: 'playing' | 'finished';
}