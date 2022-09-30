/* eslint-disable prettier/prettier */
import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request, NextFunction} from "express";
import { Auth42Guard, AuthenticatedGuard, JwtTwoFactorGuard} from './guards/index';
import { TwoFactorAuthenticationService } from './twoFactorAuth/twoFactorAuth.service';

@Controller('auth')
export class AuthController {

	constructor(
		private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
		) {}
	
	//This route will send the 42 0auth login page 
	@Get('login')
	@UseGuards(Auth42Guard)
	login(){ return }

	//The route The Oauth will call after login
	@Get('redirect')
	@UseGuards(Auth42Guard)
	async redirect(@Res() res: Response, @Req() req : Request) {
		const user = req.session['passport'].user;
		const accessTokenCookie =
		await this.twoFactorAuthenticationService.getCookieWithJwtAccessToken(
		  user.id,
		  false,
		);
		  req.res.setHeader('Set-Cookie', [accessTokenCookie]);
		if (user.isTwoFactorAuthenticationEnabled){
			await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
			  user, res
			);
		}
		res.redirect('http://localhost:3000');
	 }

	@Get('status')
	@UseGuards(AuthenticatedGuard)
	async status(@Res() res : Response, @Req() req : Request) {
		const id = req.session['passport'].user.id;
		const body = await this.twoFactorAuthenticationService.twoAuthStatus(id);
		res.send(body);
    }

	@Get('logout')
	@UseGuards(AuthenticatedGuard)
	@UseGuards(JwtTwoFactorGuard)
	async logout(@Req() req: Request, @Res() res: Response, @Next() next : NextFunction){
		const id = req.session['passport'].user.id;
		const twoFactorAuthenticationService = this.twoFactorAuthenticationService;
		req.logOut(async function(err) {
		if (err) {  return next(err); }
			await twoFactorAuthenticationService.setLoggout(id);
			res.clearCookie("Authentication", {domain: 'localhost', path:'/'});
			return res.sendStatus(200);
		});
	}
	
}
