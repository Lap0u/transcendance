export const drawScore = (context, playerScore) => {
	const playerOneX = context.canvas.width / 2 - (context.canvas.width / 2 * 20 / 100) 
	const playerTwoX = context.canvas.width / 2 + (context.canvas.width / 2 * 20 / 100) 
	const y = context.canvas.height * 8 / 100
	context.beginPath();
	context.font = '90px press_start_2pregular, Arial';
	context.textAlign = 'left';
	context.textBaseline = 'top';
	context.fillStyle = 'white';
	context.fillText(playerScore[0], playerOneX , y);
	context.stroke();
	context.beginPath();
	context.font = '90px press_start_2pregular, Arial';
	context.textAlign = 'right';
	context.textBaseline = 'top';
	context.fillStyle = 'white';
	context.fillText(playerScore[1], playerTwoX, y);
	context.stroke();
}
