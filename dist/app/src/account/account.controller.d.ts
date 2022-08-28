import { Request } from 'express';
import { AccountService } from './account.service';
export declare class AccountController {
    private readonly usersService;
    constructor(usersService: AccountService);
    getAccountInfo(req: Request): any;
    addAvatar(): string;
    test(): string;
}
