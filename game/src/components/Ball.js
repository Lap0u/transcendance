export const drawBall = (context, ballPosX, ballPosY) => {
  //  const cvwidth = context.canvas.width
	const cvheight = context.canvas.height

		console.log(ballPosY)
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ballPosX, ballPosY, cvheight / 30, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}