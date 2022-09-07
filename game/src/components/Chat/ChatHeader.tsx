import { HomeOutlined } from '@ant-design/icons';
import { Button, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/default-avatar.png';

const ChatHeader = ({ currentUser }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <div>
        <Button shape="circle" icon={<HomeOutlined />} onClick={backToHome} />
      </div>
      <div>Welcome to chat</div>
      <div>
        <Avatar src={defaultAvatar} /> {currentUser.username}
      </div>
    </div>
  );
};

type ChatHeaderProps = {
  currentUser: any;
};

export default ChatHeader;
