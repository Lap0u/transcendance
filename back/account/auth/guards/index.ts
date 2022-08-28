/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class Auth42Guard extends  AuthGuard('42'){
	async canActivate(context : ExecutionContext) : Promise<any> {
		const activate = (await super.canActivate(context)) as boolean;
		console.log("activate", activate);
		const request = context.switchToHttp().getRequest();
		console.log("req", request);
		await super.logIn(request);
		return activate;
	}
}
@Injectable()
export class AuthenticatedGuard implements CanActivate{
	async canActivate(context : ExecutionContext) : Promise<boolean>{
		const req = context.switchToHttp().getRequest();
		return req.isAuthenticated();
	}
}
	