import { Button } from 'antd';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';

type ChannelType = {
	id: string,
	type: string,
	password: string,
	ownerId: string,
	administratorsId: string[],
	usersId: string[],
	channelName: string,
}

const UserListItem = ({ channel } : ChannelsListItemProps) => {

  return <div style={{ display: 'flex' }}>
    {channel.channelName}
		<Button icon={<EditOutlined />}>Edit</Button>
		<Button icon={<UserAddOutlined />}>Add user</Button>
		<Button>Set Administrator</Button>
  </div>
};

const ChannelsList = ({ channels, setChannels } : ChannelsListProps) => {
  if (channels.length === 0) return <div>No channels</div>

  return (
    <div>
      { channels.map((channel: any) => <UserListItem key={channel.id} channel={channel} />)}
    </div>
  );
};

type ChannelsListProps = {
  channels : ChannelType[],
	setChannels : any,
}

type ChannelsListItemProps = {
  channel : ChannelType,
}

export default ChannelsList;
