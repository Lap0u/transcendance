import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import './winnerBox.css'

const QuitBox = ({setQuitPressed, quitPressed, socket} : quitBoxProps) => {
    const navigate = useNavigate();
		function forfeitGame() {
			socket.emit('leave')
			navigate("/")
			setQuitPressed(!quitPressed)
		}
	return (
		<div className="container-box">
			<Button type="link" onClick={() => setQuitPressed(!quitPressed)}>Resume game</Button>
			<Button type="primary" danger onClick={() => forfeitGame()}>Forfeit Game</Button>
		</div>
	)
}

type quitBoxProps = {
	setQuitPressed: any;
	quitPressed: any;
	socket: any;
}

export default QuitBox;