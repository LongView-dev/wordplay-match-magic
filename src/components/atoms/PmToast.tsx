import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

export interface PmToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
}

const PmToast: React.FC<PmToastProps> = ({
  type = 'info',
  message,
  duration = 3000,
  onClose,
  visible = true
}) => {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-game-mint',
          textColor: 'text-white'
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'bg-red-500',
          textColor: 'text-white'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          bgColor: 'bg-game-lemon',
          textColor: 'text-game-text'
        };
      case 'info':
      default:
        return {
          icon: Info,
          bgColor: 'bg-game-primary',
          textColor: 'text-white'
        };
    }
  };

  const { icon: Icon, bgColor, textColor } = getTypeConfig();

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <div className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-game-md shadow-lg',
        'min-w-[200px] max-w-[350px]',
        bgColor,
        textColor
      )}>
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

export default PmToast;