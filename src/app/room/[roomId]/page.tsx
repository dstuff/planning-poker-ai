'use client';

import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWebSocket } from '@/hooks/useWebSocket';
import { JoinForm } from '@/components/JoinForm';
import { PlayerList } from '@/components/PlayerList';
import { VoteDeck } from '@/components/VoteDeck';
import { VotingResults } from '@/components/VotingResults';
import { RoomControls } from '@/components/RoomControls';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { CardValue } from '@/types';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const [playerName, setPlayerName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    isConnected,
    playerId,
    room,
    joinRoom,
    leaveRoom,
    castVote,
    revealVotes,
    newRound,
  } = useWebSocket({
    onError: (message) => {
      setError(message);
    },
  });

  const handleJoin = useCallback((name: string) => {
    setPlayerName(name);
    joinRoom(roomId, name);
    setHasJoined(true);
  }, [roomId, joinRoom]);

  const handleLeave = useCallback(() => {
    if (playerId && roomId) {
      leaveRoom(roomId, playerId);
    }
    router.push('/');
  }, [playerId, roomId, leaveRoom, router]);

  const handleVote = useCallback((value: CardValue) => {
    if (playerId && roomId) {
      castVote(roomId, playerId, value);
    }
  }, [playerId, roomId, castVote]);

  const handleReveal = useCallback(() => {
    if (playerId && roomId) {
      revealVotes(roomId, playerId);
    }
  }, [playerId, roomId, revealVotes]);

  const handleNewRound = useCallback(() => {
    if (playerId && roomId) {
      newRound(roomId, playerId);
    }
  }, [playerId, roomId, newRound]);

  const handleCopyLink = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Ссылка скопирована в буфер обмена!');
  }, []);

  const currentUserVote = room?.players.find((p) => p.id === playerId)?.vote || null;
  const hasVoted = currentUserVote !== null;
  const votedPlayers = room?.players.filter((p) => p.vote !== null) ?? [];
  const allVoted = votedPlayers.length === (room?.players.length ?? 0) && (room?.players.length ?? 0) > 0;
  const isHost = playerId === room?.players[0]?.id;

  if (!hasJoined) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="max-w-lg w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Присоединение к комнате
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Комната: <span className="font-mono bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg">{roomId}</span>
            </p>
            <JoinForm onSubmit={handleJoin} loading={!isConnected} />
            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (!room || !playerId) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-[#14b0ff] mx-auto mb-6"></div>
          <p className="text-base text-gray-600 dark:text-gray-400 font-medium">Подключение...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                <span className="text-sm font-normal text-gray-400 dark:text-gray-500">Комната </span>{roomId}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Раунд {room.round} • {room.players.length} участников
              </p>
            </div>
            <RoomControls
              onCopyLink={handleCopyLink}
              onLeave={handleLeave}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {room.votesRevealed ? (
              <VotingResults
                players={room.players}
                currentUserId={playerId}
                onNewRound={handleNewRound}
              />
            ) : (
              <VoteDeck
                deck={room.deck}
                selectedVote={currentUserVote}
                onVote={handleVote}
                disabled={!isConnected || hasVoted}
                hasVoted={hasVoted}
                isHost={isHost}
                allVoted={allVoted}
                votedCount={votedPlayers.length}
                totalCount={room.players.length}
                onReveal={handleReveal}
              />
            )}
          </div>

          <div>
            <PlayerList
              players={room.players}
              currentUserId={playerId}
              votesRevealed={room.votesRevealed}
            />
          </div>
        </div>

        {error && (
          <div className="fixed bottom-6 right-6 bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
