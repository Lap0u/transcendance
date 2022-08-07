import React from 'react';
import ButtonTemplate from '../ButtonTemplate.tsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Chat.css';

const BACK_URL = "http://localhost:4000";

const ChatHeader = ({ token, setToken, setUsers, currUser }) => {
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

  return (
    <div style={{ display: 'flex' }}>
      <ButtonTemplate text={"Back to home"} onClick={() => navigate("/")} buttonClass="chat-header-button" />
      <ButtonTemplate text={"List all user"} onClick={getAllUsers} buttonClass="chat-header-button" />
      <ButtonTemplate text={"Create toto"} onClick={createToto} buttonClass="chat-header-button" />
      <ButtonTemplate text={"Create tata"} onClick={createTata} buttonClass="chat-header-button" />
      <ButtonTemplate text={"Login as toto"} onClick={loginAsToto} buttonClass="chat-header-button" />
      <ButtonTemplate text={"Login as tata"} onClick={loginAsTata} buttonClass="chat-header-button" />
      { currUser && <div>Connected user: {currUser.username}</div>}
    </div>
  )
};

export default ChatHeader;
