import type { GameItem } from '@/types/items';

export const GAME_ITEMS: GameItem[] = [
  // Hint Items
  {
    id: 'hint_card',
    name: '提示卡',
    description: '显示正确答案的第一个字母',
    type: 'consumable',
    category: 'hint',
    price: 50,
    currency: 'coins',
    rarity: 'common',
    icon: '💡',
    effect: {
      type: 'hint',
      value: 1
    }
  },
  {
    id: 'super_hint',
    name: '超级提示',
    description: '直接显示正确答案',
    type: 'consumable',
    category: 'hint',
    price: 5,
    currency: 'gems',
    rarity: 'rare',
    icon: '🌟',
    effect: {
      type: 'hint',
      value: 2
    }
  },
  
  // Time Items
  {
    id: 'time_freeze',
    name: '时间冻结',
    description: '暂停倒计时15秒',
    type: 'consumable',
    category: 'time',
    price: 80,
    currency: 'coins',
    rarity: 'rare',
    icon: '❄️',
    effect: {
      type: 'time_add',
      value: 15
    }
  },
  {
    id: 'time_boost',
    name: '时间加速器',
    description: '增加30秒游戏时间',
    type: 'consumable',
    category: 'time',
    price: 10,
    currency: 'gems',
    rarity: 'epic',
    icon: '⚡',
    effect: {
      type: 'time_add',
      value: 30
    }
  },
  
  // Score Boosters
  {
    id: 'score_double',
    name: '双倍积分',
    description: '下一局积分翻倍',
    type: 'consumable',
    category: 'score',
    price: 120,
    currency: 'coins',
    rarity: 'epic',
    icon: '🎯',
    effect: {
      type: 'score_boost',
      value: 2,
      duration: 180
    }
  },
  {
    id: 'combo_shield',
    name: 'Combo护盾',
    description: '保护连击不被打断一次',
    type: 'consumable',
    category: 'protection',
    price: 8,
    currency: 'gems',
    rarity: 'rare',
    icon: '🛡️',
    effect: {
      type: 'combo_protect',
      value: 1
    }
  },
  
  // Energy & Recovery
  {
    id: 'energy_drink',
    name: '能量饮料',
    description: '立即恢复50点体力',
    type: 'consumable',
    category: 'energy',
    price: 60,
    currency: 'coins',
    rarity: 'common',
    icon: '🥤',
    effect: {
      type: 'energy_restore',
      value: 50
    }
  },
  {
    id: 'mega_energy',
    name: '超级能量包',
    description: '完全恢复体力',
    type: 'consumable',
    category: 'energy',
    price: 15,
    currency: 'gems',
    rarity: 'epic',
    icon: '⚡',
    effect: {
      type: 'energy_restore',
      value: 100
    }
  },
  
  // Cosmetic Items
  {
    id: 'golden_theme',
    name: '黄金主题',
    description: '豪华的金色界面主题',
    type: 'permanent',
    category: 'cosmetic',
    price: 50,
    currency: 'gems',
    rarity: 'legendary',
    icon: '👑',
    unlockLevel: 10
  },
  {
    id: 'neon_theme',
    name: '霓虹主题',
    description: '炫酷的霓虹灯效果',
    type: 'permanent',
    category: 'cosmetic',
    price: 30,
    currency: 'gems',
    rarity: 'epic',
    icon: '🌈',
    unlockLevel: 5
  },
  
  // Special Items
  {
    id: 'lucky_charm',
    name: '幸运符',
    description: '提高稀有奖励获得概率',
    type: 'permanent',
    category: 'special',
    price: 100,
    currency: 'gems',
    rarity: 'legendary',
    icon: '🍀',
    unlockLevel: 20
  }
];

export const MOCK_USER_INVENTORY = {
  userId: 'user_001',
  coins: 850,
  gems: 25,
  items: [
    {
      ...GAME_ITEMS[0], // hint_card
      ownedQuantity: 5,
      purchaseDate: '2024-01-15T10:30:00Z'
    },
    {
      ...GAME_ITEMS[6], // energy_drink
      ownedQuantity: 3,
      purchaseDate: '2024-01-14T15:20:00Z'
    },
    {
      ...GAME_ITEMS[9], // neon_theme
      ownedQuantity: 1,
      purchaseDate: '2024-01-10T12:00:00Z'
    }
  ]
};