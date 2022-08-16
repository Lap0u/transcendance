import { Button } from 'antd';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { ChannelType } from './ChannelType';

const ChannelListItem = ({ channel, setSelectedChannel } : ChannelsListItemProps) => {

  return <div style={{ display: 'flex' }}>
    {channel.channelName}
		<Button icon={<EditOutlined />} onClick={() => setSelectedChannel(channel)}>Edit</Button>
		<Button icon={<UserAddOutlined />}>Manage user</Button>
  </div>
};

const ChannelsList = ({ channels, setSelectedChannel } : ChannelsListProps) => {
  if (channels.length === 0) return <div>No channels</div>

  return (
    <div>
      { channels.map((channel: any) => <ChannelListItem key={channel.id} channel={channel} setSelectedChannel={setSelectedChannel} />)}
    </div>
  );
};

type ChannelsListProps = {
  channels : ChannelType[],
	setSelectedChannel : any,
}

type ChannelsListItemProps = {
  channel : ChannelType,
  setSelectedChannel: any,
}

export default ChannelsList;
