import './Accueil.css';
import io from 'socket.io-client';
import ButtonTemplate from '../ButtonTemplate';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACK_URL } from '../../global';
import axios from 'axios';
import { useEffect } from 'react';
import handleErrors from '../RequestErrors/handleErrors';
import { HomeOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import UserDto from '../utils/UserDto';
import { Menu } from 'antd';
import { Stats } from '../Scores/Stats';
import NavigationBarre from './NavBarre';
const socket = io('http://localhost:3000');
socket.on('init', handleInit);

function handleInit(msg: string) {}
function Accueil(props: any) {
  const [isLoginActive, setIsLogin] = useState(false);
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACK_URL}/auth/status`, { withCredentials: true })
      .then((res) => {
        axios
          .get(`${BACK_URL}/2fa/status`, {
            withCredentials: true,
          })
          .then((res) => {
            setOk(true);
          })
          .catch((error) => {
            handleErrors(error, nav);
          });
        setIsLogin(true);
        setOk(true);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setIsLogin(false);
          setOk(true);
        } else handleErrors(error, nav);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ok ? (
    <div className="AccueilPage">
      <div>
        <Welcome />
        <LoginPlayButton isLoginActive={isLoginActive} />
        <NavigationBarre
          isLoginActive={isLoginActive}
          user={props.currentUser}
        />
      </div>
    </div>
  ) : null;
}

function LoginPlayButton(props: any) {
  const nav = useNavigate();
  return (
    <div className="login-play-button">
      {!props.isLoginActive ? (
        <h2 className="login-play-message">
          You have to login to play
          <br />
        </h2>
      ) : (
        <h2 className="login-play-message">
          Click here to access play
          <br />
        </h2>
      )}
      {!props.isLoginActive ? (
        <ButtonTemplate
          text="Login"
          onClick={() =>
            (window.location.href = 'http://localhost:4000/auth/login')
          }
          buttonClass={'login-button'}
        />
      ) : (
        <div>
          <ButtonTemplate
            text="Matchmaking"
            onClick={() => nav('/menu')}
            buttonClass={'play-button'}
          />
        </div>
      )}
    </div>
  );
}

function Welcome() {
  return (
    <h1 className="welcome" id="welcome">
      Welcome to our Pong
    </h1>
  );
}

export default Accueil;
