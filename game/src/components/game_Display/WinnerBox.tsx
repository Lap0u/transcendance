import { useEffect } from 'react'
import './winnerBox.css'

const WinnerBox = ({message}: winnerProps) => {
	return (
		<div className="container-box">
			<p>{message}</p>
		</div>
	)
}

type winnerProps = {
	message: string;
}

export default WinnerBox;