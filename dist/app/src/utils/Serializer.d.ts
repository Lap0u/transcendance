import { PassportSerializer } from "@nestjs/passport";
import { Accounts } from "../entities/accounts.entity";
import { AuthentificationProvider } from "../auth/auth";
import { Done } from "./types";
export declare class SessionSerializer extends PassportSerializer {
    private readonly authService;
    constructor(authService: AuthentificationProvider);
    serializeUser(user: Accounts, done: Done): void;
    deserializeUser(user: Accounts, done: Done): Promise<void>;
}
