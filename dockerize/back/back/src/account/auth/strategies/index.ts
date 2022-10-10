/* eslint-disable prettier/prettier */
import { Strategy, Profile } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable} from '@nestjs/common';
import { AuthentificationProvider } from '../auth';
import { IntraUserDetails} from '../../utils/types';
import { DatabaseFilesService } from '../../files/databaseFile.service';
import { ScoresService } from '../../../game/Scores/scores.service';

@Injectable()
export class Strategy42 extends PassportStrategy(Strategy){
	constructor(@Inject('AUTH_SERVICE') private readonly authService : AuthentificationProvider,
	private readonly databaseFilesService: DatabaseFilesService,
	private readonly scoresService : ScoresService
	){
		super({
			clientID: process.env.CLIENT_42_UUID,
			clientSecret : process.env.CLIENT_42_SECRET,
			callbackURL : process.env.CLIENT_42_CALLBACK,
			scope : ['public'],
		});
		this.databaseFilesService.initDBFiles();
	}

	
	async validate(accessToken: string, refreshToken: string, profile: Profile){
		const  { id, username, name} = profile;
		const accountUsername = username;
		const file = await this.databaseFilesService.getDefaultFile();
		const avatar = file.id;
		const isTwoFactorAuthenticationEnabled = false;
		const email: string = null;
		const points = 1000;
		const rank = await this.scoresService.getRank(id); 
		const details : IntraUserDetails = {id, username, name, accountUsername, isTwoFactorAuthenticationEnabled, email, avatar, points, rank};
		return this.authService.validateUser(details);
	}
}

