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
    sm: 'w-14 h-20 text-base',
    md: 'w-18 h-26 text-lg',
    lg: 'w-22 h-30 text-xl',
  };

  const getCardContent = () => {
    if (!value) return '?';
    if (!isRevealed && value !== '?') return '?';
    return value;
  };

  const getCardStyles = () => {
    const base = `${sizeStyles[size]} rounded-xl border flex items-center justify-center font-semibold transition-all duration-200 select-none`;

    if (disabled) {
      return `${base} bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
    }

    if (isSelected) {
      return `${base} bg-[#14b0ff] border-[#14b0ff] text-white shadow-md scale-105`;
    }

    if (isRevealed && value) {
      return `${base} bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm hover:shadow-md cursor-pointer hover:border-[#14b0ff] dark:hover:border-[#14b0ff]`;
    }

    return `${base} bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:border-[#14b0ff] dark:hover:border-[#14b0ff]`;
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
