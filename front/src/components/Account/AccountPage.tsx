
import axios from 'axios';
import { promises } from 'fs';
import { async } from 'q';
import { useEffect } from 'react';
import { useState } from 'react';
import { array, number } from 'yargs';
import './AccountPage.css'
import loup from './avatar/loup.png'

const BACK_URL = "http://localhost:4000";

type user ={
	name:string;
	username:string;
	avatar:string;
}


interface PropDiplayWhenClick {
	displayElem: any;
	clickButton : any;
}

function updateUsername(e : any) {
	return;
}

function ButtonChangeUsername() {

	return (
		<div className='change-username'>
		<button className='button-change-username' onClick={(e) => updateUsername(e)}>
			<i>Change username</i>
		</button>
			<input className="input-text" type='text' ></input>
		</div>
	  );
}

function ButtonChangeAvatar(props: PropDiplayWhenClick) {

	return (
		<div>
		<button className='button-upload-avatar' onClick={() => props.displayElem === 'none' ? props.clickButton('block') : props.clickButton('none')}>
			<i>Change avatar...</i>
		</button>
		<input className="input-file" type='file' accept='.jpg,.jpeg,.png' style={{display:props.displayElem}}></input>
		</div>
	  );
}



const AccountInfo = () => {
	const [user, getUser] = useState({name : "", username: "", avatar: ""});
	const [displayChangeAvatar, changeAvatar] = useState('none');
	
	useEffect(() => {
		axios.get(`${BACK_URL}/account`,  {withCredentials:true }).then((response) => {
			getUser(response.data);
		});
	}, []);
	const fullName : string = user.name;
	const {givenName, familyName} = JSON.parse(fullName);
	console.log(user);
	return (
		<div>
		<div className='top-line'/>
		<li className='account-info'>
			<ul className='avatar'>
				<img className='avatarImg' src={loup} alt="Avatar"/>
				<ButtonChangeAvatar displayElem={displayChangeAvatar} clickButton={changeAvatar}/>
			</ul>
			<ul className='username'>
				<i className='info-type'>Username</i>
				<i className='info'>{user.username}</i>
				<ButtonChangeUsername />	
			</ul>
			<ul className='name'>
				<i className='info-type'>Name </i>
				<i className='info'>{givenName} {familyName} </i>
			</ul>
			<ul className='login' >
				<i className='info-type'>Login </i>
				<i className='info'>{user.username} </i>
			</ul>
		</li>
		<div className='bottom-line'/>
		</div>
	)
}
const AccountPage = () => {
	return (
		<div className='account-page'>
			<AccountInfo/>
			
		</div>
	);
}

export default AccountPage;