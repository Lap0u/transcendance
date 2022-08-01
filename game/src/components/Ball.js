import {playBar} from "./PlayBar";

export var ball = {
		dirX : -0.2,
		dirY : 0.25,
		speed : (window.innerHeight + window.innerWidth) / 2 * 0.0006,
		size : (window.innerHeight + window.innerWidth) / 2 * 0.01
		//		drawBall : drawBall()
    }

export const drawBall = (context, ballPosX, ballPosY, playBarPosY) => {

	// console.log('speed')
	// console.log(ball.speed)
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
	if (ballPosX  + ball.size <= 0 && ball.dirX < 0)
		ball.dirX *= -1;
	if (ballPosX  + ball.size >= context.canvas.width - playBar.posX && ball.dirX > 0)
		ball.dirX *= -1;
	  context.fillStyle = 'white';
	  context.beginPath();
	  context.arc(ballPosX, ballPosY, ball.size, 0, 2 * Math.PI);
	  context.closePath();
	  context.fill();
  }

window.addEventListener('resize', () => {
	ball.speed = (window.innerHeight + window.innerWidth) / 2 * 0.0006
	ball.size = (window.innerHeight + window.innerWidth) / 2 * 0.01
})
