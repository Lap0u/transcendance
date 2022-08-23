/* eslint-disable prettier/prettier */

import { IntraUserDetails } from "../utils/types";

export interface AuthentificationProvider{
	validateUser(details: IntraUserDetails)
	createUser(details: IntraUserDetails);
	findUser();
	
}