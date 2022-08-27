

import React from 'react';
import './AccountPage.css'
import loup from './avatar/loup.png'



const ButtonChangeAvatar = () => {
	
	return (
		<div>
		<i className='info'>
			<img className='avatarImg' src={loup} alt="Avatar"/>
		</i>
		<button className='button-upload-avatar'>
			<i>Change avatar...</i>
		</button>
		<input type='file' style={{display:'none'}}></input>
		</div>
	  );
}

const AccountInfo = () => {
	return (
		<div>
		<div className='top-line'/>
		<li className='account-info'>
			<ul className='name'>
				<i className='info-type'>name </i>
				<i className='info'>elisa A </i>
			</ul>
			<ul className='login' >
				<i className='info-type'>login </i>
				<i className='info'>eazenag </i>
			</ul>
			<ul className='username'>
				<i className='info-type'>username </i>
				<i className='info'>eli </i>
				<button className='button-change-username'> Change username</button>
			</ul>
			<ul className='avatar'>
				<i className='info-type'>avatar </i>
				<ButtonChangeAvatar/>
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
