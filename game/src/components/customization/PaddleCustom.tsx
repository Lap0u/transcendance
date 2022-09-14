import './PaddleCustom.css'

const PaddleCustom = ({owner} : myProps) => {
	return (
		<div className="paddle-container">
			<p>{owner} paddle</p>
			<button className='paddle'></button>
		</div>
	)
}

type myProps = {
	owner: string
}

export default PaddleCustom