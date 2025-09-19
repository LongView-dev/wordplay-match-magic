import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface PmButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'outline' | 'hero' | 'ghost';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const PmButton = React.forwardRef<HTMLButtonElement, PmButtonProps>(
  ({ variant = 'primary', loading = false, icon, fullWidth = false, children, className, disabled, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-game-primary text-white hover:bg-game-primary/90 active:bg-game-primary/80 shadow-game-card';
        case 'outline':
          return 'border-2 border-game-primary text-game-primary bg-transparent hover:bg-game-primary hover:text-white active:bg-game-primary/90';
        case 'hero':
          return 'bg-gradient-to-r from-game-primary to-game-mint text-white hover:shadow-game-glow active:scale-[0.98] animate-pulse-glow';
        case 'ghost':
          return 'text-game-text hover:bg-game-bg active:bg-game-bg/80';
        default:
          return 'bg-game-primary text-white hover:bg-game-primary/90';
      }
    };

    return (
      <Button
        ref={ref}
        className={cn(
          'rounded-game-md font-medium text-base px-6 py-3 transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[44px]',
          fullWidth && 'w-full',
          getVariantClasses(),
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </Button>
    );
  }
);

PmButton.displayName = 'PmButton';

export default PmButton;