import { Button } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './winnerBox.css'

const WinnerBox = ({message}: winnerProps) => {
    const navigate = useNavigate();
	
	return (
		<div className="container-box">
			<p className="winner">{message}</p>
			<Button type="dashed" onClick={() => navigate("/")}>Return to main menu</Button>
		</div>
	)
}

type winnerProps = {
	message: string;
}

export default WinnerBox;