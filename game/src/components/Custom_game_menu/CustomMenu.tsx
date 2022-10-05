import { useState, useEffect } from 'react';
import { Button, Space, version } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACK_URL } from '../constants';
import handleErrors from '../RequestErrors/handleErrors';
import Customization from '../customization/Customization';
import './CustomMenu.css';
import GamePreview from '../game_menu/GamePreview';
import { NavigationBarre } from '../Accueil';
import GameSettings from './GameSettings';

const CustomMenu = (props: any) => {
  const [ownPaddleColor, setOwnPaddleColor] = useState('#ffffff');
  const [opponentPaddleColor, setOpponentPaddleColor] = useState('#ffffff');
  const [ballColor, setBallColor] = useState('#ffffff');
  const [gameBackground, setGameBackground] = useState('#000000');
  const [secondPlayer, setSecondPlayer] = useState('');
  const [settings, setSettings] = useState({
    powerup: false,
    point_limit: 20,
    ball_speed: 100,
  });
  const socket = props.socket;
  const currentUser = props.currentUser;
  // const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const [isLoginActive, setIsLogin] = useState(false);
  const [ok, setOk] = useState(false);
  const [user, setUser] = useState({ account_id: '' });

  useEffect(() => {
    console.log('useefect');
    axios
      .get(`${BACK_URL}/auth/status`, { withCredentials: true })
      .then((res) => {
        console.log('ress acceuirl', res);
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

  // useEffect(() => {
  //   const initData = async () => {
  //     try {
  //       const res = await axios.get(`${BACK_URL}/account`, {
  //         withCredentials: true,
  //       });
  //       setCurrentUser(res.data);
  //     } catch {
  //       console.log('Must be connect to use chat!');
  //       navigate('/');
  //     }
  //   };
  //   initData();
  // }, [navigate]);

  async function startCustom(
    currentUser: any,
    secondPlayer: any,
    settings: any
  ) {
    const playerOne = {
      login: currentUser.account_id,
      accountUsername: currentUser.accountUsername,
      socket: socket.id,
    };
    const playerTwo = {
      login: secondPlayer.account_id,
      accountUsername: secondPlayer.accountUsername,
      socket: socket.id,
    };
    try {
      await axios.post(
        `${BACK_URL}/matchmaking/customGame`,
        { playerOne: playerOne, playerTwo: playerTwo, settings: settings },
        { withCredentials: true }
      );
    } catch (e) {
      handleErrors(e);
    }
  }

  function startGame() {
    if (secondPlayer != '') {
      startCustom(currentUser, secondPlayer, settings);
    } else setSecondPlayer(currentUser);
    // else
    // 	openFriendList("Second")
  }

  useEffect(() => {
    socket.on(`customFound:`, (gameId: string) => {
      navigate(`/singleGame/${gameId}`, { state: customGameValues });
      return () => socket.off(`customFound:`);
    });
  });

  let launchGame = secondPlayer != '' ? 'Start Game' : 'Invite player';
  return (
    <div className="global-div">
      <NavigationBarre user={currentUser} isLoginActive={isLoginActive} />
      <Space>
        <Button onClick={startGame} type="primary">
          {launchGame}
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
      <GameSettings settings={settings} setSettings={setSettings} />
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

export default CustomMenu;
