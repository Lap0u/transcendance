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



const  PublicInfo = (props: any) => {

	const [ok, setOk] = useState(false);
	const [user, getUser] = useState({account_id:"", name : "", username: "", avatar: "", accountUsername:"", isTwoFactorAuthenticationEnabled: false, email : null});

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


	return (
		ok ?
		<div style={{display: props.display}}>
		<div className='top-line'/>
		<li className='public-info'>
			<Avatar avatar={user.avatar}/>
			<ul className='public-username'>
				<i> {user.accountUsername}</i>
			</ul>
			<ul className='login' >
				<i className='info-type'>Login </i>
				<i className='info'>{user.username} </i>
			</ul>
			<ul className='stats'>
				<Stats id={user.account_id}/>
			</ul>
		</li>
		<div className='bottom-line'/>
		</div>
		:null
	)
}

export function ClickPlayerMsg(props: any){
	console.log("mouseX", props.clickProfile.mouseX);
	console.log("mouseY", props.clickProfile.mouseY);
	return (
		<div className="click-profile" style={{display: props.clickProfile.display, /*"top": props.clickProfile.mouseY + "px", "left": props.clickProfile.mouseX + "px"*/}}>Click to see the player profil</div>
	)
}

export default PublicInfo;