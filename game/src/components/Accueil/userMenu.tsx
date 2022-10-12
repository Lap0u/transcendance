import { Popover, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stats } from "../Scores/Stats";
import UserDto from "../utils/UserDto";

function UserMenu({user} : {user : typeof UserDto}){
	const nav = useNavigate();

	const [isVisible, setIsVisible] = useState(false);

	const content = () =>{
		return 'ok';
	}
	return (
		<Popover
		className='user-popover'
		  onVisibleChange={(isVisible) => setIsVisible(isVisible)}
		  visible={true}
		  placement="right"
		  content={content}
		  title={<ProfileTitle user={user}/>}
		  trigger="click"
		  overlayStyle={{width: "170px", textAlign:'center'}}>
		</Popover>
	  );
	};
	
	function ProfileTitle({user}: {user: any}){
		return (
		<Typography className='popover-title' style={{ width: '100%'}}>
		<figure>
			<div className='info'>
			<i>{user.points} points</i>
			<i><Stats id={user.account_id} tabFormat={0}/></i>
			<i>rank: {user.rank}</i>
			</div>
		</figure>
		</Typography>
		)
	}
		

export default UserMenu;