import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import './Chat.css';
import ChannelFormModal from './ChannelFormModal';

const BACK_URL = "http://localhost:4000";

const ChatHeader = ({ token, setToken, setUsers, currUser }) => {
	const navigate = useNavigate();
	const [isModalVisible, setIsModalVisible] = useState(false);

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

  const openCreateChannelModal = async () => {
    setIsModalVisible(true);
  };

  return (
    <div style={{ display: 'flex' }}>
      <ChannelFormModal token={token} isModalVisible={isModalVisible} closeModal={() => setIsModalVisible(false)} />
      <Button onClick={() => navigate("/")} className="chat-header-button">Back to home</Button>
      <Button onClick={getAllUsers} className="chat-header-button">List all user</Button>
      <Button onClick={createToto} className="chat-header-button">Create toto</Button>
      <Button onClick={createTata} className="chat-header-button">Create tata</Button>
      <Button onClick={loginAsToto} className="chat-header-button">Login as toto</Button>
      <Button onClick={loginAsTata} className="chat-header-button">Login as tata</Button>
      <Button onClick={openCreateChannelModal} className="chat-header-button">Create channel</Button>
      { currUser && <div>Connected user: {currUser.username}</div>}
    </div>
  )
};

export default ChatHeader;
