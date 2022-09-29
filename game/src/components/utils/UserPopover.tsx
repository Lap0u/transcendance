import { Avatar, Button, message, Popover } from 'antd';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { BACK_URL } from '../../global';
import '../Account/PublicAccount.css';

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
    return currentUser.blacklist.includes(user.id);
  }, [currentUser.blacklist, user.id]);

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

  const handleProfileClick = () => {
    console.log('Profile');
    setIsVisible(false);
  };

  const handleInviteClick = async () => {
    console.log('Profile');

    try {
      const res = await axios.post(
        `${BACK_URL}/matchmaking/inviteGame/${user.id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log('res:', res);
      message.success('Success');
    } catch (error) {
      message.error('Fail!');
    }

    setIsVisible(false);
  };

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button onClick={handleProfileClick}>Profile</Button>
      <Button style={{ margin: '5px 0' }} onClick={handleInviteClick}>
        Invite to play
      </Button>
      <Button onClick={inBlacklist ? whitelist : blacklist}>
        {inBlacklist ? 'White list' : 'Black list'}
      </Button>
    </div>
  );

  return (
    <Popover
      onVisibleChange={(isVisible) => setIsVisible(isVisible)}
      visible={isVisible}
      placement="right"
      content={content}
      title="Select your choice"
      trigger="click">
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
export default UserPopover;
