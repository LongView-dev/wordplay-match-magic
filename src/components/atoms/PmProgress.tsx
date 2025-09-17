import React from 'react';
import { cn } from '@/lib/utils';

export interface PmProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  color?: 'mint' | 'primary' | 'lemon';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const PmProgress = React.forwardRef<HTMLDivElement, PmProgressProps>(
  ({ value, color = 'mint', size = 'md', showLabel = false, animated = true, className, ...props }, ref) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    
    const getColorClasses = () => {
      switch (color) {
        case 'mint': return 'bg-game-mint';
        case 'primary': return 'bg-game-primary';
        case 'lemon': return 'bg-game-lemon';
        default: return 'bg-game-mint';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm': return 'h-1';
        case 'md': return 'h-2';
        case 'lg': return 'h-3';
        default: return 'h-2';
      }
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          getSizeClasses()
        )}>
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              getColorClasses(),
              animated && 'transition-transform'
            )}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
        {showLabel && (
          <div className="mt-1 text-sm text-game-muted text-right">
            {Math.round(clampedValue)}%
          </div>
        )}
      </div>
    );
  }
);

PmProgress.displayName = 'PmProgress';

export default PmProgress;