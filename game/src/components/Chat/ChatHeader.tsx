import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import './Chat.css';
import ChannelFormModal from './ChannelFormModal';
import { ChannelType } from './ChannelType';

const BACK_URL = "http://localhost:4000";

const ChatHeader = ({ token, setToken, setUsers, currUser, setChannels, selectedChannel, isModalVisible, openModal, closeModal } :chatHeaderProps) => {
	const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BACK_URL}/users`, { headers: { Authorization: `Bearer ${token}` }});
      setUsers(res.data);
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  };

  const createToto = async () => {
    try {
      const res = await axios.post(`${BACK_URL}/users`, { username: 'toto', password: 'toto' });
      if (res.data) {
        alert('Create toto with success');
      }
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  };

  const createTata = async () => {
    try {
      const res = await axios.post(`${BACK_URL}/users`, { username: 'tata', password: 'tata' });
      if (res.data) {
        alert('Create tata with success');
      }
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  };

  const loginAsToto = async () => {
    try {
      const res = await axios.post(`${BACK_URL}/auth/login`, { username: 'toto', password: 'toto' });
      if (res.data) {
        setToken(res.data.access_token);
      }
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  };

  const loginAsTata = async () => {
    try {
      const res = await axios.post(`${BACK_URL}/auth/login`, { username: 'tata', password: 'tata' });
      if (res.data) {
        setToken(res.data.access_token);
      }
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  };

  const getAllChannels = async () => {
    try {
      const res = await axios.get(`${BACK_URL}/channels`, { headers: { Authorization: `Bearer ${token}` }});
      setChannels(res.data);
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <ChannelFormModal token={token} isModalVisible={isModalVisible} closeModal={closeModal} channel={selectedChannel} />
      <Button onClick={() => navigate("/")} className="chat-header-button">Back to home</Button>
      <Button onClick={getAllUsers} className="chat-header-button">List all user</Button>
      <Button onClick={createToto} className="chat-header-button">Create toto</Button>
      <Button onClick={createTata} className="chat-header-button">Create tata</Button>
      <Button onClick={loginAsToto} className="chat-header-button">Login as toto</Button>
      <Button onClick={loginAsTata} className="chat-header-button">Login as tata</Button>
      <Button onClick={openModal} className="chat-header-button">Create channel</Button>
      <Button onClick={getAllChannels} className="chat-header-button">List all channels</Button>
      { currUser && <div>Connected user: {currUser.username}</div>}
    </div>
  )
};

type chatHeaderProps = {
  token : any,
  setToken : any,
  setUsers : any, 
  currUser : any,
  setChannels : any,
  selectedChannel: ChannelType | null,
  isModalVisible: boolean,
  openModal: any,
  closeModal: any,
}
export default ChatHeader;
