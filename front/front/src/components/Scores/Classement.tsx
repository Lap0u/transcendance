import axios from 'axios';
import { useEffect, useState } from 'react';
import handleErrors from '../RequestErrors/handleErrors';
import { Stats } from './Stats';
import './ScoresHistory.css';
import UserPopover from '../utils/UserPopover';
import { useNavigate } from 'react-router-dom';

const BACK_URL = 'http://localhost:4000';

const UserDto = [
  {
    account_id: '',
    id: '',
    username: '',
    name: '',
    accountUsername: '',
    isTwoFactorAuthenticationEnabled: '',
    authConfirmToken: '',
    isVerified: '',
    twoFactorAuthenticationSecret: '',
    email: '',
    avatar: '',
    points: '',
	rank: '',
	status: undefined,
  },
];

export function ClassementTab(props: any) {
  const [Classement, getClassement] = useState(UserDto);
  const [classementLen, getClassementLen] = useState(0);
  const [ok, setOk] = useState(false);
  const user=props.user;
  const currentUser=props.currentUser;
	const nav = useNavigate();
	
	useEffect(() => {
		axios.get(`${BACK_URL}/scores/classement`,  {withCredentials:true })
			.then((response) => {
				getClassement(response.data);
				getClassementLen(response.data.length);
					setOk(true);
				})
			.catch((error) => {
				handleErrors(error, nav)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return(
		ok && classementLen?
	<div className='tab'>
		<ul className="score-tab">
		<li className='raw' > Username 
		{Classement.map((classement) => (
		<i key={classement.account_id} className="data">
		{classement.account_id !== currentUser.account_id ?
		<UserPopover currentUser={currentUser} user={classement} avatarOrUsername={'username'}/>
		:
		<i style={{color: '#610b43'}}>{currentUser.accountUsername}</i>
		}
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
		<Stats id={classement.account_id} tabFormat={1}/>
		</i>
	  ))}
		</li>
	</ul>
	</div>
		: 
	<div>No score yet</div>
	)
}
