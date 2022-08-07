import './Accueil.css'
import ButtonTemplate from './ButtonTemplate.tsx'
import Canvas from './Canvas.tsx'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
// import backgroundImage from '../assets/pong_wallpaper'
function Accueil(){
	const [isShown, setIsShown] = useState(false);
	const [isLogin, setIsLogin] = useState(false);

	const navigate = useNavigate();

	function launchClick(){
	  setIsShown(true);
	}
	function loginClick(){
	  setIsLogin(!isLogin);
	}
	return (
		<div className='AccueilPage'>
			{isShown && <Canvas />}
			{!isShown && 
			<div>
				<Background/>
				<Welcome/>
				<ButtonTemplate text="Login" onClick={loginClick} buttonClass={'login-button rightButton'} />
				<Login onClick={launchClick} />
				<ButtonTemplate text="Chat" onClick={() => navigate("/chat")} buttonClass={'chat-button'} />
			</div>
			}
			{isLogin && <LoginPop />}
		</div>
	)
}	

const LoginPop = () => {
	console.log('here comes the login pop up');
	return (
		<div>

		</div>
	)
}

function Login({onClick}){
	return (
		<div className='login'>
			<h2 className='login-message'>
				You have to login to play<br/>
			</h2>
			<ButtonTemplate text="Play Game" onClick={onClick} buttonClass={'join-button'} />
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
