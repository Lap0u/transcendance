import { Injectable } from '@nestjs/common';
import { matchmakingDto, joinMatchmakingDto } from './matchmaking.dto';
import { SocketService } from '../socket/socket.service';
import { v4 as uuid } from 'uuid';
import { matchesDto } from './matches.dto';
import { launchGame } from '../game/game';
import { BACK_WIN_HEIGHT } from 'src/game/constants';

function generateNewGame(
  gameId: string,
  playerOne: matchmakingDto,
  playerTwo: matchmakingDto,
  currentMatches: matchesDto[],
) {
  const newGame = {
    gameId: gameId,
    playerOne: playerOne,
    playerTwo: playerTwo,
    playerOneY: BACK_WIN_HEIGHT / 2,
    playerTwoY: BACK_WIN_HEIGHT / 2,
  };
  currentMatches.push(newGame);
  return newGame;
}

@Injectable()
export class MatchmakingService {
  constructor(private socketService: SocketService) {}
  private matchmakingList: matchmakingDto[] = [];
  private currentMatches: matchesDto[] = [];
  getMatchmakingList(): matchmakingDto[] {
    return this.matchmakingList;
  }
  getMatchesList(): matchesDto[] {
    return this.currentMatches;
  }
  updatePosX(data: any, sender: string): any {
    if (data) {
      for (const elem of this.currentMatches) {
        if (elem.playerOne.socket === sender) {
          elem.playerOneY = data;
          return;
        }
        if (elem.playerTwo.socket === sender) {
          elem.playerTwoY = data;
          return;
        }
      }
    }
  }

  async joinMatchmaking(payload: joinMatchmakingDto): Promise<matchmakingDto> {
    console.log(`pay`, payload);

    const newUserInMatchmaking = {
      id: uuid(),
      socket: payload.id, //ne marchera pas quand il y aura des spectateurs
      ...payload,
    };
    this.matchmakingList.push(newUserInMatchmaking);
    if (this.matchmakingList.length >= 2) {
      const gameId = uuid();

      const playerOne = this.matchmakingList[0];
      const playerTwo = this.matchmakingList[1];
      this.socketService.socket
        .to(playerOne.socket)
        .emit(`matchFound:`, gameId);
      this.socketService.socket
        .to(playerTwo.socket)
        .emit(`matchFound:`, gameId);
      this.quitMatchmaking(playerOne.socket);
      this.quitMatchmaking(playerTwo.socket);
      const newGame = generateNewGame(
        gameId,
        playerOne,
        playerTwo,
        this.currentMatches,
      );
      launchGame(playerOne, playerTwo, this.socketService.socket, newGame);
    }
    return newUserInMatchmaking;
  }

  quitMatchmaking(userId: string): matchmakingDto[] {
    const newMatchmakingList = this.matchmakingList.filter((user) => {
      return user.socket != userId;
    });

    this.matchmakingList = newMatchmakingList;

    return newMatchmakingList;
  }
}
