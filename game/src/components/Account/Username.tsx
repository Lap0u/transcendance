import { useState } from "react";
import PublicInfo, { ClickPlayerMsg } from "./PublicAccount";
import './PublicAccount.css'

export function UsernameInterface(props: any){
	const [clickProfile, dispayClickProfile] = useState({display : "none", mouseX: 0, mouseY: 0})
  	const [profile, displayProfile] = useState("none");
	  console.log("userddd iddd", props.userId);

	  function clearDisplay(){
		dispayClickProfile({display:"none", mouseX: 0, mouseY:0});
		displayProfile('none');
	  }
	return (
		<div className='username-interface'
		onMouseEnter={(e) => dispayClickProfile({display:"block", mouseX: e.pageX, mouseY:e.pageY})}
		/*onMouseLeave={() => clearDisplay()} */
		onClick={()=> displayProfile(profile === "block"? "none" : "block")}>
		<i className="account-username">{props.username}</i>
		<ClickPlayerMsg clickProfile={clickProfile}/>
		<PublicInfo userId={props.userId} display={profile}/>
		</div>
	)
}