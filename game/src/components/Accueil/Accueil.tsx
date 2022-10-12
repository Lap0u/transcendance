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
import UserMenu from './userMenu';
import { Menu } from 'antd';
import { Tabs } from 'antd';
import { Stats } from '../Scores/Stats';
import Grid from 'antd/lib/card/Grid';
import { MenuItem } from '@mui/material';
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


	const itemGroup=[
		{
			label: 
			<div>
				<i>{user.points} points</i>
				<i><Stats id={user.account_id} tabFormat={0} /></i>
				<i>rank: {user.rank}</i>
			</div>
		}
	]
	const subMenuItem = [
		{
			style:{width:'18px'},
			title:"Stats",
			className:"info",
			key:"points",
			label:
			<div>
				<div>
				<i>{user.points} points</i>
				<Stats id={user.account_id} tabFormat={0} />
				<i>rank: {user.rank}</i>
				</div>
				<Link className="onglet-nav" to="/logout">
					Logout
				</Link> 

			</div>
		}
	]
	const subMenu=[
		{
			style:{width:'18px', height: '300px'},
			title:"Stats",
			className:"sub-info",
			key:"points",
			label:
			<div className='info'>
				<div className='stats'>
				<p>{user.points} points</p>
				<p><Stats id={user.account_id} tabFormat={0} /></p>
				<p>rank: {user.rank}</p>
				</div>
				<Link className="onglet-nav" to="/logout">
					Logout
				</Link> 
			</div>
		}
	]
	const menuItems = [
    {
        key: 'home',
		style:{width:'15vw'},
        icon: <HomeOutlined className="home-button" shape="circle"onClick={() => nav('/')}/>,
    },
    {
		style:{width:'22vw'},
        key: 'profil',
        label: <Link  className="onglet-nav"  to="/account">Profil</Link>
    },
    {
		style:{width:'22vw'},
        key: 'chat',
        label:  <Link className="onglet-nav" to="/chat">Chat </Link>
    },
	{
		style:{width:'22vw'},
        key: 'scores',
        label: <Link className="onglet-nav" to={`/scores/${user.account_id}`}>Scores</Link>
    },
	{
		key:"user-info",
		icon: <NavAvatar user={user}/>,
		label: user.accountUsername,
		children:subMenu,
	}
];

  const nav = useNavigate();
  if (!user) return null;
  return (
      isLoginActive ? (
		<Menu  items={menuItems} style={{ width:'100vw', flex: "auto",border:'none', position:'relative'}} mode="horizontal" className='nav-barre'>
		  </Menu>
      ) : null
  );
}

function userItems({user} :{user : typeof UserDto}){
	return
}

function NavAvatar({user}: {user: typeof UserDto}){
	return(
		<Avatar
		className="nav-barre-avatar"
		src={BACK_URL + '/account/avatar/' + user.avatar}
   		alt="avatar"
		/>
	)
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
