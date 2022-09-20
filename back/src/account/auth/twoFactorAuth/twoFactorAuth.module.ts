import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth.service';
import { Accounts } from '../../entities/accounts.entity';
import { TwoFactorAuthenticationController } from './twoFactorAuth.controlleur';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TwoFactorAuthenticationService } from './twoFactorAuth.service';
import {
  JwtTwoFactorStrategy,
  NotAuthJwtTwoFactorStrategy,
} from './strategies';

@Module({
  controllers: [TwoFactorAuthenticationController],
  providers: [
    TwoFactorAuthenticationService,
    JwtTwoFactorStrategy,
    NotAuthJwtTwoFactorStrategy,
    AuthService,
  ],
  imports: [
    TypeOrmModule.forFeature([Accounts]),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: false,
        auth: {
          user: 'azenagelisa@gmail.com',
          pass: 'kngfuravlokhcayk',
        },
      },
      defaults: {
        from: '"No Reply" eazenag@gmail.com',
      },
      template: {
        dir: './views',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class twoFactorAuthModule {}
