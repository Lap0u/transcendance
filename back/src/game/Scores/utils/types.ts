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
  UsernameWinner: string;
  UsernameLoser: string;
  ScorePlayer1: number;
  ScorePlayer2: number;
};
