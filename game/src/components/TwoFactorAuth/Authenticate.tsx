import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleErrors from "../RequestErrors/handleErrors";

const BACK_URL = "http://localhost:4000";
const FRONT_URL = "http://localhost:3000";

export function TwoAuthAutenticatePage(){
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

	async function codeForm() {

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

	async function resend()
	{
		await axios.get(`${BACK_URL}/2fa/generate`, {
			withCredentials:true ,
		})
		.then(res => {
			console.log(res);
			alert( "Your account has been verified, proceed to the signin page");
		 })
		.catch((error) => {
			handleErrors(error)
		});
	}




	return (
		<div>
            <h2 className="title">A code has been send to your email adress, please provide the code you received to authenticate</h2>
               <div className="card-body">
                   <form method="POST" id="form">
                           <div className="name">Code
                               <input className="input--style-6" type="text" id="code" onChange={(e) => newCode(e)} 
							    value={clearInput.current}/>
                           </div>
                   </form>
               <div >
                   <button className="btn btn--radius-2 btn--blue-2" type="submit" onClick={() => codeForm()} >Confirm</button>
               </div>
			   <div>
				   <p>If you did not receive any cide click here to resend mail (this might take few minuts to receive the mail, don't forget to check your spam)</p>
                   <button className="btn btn--radius-2 btn--blue-2" type="submit" onClick={() => resend()} >Resend</button>
               </div>
           </div>
       </div>
	)
}		