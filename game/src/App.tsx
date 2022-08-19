import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/Mainpage/MainPage';
import Accueil from './components/Accueil';
import Chat from './components/Chat/Chat';
import Page404 from './components/Page404';
import Canvas from './components/Canvas'
import GameMenu from './components/game_menu/Game_menu';
import SingleGame from './components/game_Display/Single_game';

function App() {
  return (
	<div id="wholepage">
		<BrowserRouter>
			<span style={{ color: 'white' }}>This is single page application</span>
			<Routes>
				<Route path="/" element={<Accueil />} />
				<Route path="/home" element={<MainPage />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/game" element={<Canvas />} />
				<Route path="/menu" element={<GameMenu />} />
				<Route path="/singleGame" element={<SingleGame gameId={"random"} />} />
				{/* If no route match, then return 404 page */}
				<Route path="*" element={<Page404 />} />
			</Routes>
		</BrowserRouter>
		{/* <Canvas /> */}
	</div>
  );
}

export default App;
