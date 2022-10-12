import { useState } from 'react';
import './login.css';
import { BACK_URL } from '../../global';
import axios from 'axios';
import { message } from 'antd';
// import avatar from '../../assets/default-avatar.png'

const avatar = '../../assets/default-avatar.png';

const LoginPopup = ({ isLog, setLog }: loginPopupProps) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function hideForm() {
    setLog(!isLog);
  }

  window.onclick = function (event: any) {
    const form = document.getElementById('main');
    if (event.target === form) {
      hideForm();
    }
  };

  const login = (e: any) => {
    e.preventDefault();
    loginAsUser(userName, password);
  };

  const loginAsUser = async (userName: string, passWord: string) => {
    try {
      const res = await axios.post(`${BACK_URL}/auth/login`, {
        username: userName,
        password: passWord,
      });
      if (res.data) {
        localStorage.setItem('token', res.data.access_token);
        hideForm();
        message.success('Connect!');
      }
    } catch (e: any) {
      if (e.response.status === 401) {
        message.error('Login ou mot de passe incorrect');
      } else {
        message.error(`Une erreur s'est passé ${e}`);
      }
    }
  };

  return (
    <div className="loginContainer" id="main">
      <form className="loginForm animate">
        {' '}
        {/*-- Envoyer la vraie connexion au back */}
        <img src={avatar} alt="Default Avatar" />
        <span
          onClick={() => hideForm()}
          className="redCross"
          title="Close Modal">
          &times;
        </span>
        <div className="fieldContainer">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="rememberMe">
            <button type="submit" onClick={login}>
              Login
            </button>
            <label className="loginRememberMe">
              <input type="checkbox" defaultChecked={true} name="remember" />
              Remember me
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

type loginPopupProps = {
  isLog: any;
  setLog: any;
};

export default LoginPopup;
