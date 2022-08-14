import { Form, Input, Modal, Radio } from 'antd';
import axios from 'axios';

const BACK_URL = "http://localhost:4000";

const CHANNEL_TYPE = {
	public: 'public',
	protected: 'protected',
	private: 'private',
};

const ChannelFormModal = ({ isModalVisible, closeModal, token }: channelForModalProps) => {
	const [form] = Form.useForm();

  const sendChannel = async (values :any) => {
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
  };

  return (
		<Modal title="Create Channel" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
			<Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ type: CHANNEL_TYPE.public }}
      >
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
          rules={[{ required: true, message: 'Please input the Channel Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
        >
          {({ getFieldValue }) =>
            getFieldValue('type') === CHANNEL_TYPE.protected ? (
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input the password!' }]}
              >
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
  isModalVisible : boolean, 
  closeModal : () => void,
  token : string,
}
export default ChannelFormModal;
