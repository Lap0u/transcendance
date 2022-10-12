import axios from "axios";
import { useEffect, useState } from "react";
import handleErrors from "../RequestErrors/handleErrors";

const BACK_URL = "http://localhost:4000";

export function Stats(props: any){

	const [stats, getStats] = useState({gameWon: 0, gameLost: 0});
	
	useEffect(() => {
			axios.get(`${BACK_URL}/scores/stats/${props.id}`,  {withCredentials:true })
			.then((response) => {
				getStats(response.data);
			})
			.catch((error) => {
				handleErrors(error)
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
	<i className='stats' >
		<i>{stats.gameWon} game won</i><br/>
		<i>{stats.gameLost} game lost</i>
	</i>
	)
}