import React, {useState} from 'react'
import ButtonTemplate from '../ButtonTemplate.tsx'
import Loader from './Loader.tsx'
import { useNavigate } from 'react-router-dom';


const MainPage = () =>
{
	const [inMatchmaking, setMatchmaking] = useState(false);
	const [inGame, setInGame] = useState(false);
	const navigate = useNavigate();

	const joinMatchmaking = () =>{
		setMatchmaking(!inMatchmaking)
	}

	function changeGame () {
		if (inMatchmaking) {
			console.log('executed');
			
			setMatchmaking(!inMatchmaking)
			setInGame(!inGame)
		}
	}
	if (inMatchmaking) {
		setTimeout( function() {
			changeGame()
		},
		3000)
	}

	if (inGame)
		navigate("/game")
	var matchmakingButton = inMatchmaking ? "Exit Matchmaking" : "Join Matchmaking"
	return (
		<div style={{color: 'red'}}>
			<ButtonTemplate text={matchmakingButton} onClick={joinMatchmaking} buttonClass={'Matchmaking button'} />
			{inMatchmaking && <Loader />}
		</div>
	)
}

export default MainPage;