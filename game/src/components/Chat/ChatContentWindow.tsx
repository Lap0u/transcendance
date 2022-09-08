import './Chat.css';
import { Avatar, Button, Input, message as antdMessage } from 'antd';
import defaultAvatar from '../../assets/default-avatar.png';
import { SendOutlined } from '@ant-design/icons';
import { BACK_URL } from '../../global';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ChannelType, MessageType } from './const';

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
  if (!findUser) {
    return null;
  }
  if (findUser.id === currentUser.id) {
    return (
      <div className="chat-window-mymessage-wrapper">
        <div className="chat-window-mymessage-username">
          <Avatar src={defaultAvatar} />
          {findUser.username}:
        </div>
        <div className="chat-window-mymessage-content">{item.message}</div>
      </div>
    );
  }

  return (
    <div className="chat-window-othermessage-wrapper">
      <div className="chat-window-othermessage-username">
        <Avatar src={defaultAvatar} />
        {findUser.username}:
      </div>
      <div className="chat-window-othermessage-content">{item.message}</div>
    </div>
  );
};

const ChatContentWindow = ({
  currentUser,
  selectUser,
  users,
  token,
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
        const res = await axios.get(getHistoryUrl, {withCredentials:true },
        );
        if (res.data) {
          setHistory(res.data);
          scrollToBottom();
        }
      } catch (e) {
        antdMessage.error(`Une erreur s'est passé ${e}`);
      }
    };

    if (selectUser || selectedChannel) {
      getHistory();
    }
  }, [selectUser, selectedChannel]);

  useEffect(() => {
    if (!currentUser || (!selectUser && !selectedChannel)) {
      return;
    }

    const socketMessage = isUser
      ? `receiveMessage:${currentUser.id}:${selectUser.id}`
      : `receiveMessage:${selectedChannel?.id}`;

    socket.on(socketMessage, (message: any) => {
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
		{withCredentials:true },
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
          <Avatar src={defaultAvatar} />
          {selectUser.username}
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
  token: any;
  socket: any;
  selectedChannel: ChannelType | null;
};

export default ChatContentWindow;