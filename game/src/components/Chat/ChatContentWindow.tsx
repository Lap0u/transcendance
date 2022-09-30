/* eslint-disable react-hooks/exhaustive-deps */
import './Chat.css';
import { Avatar, Button, Input, message as antdMessage } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { BACK_URL } from '../../global';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ChannelType, MessageType } from './const';
import './ProfilPlayer.css';
import UserPopover from '../utils/UserPopover';

const MessageContent = ({
  item,
  users,
  currentUser,
}: {
  item: MessageType;
  users: any;
  currentUser: any;
}) => {
  const findUser = users.find((user: any) => user.id === item.senderId);
  if (!findUser || currentUser.blacklist.includes(findUser.id)) {
    return null;
  }
  if (findUser.id === currentUser.id) {
    return (
      <div className="chat-window-mymessage-wrapper">
        <div className="chat-window-mymessage-username">
          <Avatar src={BACK_URL + '/account/avatar/' + findUser.avatar} />
          {findUser.accountUsername}:
        </div>
        <div className="chat-window-mymessage-content">{item.message}</div>
      </div>
    );
  }

  return (
    <div className="chat-window-othermessage-wrapper">
      <div className="chat-window-othermessage-username">
        <UserPopover currentUser={currentUser} user={findUser} />
        {findUser.accountUsername}:
      </div>
      <div className="chat-window-othermessage-content">{item.message}</div>
    </div>
  );
};

const ChatContentWindow = ({
  currentUser,
  selectUser,
  users,
  socket,
  selectedChannel,
}: ChatContentWindowProps) => {
  const [message, setMessage] = useState<string>('');
  const [history, setHistory] = useState<any>([]);
  const historyEndRef: any = useRef(null);
  const isUser: boolean = !!selectUser;

  useEffect(() => {
    const getHistory = async () => {
      try {
        const getHistoryUrl = isUser
          ? `${BACK_URL}/chat/${selectUser?.id}`
          : `${BACK_URL}/chat/channel/${selectedChannel?.id}`;
        const res = await axios.get(getHistoryUrl, { withCredentials: true });
        if (res.data) {
          const history = res.data.filter(
            (obj: any) => !currentUser.blacklist.includes(obj.senderId)
          );
          setHistory(history);
          scrollToBottom();
        }
      } catch (e) {
        antdMessage.error(`Une erreur s'est passé ${e}`);
      }
    };

    if (selectUser || selectedChannel) {
      getHistory();
    } else {
      setHistory([]);
    }
  }, [currentUser, selectUser, selectedChannel]);

  useEffect(() => {
    if (!currentUser || (!selectUser && !selectedChannel)) {
      return;
    }

    const socketMessage = isUser
      ? `receiveMessage:${currentUser.id}:${selectUser.id}`
      : `receiveMessage:${selectedChannel?.id}`;

    socket.on(socketMessage, (message: any) => {
      if (currentUser.blacklist.includes(message.senderId)) {
        return;
      }
      setHistory((oldHistory: any) => [...oldHistory, message]);
      scrollToBottom();
    });

    return () => {
      socket.off(socketMessage);
    };
  }, [currentUser, selectUser, selectedChannel]);

  const sendMessage = async () => {
    if (message.trim() === '') {
      antdMessage.error("Can't send empty message!");
      return;
    }

    try {
      const receiveId = isUser ? selectUser.id : selectedChannel?.id;
      const res = await axios.post(
        `${BACK_URL}/chat/${receiveId}`,
        { message: message },
        { withCredentials: true }
      );
      if (res.data) {
        setHistory([...history, res.data]);
        scrollToBottom();
      }
      setMessage('');
    } catch (e) {
      antdMessage.error(`Une erreur s'est passé ${e}`);
    }
  };

  const scrollToBottom = () => {
    if (historyEndRef.current) {
      setTimeout(() => {
        historyEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const chatWindowName = () => {
    if (isUser) {
      return (
        <>
          <Avatar src={BACK_URL + '/account/avatar/' + selectUser.avatar} />
          {selectUser.accountUsername}
        </>
      );
    } else {
      return <>{selectedChannel?.channelName}</>;
    }
  };

  if (!selectUser && !selectedChannel) {
    return null;
  }

  return (
    <div className="chat-window-wrapper">
      <div className="chat-window-header">
        {chatWindowName()}
        <hr />
      </div>
      <div className="chat-window-content">
        {history.map((item: MessageType, index: number) => (
          <MessageContent
            key={index}
            item={item}
            users={users}
            currentUser={currentUser}
          />
        ))}
        <div ref={historyEndRef} />
      </div>
      <div>
        <Input
          className="chat-window-input"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onPressEnter={sendMessage}
          suffix={
            <Button type="link" icon={<SendOutlined />} onClick={sendMessage} />
          }
        />
      </div>
    </div>
  );
};

type ChatContentWindowProps = {
  currentUser: any;
  selectUser: any | null;
  users: any;
  socket: any;
  selectedChannel: ChannelType | null;
};

export default ChatContentWindow;
