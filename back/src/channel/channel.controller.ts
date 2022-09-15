import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../account/auth/guards';
import {
  CreateChannelDto,
  UpdateChannelDto,
  UpdateChannelUserDto,
} from './channel.dto';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';

@Controller('channels')
export class ChannelController {
  @Inject(ChannelService)
  private readonly service: ChannelService;

  @UseGuards(AuthenticatedGuard)
  @Get()
  getUserChannels(@Request() req: any): Promise<Channel[]> {
    return this.service.getChannelsById(req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  createChannel(
    @Request() req: any,
    @Body() body: CreateChannelDto,
  ): Promise<Channel> {
    return this.service.createChannel(req.user.id, body);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':channelId')
  updateChannel(
    @Param('channelId') channelId: string,
    @Body() body: UpdateChannelDto,
  ): Promise<Channel> {
    return this.service.updateChannel(channelId, body);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':channelId/:addUserId')
  updateChannelUsers(
    @Param('channelId') channelId: string,
    @Param('addUserId') addUserId: string,
    @Body() body: UpdateChannelUserDto,
  ): Promise<Channel> {
    return this.service.updateChannelUsers(channelId, addUserId, body);
  }
}
