import React from 'react';
import { cn } from '@/lib/utils';

export interface PmCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  elevation?: 'low' | 'medium' | 'high';
}

const PmCard = React.forwardRef<HTMLDivElement, PmCardProps>(
  ({ hoverable = false, padding = 'md', elevation = 'medium', className, children, ...props }, ref) => {
    const getPaddingClasses = () => {
      switch (padding) {
        case 'sm': return 'p-3';
        case 'md': return 'p-4';
        case 'lg': return 'p-6';
        default: return 'p-4';
      }
    };

    const getElevationClasses = () => {
      switch (elevation) {
        case 'low': return 'shadow-sm';
        case 'medium': return 'shadow-game-card';
        case 'high': return 'shadow-lg';
        default: return 'shadow-game-card';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-game-xl border border-gray-100',
          getPaddingClasses(),
          getElevationClasses(),
          hoverable && 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer',
          'active:scale-[0.98]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PmCard.displayName = 'PmCard';

export default PmCard;