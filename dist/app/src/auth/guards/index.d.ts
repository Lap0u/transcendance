import { CanActivate, ExecutionContext } from "@nestjs/common";
declare const Auth42Guard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class Auth42Guard extends Auth42Guard_base {
    canActivate(context: ExecutionContext): Promise<any>;
}
export declare class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
