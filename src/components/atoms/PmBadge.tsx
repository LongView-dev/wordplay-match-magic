import React from 'react';
import { cn } from '@/lib/utils';

export interface PmBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  tone?: 'lemon' | 'mint' | 'primary' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'soft';
}

const PmBadge = React.forwardRef<HTMLSpanElement, PmBadgeProps>(
  ({ label, tone = 'lemon', size = 'md', variant = 'solid', className, ...props }, ref) => {
    const getToneClasses = () => {
      const baseClasses = {
        solid: {
          lemon: 'bg-game-lemon text-game-text',
          mint: 'bg-game-mint text-white',
          primary: 'bg-game-primary text-white',
          gray: 'bg-game-muted text-white'
        },
        outline: {
          lemon: 'border-2 border-game-lemon text-game-lemon bg-transparent',
          mint: 'border-2 border-game-mint text-game-mint bg-transparent',
          primary: 'border-2 border-game-primary text-game-primary bg-transparent',
          gray: 'border-2 border-game-muted text-game-muted bg-transparent'
        },
        soft: {
          lemon: 'bg-game-lemon/20 text-game-text',
          mint: 'bg-game-mint/20 text-game-mint',
          primary: 'bg-game-primary/20 text-game-primary',
          gray: 'bg-game-muted/20 text-game-muted'
        }
      };
      return baseClasses[variant][tone];
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm': return 'px-2 py-1 text-xs';
        case 'md': return 'px-3 py-1.5 text-sm';
        case 'lg': return 'px-4 py-2 text-base';
        default: return 'px-3 py-1.5 text-sm';
      }
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-game-sm',
          'transition-all duration-200',
          getToneClasses(),
          getSizeClasses(),
          className
        )}
        {...props}
      >
        {label}
      </span>
    );
  }
);

PmBadge.displayName = 'PmBadge';

export default PmBadge;