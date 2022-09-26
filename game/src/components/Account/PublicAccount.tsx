import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleErrors from '../RequestErrors/handleErrors';
import { Stats } from '../Scores/Stats';
import './AccountPage.css'

const BACK_URL = "http://localhost:4000";
const FRONT_URL = "http://localhost:3000";



const Avatar = (props : any) => {
	console.log("avataaaaar", BACK_URL + 'account/avatar/' + props.avatar);


	return(
		<ul className='avatar'>
			<img className='avatarImg' src={ BACK_URL + '/account/avatar/' + props.avatar } alt={props.avatar}/>
		</ul>
	)
}

const UserName = (props : any) => {

	return (
	<ul className='username'>
		<i className='info-type'>Username</i>
		<i className='info'> {props.username}</i>
	</ul>
	)
}


const  PublicInfo = (props: any) => {

	const [ok, setOk] = useState(false);
	const [user, getUser] = useState({name : "", username: "", avatar: "", accountUsername:"", isTwoFactorAuthenticationEnabled: false, email : null});

	useEffect(() => {
		axios.get(`${BACK_URL}/account/${props.userId}`,  {withCredentials:true })
			.then((response) => {
				console.log(response.data);
				console.log("resssss", response.data);
				getUser(response.data);
				setOk(true);
			})
			.catch((error) => {
				//console.log("eerrroor", error);
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

	function getName() : string {
		if (!isJson(user.name))
			return " ";
		const {givenName, familyName} = JSON.parse(user.name);
		return (" " + givenName + " " + familyName);
	 }
	console.log("useer AVATAR", user.avatar);


	return (
		ok ?
		<div style={{display: props.display}}>
		<div className='top-line'/>
		<li className='account-info'>
			<Avatar avatar={user.avatar}/>
			<UserName username={user.username}/>
			<ul className='name'>
				<i className='info-type'>Name </i>
				<i className='info'>{getName()}</i>
			</ul>
			<ul className='login' >
				<i className='info-type'>Login </i>
				<i className='info'>{user.username} </i>
			</ul>
			<Stats id="e"/>
		</li>
		<div className='bottom-line'/>
		</div>
		:null
	)
}

export default PublicInfo;