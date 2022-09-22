import { BACK_WIN_HEIGHT, BACK_WIN_WIDTH } from "../../constants"

const POWERUPSCALE = 23
const STOPWATCHSCALE = 12
function drawStopwatch(context : any, sprite: ImageBitmap, target : number) {
	const puwidth = context.canvas.width / (STOPWATCHSCALE * 2	)
	const puheight = context.canvas.height / STOPWATCHSCALE
	let xpos = 0
	if (target === 0) { //left player has power up
			xpos = context.canvas.width / 12
	} else if (target === 0) {
			xpos = context.canvas.width / 12 * 11 - puwidth
	}
	context.drawImage(sprite, 128 * 4, 0, 128, 128,
		xpos, context.canvas.height / 15,
		puwidth, puheight)
}

export function drawPowerup(context : any, powerupSprite : any, powerState : any) {
	const puwidth = context.canvas.width / (POWERUPSCALE * 2)
	const puheight = context.canvas.height / POWERUPSCALE
	const puX = powerState.pos.x * context.canvas.width / BACK_WIN_WIDTH - puwidth / 2
	const puY = powerState.pos.y * context.canvas.height / BACK_WIN_HEIGHT - puheight / 2
	if (powerState.status === 1)
		context.drawImage(powerupSprite, powerState.value * 128, 0, 128, 128,
			puX, puY,
			puwidth, puheight)
	else if (powerState.status === 2)
		drawStopwatch(context, powerupSprite, powerState.target)
}
