import {getRandomArbitrary} from './Canvas.tsx'

export const drawScore = (context : any, playerScore : number) => {
	// const playerOneX = context.canvas.width / 2 - (context.canvas.width / 2 * 20 / 100) 
	// const playerTwoX = context.canvas.width / 2 + (context.canvas.width / 2 * 20 / 100)
	const playerOneX = context.canvas.width / 2 - 30
	const playerTwoX = context.canvas.width / 2 + 40
	const y = context.canvas.height * 8 / 100
	context.beginPath();
	context.font = '90px press_start_2pregular, Arial';
	context.textAlign = 'right';
	context.textBaseline = 'top';
	context.fillStyle = 'white';
	context.fillText(playerScore[0], playerOneX , y);
	context.stroke();
	context.beginPath();
	context.font = '90px press_start_2pregular, Arial';
	context.textAlign = 'left';
	context.textBaseline = 'top';
	context.fillStyle = 'white';
	context.fillText(playerScore[1], playerTwoX, y);
	context.stroke();
}

function sleep(milliseconds : number) {
  const date = Date.now();
  let currentDate : any = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export async function watchScore (context : any, ball : any, ballPosX : any, ballPosY : any, score : number[], updateScore : number) {
	const newArray : number[] = score.slice();
	if (ballPosX.current  + (ball.size) < -10)
	{
		newArray[1] += 1
		updateScore(newArray)
		ballPosX.current = window.innerWidth / 2
		ballPosY.current = getRandomArbitrary(window.innerHeight / 15, window.innerHeight - window.innerHeight / 15)
		ball.dirX = getRandomArbitrary(0.1, 0.9)
		ball.dirY = getRandomArbitrary(-1, 1)
		sleep(1000)
	}
	else if (ballPosX.current  + (ball.size) > context.canvas.width)
	{
		newArray[0] += 1
		updateScore(newArray)
		ballPosX.current = window.innerWidth / 2
		ballPosY.current = getRandomArbitrary(window.innerHeight / 15, window.innerHeight - window.innerHeight / 15)
		ball.dirX = getRandomArbitrary(-0.9, -0.1)
		ball.dirY = getRandomArbitrary(-1, 1)
		sleep(1000)
	}
}
