import { Controller, Get, Param, Body, Post, Delete } from "@nestjs/common";
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

    @Delete('/:userId')
    quitMatchmaking(
        @Param('userId') userId: string 
    ): matchmakingDto[] {
            return this.matchmakingService.quitMatchmaking(userId);
    }
}