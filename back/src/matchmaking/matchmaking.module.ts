import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/account/auth/auth.service';
import { Accounts } from 'src/account/entities/accounts.entity';
import { Scores } from 'src/game/Scores/entities/scores.entities';
import { ScoresService } from 'src/game/Scores/scores.service';
import { SocketService } from 'src/socket/socket.service';
import { MatchmakingController } from './matchmaking.controller';
import { MatchmakingService } from './matchmaking.service';

@Module({
//   imports: [
// 	TypeOrmModule.forFeature([Accounts, Scores])
//   ],
  controllers: [MatchmakingController],
  providers: [MatchmakingService],
  exports: [MatchmakingService],
})
export class MatchmakingModule {}
