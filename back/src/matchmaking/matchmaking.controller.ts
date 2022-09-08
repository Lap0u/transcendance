import { Controller, Get, Param, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/account/auth/guards';
import { matchesDto } from './matches.dto';
import { matchmakingDto, joinMatchmakingDto } from './matchmaking.dto';
import { MatchmakingService } from './matchmaking.service';

@Controller('matchmaking')
export class MatchmakingController {
  constructor(private readonly matchmakingService: MatchmakingService) {}
  
  @UseGuards(AuthenticatedGuard)
  @Get()
  getMatchmakingList(): matchmakingDto[] {
    return this.matchmakingService.getMatchmakingList();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(`/games`)
  getMatchesList(): matchesDto[] {
    return this.matchmakingService.getMatchesList();
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async joinMatchmaking(
    @Body() body: joinMatchmakingDto,
  ): Promise<matchmakingDto> {
    return this.matchmakingService.joinMatchmaking(body);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/:userId')
  quitMatchmaking(@Param('userId') userId: string): matchmakingDto[] {
    return this.matchmakingService.quitMatchmaking(userId);
  }
}
