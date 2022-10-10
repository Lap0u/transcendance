import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account/account/account.service';
import { Accounts } from './account/entities/accounts.entity';
import DatabaseFile from './account/entities/files.entity';
import { TypeOrmSession } from './account/entities/session.entity';
import { DatabaseFilesService } from './account/files/databaseFile.service';
import { Scores } from './game/Scores/entities/scores.entities';
import { ScoresService } from './game/Scores/scores.service';
import { MatchmakingService } from './matchmaking/matchmaking.service';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts, Scores, TypeOrmSession, DatabaseFile]),
  ],
  providers: [
    SocketGateway,
    ScoresService,
    MatchmakingService,
    AccountService,
    DatabaseFilesService,
  ],
})
export class SocketGatewayModule {}
