import { message, Modal } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACK_URL } from '../../global';

const InviteGameModal = ({
  isInviteGameModalOpen,
  setIsInviteGameModalOpen,
  currentUser,
  setCurrentUser,
  invitor,
}: inviteGameModalProps) => {
  const navigate = useNavigate();

  const handleOk = async () => {
    try {
      await axios.post(
        `${BACK_URL}/matchmaking/acceptInviteGame/${invitor.senderId}`,
        {},
        {
          withCredentials: true,
        }
      );
      message.success('Success');
    } catch (error) {
      message.error('Fail!');
    }
    setCurrentUser({ ...currentUser });
    navigate('/custom_game');
    setIsInviteGameModalOpen(false);
  };

  const handleCancel = async () => {
    try {
      await axios.post(
        `${BACK_URL}/matchmaking/refuseInviteGame/${invitor.senderId}`,
        {},
        {
          withCredentials: true,
        }
      );
      message.success('Success');
    } catch (error) {
      message.error('Fail!');
    }
    setIsInviteGameModalOpen(false);
  };

  if (!currentUser) return null;

  return (
    <Modal
      title={'Invitation to game'}
      visible={isInviteGameModalOpen}
      okText={'Yes'}
      cancelText={'No'}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}>
      <p>{invitor.senderUsername} invite you to play game</p>
      <p>Would you play with {invitor.senderUsername}?</p>
    </Modal>
  );
};

type inviteGameModalProps = {
  isInviteGameModalOpen: boolean;
  setIsInviteGameModalOpen: any;
  currentUser: any;
  setCurrentUser: any;
  invitor: any;
};

export default InviteGameModal;
