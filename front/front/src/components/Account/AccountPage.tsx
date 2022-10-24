import { message, Modal } from 'antd';
import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBarre from '../Accueil/NavBarre';
import handleErrors from '../RequestErrors/handleErrors';
import { ActivateTwoAuth } from '../TwoFactorAuth/TwoAuthActivate';
import UserDto from '../utils/UserDto';
import './AccountPage.css';

const { confirm } = Modal;

const BACK_URL = 'http://localhost:4000';
const FRONT_URL = 'http://localhost:3000';

function ButtonChangeUsername(props: any) {
  const clearInput = useRef('');
  const [username, changeUsername] = useState('');
  const nav = useNavigate();

  async function newUsername(e: any) {
    changeUsername(e.target.value);
    clearInput.current = e.target.value;
  }
  async function updateUsername() {
    confirm({
      title: 'Change your username?',
      onOk() {
        axios
          .post(
            `${BACK_URL}/account/username/`,
            { newUsername: username, oldUsername: props.prevUsername },
            {
              withCredentials: true,
              method: 'post',
              headers: {},
            }
          )
          .then(function (response) {
            console.log('change username', response.data);
            if (response.data.ok === false) {
              message.error(response.data.msg);
              return;
            }
            props.refresh(username);
            props.changeUser(+props.cur + 1);
            clearInput.current = '';
          })
          .catch((error) => {
            clearInput.current = '';
            handleErrors(error, nav);
          });
      },
    });
  }

  return (
    <div className="change-username">
      <button
        className="button-change-username"
        onClick={() => updateUsername()}>
        <i>Change username</i>
      </button>
      <input
        className="input-text"
        type="text"
        onChange={(e) => newUsername(e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') updateUsername();
        }}
        value={clearInput.current}></input>
    </div>
  );
}

function ButtonChangeAvatar(props: any) {
  const [displayElem, clickButton] = useState('none');
  const [selectedFile, setSelectedFile] = useState('');
  const [isFilePicked, setIsFilePicked] = useState(false);
  const nav = useNavigate();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    console.log('eveeent', event.target.value);
    setIsFilePicked(event.target.value !== '' ? true : false);
  };

  async function handleSubmission(e: any) {
    confirm({
      title: 'Change your avatar ?',
      onOk() {
        var FormData = require('form-data');
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('type', 'avatar');
        console.log('ooooooooo');
        axios
          .post(`${BACK_URL}/account/avatar`, formData, {
            withCredentials: true,
            method: 'post',
            headers: {},
          })
          .then((response) => {
            console.log('eeeeeeeee');
            clickButton('none');
            props.refresh(response.data.avatar);
            props.changeUser(props.cur + 1);
            console.log('refressshh avatar', response.data.avatar);
            e.target.value = null;
          })
          .catch((error) => {
            handleErrors(error, nav);
          });
      },
    });
  }

  return (
    <div className="change-avatar">
      <button
        className="button-upload-avatar"
        onClick={() =>
          displayElem === 'none' ? clickButton('block') : clickButton('none')
        }>
        <i>Change avatar</i>
      </button>
      <input
        id="input-file"
        className="input-file"
        type="file"
        accept=".jpg,.jpeg,.png"
        style={{ display: displayElem }}
        onChange={(e) => changeHandler(e)}
      />
      <button
        className="submit-file"
        style={{
          display: isFilePicked && displayElem !== 'none' ? 'block' : 'none',
        }}
        onClick={(e) => handleSubmission(e)}>
        Submit
      </button>
    </div>
  );
}

const Avatar = (props: any) => {
  return (
    <ul className="avatar">
      <img
        className="avatarImg"
        src={BACK_URL + '/account/avatar/' + props.avatar}
        alt={props.avatar}
      />
      <ButtonChangeAvatar
        refresh={props.updateAvatar}
        avatar={props.avatar}
        changeUser={props.changeUser}
        cur={props.cur}
      />
    </ul>
  );
};

const UserName = (props: any) => {
  const prevUsername: string = props.username;
  return (
    <ul className="username">
      <i className="info-type">Username</i>
      <i className="info"> {props.username}</i>
      <ButtonChangeUsername
        refresh={props.updateUsername}
        prevUsername={prevUsername}
        changeUser={props.changeUser}
        cur={props.cur}
      />
    </ul>
  );
};

