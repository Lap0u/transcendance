import { Injectable } from '@nestjs/common';
import { matchmakingDto, joinMatchmakingDto, customGameDto } from './matchmaking.dto';
import { SocketService } from '../socket/socket.service';
import { matchesDto } from './matches.dto';
import { addUserMatchmakingList, gameStart, generateNewGame } from './matchmaking.utils';
import { ScoresService } from 'src/game/Scores/scores.service';
import { v4 as uuid} from 'uuid';
import { launchGame } from 'src/game/game';

@Injectable()
export class MatchmakingService {
  constructor(
    private socketService: SocketService,
    private scoreService: ScoresService,
  ) {}

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
          //   return; //remettre les return quand on pourra supprimer la game quand elle est finie
        }
        if (elem.playerTwo.socket === sender) {
          elem.playerTwoY = data;
          //   return;
        }
      }
    }
  }

  handlePong(sender: string) {
		console.log('match', this.currentMatches);
		
    for (const elem of this.currentMatches) {
      if (elem.playerOne.socket === sender) {
        elem.playerOne.pongReply = 0;
        // return; remettre quand on pourra inviter a faire une custom
      }
      if (elem.playerTwo.socket === sender) {
        elem.playerTwo.pongReply = 0;
        // return;
      }
    }
  }

  async joinMatchmaking(payload: joinMatchmakingDto): Promise<matchmakingDto> {
    const newUserInMatchmaking = addUserMatchmakingList(
      payload,
      this.matchmakingList,
    );
		

    if (this.matchmakingList.length >= 2) {
      const toQuit = gameStart(
        this.matchmakingList,
        this.socketService,
        this.currentMatches,
        this.scoreService,
      );
      this.quitMatchmaking(toQuit[0]);
      this.quitMatchmaking(toQuit[1]);
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

	async launchCustomGame(payload: customGameDto) {

    const gameId = uuid()

    const playerOne = { 
			pongReply: 0,
			...payload.playerOne
		}
    const playerTwo = { 
			pongReply: 0,
			...payload.playerTwo
		}
		this.socketService.socket.to(playerOne.socket).emit(`customFound:`, gameId);
    this.socketService.socket.to(playerTwo.socket).emit(`customFound:`, gameId);
    const settings = payload.settings;
    const newGame = generateNewGame(gameId, playerOne, playerTwo, this.currentMatches, settings)
	  launchGame(playerOne, playerTwo, this.socketService.socket, newGame, this.currentMatches, this.scoreService)

	}

  async inviteGame(
    userId: string,
    username: string,
    invitedUserId: string,
  ): Promise<string> {
    this.socketService.socket.emit(`inviteGame:${invitedUserId}`, {
      senderId: userId,
      senderUsername: username,
    });

    return 'ok';
  }

  async acceptInviteGame(
    userId: string,
    username: string,
    sendInvitationUserId: string,
  ): Promise<string> {
    this.socketService.socket.emit(`acceptInviteGame:${sendInvitationUserId}`, {
      senderId: userId,
      senderUsername: username,
    });

    return 'ok';
  }

  async refuseInviteGame(
    userId: string,
    username: string,
    sendInvitationUserId: string,
  ): Promise<string> {
    this.socketService.socket.emit(`refuseInviteGame:${sendInvitationUserId}`, {
      senderId: userId,
      senderUsername: username,
    });

    return 'ok';
  }
}
