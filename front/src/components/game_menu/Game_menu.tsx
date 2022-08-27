import {useState, useEffect} from 'react'
import { Button, Space, version } from "antd";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid} from 'uuid';
import axios from 'axios';

const BACK_URL = "http://localhost:4000";

const sessionId = uuid()

const GameMenu = (props : any) => {
  
  const [inMatchmaking, setMatchmaking] = useState(false);
  const socket = props.socket;
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

    socket.on(`matchFound:`, (gameId : string) => {
      console.log('gameId', gameId)
      navigate(`/singleGame/${gameId}`);
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