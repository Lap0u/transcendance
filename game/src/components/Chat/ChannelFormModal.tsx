import { useEffect } from 'react';
import { Form, Input, Modal, Radio, message } from 'antd';
import { ChannelType, CHANNEL_TYPE } from './const';
import axios from 'axios';
import { BACK_URL } from '../../global';

const ChannelFormModal = ({
  isModalVisible,
  closeModal,
  addNewChannel,
  updateChannel,
  channel = null,
}: channelForModalProps) => {
  const [form] = Form.useForm();
  const isEdit = !!channel;

  useEffect(() => {
    if (channel) {
      form.setFieldsValue({
        type: channel.type,
        channelName: channel.channelName,
        password: channel.password,
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
      let res = null;
      if (channel) {
        res = await axios.put(`${BACK_URL}/channels/${channel.id}`, values, {
          withCredentials: true,
          headers: {},
        });
        message.success('Channel edited!');
        // updateChannel(res.data);
      } else {
        res = await axios.post(`${BACK_URL}/channels`, values, {
          withCredentials: true,
          headers: {},
        });
        message.success('New channel created!');
        // addNewChannel(res.data);
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

  return (
    <Modal
      forceRender
      title={isEdit ? 'Modify Channel' : 'Create Channel'}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}>
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
          ]}>
          <Input />
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
                ]}>
                <Input />
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
  addNewChannel: (newChannel: ChannelType) => void;
  updateChannel: (channel: ChannelType) => void;
  channel?: ChannelType | null;
};
export default ChannelFormModal;
