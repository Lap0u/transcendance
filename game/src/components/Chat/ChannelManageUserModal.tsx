import { Avatar, Checkbox, Modal, Table } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ChannelType } from './const';
import defaultAvatar from '../../assets/default-avatar.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACK_URL } from '../../global';

const { Column } = Table;

const ChannelManageUserModal = ({
  users,
  channel,
  isOpen,
  handleCancel,
}: ChannelManageUserProps) => {
  const [inChannelUsers, setInChannelUsers] = useState<string[]>([]);
  const [channelAdmins, setChannelAdmins] = useState<string[]>([]);

  useEffect(() => {
    if (channel) {
      setInChannelUsers(channel.usersId);
      setChannelAdmins(channel.administratorsId);
    } else {
      setInChannelUsers([]);
      setChannelAdmins([]);
    }
  }, [channel, isOpen]);

  if (!channel) return null;

  const handleOk = async () => {
    const values = { ...channel };
    values.usersId = inChannelUsers;
    values.administratorsId = channelAdmins;
    const res = await axios.put(`${BACK_URL}/channels/${channel.id}`, values, {
      withCredentials: true,
      headers: {},
    });
    handleCancel();
  };

  const removeUserFromAdmins = (user: any) => {
    if (!channelAdmins.includes(user.id)) return;
    setChannelAdmins((oldUsers) => {
      const newUsers = [...oldUsers];
      const index = oldUsers.findIndex((id) => user.id === id);
      newUsers.splice(index, 1);
      return newUsers;
    });
  };

  const addUserToGroupChanged = (e: CheckboxChangeEvent, user: any) => {
    if (e.target.checked) {
      setInChannelUsers((oldUsers) => [...oldUsers, user.id]);
    } else {
      setInChannelUsers((oldUsers) => {
        const newUsers = [...oldUsers];
        const index = oldUsers.findIndex((id) => user.id === id);
        newUsers.splice(index, 1);
        return newUsers;
      });
      removeUserFromAdmins(user);
    }
  };

  const setUserAsAdminChanged = (e: CheckboxChangeEvent, user: any) => {
    if (e.target.checked) {
      setChannelAdmins((oldUsers) => [...oldUsers, user.id]);
    } else {
      removeUserFromAdmins(user);
    }
  };

  return (
    <Modal
      title="Manage user"
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Table
        dataSource={users}
        pagination={false}
        style={{ maxHeight: 700, overflow: 'scroll' }}>
        <Column
          title="Username"
          dataIndex="username"
          key="username"
          render={(username: string) => (
            <>
              <Avatar src={defaultAvatar} />
              <span style={{ marginLeft: 10 }}>{username}</span>
            </>
          )}
        />
        <Column
          title="Add user to group"
          key="addToGroup"
          render={(_: any, user: any) => (
            <Checkbox
              onChange={(e) => {
                addUserToGroupChanged(e, user);
              }}
              disabled={channel.ownerId === user.id}
              checked={inChannelUsers.includes(user.id)}>
              Add
            </Checkbox>
          )}
        />
        <Column
          title="Set user as admin"
          key="setAsAdmin"
          render={(_: any, user: any) => (
            <Checkbox
              onChange={(e) => setUserAsAdminChanged(e, user)}
              disabled={
                channel.ownerId === user.id || !inChannelUsers.includes(user.id)
              }
              checked={channelAdmins.includes(user.id)}>
              Is admin
            </Checkbox>
          )}
        />
      </Table>
    </Modal>
  );
};

type ChannelManageUserProps = {
  users: any;
  channel: ChannelType | null;
  isOpen: boolean;
  handleCancel: () => void;
};

export default ChannelManageUserModal;
