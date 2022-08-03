import {playBar} from "./PlayBar.tsx";
import {getRandomArbitrary} from './Canvas.tsx'

var today = new Date()
export var ball = {
		speed : (window.innerHeight * window.innerWidth) /  10000000,
		dirX : (today.getMilliseconds() % 2) ? getRandomArbitrary(0.1, 0.9) : getRandomArbitrary(-0.9, -0.1) ,
		dirY : getRandomArbitrary(-1, 1) ,
		size : (window.innerHeight + window.innerWidth) / 2 * 0.008
		//		drawBall : drawBall()
    }

export const drawBall = (context : any, ballPosX : number, ballPosY : number, playBarPosY : number) => {

	// conso
	//change direction if ther ball if it hits a wall
	let hitpos : number = 0
	let barhit : number = 0
	let angle : number = 0
	if ((ballPosY  - ball.size <= 0 && ball.dirY < 0) || 
		(ballPosY  + ball.size  >= context.canvas.height && ball.dirY > 0)) //hitting top or left
		ball.dirY *= -1;
	if (Math.round(playBar.posX) <= Math.round(ballPosX  - ball.size)//hitting left playbar
		&& Math.round(ballPosX  - ball.size) <= Math.round(playBar.posX + playBar.width) &&
		(ballPosY >= playBarPosY && ballPosY <= playBarPosY + playBar.height) && ball.dirX < 0)
		{
			hitpos = ballPosY - playBarPosY
			barhit = (hitpos * 100 / playBar.height)
			barhit = barhit > 80 ? 80 : barhit
			barhit = barhit < 20 ? 20 : barhit
			angle = 180 - barhit * 180 / 100
			// angle = angle > 90 ? angle - 90 : 360 - angle //essayer mais marche pas
			console.log('sin , cos' ,Math.sin(angle), Math.cos(angle));
			
			console.log("before", ball.dirX, ball.dirY);
			
			console.log(hitpos, barhit, angle);
			ball.dirX = Math.sin(angle * (Math.PI/180))
			ball.dirY = Math.cos(angle * (Math.PI/180))
			console.log("after", ball.dirX, ball.dirY);
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
	ball.speed = (window.innerHeight * window.innerWidth) /  10000000
	ball.size = (window.innerHeight + window.innerWidth) / 2 * 0.008
})
