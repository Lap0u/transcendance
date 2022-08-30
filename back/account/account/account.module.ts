import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Accounts } from '../entities/accounts.entity';
import DatabaseFile from '../entities/files.entity';
import { DatabaseFilesService } from '../files/databaseFile.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts, DatabaseFile])],
  controllers: [AccountController],
  providers: [AccountService, DatabaseFilesService, AuthService],
})
export class AccountModule {}
