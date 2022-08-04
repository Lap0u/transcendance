import './Accueil.css'
import backgroundImage from '../assets/pong_wallpaper.jpeg'
function Accueil(){
	return (
		<div className='AccueilPage'>
			<Background/>
			<Welcome/>
			<Login/>
		</div>
	)
}	

function Login(){
	return (
		<div className='login'>
			<h2 className='login-message'>
				You have to login to play<br/>
			</h2>
			<button className='login-button'>Play game</button>
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

export default Accueil