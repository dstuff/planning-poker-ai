'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import type { ServerMessage, ClientMessage, SerializedRoom, CardValue } from '@/types';

interface UseWebSocketOptions {
  onRoomState?: (room: SerializedRoom, playerId: string) => void;
  onPlayerJoined?: (room: SerializedRoom, player: { id: string; name: string }) => void;
  onPlayerLeft?: (room: SerializedRoom, playerId: string) => void;
  onVoteCast?: (room: SerializedRoom, playerId: string) => void;
  onVotesRevealed?: (room: SerializedRoom) => void;
  onNewRound?: (room: SerializedRoom) => void;
  onError?: (message: string) => void;
}

const RECONNECT_DELAYS_MS = [500, 1000, 2000, 5000];

interface JoinedRoom {
  roomId: string;
  playerName: string;
}

function getWebSocketUrl(): string {
  if (typeof window === 'undefined') {
    return 'ws://localhost:8080';
  }

  // При разработке и в продакшене используем прокси Next.js через /ws
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/ws`;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [room, setRoom] = useState<SerializedRoom | null>(null);
  const connectionErrorRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const shouldReconnectRef = useRef(true);
  const lastJoinedRoomRef = useRef<JoinedRoom | null>(null);

  const clearConnectionErrorTimeout = useCallback(() => {
    if (connectionErrorRef.current) {
      clearTimeout(connectionErrorRef.current);
      connectionErrorRef.current = null;
    }
  }, []);

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((message: ClientMessage): boolean => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      return true;
    }

    return false;
  }, []);

  const joinRoom = useCallback((roomId: string, playerName: string) => {
    lastJoinedRoomRef.current = { roomId, playerName };
    sendMessage({ type: 'JOIN_ROOM', roomId, playerName });
  }, [sendMessage]);

  const leaveRoom = useCallback((roomId: string, playerId: string) => {
    shouldReconnectRef.current = false;
    lastJoinedRoomRef.current = null;
    sendMessage({ type: 'LEAVE_ROOM', roomId, playerId });
  }, [sendMessage]);

  const castVote = useCallback((roomId: string, playerId: string, vote: CardValue) => {
    sendMessage({ type: 'CAST_VOTE', roomId, playerId, vote });
  }, [sendMessage]);

  const revealVotes = useCallback((roomId: string, playerId: string) => {
    sendMessage({ type: 'REVEAL_VOTES', roomId, playerId });
  }, [sendMessage]);

  const newRound = useCallback((roomId: string, playerId: string) => {
    sendMessage({ type: 'NEW_ROUND', roomId, playerId });
  }, [sendMessage]);

  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    shouldReconnectRef.current = true;

    const connect = () => {
      clearReconnectTimeout();
      clearConnectionErrorTimeout();

      const wsUrl = getWebSocketUrl();
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      // Показываем ошибку только если подключение не удалось через 2 секунды
      connectionErrorRef.current = setTimeout(() => {
        if (wsRef.current === ws && ws.readyState !== WebSocket.OPEN) {
          optionsRef.current.onError?.('Не удалось подключиться к серверу. Убедитесь, что сервер запущен.');
        }
      }, 2000);

      ws.onopen = () => {
        if (wsRef.current !== ws) return;

        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
        clearConnectionErrorTimeout();

        const lastJoinedRoom = lastJoinedRoomRef.current;
        if (lastJoinedRoom) {
          ws.send(JSON.stringify({ type: 'JOIN_ROOM', ...lastJoinedRoom } satisfies ClientMessage));
        }
      };

      ws.onclose = () => {
        if (wsRef.current !== ws) return;

        console.log('WebSocket disconnected');
        setIsConnected(false);
        wsRef.current = null;
        clearConnectionErrorTimeout();

        if (!shouldReconnectRef.current) return;

        const delay = RECONNECT_DELAYS_MS[Math.min(reconnectAttemptsRef.current, RECONNECT_DELAYS_MS.length - 1)];
        reconnectAttemptsRef.current += 1;
        reconnectTimeoutRef.current = setTimeout(connect, delay);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as ServerMessage;

          switch (message.type) {
            case 'ROOM_STATE':
              setRoom(message.room);
              setPlayerId(message.playerId);
              optionsRef.current.onRoomState?.(message.room, message.playerId);
              break;
            case 'PLAYER_JOINED':
              setRoom(message.room);
              optionsRef.current.onPlayerJoined?.(message.room, message.player);
              break;
            case 'PLAYER_LEFT':
              setRoom(message.room);
              optionsRef.current.onPlayerLeft?.(message.room, message.playerId);
              break;
            case 'VOTE_CAST':
              setRoom(message.room);
              optionsRef.current.onVoteCast?.(message.room, message.playerId);
              break;
            case 'VOTES_REVEALED':
              setRoom(message.room);
              optionsRef.current.onVotesRevealed?.(message.room);
              break;
            case 'NEW_ROUND_STARTED':
              setRoom(message.room);
              optionsRef.current.onNewRound?.(message.room);
              break;
            case 'ERROR':
              optionsRef.current.onError?.(message.message);
              break;
          }
        } catch (error) {
          console.error('Error parsing message:', error);
          optionsRef.current.onError?.('Ошибка обработки сообщения');
        }
      };
    };

    connect();

    return () => {
      shouldReconnectRef.current = false;
      clearConnectionErrorTimeout();
      clearReconnectTimeout();

      const ws = wsRef.current;
      wsRef.current = null;
      if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        ws.close();
      }
    };
  }, [clearConnectionErrorTimeout, clearReconnectTimeout]);

  return {
    isConnected,
    playerId,
    room,
    sendMessage,
    joinRoom,
    leaveRoom,
    castVote,
    revealVotes,
    newRound,
  };
}
