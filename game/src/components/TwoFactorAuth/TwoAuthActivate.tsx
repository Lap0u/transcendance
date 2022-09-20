import axios from "axios";
import { useRef } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import handleErrors from "../RequestErrors/handleErrors";

const BACK_URL = "http://localhost:4000";


export function ActivateTwoAuth(props: any){

	const [email, setEmail] = useState("");
	const clearInput = useRef("");
	const nav = useNavigate();

	async function newEmail(e : any) {
		setEmail(e.target.value);
		clearInput.current = e.target.value;
	}

	async function SaveEmail() {

		await axios.post(`${BACK_URL}/2fa/saveemail`, {email : email}, {
			withCredentials:true ,
			method: "post",
			headers: {"Content-type": "application/json"}
		})
		.then(res => {
			console.log("reffr", res)
			   if (res.data.status === 400) {
					 alert(res.data.message)
				} else {
					nav("/emailverify");
			   }
		   })
		.catch((error) => {
			handleErrors(error)
		});
		  
	}

	return(
		<div>
			<p> Please provid your email adress </p>
			<form method="POST" id="form">
                 <div className="two-auth-email">
                    <input className="input-email" type="email" id="code" onChange={(e) => newEmail(e)} 
						 value={clearInput.current}/>
                 </div>
            </form>
            <button className="save-email-button" type="submit" onClick={() => SaveEmail()}>Confirm</button>
			<button className="cancel-button" onClick={() => props.display("none")} >Cancel</button>
		</div>
	)
}