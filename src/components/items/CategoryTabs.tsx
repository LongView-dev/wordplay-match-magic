import React from 'react';
import { cn } from '@/lib/utils';
import type { ItemCategory } from '@/types/items';

interface CategoryTabsProps {
  activeCategory: ItemCategory | 'all';
  onCategoryChange: (category: ItemCategory | 'all') => void;
  className?: string;
}

const CATEGORIES = [
  { key: 'all' as const, label: '全部', icon: '🏪' },
  { key: 'hint' as const, label: '提示', icon: '💡' },
  { key: 'time' as const, label: '时间', icon: '⏰' },
  { key: 'score' as const, label: '积分', icon: '🎯' },
  { key: 'energy' as const, label: '体力', icon: '⚡' },
  { key: 'protection' as const, label: '保护', icon: '🛡️' },
  { key: 'cosmetic' as const, label: '装饰', icon: '🎨' },
  { key: 'special' as const, label: '特殊', icon: '✨' },
];

const CategoryTabs = React.forwardRef<HTMLDivElement, CategoryTabsProps>(
  ({ activeCategory, onCategoryChange, className }, ref) => {
    return (
      <div ref={ref} className={cn('flex gap-3 overflow-x-auto scrollbar-hide pb-2', className)}>
        {CATEGORIES.map(category => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-game-md font-medium text-sm whitespace-nowrap transition-all duration-200',
              'border border-transparent min-h-[44px] touch-manipulation',
              activeCategory === category.key
                ? 'bg-game-primary text-white shadow-game-card'
                : 'bg-white text-game-text active:bg-game-bg border-gray-200'
            )}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    );
  }
);

CategoryTabs.displayName = 'CategoryTabs';

export default CategoryTabs;