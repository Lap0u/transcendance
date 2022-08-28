import { IntraUserDetails } from "../utils/types";
import { Accounts } from "../entities/accounts.entity";
export interface AuthentificationProvider {
    validateUser(details: IntraUserDetails): any;
    createUser(details: IntraUserDetails): any;
    findUser(id: string): Promise<Accounts | undefined>;
}
