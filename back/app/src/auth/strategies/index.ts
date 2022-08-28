/* eslint-disable prettier/prettier */
import { Strategy, Profile } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable} from '@nestjs/common';
import { AuthentificationProvider } from '../auth';
import { IntraUserDetails } from 'app/src/utils/types';

@Injectable()
export class Strategy42 extends PassportStrategy(Strategy){
	constructor(@Inject('AUTH_SERVICE') private readonly authService : AuthentificationProvider){
		super({
			clientID: process.env.CLIENT_42_UUID,
			clientSecret : process.env.CLIENT_42_SECRET,
			callbackURL : process.env.CLIENT_42_CALLBACK,
			scope : ['public'],
		});	
//		console.log(super.clientID)
	}
	async validate(accessToken: string, refreshToken: string, profile: Profile){
		const  { id, username, name} = profile;
		const avatar = 123;
		const accountUsername = "nobody";
		const details : IntraUserDetails = {id, username, name, avatar, accountUsername };
//		console.log(id, username, name );
		return this.authService.validateUser(details);
	}
}