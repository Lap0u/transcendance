import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import handleErrors from '../RequestErrors/handleErrors';
import { Stats } from '../Scores/Stats';
import './AccountPage.css'

const BACK_URL = "http://localhost:4000";



const Avatar = (props : any) => {


	return(
		<ul className='avatar'>
			<img className='avatarImg' src={ BACK_URL + '/account/avatar/' + props.avatar } alt={props.avatar}/>
		</ul>
	)
}



const  PublicInfo = (props: any) => {

	const [ok, setOk] = useState(false);
	const [user, getUser] = useState({account_id:"", name : "", username: "", avatar: "", accountUsername:"", isTwoFactorAuthenticationEnabled: false, email : null});

	useEffect(() => {
		axios.get(`${BACK_URL}/account/${props.userId}`,  {withCredentials:true })
			.then((response) => {
				getUser(response.data);
				setOk(true);
			})
			.catch((error) => {
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	function isJson(str: string) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}


	return (
		ok ?
		<div className='public-info' style={{display: props.display}}>
			<Avatar avatar={user.avatar}/>
			<ul className='username2'>
				<i> {user.accountUsername}</i>
			</ul>
			<ul className='login' >
				<i className='info-type'>Login42 </i>
				<i className='info'>{user.username} </i>
			</ul>
			<ul className='stats'>
				<Stats id={user.account_id}/>
			</ul>
		</div>
		:null
	)
}

export default PublicInfo;