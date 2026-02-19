'use client';

import React from 'react';
import { PokerCard } from './PokerCard';
import { Button } from './ui/Button';
import { Check } from 'lucide-react';
import type { CardValue } from '@/types';

interface VoteDeckProps {
  deck: CardValue[];
  selectedVote: CardValue | null;
  onVote: (value: CardValue) => void;
  disabled?: boolean;
  hasVoted?: boolean;
  isHost?: boolean;
  allVoted?: boolean;
  votedCount?: number;
  totalCount?: number;
  onReveal?: () => void;
}

export function VoteDeck({
  deck,
  selectedVote,
  onVote,
  disabled = false,
  hasVoted = false,
  isHost = false,
  allVoted = false,
  votedCount = 0,
  totalCount = 0,
  onReveal,
}: VoteDeckProps) {
  if (hasVoted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="w-14 h-14 bg-[#e0f4ff] dark:bg-[#0a3a52] rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-[#14b0ff]" />
        </div>
        <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">Вы проголосовали</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Дождитесь остальных участников
        </p>
        {isHost && allVoted && onReveal && (
          <Button onClick={onReveal} variant="primary" size="lg">
            Показать карты ({votedCount}/{totalCount})
          </Button>
        )}
        {isHost && !allVoted && (
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
            Ожидаем... ({votedCount}/{totalCount})
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Выберите карту
      </h3>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {deck.map((value) => (
          <PokerCard
            key={value}
            value={value}
            isSelected={selectedVote === value}
            isRevealed={true}
            onClick={() => onVote(value)}
            disabled={disabled}
            size="sm"
          />
        ))}
      </div>
      {isHost && allVoted && onReveal && (
        <div className="text-center mt-2">
          <Button onClick={onReveal} variant="primary" size="lg">
            Показать карты ({votedCount}/{totalCount})
          </Button>
        </div>
      )}
      {isHost && !allVoted && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Ожидаем голосования... ({votedCount}/{totalCount})
        </p>
      )}
    </div>
  );
}
