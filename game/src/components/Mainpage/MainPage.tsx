import React, {useState} from 'react'
import ButtonTemplate from '../ButtonTemplate'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom';


const MainPage = () =>
{
	const [inMatchmaking, setMatchmaking] = useState(false);
	const navigate = useNavigate();

	const joinMatchmaking = () =>{
		setMatchmaking(!inMatchmaking)
	}

	if (inMatchmaking) {
		setTimeout( function() {
			navigate("/game")
		},
		3000)
	}

	var matchmakingButton = inMatchmaking ? "Exit Matchmaking" : "Join Matchmaking"
	return (
		<div style={{color: 'red'}}>
			<ButtonTemplate text={matchmakingButton} onClick={joinMatchmaking} buttonClass={'Matchmaking button'} />
			{inMatchmaking && <Loader />}
		</div>
	)
}

export default MainPage;