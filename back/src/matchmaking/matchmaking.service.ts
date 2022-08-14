import { Injectable } from '@nestjs/common';
import { matchmakingDto, joinMatchmakingDto } from './matchmaking.dto';
import { v4 as uuid} from 'uuid';

@Injectable()
export class MatchmakingService {
	private  matchmakingList : matchmakingDto[] = []
	
	getMatchmakingList() : matchmakingDto[] {
		return this.matchmakingList
	}

	joinMatchmaking(payload :joinMatchmakingDto): matchmakingDto {
		let newUserInMatchmaking = {
			id: uuid(),
			...payload
		}
		this.matchmakingList.push(newUserInMatchmaking);
		return newUserInMatchmaking;
	}
    quitMatchmaking(userId: string) :matchmakingDto[] {
        console.log('userID', userId);
        console.log('list', this.matchmakingList);
        
        
        const newMatchmakingList = this.matchmakingList.filter(user => {
            return user.id != userId
        })
        console.log('then', newMatchmakingList);
        
        this.matchmakingList = newMatchmakingList;

        return newMatchmakingList;
    }
}
