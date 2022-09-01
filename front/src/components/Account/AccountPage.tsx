
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './AccountPage.css'

const BACK_URL = "http://localhost:4000";


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

	const [selectedFile, setSelectedFile] = useState("");
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event : any) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(isFilePicked === false ? true : false);
	};

	async function handleSubmission()  {

		//console.log("fiiiile", selectedFile);
		//formData.append('file', selectedFile);
		var FormData = require("form-data");
		const formData = new FormData();
		formData.append("file", selectedFile);
  		formData.append("type", "avatar");
		await axios.post(`${BACK_URL}/account/avatar`, formData, {
			withCredentials:true ,
			method: "post",
			headers: {}
		})
			.then(function (response) {
			  //handle success
			  console.log(response);
			  window.location.reload();
			})
			.catch(function (response) {
			  //handle error
			  console.log(response);
			});
	}
	  
	return (
		<div className='change-avatar'>
			<button className='button-upload-avatar' onClick={() =>  props.displayElem === 'none' ? props.clickButton('block') : props.clickButton('none')}>
					<i>Change avatar</i>
			</button>
			<input id='input-file' className="input-file" type='file' accept='.jpg,.jpeg,.png'style={{display:props.displayElem}} onChange={changeHandler} />
			<button className="submit-file" style={{display: (isFilePicked && props.displayElem !== 'none') ? 'block' : 'none'}} onClick={handleSubmission}>Submit</button>
		</div>
	)
}

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



const AccountInfo = () => {

	const [user, getUser] = useState({name : "", username: "", avatar: "", accountUsername:""});

	const [displayChangeAvatar, changeAvatar] = useState('none');

	useEffect(() => {
		axios.get(`${BACK_URL}/account`,  {withCredentials:true }).then((response) => {
			console.log(response.data);
			console.log("resssss", response.data);
			getUser(response.data);
		})
	}, []);

	function getName() : string {
		if (!isJson(user.name))
			return " ";
		const {givenName, familyName} = JSON.parse(user.name);
		return (" " + givenName + " " + familyName);
	 }
	console.log("useer AVATAR", user.avatar);


	return (
		<div>
		<div className='top-line'/>
		<li className='account-info'>
			<ul className='avatar'>
				<img className='avatarImg' src={ BACK_URL + '/account/avatar/' } alt="Avatar"/>
				<ButtonChangeAvatar displayElem={displayChangeAvatar} clickButton={changeAvatar}/>
			</ul>
			<ul className='username'>
				<i className='info-type'>Username</i>
				<i className='info'>{user.accountUsername}</i>
				<ButtonChangeUsername />	
			</ul>
			<ul className='name'>
				<i className='info-type'>Name </i>
				<i className='info'>{getName()}</i>
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