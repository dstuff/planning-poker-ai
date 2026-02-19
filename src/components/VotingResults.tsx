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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">Результаты голосования</h3>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {players.map((player) => (
          <div key={player.id} className="flex flex-col items-center gap-3">
            <PokerCard
              value={player.vote}
              isRevealed={true}
              disabled={false}
              size="md"
            />
            <span className="text-base font-medium text-gray-700 dark:text-gray-300 text-center max-w-[120px] truncate">
              {player.name}
            </span>
          </div>
        ))}
      </div>

      {numericVotes.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-2">Среднее</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{average}</p>
            </div>
            <div>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-2">Минимум</p>
              <p className="text-3xl font-bold text-gray-500 dark:text-gray-400">{min}</p>
            </div>
            <div>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-2">Максимум</p>
              <p className="text-3xl font-bold text-gray-500 dark:text-gray-400">{max}</p>
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
        <p className="text-center text-gray-500 dark:text-gray-400 text-base">
          Только организатор может начать новый раунд
        </p>
      )}
    </div>
  );
}
