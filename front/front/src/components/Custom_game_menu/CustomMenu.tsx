import { useState, useEffect } from 'react';
import { Button, Layout, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACK_URL } from '../constants';
import handleErrors from '../RequestErrors/handleErrors';
import Customization from '../customization/Customization';
import './CustomMenu.css';
import GamePreview from '../game_menu/GamePreview';
import NavigationBarre from '../Accueil/NavBarre';
import GameSettings from './GameSettings';
import Sider from 'antd/lib/layout/Sider';
import { Content } from 'antd/lib/layout/layout';

const CustomMenu = (props: any) => {
  const [gameReady, setGameReady] = useState('wait');
  const [ownPaddleColor, setOwnPaddleColor] = useState('#ffffff');
  const [opponentPaddleColor, setOpponentPaddleColor] = useState('#ffffff');
  const [ballColor, setBallColor] = useState('#ffffff');
  const [gameBackground, setGameBackground] = useState('#000000');
  const [secondPlayer, setSecondPlayer] = useState(null);
  const [secondSocket, setSecondSocket] = useState('');
  const [settings, setSettings] = useState({
    powerup: false,
    point_limit: 20,
    ball_speed: 100,
  });
  const socket = props.socket;
  const currentUser = props.currentUser;
  const navigate = useNavigate();
  const [isLoginActive, setIsLogin] = useState(false);
  const [ok, setOk] = useState(false);
	const nav = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${BACK_URL}/account/status`, { withCredentials: true })
      .then(() => {
        if (currentUser.accountUsername !== '') setOk(true);
      })
      .catch((error) => {
        handleErrors(error, nav);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const customGameValues: any = {
    myColor: ownPaddleColor,
    opponentColor: opponentPaddleColor,
    ballColor: ballColor,
    background: gameBackground,
  };

  useEffect(() => {
    async function joinCustom() {
      if (gameReady === 'ready') return;
      const res = await axios.post(
        `${BACK_URL}/matchmaking/joinCustom`,
        { id: currentUser.id, socket: socket.id },
        { withCredentials: true }
      );
      console.log('tt', res.data);

      if (res.data.playerId !== 'wait' && res.data.playerId !== 'ready') {
        console.log('went in', res.data);

        setGameReady('ready');
        const sec = await axios.get(
          `${BACK_URL}/account/userId/${res.data.playerId}`,
          {
            withCredentials: true,
          }
        );
        console.log('sec', sec.data);

        setSecondPlayer(sec.data);
        setSecondSocket(res.data.playerSocket);
      } else if (res.data.playerId !== 'ready') {
        const timeout = setTimeout(() => {
          joinCustom();
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
    if (ok && gameReady !== 'ready') joinCustom();
  }, [ok, gameReady]);

  async function startCustom(
    currentUser: any,
    secondPlayer: any,
    settings: any,
    secondSocket: string
  ) {
    const playerOne = {
      login: currentUser.account_id,
      accountUsername: currentUser.accountUsername,
      socket: socket.id,
    };
    const playerTwo = {
      login: secondPlayer.account_id,
      accountUsername: secondPlayer.accountUsername,
      socket: secondSocket,
    };
    try {
      await axios.post(
        `${BACK_URL}/matchmaking/customGame`,
        { playerOne: playerOne, playerTwo: playerTwo, settings: settings },
        { withCredentials: true }
      );
    } catch (e) {
      handleErrors(e, nav);
    }
  }

  function startGame() {
    if (secondPlayer !== '') {
      startCustom(currentUser, secondPlayer, settings, secondSocket);
    }
  }

  useEffect(() => {
    socket.on(`customFound:`, (gameId: string) => {
      navigate(`/singleGame/${gameId}`, { state: customGameValues });
      return () => socket.off(`customFound:`);
    });
  });

  let isReady = secondPlayer === null ? 'Loading' : 'Start game';
  return ok ? (
    <Layout className="layout">
      <NavigationBarre user={currentUser} isLoginActive={1} />
      <Space>
        <Button
          disabled={isReady === 'Loading'}
          onClick={startGame}
          type="primary">
          {isReady}
        </Button>
      </Space>
      <Layout className="layout-2">
        <Sider width={'25%'} className="sider">
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
          <GameSettings settings={settings} setSettings={setSettings} />
        </Sider>
        <Content className="content-1">
          <GamePreview
            ownColor={ownPaddleColor}
            opponentColor={opponentPaddleColor}
            ballColor={ballColor}
            backgroundColor={gameBackground}
          />
        </Content>
      </Layout>
    </Layout>
  ) : null;
};

export default CustomMenu;
