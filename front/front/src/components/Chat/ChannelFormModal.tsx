import { useEffect } from 'react';
import { Form, Input, Modal, Radio, message, Button, Popconfirm } from 'antd';
import { ChannelType, CHANNEL_TYPE } from './const';
import axios from 'axios';
import { BACK_URL } from '../../global';

const ChannelFormModal = ({
  isModalVisible,
  closeModal,
  channel = null,
}: channelForModalProps) => {
  const [form] = Form.useForm();
  const isEdit = !!channel;

  useEffect(() => {
    if (channel) {
      form.setFieldsValue({
        type: channel.type,
        channelName: channel.channelName,
        password: '',
      });
    } else {
      form.setFieldsValue({
        type: CHANNEL_TYPE.public,
        channelName: '',
        password: '',
      });
    }
  }, [isModalVisible, channel, form]);

  const sendChannel = async (values: any) => {
    try {
      if (channel) {
        await axios.put(`${BACK_URL}/channels/${channel.id}`, values, {
          withCredentials: true,
          headers: {},
        });
        message.success('Channel edited!');
      } else {
        await axios.post(`${BACK_URL}/channels`, values, {
          withCredentials: true,
          headers: {},
        });
        message.success('New channel created!');
      }
    } catch (e) {
      message.error(`Une erreur s'est passé ${e}`);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      sendChannel(values);
    } catch (e) {
      // If fields not valid then return
      return;
    }
    handleCancel();
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  const comfirmHandler = async () => {
    try {
      await axios.delete(`${BACK_URL}/channels/${channel?.id}`, {
        withCredentials: true,
        headers: {},
      });
      handleCancel();
      message.success('Delete the channel successeful!');
    } catch (error) {
      message.error('Fail to delete the channel!');
    }
  };

  return (
    <Modal
      forceRender
      title={isEdit ? 'Modify Channel' : 'Create Channel'}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        channel ? (
          <Popconfirm
            key="deleteConfirm"
            title="Are you sure to delete this channel?"
            onConfirm={comfirmHandler}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No">
            <Button key="delete" danger>
              Delete
            </Button>
          </Popconfirm>
        ) : null,

        <Button key="cancel" type="primary" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          Ok
        </Button>,
      ]}>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="type">
          <Radio.Group>
            <Radio value={CHANNEL_TYPE.public}>Public</Radio>
            <Radio value={CHANNEL_TYPE.private}>Private</Radio>
            <Radio value={CHANNEL_TYPE.protected}>Protected</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="channelName"
          label="Channel Name"
          rules={[
            { required: true, message: 'Please input the Channel Name!' },
            { min: 4, message: 'Channel name must be minimum 4 characters.' },
            { max: 11, message: 'Channel name must be maximum 11 characters.' },
          ]}>
          <Input maxLength={11} />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.type !== currentValues.type
          }>
          {({ getFieldValue }) =>
            getFieldValue('type') === CHANNEL_TYPE.protected ? (
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please input the password!' },
                  { min: 4, message: 'Password must be minimum 4 characters.' },
                  {
                    max: 12,
                    message: 'Password must be maximum 12 characters.',
                  },
                ]}>
                <Input.Password placeholder="input password" maxLength={12} />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};

type channelForModalProps = {
  isModalVisible: boolean;
  closeModal: () => void;
  channel?: ChannelType | null;
};
export default ChannelFormModal;
