
import { render } from '@testing-library/react';
import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './AccountPage.css'

const BACK_URL = "http://localhost:4000";



function ButtonChangeUsername(props : any) {
	const clearInput = useRef("");
	const [username, changeUsername] = useState("");

	async function newUsername(e : any) {
		changeUsername(e.target.value);
		clearInput.current = e.target.value;
	}
	async function updateUsername() {
		console.log("uuusernaaaame", username);
			await axios.post(`${BACK_URL}/account/username/`, {newUsername :username}, {
				withCredentials:true ,
				method: "post",
				headers: {}
			})
			.then(function (response) {
			  //handle success
			  console.log("okkkkkk");
				props.refresh(username);
				clearInput.current = "";
			})
			.catch(function (response) {
			  //handle error
			  console.log(response);
			});
	}



	  
	return (
		<div className='change-username'>
		<button className='button-change-username' onClick={() => updateUsername()}>
			<i>Change username</i>
		</button>
			<input className="input-text" type='text'onChange={(e) => newUsername(e)} value={clearInput.current}></input>
		</div>
	  );
}

function ButtonChangeAvatar(props : any) {
	const [displayElem, clickButton] = useState('none');
	const [selectedFile, setSelectedFile] = useState("");
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event : any) => {
		setSelectedFile(event.target.files[0]);
		console.log("eveeent", event.target.value);
		setIsFilePicked(event.target.value !== "" ? true : false);
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
			  clickButton('none');
			  props.refresh(props.avatar + 1);
			})
			.catch(function (response) {
			  //handle error
			  console.log(response);
			});
	}
	  
	return (
		<div className='change-avatar'>
			<button className='button-upload-avatar' onClick={() =>  displayElem === 'none' ? clickButton('block') : clickButton('none')}>
					<i>Change avatar</i>
			</button>
			<input id='input-file' className="input-file" type='file' accept='.jpg,.jpeg,.png' style={{display:displayElem}} onChange={(e) => changeHandler(e)} />
			<button className="submit-file" style={{display: (isFilePicked && displayElem !== 'none') ? 'block' : 'none'}} onClick={handleSubmission}>Submit</button>
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
const Avatar = (props : any) => {
	console.log("avataaaaar", BACK_URL + 'account/avatar/v' + props.avatar);

	return(
		<ul className='avatar'>
			<img className='avatarImg' src={ BACK_URL + '/account/avatar/v' + props.avatar } alt={props.avatar}/>
			<ButtonChangeAvatar refresh={props.updateAvatar} avatar={props.avatar}/>
		</ul>
	)
}

const UserName = (props : any) => {

	return (
	<ul className='username'>
		<i className='info-type'>Username</i>
		<i className='info'> {props.username}</i>
		<ButtonChangeUsername refresh={props.updateUsername} />	
	</ul>
	)
}

const AccountInfo = () => {

	const [user, getUser] = useState({name : "", username: "", avatar: "", accountUsername:""});
	const [username,  updateUsername] = useState('');
	const [avatar, updateAvatar] = useState(0);

	useEffect(() => {
		axios.get(`${BACK_URL}/account`,  {withCredentials:true }).then((response) => {
			console.log(response.data);
			console.log("resssss", response.data);
			getUser(response.data);
		})
	}, []);

	useEffect(() => { updateUsername(user.accountUsername) }, [user]);

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
			<Avatar avatar={avatar} updateAvatar={updateAvatar}/>
			<UserName username={username} updateUsername={updateUsername}/>
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