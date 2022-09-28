import axios from "axios";
import { useEffect, useState } from "react";
import handleErrors from "../RequestErrors/handleErrors";
import { Stats } from "./Stats";
import './ScoresHistory.css'
import PublicInfo, { ClickPlayerMsg } from "../Account/PublicAccount";
import {UsernameInterface} from "../Account/Username";

const BACK_URL = "http://localhost:4000";

const ScoresDto = [{
	account_id: "",
	id: "",
	accountUsername: "",
	points: 0,
  }];

export function ClassementTab(props: any){

	const [Classement, getClassement] = useState(ScoresDto);
	const [classementLen, getClassementLen] = useState(0);
	const [ok, setOk] = useState(false);

	useEffect(() => {
		axios.get(`${BACK_URL}/scores/classement`,  {withCredentials:true })
			.then((response) => {
				getClassement(response.data);
				getClassementLen(response.data.length);
				setOk(true);
			})
			.catch((error) => {
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return(
		ok && classementLen?
	<div className='tab'>
	<ul className="classement-tab">
		<li className='raw' > Username 
		{Classement.map((classement) => (
		<i key={classement.account_id} className="data">
			<UsernameInterface username={classement.accountUsername} userId={classement.id}/>
		</i>
	  ))}
		</li>
		<li className='raw'> Points
		{Classement.map((classement) => (
		<i key={classement.account_id} className="data">
		{classement.points}
		</i>
	  ))}
	  	</li>
		<li className='raw'> Stats
	{Classement.map((classement) => (
		<i key={classement.account_id} className="data">
		<Stats id={classement.account_id}/>
		</i>
	  ))}
		</li>
	</ul>
	</div>
		: 
	<div>No score yet</div>
	)
}