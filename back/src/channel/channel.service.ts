import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketService } from 'src/socket/socket.service';
import { Repository, ArrayContains } from 'typeorm';
import {
  CreateChannelDto,
  UpdateChannelDto,
  UpdateChannelUserDto,
} from './channel.dto';
import { Channel, ChannelType } from './channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
    private socketService: SocketService,
  ) {}

  getChannelsById(userId: string): Promise<Channel[]> {
    return this.channelsRepository.find({
      where: [
        { usersId: ArrayContains([userId]) },
        { type: ChannelType.PUBLIC },
        { type: ChannelType.PROTECTED },
      ],
    });
  }

  async createChannel(
    userId: string,
    payload: CreateChannelDto,
  ): Promise<Channel> {
    const newChannel: Channel = new Channel();

    newChannel.type = payload.type;
    newChannel.channelName = payload.channelName;
    newChannel.password = payload.password;
    newChannel.ownerId = userId;
    newChannel.administratorsId = [userId];
    newChannel.usersId = [userId];

    const saveNewChannel = await this.channelsRepository.save(newChannel);

    this.socketService.socket.emit('createChannel', newChannel);

    return saveNewChannel;
  }

  async updateChannel(
    channelId: string,
    payload: UpdateChannelDto,
  ): Promise<Channel> {
    const channel: Channel = await this.channelsRepository.findOneBy({
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

    const saveChannel = this.channelsRepository.save(channel);

    this.socketService.socket.emit('updateChannel', channel);

    return saveChannel;
  }

  async updateChannelUsers(
    channelId: string,
    addUserId: string,
    payload: UpdateChannelUserDto,
  ): Promise<Channel> {
    const channel: Channel = await this.channelsRepository.findOneBy({
      id: channelId,
    });

    if (!channel) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (
      payload.type === ChannelType.PROTECTED &&
      payload.password !== channel.password
    ) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }

    const findUserId = channel.usersId.find((element) => element === addUserId);
    if (!findUserId) {
      channel.usersId = [...channel.usersId, addUserId];
    }

    const saveChannel = this.channelsRepository.save(channel);

    this.socketService.socket.emit('updateChannel', channel);

    return saveChannel;
  }
}
