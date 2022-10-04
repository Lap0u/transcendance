import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Accounts } from '../entities/accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy42 } from './strategies/index';
import { SessionSerializer } from '../utils/Serializer';
import { DatabaseFilesService } from '../files/databaseFile.service';
import DatabaseFile from '../entities/files.entity';
import { TwoFactorAuthenticationService } from './twoFactorAuth/twoFactorAuth.service';
import { AccountService } from '../account/account.service';
import {
  JwtTwoFactorStrategy,
  NotAuthJwtTwoFactorStrategy,
} from './twoFactorAuth/strategies';
import { JwtService } from '@nestjs/jwt';
import { ScoresService } from '../../game/Scores/scores.service';
import { Scores } from '../../game/Scores/entities/scores.entities';
import { TypeOrmSession } from '../entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts, Scores, TypeOrmSession]),
    TypeOrmModule.forFeature([DatabaseFile]),
  ],
  controllers: [AuthController],
  providers: [
    JwtTwoFactorStrategy,
    NotAuthJwtTwoFactorStrategy,
    AuthService,
    TwoFactorAuthenticationService,
    Strategy42,
    DatabaseFilesService,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    AccountService,
    JwtService,
    ScoresService,
  ],
})
export class AuthModule {}
