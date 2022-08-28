import { Accounts } from '../entities/accounts.entity';
export declare type IntraUserDetails = {
    id: string;
    username: string;
    name: string;
    avatar: number;
    accountUsername: string;
};
export declare type DatabaseFile = {
    id: number;
    filename: string;
    data: Uint8Array;
};
export declare type Done = (err: Error, user: Accounts) => void;
