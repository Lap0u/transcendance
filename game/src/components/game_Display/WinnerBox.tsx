import { useEffect } from 'react'
import './winnerBox.css'

const WinnerBox = ({message}: winnerProps) => {
	useEffect(() => {
		console.log("rendered")
		
	})
	// function setBoxSize() {

	// }
	// useEffect(() => {
	// 	setBoxSize()
	// })
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