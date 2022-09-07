export const CHAT_TYPE = {
  user: 'user',
  channel: 'channel',
};

export const CHANNEL_TYPE = {
  public: 'public',
  protected: 'protected',
  private: 'private',
};

export type ChannelType = {
  id: string;
  type: string;
  password: string;
  ownerId: string;
  administratorsId: string[];
  usersId: string[];
  channelName: string;
};

export type MessageType = {
  id: string;
  message: string;
  receiverId: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
};

export const ChannelModalType = {
  edit: 'edit',
  manage: 'manage',
};
