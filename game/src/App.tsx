import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import Chat from './components/Chat/Chat';
import Page404 from './components/Page404';
import GameMenu from './components/game_menu/Game_menu';
import SingleGame from './components/game_Display/Single_game';
import { io } from 'socket.io-client';

const BACK_URL = "http://localhost:4000";

const socket = io(BACK_URL).connect();

function App() {
  return (
	<div id="wholepage">
		<BrowserRouter>
			<span style={{ color: 'white' }}>This is single page application</span>
			<Routes>
				<Route path="/" element={<Accueil />} />
				<Route path="/chat" element={<Chat socket={socket}/>} />
				<Route path="/menu" element={<GameMenu socket={socket}/>} />
				<Route path="/singleGame/:id" element={<SingleGame socket={socket}/>} />
				{/* If no route match, then return 404 page */}
				<Route path="*" element={<Page404 />} />
			</Routes>
		</BrowserRouter>
		{/* <Canvas /> */}
	</div>
  );
}

export default App;
