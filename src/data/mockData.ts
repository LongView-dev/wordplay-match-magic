import { Word, Candidate, User, PkMatch } from '@/types/domain';

export const MOCK_WORDS: Word[] = [
  {
    id: 'W001',
    en: 'negotiate',
    zh: '谈判；协商',
    level: 'CET-6',
    scene: 'business',
    phonetic: '/nɪˈɡoʊʃieɪt/',
    example: 'We need to negotiate the terms of the contract.'
  },
  {
    id: 'W002',
    en: 'sprint',
    zh: '冲刺',
    level: 'CET-4',
    scene: 'cet',
    phonetic: '/sprɪnt/',
    example: 'He sprinted to the finish line.'
  },
  {
    id: 'W003',
    en: 'adventure',
    zh: '冒险',
    level: 'primary',
    scene: 'travel',
    phonetic: '/ədˈventʃər/',
    example: 'Their trip to the mountains was a great adventure.'
  },
  {
    id: 'W004',
    en: 'delicious',
    zh: '美味的',
    level: 'primary',
    scene: 'daily',
    phonetic: '/dɪˈlɪʃəs/',
    example: 'The cake was absolutely delicious.'
  },
  {
    id: 'W005',
    en: 'conference',
    zh: '会议',
    level: 'business',
    scene: 'business',
    phonetic: '/ˈkɑːnfərəns/',
    example: 'The conference will be held next week.'
  },
  {
    id: 'W006',
    en: 'enthusiastic',
    zh: '热情的',
    level: 'CET-6',
    scene: 'cet',
    phonetic: '/ɪnˌθuːziˈæstɪk/',
    example: 'She was enthusiastic about the new project.'
  }
];

export const generateCandidates = (correctWord: Word): Candidate[] => {
  const allOptions = [
    '谈判', '冲刺', '冒险', '美味的', '会议', '热情的', 
    '建筑', '音乐', '朋友', '家庭', '学习', '工作',
    '快乐', '悲伤', '愤怒', '惊讶', '恐惧', '厌恶',
    '红色', '蓝色', '绿色', '黄色', '紫色', '橙色',
    '汽车', '飞机', '火车', '自行车', '轮船', '摩托车'
  ];

  const wrongOptions = allOptions.filter(option => option !== correctWord.zh);
  const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5);

  const candidates: Candidate[] = [
    {
      id: `correct-${correctWord.id}`,
      label: correctWord.zh,
      correct: true
    },
    {
      id: `wrong1-${correctWord.id}`,
      label: shuffledWrong[0],
      correct: false
    },
    {
      id: `wrong2-${correctWord.id}`,
      label: shuffledWrong[1],
      correct: false
    }
  ];

  return candidates.sort(() => Math.random() - 0.5);
};

export const MOCK_USER: User = {
  id: 'user-001',
  nickname: '英语学霸',
  avatar: '/placeholder.svg',
  rank: 'gold',
  masteredWords: 1247,
  totalScore: 89650
};

export const MOCK_PK_MATCH: PkMatch = {
  id: 'pk-001',
  meScore: 850,
  rivalScore: 720,
  rivalName: '小明同学',
  rivalAvatar: '/placeholder.svg',
  timeLeft: 180,
  status: 'playing'
};

export const MOCK_THEMES = [
  {
    id: 'business',
    name: '商务英语',
    description: '职场必备词汇',
    icon: '💼',
    progress: 65,
    totalLevels: 20,
    unlockedLevels: 13
  },
  {
    id: 'travel',
    name: '旅游英语',
    description: '出行沟通无障碍',
    icon: '✈️',
    progress: 40,
    totalLevels: 15,
    unlockedLevels: 6
  },
  {
    id: 'daily',
    name: '日常生活',
    description: '生活场景词汇',
    icon: '🏠',
    progress: 80,
    totalLevels: 25,
    unlockedLevels: 20
  },
  {
    id: 'exam',
    name: '考试词汇',
    description: 'CET-4/6 核心词汇',
    icon: '📚',
    progress: 30,
    totalLevels: 30,
    unlockedLevels: 9
  }
];