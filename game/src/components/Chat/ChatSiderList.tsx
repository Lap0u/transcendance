import {
  EditOutlined,
  ExclamationCircleOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, message } from 'antd';
import { useMemo, useRef, useState } from 'react';
import ChannelFormModal from './ChannelFormModal';
import { ChannelType, CHAT_TYPE, CHANNEL_TYPE, MuteOrBanUser } from './const';
import ChannelManageUserModal from './ChannelManageUserModal';
import { BACK_URL } from '../../global';
import axios from 'axios';
import UserPopover from '../utils/UserPopover';
import checkMuteOrBan from '../utils/checkMuteOrBan';

const { confirm } = Modal;

const UserListItem = ({ user, currentUser, setSelectUser }: any) => {
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
        <UserPopover currentUser={currentUser} user={user} />{' '}
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

  const findUser = channel.usersId.find((user) => user === currentUser.id);

  const userBanned = useMemo(
    () =>
      channel.banList.find(
        (banUser: MuteOrBanUser) => banUser.userId === currentUser.id
      ),
    [channel, currentUser]
  );

  if (checkMuteOrBan(userBanned)) {
    return null;
  }

  const textToJoin = 'Are you sure to join this channel?';

  const textToQuit = 'Are you sure to quit this channel?';

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

  const onQuitOkHandler = async () => {
    try {
      await axios.delete(
        `${BACK_URL}/channels/${channel.id}/${currentUser.id}`,
        { withCredentials: true, headers: {} }
      );
      setSelectedChannel(null);
      message.success('Quit the channel successeful!');
    } catch (error) {
      message.error('Fail to quit the channel!');
    }
  };

  const showConfirm = () => {
    confirm({
      title: textToJoin,
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

  const quitChannel = () => {
    confirm({
      title: textToQuit,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onQuitOkHandler();
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
        {channel.ownerId === currentUser.id && (
          <>
            <Button
              className="chat-button-style"
              style={{ marginRight: 5 }}
              icon={<EditOutlined />}
              onClick={editClick}
            />
            <Button
              className="chat-button-style"
              style={{ marginRight: 5 }}
              icon={<SettingOutlined />}
              onClick={settingClick}
            />
          </>
        )}

        {!findUser && (
          <Button
            className="chat-button-style"
            icon={<PlusSquareOutlined />}
            onClick={showConfirm}
          />
        )}

        {findUser && (
          <Button
            className="chat-button-style"
            icon={<MinusSquareOutlined />}
            onClick={quitChannel}
          />
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
  selectedChannel,
  setSelectedChannel,
}: ChatSiderListProps) => {
  const [isChannelModalVisible, setIsChannelModalVisible] =
    useState<boolean>(false);
  const [isSettingModalVisible, setIsSettingModalVisible] =
    useState<boolean>(false);

  const closeChannelModal = () => {
    setIsChannelModalVisible(false);
    setIsSettingModalVisible(false);
  };

  const openEditChannel = (channel: ChannelType) => {
    setIsChannelModalVisible(true);
    setSelectedChannel(channel);
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
          {users.map((user: any) => {
            if (currentUser.id === user.id) {
              return null;
            }

            return (
              <UserListItem
                key={user.id}
                user={user}
                currentUser={currentUser}
                setSelectUser={setSelectUser}
              />
            );
          })}
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
              icon={<PlusSquareOutlined />}
              className="chat-button-style"
              style={{
                width: '90%',
                marginLeft: '5%',
                marginTop: 5,
              }}>
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
  selectedChannel: ChannelType | null;
  setSelectedChannel: (channel: any | null) => void;
};

export default ChatSiderList;
