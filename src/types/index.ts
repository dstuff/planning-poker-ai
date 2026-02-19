export type CardValue = 'A' | '0' | '1' | '2' | '3' | '5' | '8' | '13' | '21' | '34' | '55' | '89' | '?' | '☕';

export interface Player {
  id: string;
  name: string;
  vote: CardValue | null;
  isReady: boolean;
  ws?: unknown;
}

export interface Room {
  id: string;
  name: string;
  players: Map<string, Player>;
  deck: CardValue[];
  round: number;
  votesRevealed: boolean;
  createdAt: number;
}

export type ClientMessage =
  | { type: 'JOIN_ROOM'; roomId: string; playerName: string }
  | { type: 'LEAVE_ROOM'; roomId: string; playerId: string }
  | { type: 'CAST_VOTE'; roomId: string; playerId: string; vote: CardValue }
  | { type: 'REVEAL_VOTES'; roomId: string; playerId: string }
  | { type: 'NEW_ROUND'; roomId: string; playerId: string }
  | { type: 'KICK_PLAYER'; roomId: string; playerId: string; kickedPlayerId: string };

export type ServerMessage =
  | { type: 'ROOM_STATE'; room: SerializedRoom; playerId: string }
  | { type: 'PLAYER_JOINED'; room: SerializedRoom; player: Player }
  | { type: 'PLAYER_LEFT'; room: SerializedRoom; playerId: string }
  | { type: 'VOTE_CAST'; room: SerializedRoom; playerId: string }
  | { type: 'VOTES_REVEALED'; room: SerializedRoom }
  | { type: 'NEW_ROUND_STARTED'; room: SerializedRoom }
  | { type: 'ERROR'; message: string };

export interface SerializedRoom {
  id: string;
  name: string;
  players: Player[];
  deck: CardValue[];
  round: number;
  votesRevealed: boolean;
  createdAt: number;
}

export const DEFAULT_DECK: CardValue[] = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', 'A', '?', '☕'];
