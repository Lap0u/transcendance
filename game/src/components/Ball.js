import {playBar} from "./PlayBar";
import {getRandomArbitrary} from './Canvas'

var today = new Date()

export var ball = {
		dirX : (today.getMilliseconds() % 2) ? getRandomArbitrary(0.1, 0.9) : getRandomArbitrary(-0.9, -0.1),
		dirY : getRandomArbitrary(-1, 1),
		speed : (window.innerHeight + window.innerWidth) / 2 * 0.0006,
		size : (window.innerHeight + window.innerWidth) / 2 * 0.008
		//		drawBall : drawBall()
    }

export const drawBall = (context, ballPosX, ballPosY, playBarPosY) => {

	// conso
	//change direction if ther ball if it hits a wall
	if ((ballPosY  - ball.size <= 0 && ball.dirY < 0) || 
		(ballPosY  + ball.size  >= context.canvas.height && ball.dirY > 0))
		ball.dirY *= -1;
	if (Math.round(playBar.posX) <= Math.round(ballPosX  - ball.size)
		&& Math.round(ballPosX  - ball.size) <= Math.round(playBar.posX + playBar.width) &&
		(ballPosY >= playBarPosY && ballPosY <= playBarPosY + playBar.height) && ball.dirX < 0)
		{
			console.log("touche");
			ball.dirX *= -1;
		}
	if (ballPosX  + ball.size >= context.canvas.width - playBar.posX && ball.dirX > 0)//fake bar
		ball.dirX *= -1;
	  context.fillStyle = 'white';
	  context.beginPath();
	  context.arc(ballPosX, ballPosY, ball.size, 0, 2 * Math.PI);
	  context.closePath();
	  context.fill();
  }

window.addEventListener('resize', () => {
	ball.speed = (window.innerHeight + window.innerWidth) / 2 * 0.0006
	ball.size = (window.innerHeight + window.innerWidth) / 2 * 0.008
})
