/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request} from "express";
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
		res.sendStatus(200);
	 }

	@Get('status')
	status(@Req() req: Request) {
		const session_info = req.session["passport"];
		const user_info = session_info.user;
		return (user_info);
    }

	@Get('logout')
	logout() { return "status"}
	
}
