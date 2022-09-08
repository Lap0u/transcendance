import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import Chat from './components/Chat/Chat';
import Page404 from './components/Page404';
import GameMenu from './components/game_menu/Game_menu';
import SingleGame from './components/game_Display/Single_game';
import { io } from 'socket.io-client';
import AccountPage from './components/Account/AccountPage';
import { LoginSuccess } from './components/Account/LoginSuccess';
import Disconnected from './components/ErrorPage/Disconnected';
import InternalError from './components/ErrorPage/InternalError';

const BACK_URL = 'http://localhost:4000';

const socket = io(BACK_URL).connect();

function App() {
  return (
    <div id="wholepage">
      <BrowserRouter>
        <span style={{ color: 'white' }}>This is single page application</span>
        <Routes>
          <Route path="/" element={<Accueil />} />
		  <Route path = "/account" element={<AccountPage/>} />
          <Route path="/chat" element={<Chat socket={socket} />} />
          <Route path="/menu" element={<GameMenu socket={socket} />} />
          <Route
            path="/singleGame/:id"
            element={<SingleGame socket={socket} />}
          />
		  <Route path = "/error403" element={<Disconnected/>} />
		  <Route path = "/error500" element={<InternalError/>} />
		  <Route path = "/login" element={<LoginSuccess/>} />
          {/* If no route match, then return 404 page */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
      {/* <Canvas /> */}
    </div>
  );
}

export default App;