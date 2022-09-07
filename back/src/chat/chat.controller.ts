import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../account/auth/guards';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  @Inject(ChatService)
  private readonly service: ChatService;

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getChats(): Promise<Chat[]> {
  //   return this.service.getChats();
  // }

  @UseGuards(AuthenticatedGuard)
  @Get(':anotherId')
  getChatHistoryWithAnotherUserById(
    @Request() req: any,
    @Param('anotherId') anotherId: string,
  ): Promise<Chat[]> {
    return this.service.getChatHistoryWithAnotherUserById(
      req.user.id,
      anotherId,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/channel/:channelId')
  getChannelChatHistoryByChannelId(
    @Param('channelId') channelId: string,
  ): Promise<Chat[]> {
    return this.service.getChannelChatHistoryByChannelId(channelId);
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':anotherId')
  sendMessage(
    @Request() req: any,
    @Param('anotherId') anotherId: string,
    @Body('message') message: string,
  ): Promise<Chat> {
    return this.service.sendMessage(req.user.id, anotherId, message);
  }
}
