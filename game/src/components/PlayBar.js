export const drawPlayBar = (context, playBarPosY) => {
		const playBarPosX = 20;
		const playBarWidth = 2;
		const playBarHeight = 18;
		context.fillStyle = 'white';
		context.fillRect(playBarPosX, playBarPosY - (playBarHeight / 2), playBarWidth, playBarHeight);
}

export function getMousePosY(event, canvas) {
	var rect = canvas.getBoundingClientRect();
	return ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
}

export default drawPlayBar

