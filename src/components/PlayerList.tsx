'use client';

import React from 'react';
import type { Player } from '@/types';

interface PlayerListProps {
  players: Player[];
  currentUserId: string;
  votesRevealed: boolean;
}

export function PlayerList({ players, currentUserId, votesRevealed }: PlayerListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Участники ({players.length})</h3>
      <ul className="space-y-3">
        {players.map((player) => {
          const isCurrentUser = player.id === currentUserId;
          const hasVoted = player.vote !== null;

          return (
            <li
              key={player.id}
              className={`flex items-center justify-between p-4 rounded-xl ${
                isCurrentUser
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    isCurrentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className={`text-base font-medium ${isCurrentUser ? 'text-blue-800 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>
                    {player.id === players[0]?.id && '👑 '}
                    {player.name}
                    {isCurrentUser && ' (Вы)'}
                  </span>
                  {votesRevealed && hasVoted && (
                    <span className="ml-3 text-base text-gray-600 dark:text-gray-400">
                      — карта: <strong className="text-blue-600 dark:text-blue-400">{player.vote}</strong>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {hasVoted ? (
                  <span className={`text-base font-semibold ${votesRevealed ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                    {votesRevealed ? '✓' : 'Проголосовал(а)'}
                  </span>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500 text-base">—</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
