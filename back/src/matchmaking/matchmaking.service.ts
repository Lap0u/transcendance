import { Injectable } from '@nestjs/common';
import { matchmakingDto, joinMatchmakingDto } from './matchmaking.dto';
import { SocketService } from '../socket/socket.service';
import { v4 as uuid} from 'uuid';
import { matchesDto } from './matches.dto';
import { launchGame} from '../game/game'
import { BACK_WIN_HEIGHT } from 'src/game/constants';

function generateNewGame (gameId :string, playerOne : string, playerTwo : string, currentMatches : matchesDto[], sockets : any) {
	const newGame = {
		gameId : gameId,
		playerOneId : playerOne,
		playerTwoId : playerTwo,
		playerOneY : BACK_WIN_HEIGHT / 2,
		playerTwoY : BACK_WIN_HEIGHT / 2
	}
	currentMatches.push(newGame)
}

@Injectable()
export class MatchmakingService {
	constructor(
		private socketService: SocketService,
		) {}
	private  matchmakingList : matchmakingDto[] = []
	private  currentMatches : matchesDto[] = []
	getMatchmakingList() : matchmakingDto[] {
		return this.matchmakingList
	}
	updatePosX(data: any, id : string) : any {
		if (data){
			this.currentMatches[0].playerOneY = data
			console.log('test', data, id);
		}
	} 

	async joinMatchmaking(payload :joinMatchmakingDto): Promise<matchmakingDto> {
		let newUserInMatchmaking = {
			id: uuid(),
			...payload
		}
		this.matchmakingList.push(newUserInMatchmaking);
		if(this.matchmakingList.length >= 2)
		{
			const gameId = uuid()
			const socklist =  await this.socketService.socket.sockets.allSockets();
			const socketArray = Array.from(socklist)
			const playerOne = socketArray[0]
			const playerTwo = socketArray[1]

			this.socketService.socket.to(playerOne).emit(`matchFound:`, gameId);
			this.socketService.socket.to(playerTwo).emit(`matchFound:`, gameId);
			this.quitMatchmaking(playerOne);
			this.quitMatchmaking(playerTwo);
			generateNewGame(gameId, playerOne, playerTwo, this.currentMatches, this.socketService.socket)
			launchGame(playerOne, playerTwo, this.socketService.socket, this.currentMatches)
}
		return newUserInMatchmaking;
	}
	
    quitMatchmaking(userId: string) :matchmakingDto[] {
        
        
        const newMatchmakingList = this.matchmakingList.filter(user => {
            return user.id != userId
        })
        
        this.matchmakingList = newMatchmakingList;

        return newMatchmakingList;
    }
}
