import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../../account/auth/auth.service';
import { Accounts } from '../../account/entities/accounts.entity';
import { Scores } from './entities/scores.entities';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scores, Accounts])],
  controllers: [ScoresController],
  providers: [ScoresService, AuthService],
})
export class ScoresModule {}
