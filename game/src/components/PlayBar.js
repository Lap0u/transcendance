export const drawPlayBar = (context,  playBarPosY) => {
		const playBarPosX = 20;
		const playBarWidth = 2;
		const playBarHeight = 18;
		context.fillStyle = 'white';
		context.fillRect(playBarPosX, playBarPosY - (playBarHeight / 2), playBarWidth, playBarHeight);
		drawPlayBar2(context, context.canvas)
}

export const getMousePosY = (event, canvas) => {
	var rect = canvas.getBoundingClientRect();
	return ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
}

export const drawPlayBar2 = (context, canvas) => {
	const playBarPosX = canvas.width - 20;
	const playBarWidth = 2;
	const playBarHeight = canvas.height;
	context.fillStyle = 'white';
	context.fillRect(playBarPosX, 0, playBarWidth, playBarHeight);	

}
export default drawPlayBar

