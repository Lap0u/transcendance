/* eslint-disable prettier/prettier */
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from "express";
import { Auth42Guard } from './guards/index';

@Controller('auth')
export class AuthController {

	//This route will send the 42 0auth login page 
	@Get('login')
	@UseGuards(Auth42Guard)
	login() { return }

	//The route The Oauth will call after login
	@Get('redirect')
	redirect(@Res() res: Response) {
		res.send(200);
	 }

	@Get('status')
	status() { return "status"}

	@Get('logout')
	logout() { return "status"}
	
}
