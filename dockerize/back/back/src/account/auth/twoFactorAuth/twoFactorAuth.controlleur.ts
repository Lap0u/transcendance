import {
  Controller,
  Post,
  Res,
  UseGuards,
  Req,
  Body,
  UnauthorizedException,
  Get,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TwoFactorAuthenticationService } from './twoFactorAuth.service';
import {
  AuthenticatedGuard,
  JwtTwoFactorGuard,
  NotJwtTwoFactorGuard,
} from '../guards';
import { AuthService } from '../auth.service';

@Controller('2fa')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly authService: AuthService,
  ) {}

  @Get('/status')
  @UseGuards(JwtTwoFactorGuard)
  // @UseGuards(AuthenticatedGuard)
  async status(@Res() res: Response, @Req() req: Request) {
    const id = req.session['passport'].user.id;
    const body = await this.twoFactorAuthenticationService.twoAuthStatus(id);
    res.send(body);
  }

  @Get('/access')
  @UseGuards(NotJwtTwoFactorGuard)
  async access(@Req() req: Request, @Res() res: Response) {
    const id = req.session['passport'].user.id;
    const body = await this.twoFactorAuthenticationService.twoAuthStatus(id);
    res.send(body);
  }

  @Post('/verify')
  @UseGuards(AuthenticatedGuard)
  async Verify(@Body() body: any, @Req() req: Request) {
    return await this.twoFactorAuthenticationService.verifyAccount(
      body.code,
      req,
    );
  }

  @Post('/saveemail')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async saveMail(@Body() body: any, @Req() req: Request) {
    if (!(await this.twoFactorAuthenticationService.ValidateEmail(body.email)))
      return new HttpException(
        'You have entered an invalid email address!',
        HttpStatus.BAD_REQUEST,
      );
    const session_info = req.session['passport'];
    const user_info = session_info.user;
    const { id } = user_info;
    await this.twoFactorAuthenticationService.saveEmail(body.email, id);
  }

  @Post('authenticate')
  // @HttpCode(200)
  @UseGuards(AuthenticatedGuard)
  async authenticate(@Req() request: Request, @Body() data: any) {
    const id = request.session['passport'].user.id;
    const user = await this.authService.findUser(id);
    const twoFactorAuthenticationCode = data.twoFactorAuthenticationCode;
    const isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        user,
      );
    if (!isCodeValid) {
      console.log('baaaad coooode');
      throw new UnauthorizedException('Wrong authentication code');
    }

    const accessTokenCookie =
      await this.twoFactorAuthenticationService.getCookieWithJwtAccessToken(
        user.id,
        true,
      );

    request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    return request.user;
  }

  @Get('generate')
  @UseGuards(AuthenticatedGuard)
  async register(@Res() response: Response, @Req() req: Request) {
    const user = req.session['passport'].user;
    return await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
      user,
      response,
    );
  }

  @Get('turnoff')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  async turnOff(@Req() req: Request) {
    return await this.twoFactorAuthenticationService.turnOf(
      req.session['passport'].user.id,
    );
  }
}
