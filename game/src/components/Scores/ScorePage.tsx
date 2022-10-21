
import { useParams } from "react-router-dom";
import { ClassementTab } from "./Classement";
import { ScoreTab } from "./ScoresHistory";
import { Tabs, Tab, Box } from '@mui/material';
import { useEffect, useState } from "react";
import React from 'react';
import '../Account/PublicAccount.css'
import axios from "axios";
import { BACK_URL } from "../../global";
import handleErrors from "../RequestErrors/handleErrors";
import UserDto from "../utils/UserDto";
import NavigationBarre  from "../Accueil/NavBarre";

export function ScoresPage({currentUser}:{currentUser : typeof UserDto}){
	const params = useParams();
	const id = params.id;
	const [tabIndex, setTabIndex] = useState(0);
	const [ok, setOk] = useState(false);
	const [re, refresh] = useState(id);
	if (id !== re){
		setOk(false);
		refresh(id);
	}

	const handleTabChange = (event :any, newTabIndex: any) => {
	  setTabIndex(newTabIndex);
	};

	const [user, getUser] = useState({...UserDto});
	useEffect(() => {
		axios.get(`${BACK_URL}/account/id/${id}`,  {withCredentials:true })
			.then((response) => {
				setOk(false);
				getUser(response.data);
				setOk(true);
			})
			.catch((error) => {
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [re]);

	return (
		ok?
		<div className='score-page'>
			<NavigationBarre isLoginActive={true}  user={currentUser}/>
			<div className='score-page' >
			<i className='title-scores' style={{fontSize:20, color:'#00000', backgroundColor:'orange', WebkitTextStroke:'0.8px #2d10d3', position:'relative', top: 40}}>SCORE PAGE OF USER {user.accountUsername} </i>
			<Tabs className="box-tab" value={tabIndex} onChange={handleTabChange} centered 
					  sx={{
						backgroundColor:'red',
						position:'relative', top:50,
						'& .MuiTabs-indicator': { backgroundColor: '#5700DE' },
						'& .MuiTab-root': { color: '#5700DE', fontSize:' min(3vw, 15px)'},
					  }}>
				<Tab label="Historique" />
        	  	<Tab label="Leaderboard" />
			</Tabs>
			<Box sx={{ padding: 2,position:'relative', top:50, height:'80vh', backgroundColor:'pink'}}>
        	{tabIndex === 0 && (
        	  <Box >
        	    <ScoreTab user={user} id={id} currentUser={currentUser}/>
        	  </Box>
        	)}
        	{tabIndex === 1 && (
        	  <Box>
        	    <ClassementTab user={user} currentUser={currentUser}/>
        	  </Box>
        	)}
      		</Box>
			</div>
		</div>
		: 
		null
	  );

}