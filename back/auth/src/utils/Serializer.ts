/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Accounts } from "../auth/accounts.entity";

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(){
		super();
	}

	serializeUser(user: Accounts, done: (err: Error, user: Accounts) => void){
		done(null, user)
	}

	deserializeUser(user: Accounts, done: (err: Error, user: Accounts) => void){
		const userDb = null;
		done(null, userDb)
	}
}