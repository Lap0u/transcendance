import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TokenPayload } from '../../../utils/types';
import { AuthService } from '../../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  'jwt-two-factor',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.authService.findUser(payload.id);
    if (!user) return;
    console.log('tttttttt', user,'payuuuadddd', payload);
    if (!user.isTwoFactorAuthenticationEnabled) {
      return user;
    }
    if (user.isTwoFactorAuthenticationEnabled && !user.isVerified) 
	{	
		console.log("heeeeeeeeuuu");
		return;
	}
    if (payload.isSecondFactorAuthenticated) {
      return user;
    }
  }
}

@Injectable()
export class NotAuthJwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  'not-jwt-two-factor',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.authService.findUser(payload.id);
    if (!user) return;
    console.log('uuuxxxii', user, 'payloadddd', payload);
    if (
      !payload.isSecondFactorAuthenticated &&
      user.isTwoFactorAuthenticationEnabled
    ) {
      return user;
    }
  }
}
