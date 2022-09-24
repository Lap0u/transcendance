import { Avatar, Button, message, Popover } from "antd";
import axios from "axios";
import { useMemo, useState } from "react";
import { BACK_URL } from "../../global";

const ChatAvatar = ({ currentUser, user }: { currentUser: any, user: any }) => {
  const inBlacklist = useMemo(() => {
    return currentUser.blacklist.includes(user.id);
  }, [currentUser.blacklist, user.id]);

  const [isVisible, setIsVisible] = useState(false);

  const blacklist = async () => {
    const newBlacklist = [...currentUser.blacklist, user.id];
    try {
      await axios.put(`${BACK_URL}/account/blacklist`, { newBlacklist }, {
        withCredentials: true,
      });
      message.success("Success to add in black list");
    } catch (e) {
      message.error("Fail to add in black list");
    }
    setIsVisible(false);
  };

  const whitelist = async () => {
    const newBlacklist = currentUser.blacklist.filter((userId: string) => userId !== user.id);
    try {
      await axios.put(`${BACK_URL}/account/blacklist`, { newBlacklist }, {
        withCredentials: true,
      });
      message.success("Success to remove in black list");
    } catch (e) {
      message.error("Fail to add in black list");
    }
    setIsVisible(false);
  };

  const handleProfileClick = () => {
    console.log("Profile");
    setIsVisible(false);
  };

  const handleInviteClick = () => {
    console.log("Profile");
    setIsVisible(false);
  };

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button onClick={handleProfileClick}>Profile</Button>
      <Button style={{ margin: '5px 0' }} onClick={handleInviteClick} >Invite to play</Button>
      <Button onClick={inBlacklist ? whitelist : blacklist} >{inBlacklist ? "White list" : "Black list"}</Button>
    </div>
  );

  return (
    <Popover
      onVisibleChange={(isVisible) => setIsVisible(isVisible)}
      visible={isVisible}
      placement="right"
      content={content}
      title="Select your choice"
      trigger="click"
    >
      <Avatar src={BACK_URL + '/account/avatar/' + user.avatar} />
    </Popover>
  );
};

export default ChatAvatar;