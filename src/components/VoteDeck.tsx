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
  const revealButtonLabel = allVoted
    ? `Показать карты (${votedCount}/${totalCount})`
    : `Вскрыть досрочно (${votedCount}/${totalCount})`;

  const revealButtonVariant = allVoted ? 'primary' : 'secondary';
  const canReveal = onReveal && (allVoted || votedCount > 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6 text-center">
        {hasVoted ? 'Ваш голос' : 'Выберите карту'}
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
      {hasVoted && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
          Нажмите на другую карту, чтобы изменить голос
        </p>
      )}
      {isHost && canReveal && (
        <div className="text-center mt-2">
          <Button onClick={onReveal} variant={revealButtonVariant} size="lg">
            {revealButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
