/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, message } from 'antd';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACK_URL } from '../../global';
import ChatContentWindow from './ChatContentWindow';
import ChatHeader from './ChatHeader';
import ChatSiderButton from './ChatSiderButton';
import ChatSiderList from './ChatSiderList';
import { ChannelType, CHAT_TYPE } from './const';

const { Header, Sider, Content } = Layout;

const Chat = ({ socket }: { socket: any }) => {
  const navigate = useNavigate();

  const [chatType, setChatType] = useState(CHAT_TYPE.user);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectUser, setSelectUser] = useState(null);
  const [users, setUsers] = useState<any>([]);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(
    null
  );

  useEffect(() => {
    const tempToken: any = localStorage.getItem('token');
    if (!tempToken) {
      message.error('Must be connect to use chat!');
      navigate('/');
      return;
    }
    const tempUser: any = jwt_decode(tempToken);
    const currentTime = Date.now();
    const expTime = tempUser.exp * 1000;
    if (expTime < currentTime) {
      message.error('Must be connect to use chat!');
      navigate('/');
      return;
    }
    setToken(tempToken);
    setCurrentUser(tempUser);
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        res.data = res.data.map((data: any) => ({ ...data, key: data.id }));
        setUsers(res.data);
      } catch (e) {
        message.error(`Une erreur s'est passé ${e}`);
      }
    };

    const getAllChannels = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/channels`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannels(res.data);
      } catch (e) {
        message.error(`Une erreur s'est passé ${e}`);
      }
    };

    if (token) {
      getAllUsers();
      getAllChannels();
    }
  }, [token]);

  return (
    <>
      {token ? (
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
                token={token}
                chatType={chatType}
                setSelectUser={(selectUser: any) => {
                  setSelectUser(selectUser);
                  setSelectedChannel(null);
                }}
                users={users}
                currentUser={currentUser}
                setChannels={setChannels}
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
                token={token}
                socket={socket}
                selectedChannel={selectedChannel}
              />
            </Content>
          </Layout>
        </Layout>
      ) : null}
    </>
  );
};

export default Chat;
