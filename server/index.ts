import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import type {
  Room,
  Player,
  CardValue,
  ClientMessage,
  ServerMessage,
  SerializedRoom,
} from '../src/types';

const rooms = new Map<string, Room>();
const PORT = process.env.WS_PORT || 8080;
const HEARTBEAT_INTERVAL_MS = 30000;

const DEFAULT_DECK: CardValue[] = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', 'A', '?', '☕'];

interface ExtendedWebSocket extends WebSocket {
  playerId?: string;
  roomId?: string;
  isAlive?: boolean;
}

function serializeRoom(room: Room): SerializedRoom {
  return {
    id: room.id,
    name: room.name,
    players: Array.from(room.players.values()),
    deck: room.deck,
    round: room.round,
    votesRevealed: room.votesRevealed,
    createdAt: room.createdAt,
  };
}

function broadcast(room: Room, message: ServerMessage, excludeWs?: WebSocket) {
  const serializedRoom = serializeRoom(room);
  const data = JSON.stringify({ ...message, room: serializedRoom });

  room.players.forEach((player) => {
    if (player.ws && player.ws !== excludeWs && (player.ws as WebSocket).readyState === WebSocket.OPEN) {
      (player.ws as WebSocket).send(data);
    }
  });
}

function sendToPlayer(player: Player, message: ServerMessage) {
  if (player.ws && (player.ws as WebSocket).readyState === WebSocket.OPEN) {
    (player.ws as WebSocket).send(JSON.stringify(message));
  }
}

function handleJoinRoom(ws: ExtendedWebSocket, roomId: string, playerName: string) {
  let room = rooms.get(roomId);

  if (!room) {
    room = {
      id: roomId,
      name: `Room ${roomId.slice(0, 6)}`,
      players: new Map(),
      deck: DEFAULT_DECK,
      round: 1,
      votesRevealed: false,
      createdAt: Date.now(),
    };
    rooms.set(roomId, room);
  }

  const playerId = uuidv4();
  const player: Player = {
    id: playerId,
    name: playerName,
    vote: null,
    isReady: true,
    ws,
  };

  room.players.set(playerId, player);
  ws.playerId = playerId;
  ws.roomId = roomId;

  const roomState: ServerMessage = {
    type: 'ROOM_STATE',
    room: serializeRoom(room),
    playerId,
  };
  sendToPlayer(player, roomState);

  broadcast(room, {
    type: 'PLAYER_JOINED',
    room: serializeRoom(room),
    player,
  });
}

function handleLeaveRoom(ws: ExtendedWebSocket, roomId: string, playerId: string) {
  const room = rooms.get(roomId);
  if (!room) return;

  room.players.delete(playerId);

  broadcast(room, {
    type: 'PLAYER_LEFT',
    room: serializeRoom(room),
    playerId,
  });

  if (room.players.size === 0) {
    rooms.delete(roomId);
  }
}

function handleCastVote(ws: ExtendedWebSocket, roomId: string, playerId: string, vote: CardValue) {
  const room = rooms.get(roomId);
  if (!room) return;

  const player = room.players.get(playerId);
  if (!player) return;

  player.vote = vote;

  broadcast(room, {
    type: 'VOTE_CAST',
    room: serializeRoom(room),
    playerId,
  });
}

function handleRevealVotes(ws: ExtendedWebSocket, roomId: string, playerId: string) {
  const room = rooms.get(roomId);
  if (!room) return;

  room.votesRevealed = true;

  broadcast(room, {
    type: 'VOTES_REVEALED',
    room: serializeRoom(room),
  });
}

function handleNewRound(ws: ExtendedWebSocket, roomId: string, playerId: string) {
  const room = rooms.get(roomId);
  if (!room) return;

  room.round++;
  room.votesRevealed = false;

  room.players.forEach((player) => {
    player.vote = null;
  });

  broadcast(room, {
    type: 'NEW_ROUND_STARTED',
    room: serializeRoom(room),
  });
}

function handleMessage(ws: ExtendedWebSocket, data: string) {
  try {
    const message = JSON.parse(data) as ClientMessage;

    switch (message.type) {
      case 'JOIN_ROOM':
        handleJoinRoom(ws, message.roomId, message.playerName);
        break;
      case 'LEAVE_ROOM':
        handleLeaveRoom(ws, message.roomId, message.playerId);
        break;
      case 'CAST_VOTE':
        handleCastVote(ws, message.roomId, message.playerId, message.vote);
        break;
      case 'REVEAL_VOTES':
        handleRevealVotes(ws, message.roomId, message.playerId);
        break;
      case 'NEW_ROUND':
        handleNewRound(ws, message.roomId, message.playerId);
        break;
      default:
        console.log('Unknown message type:', message);
    }
  } catch (error) {
    console.error('Error parsing message:', error);
    const errorMessage: ServerMessage = { type: 'ERROR', message: 'Invalid message format' };
    ws.send(JSON.stringify(errorMessage));
  }
}

function handleConnection(ws: ExtendedWebSocket) {
  console.log('New client connected');
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', (data) => {
    try {
      handleMessage(ws, data.toString());
    } catch (error) {
      console.error('Error handling message:', error);
      const errorMessage: ServerMessage = { type: 'ERROR', message: 'Internal server error' };
      ws.send(JSON.stringify(errorMessage));
    }
  });

  ws.on('close', () => {
    const { playerId, roomId } = ws;

    if (playerId && roomId) {
      handleLeaveRoom(ws, roomId, playerId);
    }

    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
}

const wss = new WebSocketServer({ port: Number(PORT) });

wss.on('connection', handleConnection);

const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((client) => {
    const ws = client as ExtendedWebSocket;

    if (!ws.isAlive) {
      ws.terminate();
      return;
    }

    ws.isAlive = false;
    ws.ping();
  });
}, HEARTBEAT_INTERVAL_MS);

wss.on('close', () => {
  clearInterval(heartbeatInterval);
});

console.log(`WebSocket server running on port ${PORT}`);

export { wss, rooms };
