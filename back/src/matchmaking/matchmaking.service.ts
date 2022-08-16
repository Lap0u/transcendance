import { Injectable } from '@nestjs/common';
import { matchmakingDto, joinMatchmakingDto } from './matchmaking.dto';
import { SocketService } from 'src/socket/socket.service';
import { v4 as uuid} from 'uuid';

@Injectable()
export class MatchmakingService {
		private  matchmakingList : matchmakingDto[] = []
		private socketService: SocketService
	
	getMatchmakingList() : matchmakingDto[] {
		return this.matchmakingList
	}

	joinMatchmaking(payload :joinMatchmakingDto): matchmakingDto {
		let newUserInMatchmaking = {
			id: uuid(),
			...payload
		}
		this.matchmakingList.push(newUserInMatchmaking);
		if(this.matchmakingList.length >= 2)
			this.socketService.socket.emit(`matchFound:`, 'We got a match');

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
