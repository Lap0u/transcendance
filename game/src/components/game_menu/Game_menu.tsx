import { useState, useEffect } from 'react';
import { Button, Space, version } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GameList, game } from './GameList';
import { BACK_URL } from '../constants';
import handleErrors from '../RequestErrors/handleErrors';
import Customization from '../customization/Customization';
import GamePreview from './GamePreview';
import './Game_menu.css';
import { NavigationBarre } from '../Accueil';

const GameMenu = (props: any) => {
  const [ownPaddleColor, setOwnPaddleColor] = useState('#ffffff');
  const [opponentPaddleColor, setOpponentPaddleColor] = useState('#ffffff');
  const [ballColor, setBallColor] = useState('#ffffff');
  const [gameBackground, setGameBackground] = useState('#000000');
  const [inMatchmaking, setMatchmaking] = useState(false);
  const [gamesList, setGamesList] = useState<game[]>([]);
  const socket = props.socket;
  const currentUser = props.currentUser;
  // const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const [isLoginActive, setIsLogin] = useState(false);
  const [ok, setOk] = useState(false);
  const [user, setUser] = useState({ account_id: '' });

  useEffect(() => {
    axios
      .get(`${BACK_URL}/auth/status`, { withCredentials: true })
      .then((res) => {
        setOk(true);
        axios
          .get(`${BACK_URL}/2fa/status`, {
            withCredentials: true,
          })
          .then((res) => {
            setUser(res.data);
          })
          .catch((error) => {
            handleErrors(error);
          });
        setIsLogin(true);
      })
      .catch((error) => {
        if (error.response.status === 403) setIsLogin(false);
        else handleErrors(error);
        setOk(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customGameValues: any = {
    myColor: ownPaddleColor,
    opponentColor: opponentPaddleColor,
    ballColor: ballColor,
    background: gameBackground,
  };

  const joinMatchmaking = () => {
    setMatchmaking(!inMatchmaking);
  };
  const quitMatchmakingList = async (userId: string) => {
    try {
      await axios.delete(`${BACK_URL}/matchmaking/${userId}`, {
        withCredentials: true,
      });
    } catch (e) {
      handleErrors(e);
    }
  };

  const joinMatchmakingList = async (
    userLogin: string,
    userId: string,
    socket: string
  ) => {
    try {
      await axios.post(
        `${BACK_URL}/matchmaking`,
        { login: userLogin, accountUsername: userId, socket: socket },
        { withCredentials: true }
      );
    } catch (e) {
      handleErrors(e);
    }
  };
  const getMatchesList = async () => {
    try {
      const res = await axios.get(`${BACK_URL}/matchmaking/games`, {
        withCredentials: true,
      });
      setGamesList(res.data);
    } catch (e) {
      console.log(e);

      handleErrors(e);
    }
  };
  useEffect(() => {
    const interval = setInterval(getMatchesList, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    socket.on(`matchFound:`, (gameId: string) => {
      navigate(`/singleGame/${gameId}`, { state: customGameValues });
      return () => socket.off(`matchFound:`);
    });
  });
  useEffect(() => {
    if (currentUser) {
      if (inMatchmaking)
        joinMatchmakingList(
          currentUser.account_id,
          currentUser.accountUsername,
          socket.id
        ); // id unique a ajouter dans le localstorage, utiliser un userId de l'auth 42!
      if (!inMatchmaking) quitMatchmakingList(currentUser.account_id);
      return () => {
        quitMatchmakingList(currentUser.account_id);
      };
    }
  }, [inMatchmaking, currentUser]);

  var matchmakingButton = inMatchmaking
    ? 'Exit Matchmaking'
    : 'Join Matchmaking';
  return (
    <div>
      <NavigationBarre user={currentUser} isLoginActive={isLoginActive} />
      <Space>
        <Button onClick={joinMatchmaking} type="primary">
          {matchmakingButton}
        </Button>
      </Space>
      <Customization
        ownPaddleColor={ownPaddleColor}
        setOwnPaddleColor={setOwnPaddleColor}
        opponentPaddleColor={opponentPaddleColor}
        setOpponentPaddleColor={setOpponentPaddleColor}
        ballColor={ballColor}
        setBallColor={setBallColor}
        gameBackground={gameBackground}
        setGameBackground={setGameBackground}
      />
      <GameList games={gamesList} customGameValues={customGameValues} />
      <div className="preview-box">
        <div>Live game preview</div>
        <GamePreview
          ownColor={ownPaddleColor}
          opponentColor={opponentPaddleColor}
          ballColor={ballColor}
          backgroundColor={gameBackground}
        />
      </div>
    </div>
  );
};

export default GameMenu;
