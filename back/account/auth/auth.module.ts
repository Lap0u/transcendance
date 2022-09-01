import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Accounts } from '../entities/accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy42 } from './strategies/index';
import { SessionSerializer } from '../utils/Serializer';
import { DatabaseFilesService } from '../files/databaseFile.service';
import DatabaseFile from '../entities/files.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts]),
    TypeOrmModule.forFeature([DatabaseFile]),
  ],
  controllers: [AuthController],
  providers: [
    Strategy42,
    DatabaseFilesService,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
