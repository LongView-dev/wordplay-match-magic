import React from 'react';
import { cn } from '@/lib/utils';
import PmCard from '@/components/atoms/PmCard';
import PmBadge from '@/components/atoms/PmBadge';
import PmButton from '@/components/atoms/PmButton';
import type { GameItem, InventoryItem } from '@/types/items';
import { Coins, Gem, Lock } from 'lucide-react';

interface ItemCardProps {
  item: GameItem | InventoryItem;
  isInventory?: boolean;
  userLevel?: number;
  onPurchase?: (item: GameItem) => void;
  onUse?: (item: InventoryItem) => void;
  className?: string;
}

const ItemCard = React.forwardRef<HTMLDivElement, ItemCardProps>(
  ({ item, isInventory = false, userLevel = 1, onPurchase, onUse, className }, ref) => {
    const isLocked = item.unlockLevel && userLevel < item.unlockLevel;
    const isOwned = isInventory && 'ownedQuantity' in item;
    const quantity = isOwned ? (item as InventoryItem).ownedQuantity : 0;

    const getRarityColor = (rarity: string) => {
      switch (rarity) {
        case 'common': return 'gray';
        case 'rare': return 'mint';
        case 'epic': return 'primary';
        case 'legendary': return 'lemon';
        default: return 'gray';
      }
    };

    const getCurrencyIcon = (currency: string) => {
      return currency === 'gems' ? <Gem className="w-4 h-4" /> : <Coins className="w-4 h-4" />;
    };

    return (
      <PmCard
        ref={ref}
        className={cn(
          'relative transition-all duration-200',
          isLocked && 'opacity-60',
          !isLocked && !isInventory && 'hover:scale-105 cursor-pointer',
          className
        )}
        hoverable={!isLocked && !isInventory}
        onClick={!isLocked && !isInventory && onPurchase ? () => onPurchase(item) : undefined}
      >
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-game-xl z-10">
            <div className="text-center">
              <Lock className="w-6 h-6 mx-auto mb-1 text-game-muted" />
              <p className="text-xs text-game-muted">等级{item.unlockLevel}解锁</p>
            </div>
          </div>
        )}

        {/* Rarity Badge */}
        <div className="absolute top-2 right-2 z-5">
          <PmBadge
            label={item.rarity === 'common' ? '普通' : 
                   item.rarity === 'rare' ? '稀有' :
                   item.rarity === 'epic' ? '史诗' : '传说'}
            tone={getRarityColor(item.rarity) as any}
            size="sm"
          />
        </div>

        {/* Quantity Badge for Inventory */}
        {isInventory && quantity > 0 && (
          <div className="absolute top-2 left-2 z-5">
            <PmBadge
              label={`x${quantity}`}
              tone="primary"
              size="sm"
            />
          </div>
        )}

        <div className="text-center space-y-3">
          {/* Item Icon */}
          <div className="text-4xl mx-auto w-16 h-16 flex items-center justify-center bg-game-bg rounded-game-md">
            {item.icon}
          </div>

          {/* Item Info */}
          <div>
            <h3 className="font-semibold text-game-text text-base mb-1">{item.name}</h3>
            <p className="text-sm text-game-muted leading-relaxed">{item.description}</p>
          </div>

          {/* Effect Info */}
          {item.effect && (
            <div className="text-xs text-game-primary bg-game-primary/10 rounded-game-sm px-2 py-1">
              {item.effect.type === 'hint' && '💡 获得提示'}
              {item.effect.type === 'time_add' && `⏰ +${item.effect.value}秒`}
              {item.effect.type === 'score_boost' && `🎯 积分×${item.effect.value}`}
              {item.effect.type === 'combo_protect' && '🛡️ 连击保护'}
              {item.effect.type === 'energy_restore' && `⚡ +${item.effect.value}体力`}
            </div>
          )}

          {/* Action Area */}
          {!isLocked && (
            <div className="pt-2 border-t border-gray-100">
              {isInventory ? (
                <div className="space-y-2">
                  {quantity > 0 ? (
                    <PmButton
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => onUse && onUse(item as InventoryItem)}
                    >
                      使用
                    </PmButton>
                  ) : (
                    <p className="text-sm text-game-muted">已用完</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-1 text-game-text font-medium">
                    {getCurrencyIcon(item.currency)}
                    <span>{item.price}</span>
                  </div>
                  <PmButton
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => onPurchase && onPurchase(item)}
                  >
                    购买
                  </PmButton>
                </div>
              )}
            </div>
          )}
        </div>
      </PmCard>
    );
  }
);

ItemCard.displayName = 'ItemCard';

export default ItemCard;