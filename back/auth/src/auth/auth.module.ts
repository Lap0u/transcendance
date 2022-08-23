import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Accounts } from './accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy42 } from './strategies/index';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [AuthController],
  providers: [
    Strategy42,
    {
      provide: 'AUTH SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
