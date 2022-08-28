import { Profile } from 'passport-42';
import { AuthentificationProvider } from '../auth';
declare const Strategy42_base: new (...args: any[]) => any;
export declare class Strategy42 extends Strategy42_base {
    private readonly authService;
    constructor(authService: AuthentificationProvider);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any>;
}
export {};
