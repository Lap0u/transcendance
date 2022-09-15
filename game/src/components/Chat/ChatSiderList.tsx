import {
  EditOutlined,
  ExclamationCircleOutlined,
  PlusSquareOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Avatar, Input, Modal, message } from 'antd';
import { useRef, useState } from 'react';
import ChannelFormModal from './ChannelFormModal';
import { ChannelType, CHAT_TYPE, CHANNEL_TYPE } from './const';
import ChannelManageUserModal from './ChannelManageUserModal';
import { BACK_URL } from '../../global';
import axios from 'axios';

const { confirm } = Modal;

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
        <Avatar src={BACK_URL + '/account/avatar/' + user.avatar} />{' '}
        {user.accountUsername}
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
  setSelectedChannel: (channel: ChannelType | null) => void;
}) => {
  const passwordRef = useRef<string>('');

  const editClick = (e: any) => {
    e.stopPropagation();
    openEditChannel(channel);
  };

  const settingClick = (e: any) => {
    e.stopPropagation();
    openSettingChannel(channel);
  };

  const findAdmUser = channel.administratorsId.find(
    (admId: string) => admId === currentUser.id
  );

  const findUser = channel.usersId.find((user) => user === currentUser.id);

  const text = 'Are you sure to join this channel?';

  const content = (
    <div>
      {channel.type === CHANNEL_TYPE.protected && (
        <div>
          <p>Please enter the password</p>
          <Input
            placeholder="password"
            onChange={(e) => {
              passwordRef.current = e.target.value;
            }}
          />
        </div>
      )}
    </div>
  );

  const onOkHandler = async () => {
    if (channel.type === CHANNEL_TYPE.protected) {
      if (passwordRef.current !== channel.password) {
        message.error('Password incorrect!');
        return;
      }
    }

    const values = { type: channel.type, password: passwordRef.current };
    try {
      await axios.put(
        `${BACK_URL}/channels/${channel.id}/${currentUser.id}`,
        values,
        { withCredentials: true, headers: {} }
      );
      setSelectedChannel(channel);
      message.success('Join to channel successeful!');
    } catch (error) {
      message.error('Fail to join the channel!');
    }
  };

  const showConfirm = () => {
    confirm({
      title: text,
      icon: <ExclamationCircleOutlined />,
      content: content,
      onOk() {
        console.log('Ok', passwordRef.current);
        onOkHandler();
        passwordRef.current = '';
      },
      onCancel() {
        console.log('Cancel');
        passwordRef.current = '';
      },
    });
  };

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
      onClick={() => {
        if (findUser) {
          setSelectedChannel(channel);
        } else {
          setSelectedChannel(null);
        }
      }}>
      <div>{channel.channelName}</div>
      <div>
        {findAdmUser && (
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
      <div>
        {!findUser && (
          <Button icon={<PlusSquareOutlined />} onClick={showConfirm} />
        )}
      </div>
    </div>
  );
};

const ChatSiderList = ({
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
        addNewChannel={addNewChannel}
        updateChannel={updateChannel}
        channel={selectedChannel}
      />
      <ChannelManageUserModal
        users={users}
        channel={selectedChannel}
        isOpen={isSettingModalVisible}
        handleCancel={closeChannelModal}
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
              onClick={() => {
                setSelectedChannel(false);
                setIsChannelModalVisible(true);
              }}
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
  chatType: string;
  setSelectUser: (user: any) => void;
  users: any;
  currentUser: any;
  channels: any;
  setChannels: any;
  selectedChannel: ChannelType | null;
  setSelectedChannel: (channel: any | null) => void;
};

export default ChatSiderList;
