import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ClassementTab } from "./Classement";
import { ScoreTab } from "./ScoresHistory";
import { Stats } from "./Stats";
import { Tabs, Tab, Box } from '@mui/material';
import { useState } from "react";
import React from 'react';
import '../Account/PublicAccount.css'


export function ScoresPage(props: any){
	const params = useParams();
	const id= params.id;
	const nav = useNavigate();
	const [tabIndex, setTabIndex] = useState(0);

	const handleTabChange = (event :any, newTabIndex: any) => {
	  setTabIndex(newTabIndex);
	};

	return (
		<div>
			<Button className='home-button' shape="circle" icon={<HomeOutlined />} onClick={() => nav('/')} />
			<div className='score-page' >
			<Tabs className="box-tab" value={tabIndex} onChange={handleTabChange} variant="fullWidth" centered 
					  sx={{
						'& .MuiTabs-indicator': { backgroundColor: '#536dfe' },
						'& .MuiTab-root': { color: '#7986cb', fontSize:' min(3vw, 15px)'},
					  }}>
				<Tab label="My historique" />
        	  	<Tab label="Classement" />
			</Tabs>
			<Box sx={{ padding: 2 }}>
        	{tabIndex === 0 && (
        	  <Box >
        	    <ScoreTab id={id}/>
				<Stats id={id}/>
        	  </Box>
        	)}
        	{tabIndex === 1 && (
        	  <Box>
        	    <ClassementTab/>
        	  </Box>
        	)}
      		</Box>
			</div>
		</div>	
	  );

}