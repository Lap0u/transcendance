import { useState } from "react";
import PublicInfo, { ClickPlayerMsg } from "./PublicAccount";
import './PublicAccount.css'

export function Username(props: any){
	const [clickProfile, dispayClickProfile] = useState({display : "none", mouseX: 0, mouseY: 0})
  	const [profile, dispayProfile] = useState("none");
	  console.log("userddd iddd", props.userId);
	return (
		<div className='username-interface'
		onMouseEnter={(e) => dispayClickProfile({display:"block", mouseX: e.pageX, mouseY:e.pageY})}
		onMouseLeave={() =>dispayClickProfile({display:"none", mouseX: 0, mouseY:0})} 
		onClick={()=> dispayProfile("block")}>
		{props.username}
		<ClickPlayerMsg clickProfile={clickProfile}/>
		<PublicInfo userId={props.userId} display={profile}/>
		</div>
	)
}