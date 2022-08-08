import React, {useState} from 'react'
import ButtonTemplate from '../ButtonTemplate.tsx'
import Loader from './Loader.tsx'

const MainPage = () =>
{
	const [inMatchmaking, setMatchmaking] = useState(false);
	const [inGame, setInGame] = useState(false);

	const joinMatchmaking = () =>{
		setMatchmaking(!inMatchmaking)
	}
	if (inMatchmaking) {
		setInterval( function() {
			if (inMatchmaking)
				setInGame(!inGame)
		},
		3000)
	}
	if (inGame)
		alert('game found')

	var matchmakingButton = inMatchmaking ? "Exit Matchmaking" : "Join Matchmaking"
	return (
		<div style={{color: 'red'}}>
			<ButtonTemplate text={matchmakingButton} onClick={joinMatchmaking} buttonClass={'Matchmaking button'} />
			{inMatchmaking && <Loader />}
		</div>
	)
}

export default MainPage;