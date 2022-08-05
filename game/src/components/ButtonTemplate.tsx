import './ButtonTemplate.css'

const ButtonTemplate = ({text, onClick, buttonClass}) => {
	return (
		<div>
			<button className={buttonClass} onClick={onClick}>
				{text}
			</button>
		</div>
	)
}

export default ButtonTemplate;