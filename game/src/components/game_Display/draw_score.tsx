import { scoreType } from "./game.dto";

export const drawScore = (context : any, score: scoreType) => {
	const playerOneX = context.canvas.width / 2 - 30
	const playerTwoX = context.canvas.width / 2 + 40
	const y = context.canvas.height * 8 / 100
	const avg = (context.canvas.width + context.canvas.height) / 2;
	const size = avg / 18 + 'px'

	context.beginPath();
	context.font = `${size} press_start_2pregular, Arial`;
	context.textAlign = 'right';
	context.textBaseline = 'top';
	context.fillStyle = 'white';
	context.fillText(score.playerOne, playerOneX , y);
	context.stroke();
	context.beginPath();
	context.font = `${size} press_start_2pregular, Arial`;
	context.textAlign = 'left';
	context.textBaseline = 'top';
	context.fillStyle = 'white';
	context.fillText(score.playerTwo, playerTwoX, y);
	context.stroke();
}