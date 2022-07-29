export const drawBall = (context) => {
    const cvwidth = context.canvas.width
	const cvheight = context.canvas.height

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(cvwidth / 10, cvheight / 10, cvheight / 30, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}