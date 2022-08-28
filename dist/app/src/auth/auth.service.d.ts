import { Repository } from 'typeorm';
import { Accounts } from '../entities/accounts.entity';
import { AuthentificationProvider } from './auth';
import { IntraUserDetails } from '../utils/types';
export declare class AuthService implements AuthentificationProvider {
    private userRepo;
    constructor(userRepo: Repository<Accounts>);
    validateUser(details: IntraUserDetails): Promise<Accounts>;
    createUser(details: IntraUserDetails): Promise<Accounts>;
    findUser(id: string): Promise<Accounts | undefined>;
}
