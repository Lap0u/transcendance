import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  AuthenticatedGuard,
  JwtTwoFactorGuard,
} from '../../account/auth/guards';
import { ScoresService } from './scores.service';
import { Request, Response } from 'express';
import { AuthService } from '../../account/auth/auth.service';
import { ScoresDto } from './utils/types';

@Controller('scores')
export class ScoresController {
  constructor(
    private readonly scoresService: ScoresService,
    private readonly authService: AuthService,
  ) {}

  @Get('/history')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async history() {
    return await this.scoresService.histoty();
  }

  @Get('history/:id')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async playerHistory(@Param() param) {
    return await this.scoresService.histotyById(param.id);
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async addScore(@Req() req: Request, @Body() body: ScoresDto) {
    // const id = req.session['passport'].id;
    //  const user = await this.authService.findUser(id);
    return await this.scoresService.addScore(body);
  }
}
