/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class Auth42Guard extends  AuthGuard('42'){
	async canActivate(context : ExecutionContext) : Promise<any> {
		const activate = (await super.canActivate(context)) as boolean;
		const request = context.switchToHttp().getRequest();
		await super.logIn(request);
		return activate;
	}
}
@Injectable()
export class AuthenticatedGuard implements CanActivate{
	async canActivate(context : ExecutionContext) : Promise<boolean>{
		const req = context.switchToHttp().getRequest();
		const cookies  = JSON.stringify(req.cookies);
		if (cookies.indexOf("connect.sid") === -1 || cookies.indexOf("Authentication") === -1)
			return false;
		return req.isAuthenticated();
}
}

@Injectable()
export class NotAuthenticatedGuard implements CanActivate{
	async canActivate(context : ExecutionContext) : Promise<boolean>{
		const req = context.switchToHttp().getRequest();
		return req.isUnauthenticated()
}
}
 
@Injectable()
export class JwtTwoFactorGuard extends AuthGuard('jwt-two-factor'){}

@Injectable()
export class NotJwtTwoFactorGuard extends AuthGuard('not-jwt-two-factor'){}
