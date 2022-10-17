import { useState, useEffect } from 'react';
import { Button, Layout, Space, version } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GameList, game } from './GameList';
import { BACK_URL } from '../constants';
import handleErrors from '../RequestErrors/handleErrors';
import Customization from '../customization/Customization';
import GamePreview from './GamePreview';
import './Game_menu.css';
import { NavigationBarre } from '../Accueil/Accueil';
import Sider from 'antd/lib/layout/Sider';
import { Content } from 'antd/lib/layout/layout';

const GameMenu = (props: any) => {
  const [ownPaddleColor, setOwnPaddleColor] = useState('#ffffff');
  const [opponentPaddleColor, setOpponentPaddleColor] = useState('#ffffff');
  const [ballColor, setBallColor] = useState('#ffffff');
  const [gameBackground, setGameBackground] = useState('#555555');
  const [inMatchmaking, setMatchmaking] = useState(false);
  const [gamesList, setGamesList] = useState<game[]>([]);
  const navigate = useNavigate();
  const [isLoginActive, setIsLogin] = useState(false);
  const [ok, setOk] = useState(false);
  const socket = props.socket;
  const currentUser = props.currentUser;

  useEffect(() => {
    axios
      .get(`${BACK_URL}/account/status`, { withCredentials: true })
      .then(() => {
        if (currentUser.accountUsername !== '') setOk(true);
        setIsLogin(true);
      })
      .catch((error) => {
        handleErrors(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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
    if (userId === '') return;
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
    if (ok) {
      try {
        const res = await axios.get(`${BACK_URL}/matchmaking/games`, {
          withCredentials: true,
        });
        console.log('res', res.data);

        setGamesList(res.data);
      } catch (e) {
        console.log(e);

        handleErrors(e);
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(getMatchesList, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [ok]);

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
  return ok ? (
    <Layout className="layout">
      <NavigationBarre user={currentUser} isLoginActive={1} />
      <Space>
        <Button onClick={joinMatchmaking} type="primary">
          {matchmakingButton}
        </Button>
      </Space>
      <Layout className="layout-2">
        <Sider width={450} className="sider-1">
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
        </Sider>
        <Content className="content-1">
          {/* <div className="preview-box">Live game preview</div> */}
          <GamePreview
            ownColor={ownPaddleColor}
            opponentColor={opponentPaddleColor}
            ballColor={ballColor}
            backgroundColor={gameBackground}
          />
        </Content>
        <Sider width={400} className="sider-2">
          <GameList games={gamesList} customGameValues={customGameValues} />
        </Sider>
      </Layout>
    </Layout>
  ) : null;
};

export default GameMenu;
