import { Controller, Get, Param, Body, Post, Delete } from "@nestjs/common";
import { matchesDto } from "./matches.dto";
import { matchmakingDto, joinMatchmakingDto } from "./matchmaking.dto";
import { MatchmakingService } from "./matchmaking.service";

@Controller('matchmaking')
export class MatchmakingController {
	constructor(private readonly matchmakingService : MatchmakingService) {}
	@Get() 
	getMatchmakingList() : matchmakingDto[]{
		return this.matchmakingService.getMatchmakingList()
	}
	
	@Get(`/games`)
	getMatchesList() : matchesDto[]{
		return this.matchmakingService.getMatchesList()
	}
	
	@Post()
	async joinMatchmaking(
		@Body() body : joinMatchmakingDto
	) : Promise<matchmakingDto> {
		return this.matchmakingService.joinMatchmaking(body)
	}

    @Delete('/:userId')
    quitMatchmaking(
        @Param('userId') userId: string 
    ): matchmakingDto[] {
            return this.matchmakingService.quitMatchmaking(userId);
    }
}