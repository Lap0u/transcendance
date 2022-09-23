import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { Accounts } from '../../entities/accounts.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../utils/types';
import { AuthService } from '../auth.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';

@Injectable()
export class TwoFactorAuthenticationService {
  private code;

  constructor(
    @InjectRepository(Accounts) private userRepository: Repository<Accounts>,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private mailerService: MailerService,
  ) {
    this.code = Math.floor(10000 + Math.random() * 90000).toString();
  }
  async sendConfirmedEmail(user: Accounts) {
    const { email, name } = user;
    const { givenName } = JSON.parse(name);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to our Pong! Email Confirmed',
      template: 'emailConfirmed',
      context: {
        name: givenName,
        email,
      },
    });
  }

  async sendConfirmationEmail(id: string) {
    const user = await this.authService.findUser(id);
    const { givenName } = JSON.parse(user.name);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to our Pong! Confirm Email',
      template: './emailConfirm',
      context: {
        name: givenName,
        code: this.code,
      },
    });
  }

  async sendVerifCodeEmaiil(user: Accounts, secret: string) {
    const { email, name } = await user;
    const { givenName } = JSON.parse(name);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to our Pong! Confirm authentification',
      template: './emailVerifCode',
      context: {
        name: givenName,
        code: secret,
      },
    });
  }

  async verifyAccount(code: string, req: Request): Promise<any> {
    try {
      const id = req.session['passport'].user.id;
      const user = await this.authService.findUser(id);
      const isMatch = await bcrypt.compare(code, user.authConfirmToken);
      if (!isMatch) {
        return new HttpException(
          'Verification code has expired or not found',
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.userRepository.update(
        { authConfirmToken: user.authConfirmToken },
        { isVerified: true, authConfirmToken: undefined },
      );
      const accessTokenCookie = this.getCookieWithJwtAccessToken(user.id, true);
      req.res.setHeader('Set-Cookie', [accessTokenCookie]);
      await this.sendConfirmedEmail(user);
      return true;
    } catch (e) {
      return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async ValidateEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return true;
    return false;
  }

  async saveEmail(email: string, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    this.hashCode(this.code);
    await this.userRepository.save({
      ...user, // existing fields
      email: email,
      isTwoFactorAuthenticationEnabled: true,
      authConfirmToken: await this.hashCode(this.code),
    });
    await this.sendConfirmationEmail(user.id);
    return user;
  }

  public async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: Accounts,
  ) {
    return await bcrypt.compare(
      twoFactorAuthenticationCode,
      user.twoFactorAuthenticationSecret,
    );
  }

  public getCookieWithJwtAccessToken(
    id: string,
    isSecondFactorAuthenticated = false,
  ) {
    const payload: TokenPayload = { id, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public async generateTwoFactorAuthenticationSecret(
    user: Accounts,
    res: Response,
  ) {
    const secret = authenticator.generateSecret(5);
    return await this.setTwoFactorAuthenticationSecret(
      user,
      secret,
      user.account_id,
      res,
    );

    /*    return {
      secret,
      otpauthUrl,
    };*/
  }

  async setTwoFactorAuthenticationSecret(
    user: Accounts,
    secret: string,
    account_id: string,
    res: Response,
  ) {
    if (!user.isVerified) {
      console.log('tfq');
      res.status(401).send('Please verify your account');
      return;
    }
    this.sendVerifCodeEmaiil(user, secret);
    return this.userRepository.update(account_id, {
      twoFactorAuthenticationSecret: await this.hashCode(secret),
    });
  }

  async turnOf(id: string) {
    const user = await this.authService.findUser(id);
    await this.userRepository.save({
      ...user, // existing fields
      isTwoFactorAuthenticationEnabled: false,
      authConfirmToken: undefined,
      isVerified: false,
    });
    return await user;
  }

  async twoAuthStatus(id: string): Promise<any> {
    const user = await this.authService.findUser(id);
    return {
      twoFaEnabled: user.isTwoFactorAuthenticationEnabled,
      emailVerified: user.isVerified,
      account_id: user.account_id,
      id: user.id,
    };
  }

  async hashCode(code: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(code, salt);
    return hash;
  }
}

/*@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly usersService: AccountService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async generateTwoFactorAuthenticationSecret(user: Accounts) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

    return {
      secret,
      otpauthUrl,
    };
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: Accounts,
  ) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }

  public getCookieWithJwtAccessToken(
    id: string,
    isSecondFactorAuthenticated = false,
  ) {
	  console.log("aaaaaaaaaaa", this.configService.get('JWT_ACCESS_TOKEN_SECRET'))
    const payload: TokenPayload = { id, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }
}
*/
