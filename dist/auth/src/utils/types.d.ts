import { Accounts } from '../auth/accounts.entity';
export declare type UserDetails = {
    id: string;
    intraId: string;
    name: string;
    Intralogin: string;
    avatar: string;
};
export declare type IntraUserDetails = {
    id: string;
    username: string;
    name: string;
    avatar: string;
    accountUsername: string;
};
export declare type Done = (err: Error, user: Accounts) => void;
