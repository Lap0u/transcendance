import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import handleErrors from "../RequestErrors/handleErrors";
import './ScoresHistory.css'
import {useParams} from 'react-router-dom';
import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";

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

export function ScoresHistory(props: any){
	const params = useParams();
	const [scores, getScores] = useState(ScoresDto);
	const [stats, getStats] = useState({gameWon: 0, gameLost: 0});
	const id= params.id;
	const nav = useNavigate();

	console.log("quesry iddd", id);
	useEffect(() => {
		axios.get(`${BACK_URL}/scores/history/${id}`,  {withCredentials:true })
			.then((response) => {
				getScores(response.data);
			})
			.catch((error) => {
				handleErrors(error)
			})
			axios.get(`${BACK_URL}/scores/stats/${id}`,  {withCredentials:true })
			.then((response) => {
				getStats(response.data);
			})
			.catch((error) => {
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log("scroresss", scores);
	return (
		<div>
		<Button className='home-button' shape="circle" icon={<HomeOutlined />} onClick={() => nav('/')} />
		<div className='score-page' >
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
		<div className='stats'>
			<i>Game won: {stats.gameWon} </i>
			<i>| Game lost: {stats.gameLost}</i>
		</div>
		</div>
		</div>
	  );

}

