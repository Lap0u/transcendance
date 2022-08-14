import { Controller, Get, Put, Param, Body, Post } from "@nestjs/common";
import { matchmakingDto, joinMatchmakingDto } from "./matchmaking.dto";
import { MatchmakingService } from "./matchmaking.service";

@Controller('matchmaking')
export class MatchmakingController {
	constructor(private readonly matchmakingService : MatchmakingService) {}
	@Get() 
	getMatchmakingList() : matchmakingDto[]{
		return this.matchmakingService.getMatchmakingList()
	}
	
	@Post()
		joinMatchmaking(
			@Body() body : joinMatchmakingDto
	) : matchmakingDto {
		return this.matchmakingService.joinMatchmaking(body)
	}
}