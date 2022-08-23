/* eslint-disable prettier/prettier */
import { Strategy, Profile } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable} from '@nestjs/common';

@Injectable()
export class Strategy42 extends PassportStrategy(Strategy){
	constructor(){
		super({
			clientID: process.env.CLIENT_42_UUID,
			clientSecret : process.env.CLIENT_42_SECRET,
			callbackURL : process.env.CLIENT_42_CALLBACK,
			scope : ['public'],
		});	
		console.log(super.clientID)
	}
	async validate(accessToken: string, refreshToken: string, profile: Profile){
		const  { id, name, username} = profile;
		console.log(id, username, name );
	}
}