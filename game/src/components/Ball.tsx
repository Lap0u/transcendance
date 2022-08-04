import {playBar} from "./PlayBar.tsx";
import {getRandomArbitrary} from './Canvas.tsx'

var today = new Date()
export var ball = {
		speed : (window.innerHeight + window.innerWidth) / 2 * 0.00015,
		angle: today.getMilliseconds() % 2 ? getRandomArbitrary(20, 160) : getRandomArbitrary(200, 340),
		dirX : 0,
		dirY : 0,
		size : (window.innerHeight + window.innerWidth) / 2 * 0.008
		//		drawBall : drawBall()
    }
	ball.dirX = Math.sin(ball.angle * (Math.PI/180))
	ball.dirY = Math.cos(ball.angle * (Math.PI/180))

export const resetBall = (player : boolean, ballPosX : any, ballPosY : any, ball: any) => {
	ballPosX.current = window.innerWidth / 2
	ballPosY.current = getRandomArbitrary(window.innerHeight / 15, window.innerHeight - window.innerHeight / 15)
	if (player === true)
		ball.angle = getRandomArbitrary(20, 160)
	else
		ball.angle =  getRandomArbitrary(200, 340)
	ball.dirX = Math.sin(ball.angle * (Math.PI/180))
	ball.dirY = Math.cos(ball.angle * (Math.PI/180))
	ball.speed = (window.innerHeight + window.innerWidth) / 2 * 0.00015
}

export const centerBall = (player : boolean, ballPosX : any, ballPosY : any, ball: any) => {
	ballPosX.current = window.innerWidth / 2
	ballPosY.current = window.innerHeight / 2
	if (player === true)
		ball.dirX = 1
	else
		ball.dirX = -1
	ball.dirY = 0
	ball.speed = (window.innerHeight + window.innerWidth) / 2 * 0.00015
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
			ball.angle = angle
			ball.dirX = Math.sin(angle * (Math.PI/180))
			ball.dirY = Math.cos(angle * (Math.PI/180))
			ball.speed *= 1.1 //acceleration de la balle a chaque touche
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
	ball.speed = (window.innerHeight + window.innerWidth) / 2 * 0.00015
	ball.size = (window.innerHeight + window.innerWidth) / 2 * 0.008
})
