/* eslint-disable prettier/prettier */
import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { AccountService } from '../account/account.service';
import {
  Auth42Guard,
  AuthenticatedGuard,
  JwtTwoFactorGuard,
} from './guards/index';
import { TwoFactorAuthenticationService } from './twoFactorAuth/twoFactorAuth.service';

import { SocketService } from 'src/socket/socket.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly accountService: AccountService,
    private socketService: SocketService,
  ) {}

  //This route will send the 42 0auth login page
  @Get('login')
  @UseGuards(Auth42Guard)
  login() {
    return;
  }

  //The route The Oauth will call after login
  @Get('redirect')
  @UseGuards(Auth42Guard)
  async redirect(@Res() res: Response, @Req() req: Request) {
    const user = req.session['passport'].user;
    const accessTokenCookie =
      await this.twoFactorAuthenticationService.getCookieWithJwtAccessToken(
        user.id,
        false,
      );
    req.res.setHeader('Set-Cookie', [accessTokenCookie]);
    if (user.isTwoFactorAuthenticationEnabled) {
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        user,
        res,
      );
    }
    this.socketService.socket.emit(`addUser`, user);
    res.redirect('http://localhost:3000');
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Res() res: Response, @Req() req: Request) {
    const id = req.session['passport'].user.id;
    const body = await this.twoFactorAuthenticationService.twoAuthStatus(id);
    res.send(body);
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    req.logOut(async function (err) {
      if (err) {
        return next(err);
      }
      res.clearCookie('Authentication', { domain: 'localhost', path: '/' });
      return res.sendStatus(200);
    });
  }

  @Get('disconnect')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async disconnect(@Req() req: Request) {
    if (!req.session['passport']) return;
  }
}
