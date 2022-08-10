import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil.tsx';
import Chat from './components/Chat/Chat.tsx';
import MainPage from './components/Mainpage/MainPage.tsx';
import Canvas from './components/Canvas.tsx';
import Page404 from './components/Page404.tsx';
// import Canvas from './components/Canvas.tsx'

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
				{/* If no route match, then return 404 page */}
				<Route path="*" element={<Page404 />} />
			</Routes>
		</BrowserRouter>
		{/* <Canvas /> */}
	</div>
  );
}

export default App;
