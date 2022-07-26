import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleErrors from "../RequestErrors/handleErrors";

const BACK_URL = "http://localhost:4000";

export function Stats(props: any){

	const [stats, getStats] = useState({gameWon: 0, gameLost: 0});
	const nav = useNavigate();
	
	useEffect(() => {
			axios.get(`${BACK_URL}/scores/stats/${props.id}`,  {withCredentials:true })
			.then((response) => {
				getStats(response.data);
			})
			.catch((error) => {
				handleErrors(error, nav)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		props.tabFormat ?
	<div className='stats'>
		<i>Game won: {stats.gameWon}</i>
		<i>Game lost: {stats.gameLost}</i>
	</div>
		:
	<div className='stats' >
		<i>{stats.gameWon} game won</i><br/>
		<i>{stats.gameLost} game lost</i>
	</div>
	)
}