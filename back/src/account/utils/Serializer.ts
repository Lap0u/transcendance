/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Accounts } from "../entities/accounts.entity";
import { AuthentificationProvider } from "../auth/auth";
import { Done } from "./types";

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthentificationProvider){
		super();
	}

	serializeUser(user: Accounts, done: Done){
		console.log("serialized : ");
		done(null, user)
	}

	async deserializeUser(user: Accounts, done: Done){
		const userDb = await this.authService.findUser(user.id); 
		// console.log("deserialized : ", userDb);
		return userDb ? done(null, userDb) : done(null, null);

	}
}