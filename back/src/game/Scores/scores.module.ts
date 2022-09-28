import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from '../../account/account/account.service';
import { AuthService } from '../../account/auth/auth.service';
import { Accounts } from '../../account/entities/accounts.entity';
import DatabaseFile from '../../account/entities/files.entity';
import { DatabaseFilesService } from '../../account/files/databaseFile.service';
import { Scores } from './entities/scores.entities';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scores, Accounts, DatabaseFile])],
  controllers: [ScoresController],
  providers: [ScoresService, AuthService, AccountService, DatabaseFilesService],
})
export class ScoresModule {}
