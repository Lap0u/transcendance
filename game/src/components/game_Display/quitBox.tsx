import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import './winnerBox.css'

const QuitBox = ({setQuitPressed, quitPressed} : quitBoxProps) => {
    const navigate = useNavigate();
	return (
		<div className="container-box">
			<Button type="link" onClick={() => setQuitPressed(!quitPressed)}>Resume game</Button>
			<Button type="primary" danger onClick={() => navigate("/", {replace: true})}>Forfeit Game</Button>
		</div>
	)
}

type quitBoxProps = {
	setQuitPressed: any;
	quitPressed: any;
}

export default QuitBox;