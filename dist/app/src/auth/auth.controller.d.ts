import { Response, Request } from "express";
export declare class AuthController {
    login(): void;
    redirect(res: Response): void;
    status(req: Request): any;
    logout(): string;
}
