import { CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table, Tag, TimePicker, Tooltip } from 'antd';
import axios from 'axios';
import moment, { Moment } from 'moment';
import { useMemo, useState } from 'react';
import { BACK_URL } from '../../global';
import UserPopover from '../utils/UserPopover';
import { ChannelType } from './const';

const { Column } = Table;

const format = 'HH:mm';

const SelectTime = ({
  channelId,
  userId,
  type,
}: {
  channelId: string;
  userId: string;
  type: string;
}) => {
  const [time, setTime] = useState<Moment | null>(moment('00:00', format));

  const validAction = async () => {
    if (!time) return null;
    const banTime = time.hours() * 60 + time.minutes();
    const values = {
      type,
      banTime,
    };
    try {
      await axios.put(
        `${BACK_URL}/channels/banOrMute/${channelId}/${userId}`,
        values,
        { withCredentials: true, headers: {} }
      );
      message.success(`Success to ${type} the user!`);
    } catch (error) {
      message.error(`Fail to ${type} the user!`);
    }
  };

  return (
    <div>
      <TimePicker
        style={{ width: 82, marginRight: 1 }}
        value={time}
        onSelect={(newTime) => setTime(newTime)}
        showNow={false}
        format={format}
        minuteStep={5}
        showSecond={false}
        allowClear={false}
      />
      <Button
        onClick={validAction}
        style={{ color: 'green' }}
        icon={<CheckCircleOutlined />}
      />
    </div>
  );
};

const ChannelListUserModal = ({
  isListUserModalOpen,
  setIsListUserModalOpen,
  users,
  currentUser,
  selectedChannel,
}: ChannelListUserModalProps) => {
  const channelUsers = useMemo(() => {
    if (!selectedChannel || !users || users.length === 0) return [];
    return users.filter((user: any) =>
      selectedChannel?.usersId.includes(user.id)
    );
  }, [users, selectedChannel]);

  const handleCancel = () => {
    setIsListUserModalOpen(false);
  };

  return (
    <Modal
      title="User List"
      visible={isListUserModalOpen}
      width={600}
      onCancel={handleCancel}
      footer={[
        <Button key="close" onClick={handleCancel}>
          Close
        </Button>,
      ]}>
      <Table
        dataSource={channelUsers}
        pagination={false}
        style={{ maxHeight: 700, overflow: 'scroll' }}>
        <Column
          title="Username"
          key="username"
          render={(user: any) => (
            <>
              <UserPopover currentUser={currentUser} user={user} />
              <span style={{ marginLeft: 10, marginRight: 10 }}>
                {user.username}
              </span>
              {selectedChannel?.ownerId === user.id && (
                <Tag style={{ marginRight: 10 }} color="red">
                  Owner
                </Tag>
              )}
              {selectedChannel?.administratorsId.includes(user.id) && (
                <Tag color="green">Admin</Tag>
              )}
            </>
          )}
        />
        <Column
          title={
            <div>
              <span style={{ marginRight: 2 }}>Mute</span>
              <Tooltip title="Select mute duration">
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
          }
          key="mute"
          render={(user: any) => {
            if (!selectedChannel) return null;
            return (
              <SelectTime
                channelId={selectedChannel.id}
                userId={user.id}
                type={'mute'}
              />
            );
          }}
        />
        <Column
          title={
            <div>
              <span style={{ marginRight: 2 }}>Ban</span>
              <Tooltip title="Select ban duration">
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
          }
          key="ban"
          render={(user: any) => {
            if (!selectedChannel) return null;
            return (
              <SelectTime
                channelId={selectedChannel.id}
                userId={user.id}
                type={'ban'}
              />
            );
          }}
        />
      </Table>
    </Modal>
  );
};

type ChannelListUserModalProps = {
  isListUserModalOpen: boolean;
  setIsListUserModalOpen: any;
  users: any;
  currentUser: any;
  selectedChannel: ChannelType | null;
};

export default ChannelListUserModal;
