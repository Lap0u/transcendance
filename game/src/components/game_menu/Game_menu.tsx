import {useState, useEffect} from 'react'
import { Button, Space, version } from "antd";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid} from 'uuid';
import axios from 'axios';
import io from 'socket.io-client';

const BACK_URL = "http://localhost:4000";

const socket = io(BACK_URL).connect();

const sessionId = uuid()

const GameMenu = () => {
  
  const [inMatchmaking, setMatchmaking] = useState(false);
  
	const navigate = useNavigate();
  const joinMatchmaking = () =>{
    setMatchmaking(!inMatchmaking)
  }

  const quitMatchmakingList = async(userId: string) => {
    try {
      const res = await axios.delete(`${BACK_URL}/matchmaking/${userId}`);
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  }


  const joinMatchmakingList = async(userId: string) => {
    try {
      const res = await axios.post(`${BACK_URL}/matchmaking`, { id: userId});
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  }

  useEffect(() => {
  
    if (inMatchmaking)
      joinMatchmakingList(sessionId) // id unique a ajouter dans le localstorage, utiliser un userId de l'auth 42!
    if (!inMatchmaking)
      quitMatchmakingList(sessionId)
    socket.on('connect', () => {
      console.log('socket connect');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
    });

    socket.on(`matchFound:`, (gameId) => {
      console.log('gameId', gameId)
    });
  }, [inMatchmaking]);

	var matchmakingButton = inMatchmaking ? "Exit Matchmaking" : "Join Matchmaking"
  return (
    <div>
      <h1>antd version: {version}</h1>
      <Space>
        <Button onClick={joinMatchmaking} type="primary">{matchmakingButton}</Button>
      </Space>
    </div>
  );
};

export default GameMenu;