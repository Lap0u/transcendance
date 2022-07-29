export const drawPlayBar = (context,  playBarPosY) => {
		const playBarPosX = 50;
		const playBarWidth = 20;
		const playBarHeight = 70;
		context.fillStyle = 'white';
		context.fillRect(playBarPosX, playBarPosY - (playBarHeight / 2), playBarWidth, playBarHeight);
		drawPlayBar2(context, context.canvas)
}

export const getMousePosY = (event, canvas) => {
	var rect = canvas.getBoundingClientRect();
	return ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
}

export const drawPlayBar2 = (context) => {
	const playBarPosX = context.canvas.width - 50;
	const playBarWidth = 20;
	const playBarHeight = context.canvas.height;
	context.fillStyle = 'white';
	context.fillRect(playBarPosX, 0, playBarWidth, playBarHeight);	

}
export default drawPlayBar

