import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MatchmakingController } from './matchmaking/matchmaking.controller';
import { User } from './user/user.entity';
import { Chat } from './chat/chat.entity';
import { Channel } from './channel/channel.entity';
import { SocketModule } from './socket/socket.module';
import { SocketGateway } from './socket.gateway';
import { MatchmakingService } from './matchmaking/matchmaking.service';
import { ChannelModule } from './channel/channel.module';
import { MatchmakingModule } from './matchmaking/matchmaking.module';

@Module({
  imports: [
    // Get variable from .env, can access to those variable by process.env.<variable_name>
    ConfigModule.forRoot({ isGlobal: true }),
    // Connect to db
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Chat, Channel],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ChatModule,
    SocketModule,
    ChannelModule,
    MatchmakingModule,
  ],
  controllers: [AppController, MatchmakingController],
  providers: [AppService, SocketGateway, MatchmakingService],
})
export class AppModule {}
