'use client';

import React from 'react';
import { PokerCard } from './PokerCard';
import { Button } from './ui/Button';
import type { CardValue, Player } from '@/types';

interface VotingResultsProps {
  players: Player[];
  onNewRound: () => void;
  currentUserId: string;
}

export function VotingResults({ players, onNewRound, currentUserId }: VotingResultsProps) {
  const votedPlayers = players.filter((p) => p.vote !== null);
  const votes = votedPlayers.map((p) => p.vote as CardValue);

  const numericVotes = votes
    .filter((v): v is Exclude<CardValue, '?' | '☕'> => !isNaN(Number(v)))
    .map(Number);

  const average = numericVotes.length > 0
    ? (numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length).toFixed(1)
    : null;

  const min = numericVotes.length > 0 ? Math.min(...numericVotes) : null;
  const max = numericVotes.length > 0 ? Math.max(...numericVotes) : null;

  const isHost = currentUserId === players[0]?.id;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-8 text-center">
        Результаты голосования
      </h3>

      <div className="flex flex-wrap justify-center gap-5 mb-8">
        {players.map((player) => (
          <div key={player.id} className="flex flex-col items-center gap-2">
            <PokerCard
              value={player.vote}
              isRevealed={true}
              disabled={false}
              size="md"
            />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center max-w-[100px] truncate">
              {player.name}
            </span>
          </div>
        ))}
      </div>

      {numericVotes.length > 0 && (
        <div className="bg-[#e0f4ff] dark:bg-[#0a3a52] rounded-xl p-5 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Среднее</p>
              <p className="text-2xl font-bold text-[#14b0ff]">{average}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Мин</p>
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">{min}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Макс</p>
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">{max}</p>
            </div>
          </div>
        </div>
      )}

      {isHost && (
        <div className="text-center">
          <Button onClick={onNewRound} variant="primary" size="lg">
            Новый раунд
          </Button>
        </div>
      )}

      {!isHost && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Только организатор может начать новый раунд
        </p>
      )}
    </div>
  );
}
