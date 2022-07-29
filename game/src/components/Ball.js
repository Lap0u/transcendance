export class Ball{
	constructor(){
		this.dirX = -0.2;
		this.dirY = 0.25;
		this.speed = 1;
		this.size = 40;
    }

	drawBall = (context, ballPosX, ballPosY, playBarPosY) => {
		//  const cvwidth = context.canvas.width
		//const cvheight = context.canvas.height

		//change direction if ther ball if it hits a wall
		if (ballPosY  - (this.size / 2) <= 0  || 
		ballPosY  + (this.size / 2) >= context.canvas.height)
			this.dirY *= -1;
		if (ballPosX  - (this.size / 2) <= 0  || 
			ballPosX  + (this.size / 2) >= context.canvas.width)
			this.dirX *= -1;

		  context.fillStyle = 'white';
		  context.beginPath();
		  context.arc(ballPosX, ballPosY, this.size, 0, 2 * Math.PI);
		  context.closePath();
		  context.fill();
	  }
}