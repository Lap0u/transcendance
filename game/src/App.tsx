import React, { useEffect, useState } from 'react';
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
import Forrbidden from './components/ErrorPage/Forbidden';
import PublicInfo from './components/Account/PublicAccount';
import { ScoresPage } from './components/Scores/ScorePage';
import CustomMenu from './components/Custom_game_menu/CustomMenu';

const BACK_URL = 'http://localhost:4000';

const socket = io(BACK_URL).connect();

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      const receiveMessage = `inviteGame:${currentUser.id}`;
      socket.on(receiveMessage, (message: any) => {
        console.log(`${message.senderId} invite you to play game`);
      });

      return () => {
        socket.off(receiveMessage);
      };
    }
  }, [currentUser]);

  return (
    <div id="wholepage">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/chat"
            element={
              <Chat
                socket={socket}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="/menu" element={<GameMenu socket={socket} />} />
		  <Route path='/custom_game' element={<CustomMenu socket={socket} />} />
          <Route
            path="/singleGame/:id"
            element={<SingleGame socket={socket} />}
          />
          <Route path="/error403" element={<Disconnected />} />
          <Route path="/error500" element={<InternalError />} />
          <Route path="/wrongGameId" element={<WrongGameId />} />
          <Route path="/login" element={<LoginSuccess />} />
          <Route path="/emailverify" element={<EmailConfirm />} />
          <Route path="/2fa" element={<TwoAuthAutenticatePage />} />
          <Route path="/scores/:id" element={<ScoresPage />} />
          <Route path="/playerinfo" element={<PublicInfo />} />
          <Route path="/forbidden" element={<Forrbidden />} />
          {/* If no route match, then return 404 page */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
      {/* <Canvas /> */}
    </div>
  );
}

export default App;
