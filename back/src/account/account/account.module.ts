import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scores } from '../../game/Scores/entities/scores.entities';
import { ScoresService } from '../../game/Scores/scores.service';
import { SocketService } from '../../socket/socket.service';
import { AuthService } from '../auth/auth.service';
import { Accounts } from '../entities/accounts.entity';
import DatabaseFile from '../entities/files.entity';
import { DatabaseFilesService } from '../files/databaseFile.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts, DatabaseFile, Scores])],
  controllers: [AccountController],
  providers: [
    AccountService,
    DatabaseFilesService,
    AuthService,
    SocketService,
    ScoresService,
  ],
})
export class AccountModule {}
