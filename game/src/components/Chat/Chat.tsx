/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, message } from 'antd';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACK_URL } from '../../global';
import handleErrors from '../RequestErrors/handleErrors';
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

  const getAllChannels = async () => {
	try {
	  const res = await axios.get(`${BACK_URL}/channels`, {withCredentials:true});
	  setChannels(res.data);
	} catch (error) {
	  handleErrors(error);
	}
  };
  
  const getAllUsers = async () => {
	try {
	  const res = await axios.get(`${BACK_URL}/account/all`, {withCredentials:true });
	res.data = res.data.map((data: any) => ({ ...data, key: data.id }));
	setUsers(res.data);
	console.log("reeees", res.data);
	} catch (error) {
		console.log(error);
	  handleErrors(error);
	}
  };

  useEffect(() => {
	axios.get(`${BACK_URL}/auth/status`,  {withCredentials:true })
	.then(() => {
		getAllUsers();
		getAllChannels();
	})
	.catch((err) => {
		console.log("errrrrrr" , err);
		message.error('Must be connect to use chat!');
		navigate('/');
		return;
	})
  }, []);




  return (
    <>
       (
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
      ) 
    </>
  );
};

export default Chat;
