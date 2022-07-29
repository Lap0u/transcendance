export class Ball{
	constructor(){
		this.dirX = -0.2;
		this.dirY = 0.25;
		this.speed = 1;
		this.size = 40;
    }

	drawBall = (context, ballPosX, ballPosY, playBarPosY) => {
		//  const cvwidth = context.canvas.width
		console.log(ballPosX)
		if (ballPosY  - (this.size / 2) <= 0  || 
		ballPosY  - (this.size / 2) >= context.canvas.height)
			this.dirY *= -1;
		if (ballPosX  - (this.size / 2) <= 0  || 
			ballPosX  - (this.size / 2) >= context.canvas.width)
				this.dirX *= -1;
		  const cvheight = context.canvas.height
		  console.log(ballPosY)
		  context.fillStyle = 'white';
		  context.beginPath();
		  context.arc(ballPosX, ballPosY, cvheight / 30, 0, 2 * Math.PI);
		  context.closePath();
		  context.fill();
	  }
}