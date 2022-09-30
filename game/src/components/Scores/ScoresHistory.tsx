import axios from "axios";
import { useEffect, useState } from "react";
import { UserPopover }  from "../utils/UserPopover";
import handleErrors from "../RequestErrors/handleErrors";
import './ScoresHistory.css';


const BACK_URL = 'http://localhost:4000';

const UserDto = {
	account_id:"",
	id: "",
	username: "",
	name: "",
	accountUsername: "",
	isTwoFactorAuthenticationEnabled: "",
	authConfirmToken: "",
	isVerified: "",
	twoFactorAuthenticationSecret: "",
	email: "",
	avatar: "",
	points: "",
  };



const ScoresDto = [
  {
    key: '',
    idWinner: '',
    idLoser: '',
    winner: { ...UserDto },
    loser: { ...UserDto },
    ScorePlayer1: null,
    ScorePlayer2: null,
	date: undefined,
  },
];

export function ScoreTab(props: any) {

	const [scores, getScores] = useState(ScoresDto);
	const [scoreLen, getScoreLen] = useState(0);
	const [ok, setOk] = useState(false);
	const [user, getUser] = useState({account_id:"", name : "", username: "", avatar: "", accountUsername:"", isTwoFactorAuthenticationEnabled: false, email : null});

	useEffect(() => {
		axios.get(`${BACK_URL}/account`,  {withCredentials:true })
			.then((response) => {
				getUser(response.data);
				setOk(true);
			})
			.catch((error) => {
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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

	function getDate(date:any){
		const newdate = new Date(date);
		const dateString = newdate.toString();
		return dateString.substring(0, dateString.indexOf('GMT'));
	}

	return(
		ok && scoreLen?
	<div className='tab'>
	<ul className="score-tab">
	<li className='raw'> Winner 
		{scores.map((score) => (
		<i key={score.key} className="data">
		{score.idWinner !== user.account_id ?
		<UserPopover currentUser={user} user={score.winner} avatarOrUsername={'username'}/>
		:
		<i>{user.accountUsername}</i>
		}
		</i>
	  ))}
	  </li>
	<li className='raw'> Loser
		{scores.map((score) => (
		<i key={score.key} className="data">
		{score.idLoser !== user.account_id ?
		<UserPopover currentUser={user} user={score.loser} avatarOrUsername={'username'}/>
		:
		<i>{user.accountUsername}</i>
		}
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
	<li className='raw'> Date
		{scores.map((score) => (
		<i key={score.key} className="data">
		{getDate(score.date)}
		</i>
	  ))}
	  </li>
	</ul>
	</div>
		: 
	<div >No score yet</div>
	)
}
