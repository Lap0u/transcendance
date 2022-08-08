import './Accueil.css'
import ButtonTemplate from './ButtonTemplate.tsx'
import Canvas from './Canvas.tsx'
import LoginPopup from './login/Login.tsx'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
// import backgroundImage from '../assets/pong_wallpaper'
function Accueil(){
	const [isLoginActive, setIsLogin] = useState(false);

	const navigate = useNavigate();

	function loginClick(){
	  setIsLogin(!isLoginActive);
	}
	return (
		<div className='AccueilPage'>
			<div>
				<Background/>
			</div>
			{isLoginActive && <LoginPopup isLog={isLoginActive} setLog={setIsLogin} />}
			{!isLoginActive && 
			<div>
				<Welcome/>
				<ButtonTemplate text="Login" onClick={loginClick} buttonClass={'login-button rightButton'} />
				<LoginButton nav={navigate}/>
				<ButtonTemplate text="Chat" onClick={() => navigate("/chat")} buttonClass={'chat-button'} />
			</div>
			}
		</div>
	)
}

function LoginButton({nav}){
	return (
		<div className='login'>
			<h2 className='login-message'>
				You have to login to play<br/>
			</h2>
			<ButtonTemplate text="Enter game" onClick={() => nav("/home")} buttonClass={'join-button'} />
		</div>
	)
}

function Background(){
	return(
		<div className='backgroundImg'></div>
	)
}

function Welcome(){
	return (
		<h1 className='welcome' id='welcome'>Welcome to our Pong</h1>
	)
}

export default Accueil;