function TwoAuth(props: any) {
  const [displayForm, display] = useState('none');
  const nav = useNavigate();

  function turnOffTwoAth() {
    confirm({
      title: 'Desactivate the two factor authentification?',
      onOk() {
        axios
          .get(`${BACK_URL}/2fa/turnoff`, { withCredentials: true })
          .then((response) => {
            props.turnTwoAuth(false);
            props.changeUser(props.userChanged + 1);
          })
          .catch((error) => {
            handleErrors(error, nav);
          });
      },
    });
  }

  return (
    <div>
      <ul className="two-auth">
        <i className="info-type">Two-auth factor </i>
        {props.isActivate ? (
          <div>
            <button
              className="button-activate-two-auth"
              onClick={() => turnOffTwoAth()}>
              Desactivate
            </button>
          </div>
        ) : (
          <div>
            <button
              className="button-activate-two-auth"
              onClick={() =>
                display(displayForm === 'none' ? 'block' : 'none')
              }>
              Activate
            </button>
            <div className="two-auth-form" style={{ display: displayForm }}>
              <ActivateTwoAuth
                userChanged={props.userChanged}
                changeUser={props.changeUser}
                display={display}
              />
            </div>
          </div>
        )}
      </ul>
      {props.isActivate ? (
        <ul className="email">
          <i className="info-type">Email</i>
          <i className="info">{props.email}</i>
        </ul>
      ) : null}
    </div>
  );
}
const AccountInfo = ({
  user,
  changeUser,
  cur,
}: {
  user: typeof UserDto;
  changeUser: any;
  cur: any;
}) => {
  const [ok, setOk] = useState(false);
  const [username, updateUsername] = useState('');
  const [avatar, updateAvatar] = useState('');
  const [twoAuth, turnTwoAuth] = useState(false);
  useEffect(() => {
    if (user) {
      updateUsername(user.accountUsername);
      updateAvatar(user.avatar);
      turnTwoAuth(user.isTwoFactorAuthenticationEnabled);
      setOk(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function isJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function getName(): string {
    if (!isJson(user.name)) return ' ';
    const { givenName, familyName } = JSON.parse(user.name);
    return ' ' + givenName + ' ' + familyName;
  }

  return ok ? (
    <div>
      <li className="account-info">
        <Avatar
          avatar={avatar}
          updateAvatar={updateAvatar}
          changeUser={changeUser}
          cur={cur}
        />
        <UserName
          username={username}
          updateUsername={updateUsername}
          changeUser={changeUser}
          cur={cur}
        />
        <ul className="name">
          <i className="info-type">Name </i>
          <i className="info">{getName()}</i>
        </ul>
        <ul className="login">
          <i className="info-type">Login </i>
          <i className="info">{user.username} </i>
        </ul>
        <TwoAuth
          userChanged={cur}
          changeUser={changeUser}
          isActivate={twoAuth}
          turnTwoAuth={turnTwoAuth}
          email={user.email}
        />
      </li>
    </div>
  ) : null;
};

export const LogoutButton = () => {
  const nav = useNavigate();
  async function logout() {
    await axios
      .get(`${BACK_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('logesddddd outtttt');
        window.location.href = `${FRONT_URL}/`;
      })
      .catch((error) => {
        console.log('errooooor esddddd outtttt');
        handleErrors(error, nav);
      });
  }
  return <button onClick={() => logout()}>Logout</button>;
};
const AccountPage = ({
  user,
  changeUser,
  cur,
}: {
  user: typeof UserDto;
  changeUser: any;
  cur: any;
}) => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    axios
      .get(`${BACK_URL}/account/status`, { withCredentials: true })
      .then(() => {
        console.log('accpunt', user);
        if (user) setOk(true);
      })
      .catch((error) => {
        handleErrors(error, nav);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ok ? (
    <div className="account-page">
      <NavigationBarre isLoginActive={true} user={user} />
      <AccountInfo user={user} changeUser={changeUser} cur={cur} />
    </div>
  ) : null;
};

export default AccountPage;
