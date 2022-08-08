import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';

@Global()
@Module({
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
