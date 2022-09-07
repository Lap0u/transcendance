/* eslint-disable prettier/prettier */
import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request, NextFunction} from "express";
import { Auth42Guard, AuthenticatedGuard} from './guards/index';

@Controller('auth')
export class AuthController {

	//This route will send the 42 0auth login page 
	@Get('login')
	@UseGuards(Auth42Guard)
	login() { return }

	//The route The Oauth will call after login
	@Get('redirect')
	@UseGuards(Auth42Guard)
	redirect(@Res() res: Response) {
		res.redirect('http://localhost:3000/login');
		res.sendStatus(200);
	 }

	@Get('status')
	@UseGuards(AuthenticatedGuard)
	status() {
		return "ok";
    }

	@Get('logout')
	logout(@Req() req: Request, @Res() res: Response, @Next() next : NextFunction) {
		req.logOut(function(err) {
			if (err) {  return next(err); }
			res.sendStatus(200);
		  });
	}
	
}
