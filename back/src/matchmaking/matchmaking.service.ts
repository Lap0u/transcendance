import { Injectable } from '@nestjs/common';
import { matchmakingDto, joinMatchmakingDto } from './matchmaking.dto';
import { SocketService } from '../socket/socket.service';
import { v4 as uuid} from 'uuid';

@Injectable()
export class MatchmakingService {
	constructor(
		private socketService: SocketService,
		) {}
	private  matchmakingList : matchmakingDto[] = []
	getMatchmakingList() : matchmakingDto[] {
		return this.matchmakingList
	}

	async joinMatchmaking(payload :joinMatchmakingDto): Promise<matchmakingDto> {
		let newUserInMatchmaking = {
			id: uuid(),
			...payload
		}
		this.matchmakingList.push(newUserInMatchmaking);
		if(this.matchmakingList.length >= 2)
		{
			const socklist =  await this.socketService.socket.sockets.allSockets();
			const iter = socklist.values();
			iter.next()//skip the chat socket
			this.socketService.socket.to(iter.next().value).emit(`matchFound:`, 'We got a match1');
			iter.next()//skip the chat socket
			this.socketService.socket.to(iter.next().value).emit(`matchFound:`, 'We got a match3');
			console.log('list', socklist);
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
