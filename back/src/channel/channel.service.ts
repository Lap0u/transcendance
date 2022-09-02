import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ArrayContains } from 'typeorm';
import { CreateChannelDto, UpdateChannelDto } from './channel.dto';
import { Channel, ChannelType } from './channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
  ) {}

  getChannelsById(userId: string): Promise<Channel[]> {
    return this.channelsRepository.findBy({
      usersId: ArrayContains([userId]),
    });
  }

  createChannel(userId: string, payload: CreateChannelDto): Promise<Channel> {
    const newChannel: Channel = new Channel();

    newChannel.type = payload.type;
    newChannel.channelName = payload.channelName;
    newChannel.password = payload.password;
    newChannel.ownerId = userId;
    newChannel.administratorsId = [userId];
    newChannel.usersId = [userId];

    return this.channelsRepository.save(newChannel);
  }

  async updateChannel(
    channelId: string,
    payload: UpdateChannelDto,
  ): Promise<Channel> {
    let channel: Channel = await this.channelsRepository.findOneBy({
      id: channelId,
    });

    if (!channel) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    channel.type = payload.type;
    channel.channelName = payload.channelName;
    // Remove password if is not protected type
    if (channel.type !== ChannelType.PROTECTED) {
      payload.password = null;
    }
    channel.password = payload.password;
    if (payload.administratorsId) {
      channel.administratorsId = payload.administratorsId;
    }
    if (payload.usersId) {
      channel.usersId = payload.usersId;
    }

    return this.channelsRepository.save(channel);
  }
}
