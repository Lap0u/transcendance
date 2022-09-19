/* eslint-disable prettier/prettier */

import { IntraUserDetails } from "../utils/types";
import { Accounts } from "../entities/accounts.entity";

export interface AuthentificationProvider{
	validateUser(details: IntraUserDetails)
	createUser(details: IntraUserDetails);
	findUser( id : string) : Promise<Accounts | undefined>;
}
