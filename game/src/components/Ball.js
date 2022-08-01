import {playBar} from "./PlayBar";



export var ball = {
		dirX : -0.2,
		dirY : 0.25,
		speed : 1.5,
		size : 40,
//		drawBall : drawBall()
    }



export const drawBall = (context, ballPosX, ballPosY, playBarPosY) => {

	//change direction if ther ball if it hits a wall
	if (ballPosY  - ball.size <= 0  || 
		ballPosY  + ball.size  >= context.canvas.height)
		ball.dirY *= -1;
	if (Math.round(ballPosX  - ball.size) === Math.round(playBar.posX + playBar.width) &&
		(ballPosY >= playBarPosY && ballPosY <= playBarPosY + playBar.height))
		ball.dirX *= -1;
	if (ballPosX  + ball.size >= context.canvas.width - playBar.posX)
		this.dirX *= -1;
	  context.fillStyle = 'white';
	  context.beginPath();
	  context.arc(ballPosX, ballPosY, ball.size, 0, 2 * Math.PI);
	  context.closePath();
	  context.fill();
  }


window.addEventListener('resize', () => {
	ball.speed = (window.innerHeight * window.innerWidth) / 4500000;
	ball.size = (window.innerHeight * window.innerWidth) / 200000;
})


