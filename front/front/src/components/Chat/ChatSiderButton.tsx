import { TeamOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { CHAT_TYPE } from './const';

const ChatSiderButton = ({ chatType, setChatType }: ChatSiderButtonProps) => {
  return (
    <>
      <div>
        <Tooltip title="chat with user" placement="right">
          <Button
            type={chatType === CHAT_TYPE.user ? 'primary' : 'text'}
            onClick={() => setChatType(CHAT_TYPE.user)}
            shape="circle"
            icon={<UserSwitchOutlined />}
            style={{ color: '#fff' }}
          />
        </Tooltip>
      </div>
      <div style={{ marginTop: 20 }}>
        <Tooltip title="chat in channel" placement="right">
          <Button
            type={chatType === CHAT_TYPE.channel ? 'primary' : 'text'}
            onClick={() => setChatType(CHAT_TYPE.channel)}
            shape="circle"
            icon={<TeamOutlined />}
            style={{ color: '#fff' }}
          />
        </Tooltip>
      </div>
    </>
  );
};

type ChatSiderButtonProps = {
  chatType: string;
  setChatType: any;
};

export default ChatSiderButton;
