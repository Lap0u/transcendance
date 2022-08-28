import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '../entities/accounts.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
