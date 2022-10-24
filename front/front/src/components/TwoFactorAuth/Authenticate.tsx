import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleErrors from "../RequestErrors/handleErrors";

const BACK_URL = "http://localhost:4000";

export function TwoAuthAutenticatePage({userChanged, changeUser}: {userChanged: number, changeUser:any}){
	const nav = useNavigate(); 
	const clearInput = useRef("");
	const [code, changeCode] = useState("");

	useEffect(() => {
		axios.get(`${BACK_URL}/2fa/access`, {withCredentials:true })
		.catch((error) => {
			window.location.href = 'http://localhost:3000/forbidden';
			return;
		})
	}, []);

	async function newCode(e : any) {
		changeCode(e.target.value);
		clearInput.current = e.target.value;
	}

	async function codeForm(e : any, changeUser: any, userChanged: any) {

		e.preventDefault();

		await axios.post(`${BACK_URL}/2fa/authenticate`, {twoFactorAuthenticationCode : code}, {
			withCredentials:true ,
			method: "post",
			headers: {"Content-type": "application/json"}
		})
		.then(res => {
			   if (res.data.status=== 401) {
					 alert(res.data.message)
				} else {
					alert( "Your account has been verified, proceed to the signin page");
					changeUser(userChanged + 1);
					nav("/");
			   }
		   })
		.catch((error) => {
			if (error.code === 'ERR_BAD_REQUEST') {
				alert(error.response.data.message)
			}
			console.log('errroooor', error);
		//	handleErrors(error)
		});
		  
	}

	async function resend(changeUser : any, userChanged :any)
	{
		await axios.get(`${BACK_URL}/2fa/generate`, {
			withCredentials:true ,
		})
		.then(res => {
			changeUser(userChanged + 1);
			alert( "Your account has been verified, proceed to the signin page");
		 })
		.catch((error) => {
			handleErrors(error)
		});
	}




	return (
		<div className='two-auth'>
            <h2 className="two-auth-title">Your have to validate your authentification</h2>
               <div className="card-body">
                   <form  onSubmit={(e) => codeForm(e, changeUser, userChanged)} id="form">
                           <div className="two-auth-info">Please provide the code your reseived on your email adress.
                               <br/><input className="two-fa-input-email" type="text" id="code" onChange={(e) => newCode(e)} 
							    value={clearInput.current}/>
								 <button className="confirm-button" type="submit" >Confirm</button>
                           </div>
                   </form>
			   <div className='resend'>
				   <i >If you did not receive any code click here to resend mail (this might take few minuts to receive the mail, don't forget to check your spam)   </i>
                   <button className="btn btn--radius-2 btn--blue-2" type="submit" onClick={() => resend(changeUser, userChanged)} >Resend</button>
               </div>
           </div>
       </div>
	)
}		