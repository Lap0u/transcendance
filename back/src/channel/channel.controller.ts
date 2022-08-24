import { Body, Controller, Get, Inject, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateChannelDto, UpdateChannelDto } from './channel.dto';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';

@Controller('channels')
export class ChannelController {
	@Inject(ChannelService)
  private readonly service: ChannelService;

	@UseGuards(JwtAuthGuard)
  @Get()
  getUserChannels(
		@Request() req: any
	): Promise<Channel[]> {
    return this.service.getChannelsById(req.user.id);
  }

	@UseGuards(JwtAuthGuard)
	@Post()
	createChannel(
    @Request() req: any,
		@Body() body: CreateChannelDto
	): Promise<Channel> {
    return this.service.createChannel(req.user.id, body);
  }

	@UseGuards(JwtAuthGuard)
	@Put(':channelId')
	updateChannel(
		@Param('channelId') channelId: string,
		@Body() body: UpdateChannelDto
	): Promise<Channel> {
		return this.service.updateChannel(channelId, body);
	}

}
