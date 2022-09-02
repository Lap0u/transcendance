import './Accueil.css'
//import io from "socket.io-client"; 
import LoginPopup from './login/Login'
import ButtonTemplate from './ButtonTemplate'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
// import backgroundImage from '../assets/pong_wallpaper'

//const socket = io('http://localhost:4000');
//socket.on('init', handleInit);

//function handleInit(msg : string) {
//	console.log(msg);
//}
function Accueil(){
	const [isLoginActive, setIsLogin] = useState(false);

	const navigate = useNavigate();

	return (
		<div className='AccueilPage'>
			<div>
				<Background/>
			</div>
			{isLoginActive && <LoginPopup isLog={isLoginActive} setLog={setIsLogin} />}
			{!isLoginActive && 
			<div>
				<Welcome/>
				<ButtonTemplate text="Login" onClick={() => {window.location.href = 'http://localhost:4000/auth/login'}} buttonClass={'login-button rightButton'} />
				<LoginButton nav={navigate}/>
				<ButtonTemplate text="Chat" onClick={() => navigate("/chat")} buttonClass={'chat-button'} />
			</div>
			}
		</div>
	)
}

export function LoginButton(props : any){
	const nav = props.nav;
	return (
		<div className='loginButton'>
			<h2 className='login-message'>
				You have to login to play<br/>
			</h2>
			<ButtonTemplate text="Enter game" onClick={() => nav("/menu")} buttonClass={'join-button'} />
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
