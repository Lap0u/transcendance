import { Avatar, Popover, Typography } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { BACK_URL } from '../../global';
import axios from 'axios';
import { useEffect } from 'react';
import handleErrors from '../RequestErrors/handleErrors';
import { FontColorsOutlined, HomeOutlined } from '@ant-design/icons';
import UserDto, { TypeUserDto } from '../utils/UserDto';
import { Menu } from 'antd';
import { Stats } from '../Scores/Stats';
import { useState } from "react";
import { UseAutocompleteProps } from "@mui/material";
import UserPopover from "../utils/UserPopover";
import zIndex from "@mui/material/styles/zIndex";

function NavigationBarre({
	user,
	isLoginActive = true,
  }: {
	user: typeof UserDto;
	isLoginActive: any;
  }) {

	const [isVisible, setIsVisible] = useState(false);
	  const subMenu = [
		{
			style:{ height: '300px'},
			title:"Stats",
			className:"sub-info",
			key:"points",
			label:
			<div className='info'>
				<div className='stats'>
				<p>{user.points} points</p>
				<Stats id={user.account_id} tabFormat={0} />
				<p>rank: {user.rank}</p>
				</div>
					<FriendListPopover currentUser={user} isVisible={isVisible} setIsVisible={setIsVisible}></FriendListPopover>
				<p className="onglet-nav">
					<Link to="/logout">Logout</Link>
				</p>
			</div>
		}
	  ]

	  const menuItems = [
	  {
		  key: 'home',
		  style:{width:'13vw'},
		  icon: <HomeOutlined className="home-button" shape="circle"onClick={() => nav('/')}/>,
	  },
	  {
		  style:{width:'22vw'},
		  key: 'profil',
		  label: <Link  className="onglet-nav"  to="/account">Profil</Link>
	  },
	  {
		  style:{width:'22vw'},
		  key: 'chat',
		  label:  <Link className="onglet-nav" to="/chat">Chat </Link>
	  },
	  {
		  style:{width:'22vw'},
		  key: 'scores',
		  label: <Link className="onglet-nav" to={`/scores/${user.account_id}`}>Scores</Link>
	  },
	  {
		  key:"user-info",
		  style:{},
		  icon: <NavAvatar user={user}/>,
		  className: 'user-nav',
		  label: "   " + user.accountUsername,
		  children : subMenu
	  }
  ];
  
	const nav = useNavigate();
	if (!user) return null;
	return (
		isLoginActive ? (
		  <Menu  items={menuItems} style={{ width:'100vw',border:'none', position:'relative'}} mode="horizontal" className='nav-barre'>
			</Menu>
		) : null
	);
  }
  
  function NavAvatar({user}: {user: typeof UserDto}){
	  return(
		  <Avatar
		  className="nav-barre-avatar"
		  src={BACK_URL + '/account/avatar/' + user.avatar}
			 alt="avatar"
		  />
	  )
}


function FriendList({currentUser}: {currentUser: TypeUserDto}){
	const list : Array<TypeUserDto> = [];
	const [friendList, getFriendList] = useState(list);
	const [ok, setOk] = useState(false);
	useEffect(() => {
		axios.get(`${BACK_URL}/account/friendList`,  {withCredentials:true })
			.then((response) => {
				console.log("scoooores", response)
				getFriendList(response.data);
				setOk(true);
			})
			.catch((error) => {
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		ok?
		<div  className='friends'>
		<ul >
		{friendList.map((friend) => (
		<i><UserPopover key={friend.account_id}  currentUser={currentUser} user={friend} avatarOrUsername={'username'}/><br/></i>
		))}
		</ul>
		{friendList.length === 0? 
		<p>No friends yet</p> :
		null}
		</div>
		: null
	)
}
function FriendListPopover({currentUser, isVisible, setIsVisible}: {currentUser: TypeUserDto, isVisible: boolean, setIsVisible: any}){
	return (
		<Popover
      className="friend-list"
	  overlayClassName='friend-list-popover'
      onVisibleChange={(isVisible) => setIsVisible(isVisible)}
      visible={isVisible}
      placement="left"
      content={<FriendList currentUser={currentUser}/>}
      title={<div className='title'> Friends</div>}
      trigger="hover"
	  zIndex ={3}
	  color= '#1D1640'
	  overlayInnerStyle={{border:'none', width: '15vw', margin: 0,padding: 0}}
      overlayStyle={{border:'none'}}>
		<div className="onglet-nav">
			Friend List
		</div>
    </Popover>
	)
}

export default NavigationBarre;