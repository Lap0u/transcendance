import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  MinusCircleFilled,
} from '@ant-design/icons';
import { Avatar, Button, message, Popover, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACK_URL } from '../../global';
import '../Account/PublicAccount.css';
import handleErrors from '../RequestErrors/handleErrors';
import { Stats } from '../Scores/Stats';
import './UserPopover.css';

const stylePopoverButton = {
  fontSize: '13px',
  height: '15px',
  lineHeight: '0',
  padding: '0',
};

export const UserPopover = ({
  currentUser,
  user,
  avatarOrUsername = 'avatar',
}: {
  currentUser: any;
  user: any;
  avatarOrUsername: any;
}) => {
  const inBlacklist = useMemo(() => {
    if (!currentUser.blacklist) return false;
    return currentUser.blacklist.includes(user.id);
  }, [currentUser.blacklist, user.id]);
  const inFriendList = useMemo(() => {
    if (!currentUser.friendList) return false;
    return currentUser.friendList.includes(user.id);
  }, [currentUser.friendList, user.id]);

  const nav = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const blacklist = async () => {
    const newBlacklist = [...currentUser.blacklist, user.id];
    try {
      await axios.put(
        `${BACK_URL}/account/blacklist`,
        { newBlacklist },
        {
          withCredentials: true,
        }
      );
      message.success('Success to add in black list');
    } catch (e) {
      message.error('Fail to add in black list');
    }
    setIsVisible(false);
  };

  const whitelist = async () => {
    const newBlacklist = currentUser.blacklist.filter(
      (userId: string) => userId !== user.id
    );
    try {
      await axios.put(
        `${BACK_URL}/account/blacklist`,
        { newBlacklist },
        {
          withCredentials: true,
        }
      );
      message.success('Success to remove in black list');
    } catch (e) {
      message.error('Fail to add in black list');
    }
    setIsVisible(false);
  };

  const handleScoresClick = (nav: any) => {
	setIsVisible(false);
    nav(`/scores/${user.account_id}`);
  };

  const addFriend = async () => {
    const newFriendList = [...currentUser.friendList, user.id];
    try {
      await axios.put(
        `${BACK_URL}/account/friendList`,
        { newFriendList },
        {
          withCredentials: true,
        }
      );
      message.success('Success to add friend');
    } catch (e) {
      message.error('Fail to add friend');
    }
    setIsVisible(false);
  };

  const removeFriend = async () => {
    const newFriendList = currentUser.friendList.filter(
      (userId: string) => userId !== user.id
    );
    try {
      await axios.put(
        `${BACK_URL}/account/friendList`,
        { newFriendList },
        {
          withCredentials: true,
        }
      );
      message.success('Success to remove friend');
    } catch (e) {
      message.error('Fail to remove friend');
    }
    setIsVisible(false);
  };

  const handleInviteClick = async () => {
    console.log('Profile');

    try {
      await axios.post(
        `${BACK_URL}/matchmaking/inviteGame/${user.id}`,
        {},
        {
          withCredentials: true,
        }
      );
      message.success('Success');
    } catch (error) {
      message.error('Fail!');
    }

    setIsVisible(false);
  };

  const content = (
    <div
      className="content"
      style={{ display: 'flex', flexDirection: 'column' }}>
      <Button style={stylePopoverButton} onClick={() => handleScoresClick(nav)}>
        Scores
      </Button>
	  <Button
        style={stylePopoverButton}
        onClick={inFriendList? removeFriend : addFriend}>
        {inFriendList ? 'Remove friend' : 'add friend'}
      </Button>
      <Button
        style={{ margin: '5px 0', ...stylePopoverButton }}
        onClick={handleInviteClick}>
        Invite to play
      </Button>
      <Button
        style={stylePopoverButton}
        onClick={inBlacklist ? whitelist : blacklist}>
        {inBlacklist ? 'White list' : 'Black list'}
      </Button>
    </div>
  );

  return (
    <Popover
      className="user-popover"
      onVisibleChange={(isVisible) => setIsVisible(isVisible)}
      visible={isVisible}
      placement="right"
      content={content}
      title={<ProfileTitle user={user} />}
      trigger="click"
      overlayStyle={{ width: '170px', textAlign: 'center' }}>
      <div className="popover-item" style={{ display: 'inline-block' }}>
        {avatarOrUsername === 'username' ? (
          <i> {user.accountUsername} </i>
        ) : (
          <Avatar src={BACK_URL + '/account/avatar/' + user.avatar} />
        )}
      </div>
    </Popover>
  );
};
UserPopover.defaultProps = {
  avatarOrUsername: 'avatar',
};

function ProfileTitle({ user }: { user: any }) {
  return (
    <Typography className="popover-title" style={{ width: '100%' }}>
      <figure>
        <Avatar
          size={50}
          style={{ textAlign: 'center' }}
          className="popover-avatar"
          src={BACK_URL + '/account/avatar/' + user.avatar}
          alt="avatar"
        />
        <figcaption>
          <i className="popover-username">
            <Status id={user.account_id} />
            {user.accountUsername}
          </i>
          <br />
          <div className="info">
            <i>{user.points} points</i>
            <i>
              <Stats id={user.account_id} tabFormat={0} />
            </i>
            <i>rank: {user.rank}</i>
          </div>
        </figcaption>
      </figure>
    </Typography>
  );
}

function Status(props: any) {
  const [status, setStatus] = useState(0);
  useEffect(() => {
    axios
      .get(`${BACK_URL}/account/status/id/${props.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        handleErrors(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('stat', props.status);
  if (status === 0)
    return (
      <i className="status">
        <MinusCircleFilled style={{ color: 'red' }} />
      </i>
    );
  if (status === 1)
    return (
      <i className="status">
        <CheckCircleFilled style={{ color: 'green' }} />
      </i>
    );
  return (
    <i className="status">
      <ExclamationCircleFilled style={{ color: 'purple' }} />
    </i>
  );
}
export default UserPopover;
