import React, { useState } from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import axios from 'axios';

const BACK_URL = "http://localhost:4000";

const CHANNEL_TYPE = {
	public: 'public',
	protected: 'protected',
	private: 'private',
};

const ChannelFormModal = ({ isModalVisible, closeModal, token }) => {
	const [form] = Form.useForm();
	const [passwordState, setPasswordStare] = useState(false);

  const sendChannel = async (values) => {
    try {
      const res = await axios.post(`${BACK_URL}/channels`, values, { headers: { Authorization: `Bearer ${token}` }});
			console.log(res.data);
    } catch (e) {
      alert(`Une erreur s'est passé ${e}`);
    }
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			console.log(values);
			sendChannel(values);
		} catch (e) {
			// If fields not valid then return
			return;
		};
		handleCancel();
  };

  const handleCancel = () => {
    closeModal();
		form.resetFields();
		setPasswordStare(false);
  };

	const checkChannelType = (value: string) => {
		if (value === CHANNEL_TYPE.protected)
			setPasswordStare(true);
		else
			setPasswordStare(false);
	}

  return (
		<Modal title="Create Channel" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
			<Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ type: CHANNEL_TYPE.public }}
      >
				<Form.Item name="type">
          <Radio.Group onChange={(e) => checkChannelType(e.target.value)}>
            <Radio value={CHANNEL_TYPE.public}>Public</Radio>
            <Radio value={CHANNEL_TYPE.private}>Private</Radio>
            <Radio value={CHANNEL_TYPE.protected}>Protected</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="channelName"
          label="Channel Name"
          rules={[{ required: true, message: 'Please input the Channel Name!' }]}
        >
          <Input />
        </Form.Item>
        { passwordState && <Form.Item
					name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input />
        </Form.Item> }
        
      </Form>
		</Modal>
  );
};

export default ChannelFormModal;
