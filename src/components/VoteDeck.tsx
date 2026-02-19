'use client';

import React from 'react';
import { PokerCard } from './PokerCard';
import { Button } from './ui/Button';
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-200 font-semibold mb-3">Вы уже проголосовали</p>
        <p className="text-base text-gray-500 dark:text-gray-400 mb-6">
          Дождитесь, пока другие участники сделают свой выбор
        </p>
        {isHost && allVoted && onReveal && (
          <Button onClick={onReveal} variant="primary" size="lg">
            Показать карты ({votedCount}/{totalCount})
          </Button>
        )}
        {isHost && !allVoted && (
          <span className="text-base text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
            Ожидаем голосования... ({votedCount}/{totalCount})
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Выберите карту для голосования
      </h3>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
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
        <p className="text-center text-base text-gray-500 dark:text-gray-400 mt-2">
          Ожидаем голосования... ({votedCount}/{totalCount})
        </p>
      )}
    </div>
  );
}
