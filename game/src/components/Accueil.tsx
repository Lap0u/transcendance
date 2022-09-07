import './Accueil.css'
import io from "socket.io-client";
import LoginPopup from './login/Login'
import ButtonTemplate from './ButtonTemplate'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Input, Modal } from 'antd';
import { BACK_URL } from '../global';
import axios from 'axios';
// import backgroundImage from '../assets/pong_wallpaper'

const socket = io('http://localhost:3000');
socket.on('init', handleInit);

function handleInit(msg: string) {
	console.log(msg);
}
function Accueil() {
	const [form] = Form.useForm();

	const [isLoginActive, setIsLogin] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const navigate = useNavigate();

	function loginClick() {
		setIsLogin(!isLoginActive);
	}

	const showModal = () => {
		setIsModalVisible(true);
	}

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			createUser(values.username, values.password);
		} catch (e) {
			// If fields not valid then return
			return;
		};
		handleCancel();
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		form.resetFields();
	};

	const createUser = async (userName:string, passWord:string) => {
    try {
      const res = await axios.post(`${BACK_URL}/users`, { username: userName, password: passWord });
      if (res.data) {
        alert('Create user with success');
      }
    } catch(e) {
      alert(`Une erreur s'est passé ${e}`);
    }
  };

	return (
		<div className='AccueilPage'>
			<div>
				<Background />
			</div>
			{isLoginActive && <LoginPopup isLog={isLoginActive} setLog={setIsLogin} />}
			{!isLoginActive &&
				<div>
					<Welcome />
					<ButtonTemplate text="Login" onClick={() => {window.location.href = 'http://localhost:4000/auth/login'}} buttonClass={'login-button rightButton'} />
					<LoginButton nav={navigate} />
					<ButtonTemplate text="Chat" onClick={() => navigate("/chat")} buttonClass={'chat-button'} />
					<ButtonTemplate text="CreateUser" onClick={showModal} buttonClass={'createUser-button'} />
					<Modal forceRender title="Create User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="create">
						<Form
							form={form}
							name="basic"
							autoComplete="off"
						>
							<Form.Item
								label="Username"
								name="username"
								rules={[{ required: true, message: 'Please input your username!' }]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[{ required: true, message: 'Please input your password!' }]}
							>
								<Input.Password />
							</Form.Item>
						</Form>
					</Modal>
				</div>
			}
		</div>
	)
}

function LoginButton(props: any) {
	const nav = props.nav;
	return (
		<div className='login'>
			<h2 className='login-message'>
				You have to login to play<br />
			</h2>
			<ButtonTemplate text="Enter game" onClick={() => nav("/menu")} buttonClass={'join-button'} />
		</div>
	)
}

function Background() {
	return (
		<div className='backgroundImg'></div>
	)
}

function Welcome() {
	return (
		<h1 className='welcome' id='welcome'>Welcome to our Pong</h1>
	)
}

export default Accueil;
