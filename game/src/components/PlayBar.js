
export var playBar = {
	posX :  window.innerWidth / 30,
	width :  window.innerWidth / 100,
	height : window.innerHeight / 20
}


export const resizePlayBar = () => {
	//refresh the dimensions of the bar according to the size of the window
	playBar.posX = window.innerWidth / 30
	playBar.width =  window.innerWidth / 100
	playBar.height = window.innerHeight / 20
}


export const drawPlayBar = (context,  playBarPosY) => {
		context.fillStyle = 'white';
		context.fillRect(playBar.posX, playBarPosY,
			playBar.width, playBar.height);
		drawPlayBar2(context, context.canvas)
}

export const getMousePosY = (event, canvas) => {
	var rect = canvas.getBoundingClientRect();
	return ((((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height)
		- (playBar.height/ 2));
}

export const drawPlayBar2 = (context) => {
	const posX = window.innerWidth - playBar.posX
	context.fillStyle = 'white';
	context.fillRect(posX, 0, playBar.width, context.canvas.height);	

}
export default drawPlayBar

