import { Injectable } from '@nestjs/common';
import { matchmakingDto, joinMatchmakingDto } from './matchmaking.dto';
import { SocketService } from '../socket/socket.service';
import { matchesDto } from './matches.dto';
import { addUserMatchmakingList, gameStart } from './matchmakingUtils';

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

	async joinMatchmaking(payload :joinMatchmakingDto): Promise<matchmakingDto> {
		let newUserInMatchmaking = addUserMatchmakingList(payload, this.matchmakingList);
		if(this.matchmakingList.length >= 2)
		{
			let toQuit = gameStart(this.matchmakingList, this.socketService, this.currentMatches, this.quitMatchmaking)
			this.quitMatchmaking(toQuit[0])
			this.quitMatchmaking(toQuit[1])
		}
		return newUserInMatchmaking;
	}
	
    quitMatchmaking(userId: string) :matchmakingDto[] {
        const newMatchmakingList = this.matchmakingList.filter(user => {
            return user.socket != userId
        })
        this.matchmakingList = newMatchmakingList;
        return newMatchmakingList;
    }
}
