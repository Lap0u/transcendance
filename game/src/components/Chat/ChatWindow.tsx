import { useState, useEffect, useRef } from 'react';
import ButtonTemplate from '../ButtonTemplate';
import axios from 'axios';
import './Chat.css';

const BACK_URL = "http://localhost:4000";

const HistoryContent = ({ currUser, user, content }: historyContentProps) => {
  if (content.senderId === currUser.id) {
    return (
      <div className='chat-window-mymessage-wrapper'>
        <div className='chat-window-mymessage-username'>{currUser.username}:</div>
        <div className='chat-window-mymessage-content'>{content.message}</div>
      </div>
    )
  }
  return (
    <div className='chat-window-othermessage-wrapper'>
      <div className='chat-window-othermessage-username'>{user.username}:</div>
      <div className='chat-window-othermessage-content'>{content.message}</div>
    </div>
  );
};

type historyContentProps = {
  currUser: any,
  user: any, 
  content: any
}

const ChatWindow = ({ currUser, user, token , sock} : chatWindowProps) => {
  const [message, setMessage] = useState("");
  const [history, setHistory]: any = useState([]);
  const socket = sock
  const historyEndRef: any = useRef(null);

  useEffect(() => {
    if (!currUser) return ;
    socket.on('connect', () => {
      console.log('socket connect');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
    });

    socket.on(`receiveMessage:${currUser.id}`, (message : string) => {
      setHistory([...history, message]);
      scrollToBottom();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(`receiveMessage:${currUser.id}`);
    };
  }, [currUser, history]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/chat/${user.id}`, { headers: { Authorization: `Bearer ${token}` }});
        if (res.data) {
          setHistory(res.data);
          scrollToBottom();
        }
      } catch (e) {
        alert(`Une erreur s'est passé ${e}`);
      }
    };

    if (user) {
      getHistory();
    }
  }, [user, token]);

  if (!user) return null;

  const scrollToBottom = () => {
    if (historyEndRef.current) {
      setTimeout(() => {
        historyEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  const messageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const inputKeyUp = (key: any) => {
    if (key.code === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post(`${BACK_URL}/chat/${user.id}`, { message: message }, { headers: { Authorization: `Bearer ${token}` }});
      if (res.data) {
        setHistory([...history, res.data])
        scrollToBottom();
      }
      setMessage("");
    } catch (e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  };

  return (
    <div className='chat-window-wrapper'>
      <div className='chat-window-header'>Chat with {user.username}<hr/></div>
      <div className='chat-window-content'>
        {
          history.map((content: any, index: number) => <HistoryContent key={index} currUser={currUser} user={user} content={content} />)
        }
        <div ref={historyEndRef} />
      </div>
      <div className='chat-window-input'>
        <input value={message} onChange={messageChange} onKeyUp={inputKeyUp} />
        <ButtonTemplate text={"Send"} onClick={sendMessage} buttonClass='chat-window-send-button' />
      </div>
    </div>
  );
};

type chatWindowProps = {
  currUser: any,
  user: any, 
  token: any,
  sock: any
}

export default ChatWindow;
