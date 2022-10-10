import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleErrors from "../RequestErrors/handleErrors";
import './TwoFactorAuth.css'
const BACK_URL = "http://localhost:4000";


export function EmailConfirm() {

	const clearInput = useRef("");
	const [code, changeCode] = useState("");
	const nav = useNavigate();

	useEffect(() => {
		axios.get(`${BACK_URL}/2fa/access`, {withCredentials:true })
		.catch(() => {
			window.location.href = 'http://localhost:3000/forbidden';
			return;
		})
	}, []);
	
	async function newCode(e : any) {
		changeCode(e.target.value);
		clearInput.current = e.target.value;
	}

	async function codeForm(e :any) {

		e.preventDefault();
		await axios.post(`${BACK_URL}/2fa/verify`, {code : code}, {
			withCredentials:true ,
			method: "post",
			headers: {"Content-type": "application/json"}
		})
		.then(res => {
			console.log("confirm",res);
			   if (res.data.status === 401) {
					 alert(res.data.message)
				} else {
					alert( "Your account has been verified, two factor authentification activated");
					nav('/')
			   }
		   })
		.catch((error) => {
			handleErrors(error)
		});
		  
	}


	return (
		<div className='two-auth'>
            <h3 className="two-auth-title">Your have to confirm your Email to validate your account</h3>
               <div >
                   <form onSubmit={(e) => codeForm(e)} id="form">
                           <div className="two-auth-info">Please provide the confirmation code you received on your email adress.
						   <br/><input className="two-fa-input-email" type='text' id="code" onChange={(e) => newCode(e)} 
							    value={clearInput.current}/>
								   <button className="confirm-button" type="submit" >Confirm</button>
                           </div>
                   </form>
           </div>
       </div>
	)
}	