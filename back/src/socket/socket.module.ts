import { Module, Global } from '@nestjs/common';
import { MatchmakingModule } from 'src/matchmaking/matchmaking.module';
import { SocketService } from './socket.service';

@Global()
@Module({
  imports: [MatchmakingModule],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
