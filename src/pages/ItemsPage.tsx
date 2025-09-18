import React, { useState } from 'react';
import { ArrowLeft, Package, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import PmButton from '@/components/atoms/PmButton';
import ItemCard from '@/components/items/ItemCard';
import CategoryTabs from '@/components/items/CategoryTabs';
import CurrencyDisplay from '@/components/items/CurrencyDisplay';
import { GAME_ITEMS, MOCK_USER_INVENTORY } from '@/data/itemsData';
import type { GameItem, InventoryItem, ItemCategory, UserInventory } from '@/types/items';

const ItemsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'shop' | 'inventory'>('shop');
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'all'>('all');
  const [userInventory, setUserInventory] = useState<UserInventory>(MOCK_USER_INVENTORY);

  // Filter items based on category
  const filteredItems = GAME_ITEMS.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  // Mock user level
  const userLevel = 8;

  const handlePurchase = (item: GameItem) => {
    // Check if user has enough currency
    const hasEnoughCurrency = item.currency === 'coins' 
      ? userInventory.coins >= item.price
      : userInventory.gems >= item.price;

    if (!hasEnoughCurrency) {
      toast({
        title: "余额不足",
        description: `您的${item.currency === 'coins' ? '金币' : '钻石'}不足`,
        variant: "destructive"
      });
      return;
    }

    // Check if item is unlocked
    if (item.unlockLevel && userLevel < item.unlockLevel) {
      toast({
        title: "未解锁",
        description: `需要等级${item.unlockLevel}才能购买`,
        variant: "destructive"
      });
      return;
    }

    // Process purchase
    setUserInventory(prev => {
      const newInventory = { ...prev };
      
      // Deduct currency
      if (item.currency === 'coins') {
        newInventory.coins -= item.price;
      } else {
        newInventory.gems -= item.price;
      }

      // Add item to inventory
      const existingItemIndex = newInventory.items.findIndex(invItem => invItem.id === item.id);
      if (existingItemIndex >= 0) {
        newInventory.items[existingItemIndex].ownedQuantity += 1;
      } else {
        newInventory.items.push({
          ...item,
          ownedQuantity: 1,
          purchaseDate: new Date().toISOString()
        });
      }

      return newInventory;
    });

    toast({
      title: "购买成功",
      description: `成功购买 ${item.name}`,
    });
  };

  const handleUseItem = (item: InventoryItem) => {
    if (item.ownedQuantity <= 0) {
      toast({
        title: "道具不足",
        description: "您没有足够的道具",
        variant: "destructive"
      });
      return;
    }

    // Use item logic here
    setUserInventory(prev => {
      const newInventory = { ...prev };
      const itemIndex = newInventory.items.findIndex(invItem => invItem.id === item.id);
      
      if (itemIndex >= 0) {
        newInventory.items[itemIndex].ownedQuantity -= 1;
        
        // Remove item if quantity is 0
        if (newInventory.items[itemIndex].ownedQuantity <= 0) {
          newInventory.items.splice(itemIndex, 1);
        }
      }
      
      return newInventory;
    });

    toast({
      title: "使用成功",
      description: `已使用 ${item.name}`,
    });
  };

  const handleBuyCurrency = (type: 'coins' | 'gems') => {
    toast({
      title: "功能开发中",
      description: `${type === 'coins' ? '金币' : '钻石'}充值功能即将上线`,
    });
  };

  return (
    <div className="min-h-screen bg-game-bg">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-game-text hover:text-game-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-semibold text-game-text">道具中心</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Currency Display */}
        <CurrencyDisplay
          coins={userInventory.coins}
          gems={userInventory.gems}
          onBuyCurrency={handleBuyCurrency}
        />

        {/* Tab Switcher */}
        <div className="flex bg-white rounded-game-xl p-1 shadow-game-card">
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-game-md font-medium transition-all ${
              activeTab === 'shop'
                ? 'bg-game-primary text-white shadow-md'
                : 'text-game-text hover:bg-game-bg'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            商店
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-game-md font-medium transition-all ${
              activeTab === 'inventory'
                ? 'bg-game-primary text-white shadow-md'
                : 'text-game-text hover:bg-game-bg'
            }`}
          >
            <Package className="w-4 h-4" />
            背包 ({userInventory.items.length})
          </button>
        </div>

        {/* Category Tabs for Shop */}
        {activeTab === 'shop' && (
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-3">
          {activeTab === 'shop' ? (
            filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  userLevel={userLevel}
                  onPurchase={handlePurchase}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <div className="w-16 h-16 bg-game-bg rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-8 h-8 text-game-muted" />
                </div>
                <p className="text-game-muted">该分类暂无商品</p>
              </div>
            )
          ) : (
            userInventory.items.length > 0 ? (
              userInventory.items.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isInventory
                  onUse={handleUseItem}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <div className="w-16 h-16 bg-game-bg rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-8 h-8 text-game-muted" />
                </div>
                <p className="text-game-muted mb-4">背包空空如也</p>
                <PmButton
                  variant="outline"
                  onClick={() => setActiveTab('shop')}
                >
                  去商店看看
                </PmButton>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;