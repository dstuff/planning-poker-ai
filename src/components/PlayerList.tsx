'use client';

import React from 'react';
import type { Player } from '@/types';
import { Crown } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  currentUserId: string;
  votesRevealed: boolean;
}

export function PlayerList({ players, currentUserId, votesRevealed }: PlayerListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-5">
        Участники <span className="text-gray-400 font-normal">({players.length})</span>
      </h3>
      <ul className="space-y-2">
        {players.map((player) => {
          const isCurrentUser = player.id === currentUserId;
          const hasVoted = player.vote !== null;

          return (
            <li
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                isCurrentUser
                  ? 'bg-[#e0f4ff] dark:bg-[#0a3a52] border border-[#14b0ff]/30'
                  : 'bg-gray-50 dark:bg-gray-700/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isCurrentUser
                      ? 'bg-[#14b0ff] text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {player.id === players[0]?.id && <Crown className="w-4 h-4 inline mr-1 text-yellow-500" />}
                    {player.name}
                    {isCurrentUser && ' (Вы)'}
                  </span>
                  {votesRevealed && hasVoted && (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      — <strong className="text-gray-800 dark:text-gray-200">{player.vote}</strong>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasVoted ? (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    votesRevealed
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-[#e0f4ff] dark:bg-[#0a3a52] text-[#14b0ff]'
                  }`}>
                    {votesRevealed ? '✓' : 'Голос'}
                  </span>
                ) : (
                  <span className="text-gray-300 dark:text-gray-600 text-sm">—</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
