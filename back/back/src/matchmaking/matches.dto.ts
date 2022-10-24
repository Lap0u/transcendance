import { matchmakingDto } from './matchmaking.dto';

export class matchesDto {
  gameId: string;
  playerOne: matchmakingDto;
  playerOneY: number;
  playerTwo: matchmakingDto;
  playerTwoY: number;
}
