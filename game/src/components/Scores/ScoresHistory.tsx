import axios from "axios";
import { useEffect, useState } from "react";
import handleErrors from "../RequestErrors/handleErrors";
import './ScoresHistory.css'

const BACK_URL = "http://localhost:4000";

const ScoresDto = [{
	account_id: "",
	idWinner: "",
	idLoser: "",
	UsernameWinner: "",
	UsernameLoser: "",
	ScorePlayer1: null,
	ScorePlayer2: null
  }];

export function ScoresHistory(){
	const [scores, getScores] = useState(ScoresDto);

	useEffect(() => {
		axios.get(`${BACK_URL}/scores/history/`,  {withCredentials:true })
			.then((response) => {
				console.log(response.data);
				console.log("resssss", response.data);
				getScores(response.data);
			})
			.catch((error) => {
				//console.log("eerrroor", error);
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log("scroresss", scores);
	return (
		<div >
		<ul className="score-tab">
			<li className='raw'>Winner
				{scores.map((score) => (
				<i key={score.account_id} className="data">
				{score.UsernameWinner}
				</i>
			  ))}
		  	</li>
			<li className='raw'>Loser
				{scores.map((score) => (
				<i key={score.account_id} className="data">
				{score.UsernameLoser}
				</i>
			  ))}
		  	</li>
			<li className='raw'>Score
				{scores.map((score) => (
				<i key={score.account_id} className="data">
				<div className="res-score">
				<i className="score">{score.ScorePlayer1}</i>
				<i className="vl"/>
				<i className="score">{score.ScorePlayer2}</i>
				</div>
				</i>
			  ))}
		  	</li>
		</ul>
		</div>
	  );

}