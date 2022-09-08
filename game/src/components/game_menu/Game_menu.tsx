import {useState, useEffect} from 'react'
import { Button, Space, version } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GameList, game } from './GameList';
import { BACK_URL } from '../constants';
import handleErrors from '../RequestErrors/handleErrors';

const GameMenu = (props : any) => {
  
  const [inMatchmaking, setMatchmaking] = useState(false);
  const [gamesList, setGamesList] = useState<game[]>([]);
  const socket = props.socket;
	const navigate = useNavigate();
  const joinMatchmaking = () =>{
    setMatchmaking(!inMatchmaking)
  }
  const quitMatchmakingList = async(userId: string) => {
    try {
         await axios.delete(`${BACK_URL}/matchmaking/${userId}`, {withCredentials:true});
    } catch(e) {
      handleErrors(e);
    }
  }

  const joinMatchmakingList = async(userId: string) => {
    try {
        await axios.post(`${BACK_URL}/matchmaking`, { id: userId}, {withCredentials:true});
    } catch(e) {
      handleErrors(e);
    }
  }
  const getMatchesList = async () => {
    try {
        const res = await axios.get(`${BACK_URL}/matchmaking/games`, {withCredentials:true});
        console.log('list', res);
        setGamesList(res.data)
      }
      catch(e) {
        handleErrors(e);
    }
  }
  useEffect(() => {
    const interval = setInterval(getMatchesList, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
  
    if (inMatchmaking)
      joinMatchmakingList(socket.id) // id unique a ajouter dans le localstorage, utiliser un userId de l'auth 42!
    if (!inMatchmaking)
      quitMatchmakingList(socket.id)
    socket.on(`matchFound:`, (gameId : string) => {
      console.log('gameId', gameId)
      navigate(`/singleGame/${gameId}`);
    });
  }, [inMatchmaking, socket, navigate]);

	var matchmakingButton = inMatchmaking ? "Exit Matchmaking" : "Join Matchmaking"
  return (
    <div>
      <h1>antd version: {version}</h1>
      <Space>
        <Button onClick={joinMatchmaking} type="primary">{matchmakingButton}</Button>
      </Space>
      <GameList games={gamesList} />
    </div>
  );
};

export default GameMenu;