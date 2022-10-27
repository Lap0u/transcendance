import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketService } from 'src/socket/socket.service';
import { Repository, ArrayContains } from 'typeorm';
import * as moment from 'moment';
import {
  CreateChannelDto,
  UpdateChannelDto,
  UpdateChannelUserDto,
} from './channel.dto';
import { Channel, ChannelType, MuteOrBanUser } from './channel.entity';
import { Chat } from 'src/chat/chat.entity';
import bcrypt = require('bcrypt');

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
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
    if (newChannel.type === ChannelType.PROTECTED) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(payload.password, salt);
      newChannel.password = hash;
    }

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
      channel.password = null;
    } else if (payload.password !== channel.password) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(payload.password, salt);
      channel.password = hash;
    }
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
    if (payload.type === ChannelType.PROTECTED) {
      const isMatch = await bcrypt.compare(payload.password, channel.password);
      if (!isMatch)
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

  async updateChannelWithRemoveUer(
    channelId: string,
    removeUserId: string,
  ): Promise<string> {
    const channel: Channel = await this.channelsRepository.findOneBy({
      id: channelId,
    });

    if (!channel) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    channel.usersId = channel.usersId.filter(
      (userId: any) => userId !== removeUserId,
    );

    channel.administratorsId = channel.administratorsId.filter(
      (userId: any) => userId !== removeUserId,
    );

    if (channel.usersId.length === 0) {
      this.channelsRepository.remove(channel);
      this.chatRepository.delete({ receiverId: channelId });
      this.socketService.socket.emit('deleteChannel', channelId);
      return 'ok';
    }

    if (channel.ownerId === removeUserId) {
      if (channel.administratorsId.length !== 0) {
        channel.ownerId = channel.administratorsId[0];
      } else {
        channel.ownerId = channel.usersId[0];
        channel.administratorsId = [channel.usersId[0]];
      }
    }

    this.channelsRepository.save(channel);
    this.socketService.socket.emit('updateChannel', channel);
    return 'ok';
  }

  async deleteChannel(channelId: string): Promise<string> {
    const channel: Channel = await this.channelsRepository.findOneBy({
      id: channelId,
    });

    if (!channel) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.channelsRepository.remove(channel);
    this.chatRepository.delete({ receiverId: channelId });

    this.socketService.socket.emit('deleteChannel', channelId);

    return 'ok';
  }

  async banOrMute(
    channelId: string,
    userId: string,
    type: string,
    duration: number,
  ): Promise<Channel> {
    const channel: Channel = await this.channelsRepository.findOneBy({
      id: channelId,
    });

    const until = moment()
      .add(duration, 'minutes')
      .utcOffset(2)
      .format('YYYY-MM-DD HH:mm:ss');

    const listName = type === 'mute' ? 'muteList' : 'banList';

    const index = channel[listName].findIndex(
      (user: MuteOrBanUser) => user.userId === userId,
    );
    if (index !== -1) {
      channel[listName][index].until = until;
    } else {
      const muteOrBanUser: MuteOrBanUser = {
        userId,
        until,
      };
      channel[listName].push(muteOrBanUser);
    }

    const saveChannel = this.channelsRepository.save(channel);

    this.socketService.socket.emit('updateChannel', channel);

    return saveChannel;
  }
}
