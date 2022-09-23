import './Accueil.css'
import io from "socket.io-client";
import LoginPopup from './login/Login'
import ButtonTemplate from './ButtonTemplate'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Input, Modal } from 'antd';
import { BACK_URL } from '../global';
import axios from 'axios';
import { useEffect } from 'react';
import { LogoutButton } from './Account/AccountPage';
import handleErrors from './RequestErrors/handleErrors';
// import backgroundImage from '../assets/pong_wallpaper'

const socket = io('http://localhost:3000');
socket.on('init', handleInit);

function handleInit(msg: string) {
	console.log(msg);
}
function Accueil() {
	const navigate = useNavigate();
	const [isLoginActive, setIsLogin] = useState(false);
	const [ok, setOk] = useState(false);
	const [user, setUser] = useState({account_id: ""});
	useEffect(() => {
		console.log("useefect");
		axios.get(`${BACK_URL}/auth/status`,  {withCredentials:true })
			.then(() => {
				setOk(true);
				axios.get(`${BACK_URL}/2fa/status`, {
					withCredentials:true ,
				})
				.then((res) => {
					setUser(res.data)
				})
				.catch(error => {
					handleErrors(error)
				})
				setIsLogin(true);
			})
			.catch((error) => {
				if (error.response.status === 403)
					setIsLogin(false);
				else
					handleErrors(error);
				setOk(true);
		})	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  
	return (
		ok ?
		<div className='AccueilPage'>
			<div>
				<Background />
			</div>
				<div>
					<Welcome />
					<LoginPlayButton isLoginActive={isLoginActive} />
					<NavigationBarre nav={navigate} isLoginActive={isLoginActive} userId={user.account_id}/>

				</div>
		</div>
		: null
	)
}




function NavigationBarre(props : any) {
	return(
	<div>
	{props.isLoginActive ?
	<ul className='nav-barre'>
  		<li className='onglet-nav'><a href="/account"> Profil </a></li>
  		<li className='onglet-nav'><a href="/chat"> Chat </a></li>
		<li className='onglet-nav'><a href={`/scores/${props.userId}`}> Scores </a></li>
  		<li className='onglet-nav'><a href='/logout'> Logout </a></li>
		
	</ul>
	: null}
	</div>
	)
}
function LoginPlayButton(props: any) {

	const nav = useNavigate();
	return (
		<div className='login-play-button'>
			{!props.isLoginActive ? 
			<h2 className='login-play-message'>
				You have to login to play<br />
			</h2>
			: 
			<h2 className='login-play-message'>
			Click here to access play<br />
			</h2>
			}
			{!props.isLoginActive ? 

				<ButtonTemplate text="Login" onClick={() => window.location.href = 'http://localhost:4000/auth/login'} buttonClass={'login-button'} />
			:
			<ButtonTemplate  text="Enter game" onClick={() => nav("/menu")} buttonClass={'play-button'} />}
		</div>
	)
}

function Background() {
	return (
		<div className='backgroundImg'></div>
	)
}

function Welcome() {
	return (
		<h1 className='welcome' id='welcome'>Welcome to our Pong</h1>
	)
}

export default Accueil;
function useQuery() {
	throw new Error('Function not implemented.');
}

