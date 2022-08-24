import './ButtonTemplate.css'

const ButtonTemplate = ({text , onClick, buttonClass} : buttonProps) => {
	return (
		<div>
			<button className={buttonClass} onClick={onClick}>
				{text}
			</button>
		</div>
	)
}
type buttonProps = {
	text: string,
	onClick: any,
	buttonClass: string
}
export default ButtonTemplate;