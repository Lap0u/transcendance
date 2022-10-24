import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard, JwtTwoFactorGuard } from '../account/auth/guards';
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
  @UseGuards(JwtTwoFactorGuard)
  @Get()
  getUserChannels(@Request() req: any): Promise<Channel[]> {
    return this.service.getChannelsById(req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Post()
  createChannel(
    @Request() req: any,
    @Body() body: CreateChannelDto,
  ): Promise<Channel> {
    return this.service.createChannel(req.user.id, body);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Put(':channelId')
  updateChannel(
    @Param('channelId') channelId: string,
    @Body() body: UpdateChannelDto,
  ): Promise<Channel> {
    return this.service.updateChannel(channelId, body);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Put(':channelId/:addUserId')
  updateChannelUsers(
    @Param('channelId') channelId: string,
    @Param('addUserId') addUserId: string,
    @Body() body: UpdateChannelUserDto,
  ): Promise<Channel> {
    return this.service.updateChannelUsers(channelId, addUserId, body);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Delete(':channelId/:removeUserId')
  updateChannelWithRemoveUer(
    @Param('channelId') channelId: string,
    @Param('removeUserId') removeUserId: string,
  ): Promise<string> {
    return this.service.updateChannelWithRemoveUer(channelId, removeUserId);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Delete(':channelId')
  deleteChannel(@Param('channelId') channelId: string): Promise<string> {
    return this.service.deleteChannel(channelId);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtTwoFactorGuard)
  @Put('banOrMute/:channelId/:userId')
  banOrMute(
    @Param('channelId') channelId: string,
    @Param('userId') userId: string,
    @Body() body: { type: string; duration: number },
  ): Promise<Channel> {
    return this.service.banOrMute(channelId, userId, body.type, body.duration);
  }
}
