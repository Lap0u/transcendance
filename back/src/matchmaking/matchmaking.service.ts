import { Injectable } from '@nestjs/common';
import { matchmakingDto, joinMatchmakingDto } from './matchmaking.dto';
import { SocketService } from '../socket/socket.service';
import { matchesDto } from './matches.dto';
import { addUserMatchmakingList, gameStart } from './matchmaking.utils';
import { ScoresService } from 'src/game/Scores/scores.service';

@Injectable()
export class MatchmakingService {
  constructor(private socketService: SocketService) {}
	// private scoreService: ScoresService) {}

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
	for (const elem of this.currentMatches) {
		if (elem.playerOne.socket === sender) {
		elem.playerOne.pongReply = 0;
		// return;
		}
		if (elem.playerTwo.socket === sender) {
		elem.playerTwo.pongReply = 0;
		// return;
		}
	}
}

  async joinMatchmaking(payload: joinMatchmakingDto): Promise<matchmakingDto> {
	let newUserInMatchmaking = addUserMatchmakingList(payload, this.matchmakingList)
  
    if (this.matchmakingList.length >= 2) {
		let toQuit = gameStart(this.matchmakingList, this.socketService, this.currentMatches, null)
		this.quitMatchmaking(toQuit[0])
		this.quitMatchmaking(toQuit[1])
	}
	return newUserInMatchmaking
  }


  quitMatchmaking(userId: string): matchmakingDto[] {
    const newMatchmakingList = this.matchmakingList.filter((user) => {
      return user.socket != userId;
    });

    this.matchmakingList = newMatchmakingList;

    return newMatchmakingList;
  }
}
