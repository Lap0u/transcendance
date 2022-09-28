import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import handleErrors from "../RequestErrors/handleErrors";
import './ScoresHistory.css'
import {useParams} from 'react-router-dom';
import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Stats } from "./Stats";

const BACK_URL = "http://localhost:4000";

const ScoresDto = [{
	key: "",
	idWinner: "",
	idLoser: "",
	UsernameWinner: "",
	UsernameLoser: "",
	ScorePlayer1: null,
	ScorePlayer2: null
  }];


export function ScoreTab(props: any){

	const [scores, getScores] = useState(ScoresDto);
	const [scoreLen, getScoreLen] = useState(0);
	const [ok, setOk] = useState(false);
	useEffect(() => {
		axios.get(`${BACK_URL}/scores/history/${props.id}`,  {withCredentials:true })
			.then((response) => {
				console.log("scooroe", response.data);
				getScores(response.data);
				getScoreLen(response.data.length);
				setOk(true);
			})
			.catch((error) => {
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return(
		ok && scoreLen?
	<div className='tab'>
	<ul className="score-tab">
	<li className='raw'> Winner 
		{scores.map((score) => (
		<i key={score.key} className="data">
		{score.UsernameWinner}
		</i>
	  ))}
	  </li>
	<li className='raw'> Loser
		{scores.map((score) => (
		<i key={score.key} className="data">
		{score.UsernameLoser}
		</i>
	  ))}
	  </li>
	<li className='raw'> Score
		{scores.map((score) => (
		<i key={score.key} className="data">
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
		: 
	<div >No score yet</div>
	)
}

