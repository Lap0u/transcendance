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
import { Logout } from './components/Account/LogOut';
import WrongGameId from './components/ErrorPage/wrongGameId';
import { EmailConfirm } from './components/TwoFactorAuth/emailVerify';
import { TwoAuthAutenticatePage } from './components/TwoFactorAuth/Authenticate';
import { ActivateTwoAuth } from './components/TwoFactorAuth/TwoAuthActivate';
import Forrbidden from './components/ErrorPage/Forbidden';
import { ScoresHistory } from './components/Scores/ScoresHistory';
import PublicInfo from './components/Account/PublicAccount';

const BACK_URL = 'http://localhost:4000';

const socket = io(BACK_URL).connect();

function App() {

  return (
    <div id="wholepage">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
		  <Route path = "/account" element={<AccountPage/>} />
		  <Route path = "/logout" element={<Logout/>} />
          <Route path="/chat" element={<Chat socket={socket} />} />
          <Route path="/menu" element={<GameMenu socket={socket} />} />
          <Route
            path="/singleGame/:id"
            element={<SingleGame socket={socket} />}
          />
		  <Route path = "/error403" element={<Disconnected/>} />
		  <Route path = "/error500" element={<InternalError/>} />
		  <Route path = "/wrongGameId" element={<WrongGameId/>} />
		  <Route path = "/login" element={<LoginSuccess/>} />
		  <Route path = "/emailverify" element={<EmailConfirm/>} />
		  <Route path = "/2fa" element={<TwoAuthAutenticatePage/>} />
		  <Route path = "/scores/:id" element={<ScoresHistory/>} />
		  <Route path = "/playerinfo" element={<PublicInfo/>} />
		  <Route path = "/forbidden" element={<Forrbidden/>} />
          {/* If no route match, then return 404 page */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
      {/* <Canvas /> */}
    </div>
  );
}

export default App;
