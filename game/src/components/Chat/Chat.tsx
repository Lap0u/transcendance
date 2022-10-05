/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACK_URL } from '../../global';
import handleErrors from '../RequestErrors/handleErrors';
import ChatContentWindow from './ChatContentWindow';
import ChatHeader from './ChatHeader';
import ChatSiderButton from './ChatSiderButton';
import ChatSiderList from './ChatSiderList';
import { ChannelType, CHANNEL_TYPE, CHAT_TYPE } from './const';

const { Header, Sider, Content } = Layout;

const Chat = ({ socket, currentUser }: { socket: any; currentUser: any }) => {
  const navigate = useNavigate();

  const [chatType, setChatType] = useState(CHAT_TYPE.user);
  const [selectUser, setSelectUser] = useState<any>(null);
  const [users, setUsers] = useState<any>([]);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(
    null
  );

  const getAllChannels = async () => {
    try {
      const res = await axios.get(`${BACK_URL}/channels`, {
        withCredentials: true,
      });
      setChannels(res.data);
    } catch (error) {
      handleErrors(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BACK_URL}/account/all/users`, {
        withCredentials: true,
      });
      res.data = res.data.map((data: any) => ({ ...data, key: data.id }));
      setUsers(res.data);
    } catch (error) {
      handleErrors(error);
    }
  };

  useEffect(() => {
    const initData = async () => {
      try {
        getAllUsers();
        getAllChannels();
      } catch {
        message.error('Must be connect to use chat!');
        navigate('/');
      }
    };
    initData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const updateChannelSocketMessage = 'updateChannel';
      const createNewChannelSocket = 'createChannel';
      const deleteChannelSocket = 'deleteChannel';

      socket.on(updateChannelSocketMessage, (updateChannel: ChannelType) => {
        setChannels((oldChannels: ChannelType[]) => {
          const tmpChannel = [...oldChannels];
          const index = tmpChannel.findIndex((c) => updateChannel.id === c.id);
          const userInChannel = updateChannel.usersId.find(
            (userId: string) => userId === currentUser.id
          );
          if (index === -1) {
            if (updateChannel.type === CHANNEL_TYPE.private && !userInChannel)
              return oldChannels;
            return [...oldChannels, updateChannel];
          } else {
            if (updateChannel.type === CHANNEL_TYPE.private && !userInChannel) {
              return tmpChannel.filter(
                (deleteChannel: any) => deleteChannel.id !== updateChannel.id
              );
            }
          }
          tmpChannel[index] = updateChannel;
          return tmpChannel;
        });
        setSelectedChannel((oldSelectedChannel: ChannelType | null) => {
          if (oldSelectedChannel?.id === updateChannel.id) {
            if (!updateChannel.usersId.includes(currentUser.id)) {
              return null;
            }
            return updateChannel;
          }
          return oldSelectedChannel;
        });
      });

      socket.on(createNewChannelSocket, (newChannel: ChannelType) => {
        setChannels((oldChannels: ChannelType[]) => {
          const tmpChannel = [...oldChannels];
          const index = tmpChannel.findIndex((c) => newChannel.id === c.id);
          const findUserId = newChannel.usersId.find(
            (id) => id === currentUser.id
          );
          if (
            index !== -1 ||
            (newChannel.type === CHANNEL_TYPE.private && !findUserId)
          ) {
            return tmpChannel;
          } else {
            return [...tmpChannel, newChannel];
          }
        });
      });

      socket.on(deleteChannelSocket, (deleteChannelId: string) => {
        setChannels((oldChannels: ChannelType[]) => {
          const tmpChannel = oldChannels.filter(
            (channel: ChannelType) => channel.id !== deleteChannelId
          );
          return tmpChannel;
        });
        setSelectedChannel((oldSelectedChannel: ChannelType | null) => {
          if (oldSelectedChannel?.id === deleteChannelId) {
            return null;
          }
          return oldSelectedChannel;
        });
      });

      return () => {
        socket.off(updateChannelSocketMessage);
        socket.off(createNewChannelSocket);
        socket.off(deleteChannelSocket);
      };
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Header
        style={{
          backgroundColor: '#000',
          color: '#fff',
          fontWeight: 'bold',
        }}>
        <ChatHeader currentUser={currentUser} />
      </Header>
      <Layout style={{ width: '100%' }}>
        <Sider
          style={{ backgroundColor: '#1c1c1c', textAlign: 'center' }}
          width={75}>
          <ChatSiderButton chatType={chatType} setChatType={setChatType} />
        </Sider>
        <Sider style={{ backgroundColor: '#c9c9c9' }} width={200}>
          <ChatSiderList
            chatType={chatType}
            setSelectUser={(selectUser: any) => {
              setSelectUser(selectUser);
              setSelectedChannel(null);
            }}
            users={users}
            currentUser={currentUser}
            channels={channels}
            selectedChannel={selectedChannel}
            setSelectedChannel={(selectedChannel: ChannelType) => {
              setSelectedChannel(selectedChannel);
              setSelectUser(null);
            }}
          />
        </Sider>
        <Content>
          <ChatContentWindow
            currentUser={currentUser}
            selectUser={selectUser}
            users={users}
            socket={socket}
            selectedChannel={selectedChannel}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Chat;
