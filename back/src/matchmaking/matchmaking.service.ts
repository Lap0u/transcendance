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
		let newPaddle = {
			id: uuid(),
			...payload
		}
		this.matchmakingList.push(newPaddle);
		return newPaddle;
	}
}
