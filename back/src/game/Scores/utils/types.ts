import { Accounts } from '../../../account/entities/accounts.entity';

export type ScoresDto = {
  idWinner: string;
  idLoser: string;
  UsernameWinner?: string;
  UsernameLoser?: string;
  ScorePlayer1: number;
  ScorePlayer2: number;
};

export type StatsDto = {
  gameWon: number;
  gameLost: number;
};

export type ScoresDbDto = {
  idWinner: string;
  idLoser: string;
  winner?: Accounts;
  loser?: Accounts;
  ScorePlayer1: number;
  ScorePlayer2: number;
};
