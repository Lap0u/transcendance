import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from 'src/account/entities/accounts.entity';
import { Scores } from 'src/game/Scores/entities/scores.entities';
import { ScoresService } from 'src/game/Scores/scores.service';
import { MatchmakingController } from './matchmaking.controller';
import { MatchmakingService } from './matchmaking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scores, Accounts])],
  controllers: [MatchmakingController],
  providers: [MatchmakingService, ScoresService],
  exports: [MatchmakingService],
})
export class MatchmakingModule {}
