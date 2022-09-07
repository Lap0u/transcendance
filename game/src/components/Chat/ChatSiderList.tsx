import {
  EditOutlined,
  PlusSquareOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Avatar } from 'antd';
import { useState } from 'react';
import ChannelFormModal from './ChannelFormModal';
import { ChannelType, CHAT_TYPE } from './const';
import defaultAvatar from '../../assets/default-avatar.png';
import ChannelManageUserModal from './ChannelManageUserModal';

const UserListItem = ({ user, setSelectUser }: any) => {
  return (
    <div
      style={{
        cursor: 'default',
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        margin: 10,
        // border: '1px solid red',
      }}
      onClick={() => setSelectUser(user)}>
      <div>
        <Avatar src={defaultAvatar} /> {user.username}
      </div>
    </div>
  );
};

const ChannelListItem = ({
  channel,
  openEditChannel,
  openSettingChannel,
  currentUser,
  setSelectedChannel,
}: {
  channel: ChannelType;
  openEditChannel: (channel: ChannelType) => void;
  openSettingChannel: (channel: ChannelType) => void;
  currentUser: any;
  setSelectedChannel: (channel: ChannelType) => void;
}) => {
  const editClick = (e: any) => {
    e.stopPropagation();
    openEditChannel(channel);
  };

  const settingClick = (e: any) => {
    e.stopPropagation();
    openSettingChannel(channel);
  };

  const findUser = channel.administratorsId.find(
    (admId: string) => admId === currentUser.id
  );

  return (
    <div
      style={{
        cursor: 'default',
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        margin: 10,
        // border: '1px solid red',
      }}
      onClick={() => setSelectedChannel(channel)}>
      <div>{channel.channelName}</div>
      <div>
        {findUser && (
          <Button
            style={{ marginRight: 5 }}
            icon={<EditOutlined />}
            onClick={editClick}
          />
        )}

        {channel.ownerId === currentUser.id && (
          <Button icon={<SettingOutlined />} onClick={settingClick} />
        )}
      </div>
    </div>
  );
};

const ChatSiderList = ({
  token,
  chatType,
  setSelectUser,
  users,
  currentUser,
  channels,
  setChannels,
  selectedChannel,
  setSelectedChannel,
}: ChatSiderListProps) => {
  const [isChannelModalVisible, setIsChannelModalVisible] =
    useState<boolean>(false);
  const [isSettingModalVisible, setIsSettingModalVisible] =
    useState<boolean>(false);

  const closeChannelModal = () => {
    setIsChannelModalVisible(false);
    setSelectedChannel(null);
    setIsSettingModalVisible(false);
  };

  const addNewChannel = (newChannel: ChannelType) => {
    setChannels((oldChannels: ChannelType[]) => {
      return [...oldChannels, newChannel];
    });
  };

  const openEditChannel = (channel: ChannelType) => {
    setIsChannelModalVisible(true);
    setSelectedChannel(channel);
  };

  const updateChannel = (channel: ChannelType) => {
    setChannels((oldChannels: ChannelType[]) => {
      const tmpChannel = [...oldChannels];
      const index = tmpChannel.findIndex((c) => channel.id === c.id);
      tmpChannel[index] = channel;
      return tmpChannel;
    });
  };

  const openSettingChannel = (channel: ChannelType) => {
    setIsSettingModalVisible(true);
    setSelectedChannel(channel);
  };

  return (
    <div>
      <ChannelFormModal
        isModalVisible={isChannelModalVisible}
        closeModal={closeChannelModal}
        token={token}
        addNewChannel={addNewChannel}
        updateChannel={updateChannel}
        channel={selectedChannel}
      />
      <ChannelManageUserModal
        users={users}
        channel={selectedChannel}
        isOpen={isSettingModalVisible}
        handleCancel={closeChannelModal}
        token={token}
      />
      {chatType === CHAT_TYPE.user && (
        <div style={{ height: '100%', overflow: 'scroll' }}>
          {users.map((user: any) => (
            <UserListItem
              key={user.id}
              user={user}
              setSelectUser={setSelectUser}
            />
          ))}
        </div>
      )}
      {chatType === CHAT_TYPE.channel && (
        <>
          <div>
            <Button
              onClick={() => setIsChannelModalVisible(true)}
              icon={<PlusSquareOutlined />}>
              Create channel
            </Button>
          </div>
          <div>
            {channels.map((channel: ChannelType) => (
              <ChannelListItem
                key={channel.id}
                channel={channel}
                openEditChannel={openEditChannel}
                openSettingChannel={openSettingChannel}
                currentUser={currentUser}
                setSelectedChannel={setSelectedChannel}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

type ChatSiderListProps = {
  token: any;
  chatType: string;
  setSelectUser: (user: any) => void;
  users: any;
  currentUser: any;
  channels: any;
  setChannels: any;
  selectedChannel: ChannelType | null;
  setSelectedChannel: (channel: any) => void;
};

export default ChatSiderList;
