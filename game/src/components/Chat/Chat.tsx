import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import ChatHeader from './ChatHeader';
import ChatUserList from './ChatUserList';
import ChatWindow from './ChatWindow';
import ChannelsList from './ChannelsList';
import ChannelManageUserModal from './ChannelManageUserModal';
import { ChannelModalType } from './ChannelType';

const Chat = () => {
  const [token, setToken] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [chatWith, setChatWith] = useState(null);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
	const [isChannelModalVisible, setIsChannelModalVisible] = useState(false);
  const [isManageUserModalOpen, setIsManageUserModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      // Add token in local storage to avoid connect when refresh page
      localStorage.setItem('token', token);
      // Decode jwt and save user
      setCurrUser(jwt_decode(token));
    } else {
      const saved: any = localStorage.getItem('token');
      if (saved) {
        setToken(saved);
      }
    }
  }, [token]);

  return (
    <div style={{ color: 'white' }}>
      <ChatHeader
        token={token}
        setToken={setToken}
        setUsers={setUsers}
        currUser={currUser}
        setChannels={setChannels}
        selectedChannel={selectedChannel}
        isModalVisible={isChannelModalVisible}
        openModal={() => setIsChannelModalVisible(true)}
        closeModal={() => {
          setIsChannelModalVisible(false);
          setSelectedChannel(null);
        }}
      />
      <ChannelManageUserModal
        users={users}
        channel={selectedChannel}
        isOpen={isManageUserModalOpen}
        handleCancel={() => {
          setIsManageUserModalOpen(false);
          setSelectedChannel(null);
        }}
        token={token}
      />
      <div style={{ display: 'flex' }}>
        <ChatUserList users={users} setChatWith={setChatWith} />
        <ChatWindow currUser={currUser} user={chatWith} token={token} />
        <ChannelsList channels={channels} setSelectedChannel={(channel: any, type: string) => {
          setSelectedChannel(channel);
          if (type === ChannelModalType.edit) {
            setIsChannelModalVisible(true);
          } else {
            setIsManageUserModalOpen(true);
          }
        }} />
      </div>
    </div>
  );
};

export default Chat;
