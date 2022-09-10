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
// import backgroundImage from '../assets/pong_wallpaper'

const socket = io('http://localhost:3000');
socket.on('init', handleInit);

function handleInit(msg: string) {
	console.log(msg);
}
function Accueil() {

	const navigate = useNavigate();
	const [isLoginActive, setIsLogin] = useState(false);

	useEffect(() => {
		axios.get(`${BACK_URL}/auth/status`,  {withCredentials:true })
			.then((response) => {
				setIsLogin(true);
			})
			.catch((error) => {
				console.log("errroooor", error.response.status)
				if (error.response.status === 403)
					setIsLogin(false);
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  
	return (
		<div className='AccueilPage'>
			<div>
				<Background />
			</div>
				<div>
					<Welcome />
					<LoginPlayButton isLoginActive={isLoginActive} />
					<NavigationBarre nav={navigate} isLoginActive={isLoginActive}/>

				</div>
		</div>
	)
}




function NavigationBarre(props : any) {
	return(
	<div>
	{props.isLoginActive ?
	<ul className='nav-barre'>
  		<li className='onglet-nav'><a href="/account"> Account </a></li>
  		<li className='onglet-nav'><a href="/chat"> Chat </a></li>
  		<li className='onglet-nav'><a href="/logout"> Logout </a></li>
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
