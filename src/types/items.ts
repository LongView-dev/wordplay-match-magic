export interface GameItem {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  category: ItemCategory;
  price: number;
  currency: 'coins' | 'gems';
  rarity: ItemRarity;
  icon: string;
  quantity?: number;
  effect?: ItemEffect;
  unlockLevel?: number;
  timeLimit?: number; // in seconds, for time-limited items
}

export type ItemType = 'consumable' | 'permanent' | 'decoration' | 'boost';

export type ItemCategory = 
  | 'hint' 
  | 'time' 
  | 'score' 
  | 'energy' 
  | 'protection' 
  | 'cosmetic' 
  | 'special';

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface ItemEffect {
  type: 'hint' | 'time_add' | 'score_boost' | 'combo_protect' | 'energy_restore';
  value: number;
  duration?: number; // in seconds
}

export interface UserInventory {
  userId: string;
  items: InventoryItem[];
  coins: number;
  gems: number;
}

export interface InventoryItem extends GameItem {
  ownedQuantity: number;
  purchaseDate: string;
  expiryDate?: string;
}

export interface ItemPurchase {
  itemId: string;
  quantity: number;
  totalPrice: number;
  currency: 'coins' | 'gems';
}