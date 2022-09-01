/* eslint-disable prettier/prettier */
import { Strategy, Profile } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable} from '@nestjs/common';
import { AuthentificationProvider } from '../auth';
import { IntraUserDetails} from '../../utils/types';
import { DatabaseFilesService } from '../../files/databaseFile.service';

@Injectable()
export class Strategy42 extends PassportStrategy(Strategy){
	constructor(@Inject('AUTH_SERVICE') private readonly authService : AuthentificationProvider,
	private readonly databaseFilesService: DatabaseFilesService,
	){
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
		const accountUsername = username;
		const filename = "default";
		const file = await this.databaseFilesService.getFileById(1);
	//	await this.databaseFilesRepository.create({
	//		filename,
	//		data: dataBuffer,
	//	  });
	//	await this.databaseFilesRepository.save(stream);
		const data = file.data;
		const details : IntraUserDetails = {id, username, name, accountUsername, filename, data};
//		console.log(id, username, name );
		return this.authService.validateUser(details);
	}
}