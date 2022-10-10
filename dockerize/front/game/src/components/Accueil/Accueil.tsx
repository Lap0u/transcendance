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
const socket = io('http://localhost:3000');
socket.on('init', handleInit);

function handleInit(msg: string) {
  console.log(msg);
}
function Accueil(props: any) {
  const [isLoginActive, setIsLogin] = useState(false);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    console.log('useefect');
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
            handleErrors(error);
          });
        setIsLogin(true);
        setOk(true);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setIsLogin(false);
          setOk(true);
        } else handleErrors(error);
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

export function NavigationBarre({
  user,
  isLoginActive = true,
}: {
  user: typeof UserDto;
  isLoginActive: any;
}) {
  const nav = useNavigate();
  if (!user) return null;
  return (
    <div>
      {isLoginActive ? (
        <ul className="nav-barre">
          <HomeOutlined
            className="home-button"
            shape="circle"
            onClick={() => nav('/')}
          />
          <div className="nav-barre-user-info">
            <Avatar
              className="nav-barre-avatar"
              src={BACK_URL + '/account/avatar/' + user.avatar}
              alt="avatar"
            />
            <i className="avatar-username">{user.accountUsername}</i>
          </div>
          <Link className="onglet-nav" to="/account">
            Profil
          </Link>
          <Link className="onglet-nav" to="/chat">
            Chat
          </Link>
          <Link className="onglet-nav" to={`/scores/${user.account_id}`}>
            Scores
          </Link>
          <Link className="onglet-nav" to="/logout">
            Logout
          </Link>
        </ul>
      ) : null}
    </div>
  );
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
