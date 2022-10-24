import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
