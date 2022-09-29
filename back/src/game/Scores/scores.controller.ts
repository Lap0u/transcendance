import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
  AuthenticatedGuard,
  JwtTwoFactorGuard,
} from '../../account/auth/guards';
import { ScoresService } from './scores.service';
import { Request } from 'express';
import { AuthService } from '../../account/auth/auth.service';

@Controller('scores')
export class ScoresController {
  constructor(
    private readonly scoresService: ScoresService,
    private readonly authService: AuthService,
  ) {}

  @Get('/allhistory')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async history() {
    return await this.scoresService.histoty();
  }

  @Get('history/:id')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async playerHistory(@Param() param) {
    return await this.scoresService.historyById(param.id);
  }

  @Get('history/')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async ownHistory(@Req() request: Request) {
    const id = request.session['passport'].id;
    return await this.scoresService.historyById(id);
  }

  @Get('/stats/:id')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async getStats(@Req() req: Request, @Param() param) {
    return await this.scoresService.statsById(param.id);
  }

  @Get('/classement')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async getClassement() {
    return await this.scoresService.getClassement();
  }
}
