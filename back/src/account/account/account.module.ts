import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scores } from '../../game/Scores/entities/scores.entities';
import { ScoresService } from '../../game/Scores/scores.service';
import { AuthService } from '../auth/auth.service';
import { Accounts } from '../entities/accounts.entity';
import DatabaseFile from '../entities/files.entity';
import { TypeOrmSession } from '../entities/session.entity';
import { DatabaseFilesService } from '../files/databaseFile.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts, DatabaseFile, Scores, TypeOrmSession]),
  ],
  controllers: [AccountController],
  providers: [AccountService, DatabaseFilesService, AuthService, ScoresService],
  exports: [AccountService],
})
export class AccountModule {}
