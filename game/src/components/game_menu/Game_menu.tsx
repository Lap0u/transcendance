import {useState, useEffect} from 'react'
import { Button, Space, version } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GameList, game } from './GameList';
import { BACK_URL } from '../constants';
import handleErrors from '../RequestErrors/handleErrors';
import Customization from '../customization/Customization';
import GamePreview from './GamePreview';

const GameMenu = (props : any) => {
	
	const [ownPaddleColor, setOwnPaddleColor] = useState("#ffffff")
	const [opponentPaddleColor, setOpponentPaddleColor] = useState("#ffffff")
	const [ballColor, setBallColor] = useState("#ffffff")
	const [gameBackground, setGameBackground] = useState("#000000")
	const [inMatchmaking, setMatchmaking] = useState(false);
	const [gamesList, setGamesList] = useState<game[]>([]);
	const socket = props.socket;
	const navigate = useNavigate();

  const customGameValues : any= {
	myColor: ownPaddleColor,
	opponentColor: opponentPaddleColor,
	ballColor: ballColor,
	background: gameBackground
  }
  
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
      navigate(`/singleGame/${gameId}`, {state: customGameValues});
    });
  }, [inMatchmaking, socket, navigate]);

	var matchmakingButton = inMatchmaking ? "Exit Matchmaking" : "Join Matchmaking"
  return (
    <div>
      <h1>antd version: {version}</h1>
      <Space>
        <Button onClick={joinMatchmaking} type="primary">{matchmakingButton}</Button>
      </Space>
	  <Customization ownPaddleColor={ownPaddleColor} setOwnPaddleColor={setOwnPaddleColor}
	 	 opponentPaddleColor={opponentPaddleColor} setOpponentPaddleColor={setOpponentPaddleColor}
	 	 ballColor={ballColor} setBallColor={setBallColor}
		  gameBackground={gameBackground} setGameBackground={setGameBackground}/>
      <GameList games={gamesList} />
	  <GamePreview ownColor={ownPaddleColor} opponentColor={opponentPaddleColor}
	   ballColor={ballColor} backgroundColor ={gameBackground} />
    </div>
  );
};

export default GameMenu;