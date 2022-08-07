import React from 'react';
import ButtonTemplate from '../ButtonTemplate.tsx';

const UserListItem = ({ user, setChatWith }) => {
  const chatWithUser = () => {
    setChatWith(user);
  };

  return <div style={{ display: 'flex' }}>
    {user.username} <ButtonTemplate text={"Chat with him"} onClick={chatWithUser} />
  </div>
};

const ChatUserList = ({ users, setChatWith }) => {
  if (users.length === 0) return <div>No users</div>

  return (
    <div>
      { users.map((user: any) => <UserListItem key={user.id} user={user} setChatWith={setChatWith} />)}
    </div>
  );
};

export default ChatUserList;
