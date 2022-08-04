const ResetButton = ({text, player, onClick}) => {
	let pos : string;
	if (player === true)
		pos = "rightButton"
	else
		pos = "leftButton"
	const classes : string = `resetButton ${pos}`

	return (
		<div>
			<button className={classes} onClick={onClick}>
				{text}
			</button>
		</div>
	)
}

export default ResetButton;