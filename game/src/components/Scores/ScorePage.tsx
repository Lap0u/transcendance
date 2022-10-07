import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ClassementTab } from "./Classement";
import { ScoreTab } from "./ScoresHistory";
import { Stats } from "./Stats";
import { Tabs, Tab, Box } from '@mui/material';
import { useEffect, useState } from "react";
import React from 'react';
import '../Account/PublicAccount.css'
import axios from "axios";
import { BACK_URL } from "../../global";
import handleErrors from "../RequestErrors/handleErrors";
import UserDto from "../utils/UserDto";
import { NavigationBarre } from "../Accueil/Accueil";

export function ScoresPage({currentUser}:{currentUser : typeof UserDto}){
	const params = useParams();
	const id= params.id;
	const nav = useNavigate();
	const [tabIndex, setTabIndex] = useState(0);
	const [ok, setOk] = useState(false);
	const handleTabChange = (event :any, newTabIndex: any) => {
	  setTabIndex(newTabIndex);
	};

	const [user, getUser] = useState({...UserDto});
	useEffect(() => {
		axios.get(`${BACK_URL}/account/id/${id}`,  {withCredentials:true })
			.then((response) => {
				getUser(response.data);
				setOk(true);
			})
			.catch((error) => {
				handleErrors(error)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		ok?
		<div className='score-page'>
			<NavigationBarre isLoginActive={true}  user={currentUser}/>
			<div className='score-page' >
			<i className='title-scores' style={{fontSize:20, color:'#00000', WebkitTextStroke:'0.8px #2d10d3', position:'relative', top: 40}}>SCORE PAGE OF USER {user.accountUsername} </i>
			<Tabs className="box-tab" value={tabIndex} onChange={handleTabChange} variant="fullWidth" centered 
					  sx={{
						position:'relative', top:50,
						'& .MuiTabs-indicator': { backgroundColor: '#5700DE' },
						'& .MuiTab-root': { color: '#5700DE', fontSize:' min(3vw, 15px)'},
					  }}>
				<Tab label="Historique" />
        	  	<Tab label="Leaderboard" />
			</Tabs>
			<Box sx={{ padding: 2,position:'relative', top:50, height:'100vh'}}>
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