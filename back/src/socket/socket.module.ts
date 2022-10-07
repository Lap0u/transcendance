import { Module, Global } from '@nestjs/common';
import { MatchmakingModule } from 'src/matchmaking/matchmaking.module';
import { AccountModule } from '../account/account/account.module';
import { AccountService } from '../account/account/account.service';
import { SocketService } from './socket.service';

@Global()
@Module({
  imports: [MatchmakingModule],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
