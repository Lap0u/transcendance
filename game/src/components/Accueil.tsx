import './Accueil.css'
import ButtonTemplate from './ButtonTemplate.tsx'
import Canvas from './Canvas.tsx'
import React, {useState} from 'react'
// import backgroundImage from '../assets/pong_wallpaper'
function Accueil(){
	const [isShown, setIsShown] = useState(false);

	function handleClick(){
	  setIsShown(true);
	}
	return (
		<div className='AccueilPage'>
			{isShown && <Canvas />}
			{!isShown && 
			<div>
				<Background/>
				<Welcome/>
				<Login onClick={handleClick} />
			</div>
			}
		</div>
	)
}	

function Login({onClick}){
	return (
		<div className='login'>
			<h2 className='login-message'>
				You have to login to play<br/>
			</h2>
			<ButtonTemplate text="Play Game" onClick={onClick} buttonClass={'login-button'} />
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
