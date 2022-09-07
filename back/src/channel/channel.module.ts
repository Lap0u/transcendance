import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelController } from './channel.controller';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
