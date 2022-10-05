import { useEffect, useState } from 'react';
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
import InviteGameModal from './components/utils/InviteGameModal';
import axios from 'axios';
import { message } from 'antd';
import UserDto from './components/utils/UserDto';

const BACK_URL = 'http://localhost:4000';

const socket = io(BACK_URL).connect();

function App() {
  const [currentUser, setCurrentUser] = useState({ ...UserDto });
  const [isInviteGameModalOpen, setIsInviteGameModalOpen] = useState(false);
  const [invitor, setInvitor] = useState<string>('');

  useEffect(() => {
    axios
      .get(`${BACK_URL}/account`, {
        withCredentials: true,
      })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch(async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          message.error("Vous n'etes pas connecté");
        } else {
          return <InternalError />;
        }
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userUpdate = `userUpdate:${currentUser.id}`;
      const receiveInviteGame = `inviteGame:${currentUser.id}`;
      const acceptInviteGame = `acceptInviteGame:${currentUser.id}`;
      const refuseInviteGame = `refuseInviteGame:${currentUser.id}`;

      socket.on(userUpdate, (newCurrentUser: any) => {
        if (newCurrentUser.id === currentUser.id) {
          setCurrentUser(newCurrentUser);
        }
      });

      socket.on(receiveInviteGame, (invitor: any) => {
        setIsInviteGameModalOpen(true);
        setInvitor(invitor);
      });

      socket.on(acceptInviteGame, (accept: any) => {
        message.success(`${accept.senderUsername} accept to play with you`);

        window.location.href = '/custom_game';
      });

      socket.on(refuseInviteGame, (refuse: any) => {
        message.error(`${refuse.senderUsername} refuse to play with you`);
      });

      return () => {
        socket.off(userUpdate);
        socket.off(receiveInviteGame);
        socket.off(acceptInviteGame);
        socket.off(refuseInviteGame);
      };
    }
  }, [currentUser]);

  return (
    <div id="wholepage">
      <BrowserRouter>
        <InviteGameModal
          isInviteGameModalOpen={isInviteGameModalOpen}
          setIsInviteGameModalOpen={setIsInviteGameModalOpen}
          currentUser={currentUser}
          invitor={invitor}
        />
        <Routes>
          <Route path="/" element={<Accueil currentUser={currentUser} />} />
          <Route path="/account" element={<AccountPage user={currentUser} />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/chat"
            element={<Chat socket={socket} currentUser={currentUser} />}
          />

          <Route
            path="/menu"
            element={<GameMenu currentUser={currentUser} socket={socket} />}
          />
          <Route
            path="/custom_game"
            element={<CustomMenu currentUser={currentUser} socket={socket} />}
          />
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
          <Route
            path="/scores/:id"
            element={<ScoresPage currentUser={currentUser} />}
          />
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
