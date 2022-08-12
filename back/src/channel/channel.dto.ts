import { ChannelType } from "./channel.entity";

export class CreateChannelDto {
	type: ChannelType;
	channelName: string;
	password: string;
}

export class UpdateChannelDto {
	type: ChannelType;
	channelName: string;
	password: string;
	administratorsId: string[];
	usersId: string[];
}