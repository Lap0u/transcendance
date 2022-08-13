import React from 'react';
import ButtonTemplate from '../ButtonTemplate';

const UserListItem = ({ user, setChatWith } : userListItemProps) => {
  const chatWithUser = () => {
    setChatWith(user);
  };

  return <div style={{ display: 'flex' }}>
    {user.username} <ButtonTemplate text={"Chat with him"} onClick={chatWithUser} buttonClass="" />
  </div>
};

const ChatUserList = ({ users, setChatWith } :chatUserListProps) => {
  if (users.length === 0) return <div>No users</div>

  return (
    <div>
      { users.map((user: any) => <UserListItem key={user.id} user={user} setChatWith={setChatWith} />)}
    </div>
  );
};

type userListItemProps = {
  user: any,
  setChatWith: any
}

type chatUserListProps = {
  users: any,
  setChatWith: any
}
export default ChatUserList;
