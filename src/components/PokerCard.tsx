'use client';

import React from 'react';
import type { CardValue } from '@/types';

interface PokerCardProps {
  value: CardValue | null;
  isSelected?: boolean;
  isRevealed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PokerCard({
  value,
  isSelected = false,
  isRevealed = false,
  onClick,
  disabled = false,
  size = 'md',
}: PokerCardProps) {
  const sizeStyles = {
    sm: 'w-16 h-20 text-lg',
    md: 'w-20 h-28 text-xl',
    lg: 'w-24 h-32 text-2xl',
  };

  const getCardContent = () => {
    if (!value) return '?';
    if (!isRevealed && value !== '?') return '?';
    return value;
  };

  const getCardStyles = () => {
    const base = `${sizeStyles[size]} rounded-lg border-2 flex items-center justify-center font-bold transition-all duration-200 select-none`;

    if (disabled) {
      return `${base} bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
    }

    if (isSelected) {
      return `${base} bg-blue-600 border-blue-600 text-white shadow-lg scale-105`;
    }

    if (isRevealed && value) {
      return `${base} bg-white dark:bg-gray-700 border-blue-600 dark:border-blue-500 text-gray-900 dark:text-white shadow-md hover:shadow-lg cursor-pointer`;
    }

    return `${base} bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:border-blue-400 dark:hover:border-blue-400`;
  };

  return (
    <div
      className={getCardStyles()}
      onClick={disabled ? undefined : onClick}
      role={disabled ? undefined : 'button'}
      tabIndex={disabled ? undefined : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {getCardContent()}
    </div>
  );
}
