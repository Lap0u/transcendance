import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { AuthenticatedGuard, JwtTwoFactorGuard } from 'src/account/auth/guards';
import { matchesDto } from './matches.dto';
import { matchmakingDto, joinMatchmakingDto, customGameDto } from './matchmaking.dto';
import { MatchmakingService } from './matchmaking.service';

@Controller('matchmaking')
export class MatchmakingController {
  constructor(private readonly matchmakingService: MatchmakingService) {}

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Get()
  getMatchmakingList(): matchmakingDto[] {
    return this.matchmakingService.getMatchmakingList();
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Get(`/games`)
  getMatchesList(): matchesDto[] {
    return this.matchmakingService.getMatchesList();
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Post()
  async joinMatchmaking(
    @Body() body: joinMatchmakingDto,
  ): Promise<matchmakingDto> {
    return this.matchmakingService.joinMatchmaking(body);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Delete('/:userId')
  quitMatchmaking(@Param('userId') userId: string): matchmakingDto[] {
    return this.matchmakingService.quitMatchmaking(userId);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
	@Post('/customGame')
  async launchCustomGame(
    @Body() body: customGameDto,
  ) {
    return this.matchmakingService.launchCustomGame(body);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Post('/inviteGame/:invitedUserId')
  inviteGame(
    @Request() req: any,
    @Param('invitedUserId') invitedUserId: string,
  ): Promise<string> {
    return this.matchmakingService.inviteGame(req.user.id, invitedUserId);
  }
}
