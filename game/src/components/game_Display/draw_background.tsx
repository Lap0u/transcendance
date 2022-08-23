export const drawBackground = (context : any) => {
	context.fillStyle = '#000055'
	context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    drawDashedLine(context)
    drawMidLine(context)//line rouge horizontale
}

const drawDashedLine = (context : any) => {
	const cvwidth = context.canvas.width
	const cvheight = context.canvas.height

	context.lineWidth = 5;
	context.strokeStyle = 'white'
	context.lineCap = 'square'
	context.setLineDash([5, 10]);/*dashes are 5px and spaces are 3px*/
	context.beginPath();
	context.moveTo(cvwidth / 2, 0);
	context.lineTo(cvwidth / 2, cvheight);
	context.stroke();
}

function drawMidLine (context : any) {
    context.beginPath();
    context.moveTo(0, context.canvas.height / 2);
    context.lineTo(context.canvas.width, context.canvas.height / 2);
    context.strokeStyle = '#ff0000';
    context.stroke();
}
