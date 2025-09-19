import React from 'react';
import { cn } from '@/lib/utils';
import PmCard from '@/components/atoms/PmCard';
import { Coins, Gem, Plus } from 'lucide-react';

interface CurrencyDisplayProps {
  coins: number;
  gems: number;
  onBuyCurrency?: (type: 'coins' | 'gems') => void;
  className?: string;
}

const CurrencyDisplay = React.forwardRef<HTMLDivElement, CurrencyDisplayProps>(
  ({ coins, gems, onBuyCurrency, className }, ref) => {
    return (
      <div ref={ref} className={cn('flex gap-3', className)}>
        {/* Coins */}
        <PmCard className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-game-lemon rounded-full flex items-center justify-center">
              <Coins className="w-5 h-5 text-game-text" />
            </div>
            <div>
              <p className="text-xs text-game-muted">金币</p>
              <p className="font-semibold text-game-text">{coins.toLocaleString()}</p>
            </div>
          </div>
          {onBuyCurrency && (
            <button
              onClick={() => onBuyCurrency('coins')}
              className="w-8 h-8 bg-game-primary rounded-full flex items-center justify-center active:bg-game-primary/90 transition-colors touch-manipulation"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          )}
        </PmCard>

        {/* Gems */}
        <PmCard className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-game-mint rounded-full flex items-center justify-center">
              <Gem className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-game-muted">钻石</p>
              <p className="font-semibold text-game-text">{gems.toLocaleString()}</p>
            </div>
          </div>
          {onBuyCurrency && (
            <button
              onClick={() => onBuyCurrency('gems')}
              className="w-8 h-8 bg-game-primary rounded-full flex items-center justify-center active:bg-game-primary/90 transition-colors touch-manipulation"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          )}
        </PmCard>
      </div>
    );
  }
);

CurrencyDisplay.displayName = 'CurrencyDisplay';

export default CurrencyDisplay;