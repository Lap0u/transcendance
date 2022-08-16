export type ChannelType = {
	id: string,
	type: string,
	password: string,
	ownerId: string,
	administratorsId: string[],
	usersId: string[],
	channelName: string,
}
