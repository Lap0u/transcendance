import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketService } from 'src/socket/socket.service';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
    private socketService: SocketService,
  ) {}

  getChatHistoryWithAnotherUserById(
    senderId: string,
    anotherId: string,
  ): Promise<Chat[]> {
    return this.chatsRepository.find({
      where: [
        { senderId: senderId, receiverId: anotherId },
        { senderId: anotherId, receiverId: senderId },
      ],
    });
  }

  sendMessage(
    senderId: string,
    receiverId: string,
    message: string,
  ): Promise<Chat> {
    const newMessage: Chat = new Chat();

    newMessage.senderId = senderId;
    newMessage.receiverId = receiverId;
    newMessage.message = message;

    this.socketService.socket.emit(`receiveMessage:${receiverId}`, newMessage);

    return this.chatsRepository.save(newMessage);
  }
}
