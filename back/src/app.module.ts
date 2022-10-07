import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { MatchmakingController } from './matchmaking/matchmaking.controller';
import { Chat } from './chat/chat.entity';
import { Channel } from './channel/channel.entity';
import { SocketModule } from './socket/socket.module';
import { SocketGateway } from './socket.gateway';
import { MatchmakingService } from './matchmaking/matchmaking.service';
import { ChannelModule } from './channel/channel.module';
import { MatchmakingModule } from './matchmaking/matchmaking.module';

import { AuthModule } from './account/auth/auth.module';
import { Accounts } from './account/entities/accounts.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmSession } from './account/entities/session.entity';
import { DataSource } from 'typeorm';
import { AccountModule } from './account/account/account.module';
import { HttpModule } from '@nestjs/axios';
import DatabaseFile from './account/entities/files.entity';
import { DatabaseFileModule } from './account/files/databaseFile.module';
import { twoFactorAuthModule } from './account/auth/twoFactorAuth/twoFactorAuth.module';
import { ScoresModule } from './game/Scores/scores.module';
import { Scores } from './game/Scores/entities/scores.entities';
import { ScoresController } from './game/Scores/scores.controller';
import { AccountService } from './account/account/account.service';
import { SocketGatewayModule } from './socket.gateway.module';

@Module({
  imports: [
    // Get variable from .env, can access to those variable by process.env.<variable_name>
    ConfigModule.forRoot({ isGlobal: true }),
    // Connect to db
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number.parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Chat, Channel, Accounts, TypeOrmSession, DatabaseFile, Scores],
      synchronize: true,
    }),
    ScoresModule,
    AuthModule,
    ChatModule,
    twoFactorAuthModule,
    SocketModule,
    ChannelModule,
    MatchmakingModule,
    AuthModule,
    AccountModule,
    DatabaseFileModule,
    PassportModule.register({ session: true }),
    HttpModule,
    SocketGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  getDataSource() {
    return this.dataSource;
  }
}
