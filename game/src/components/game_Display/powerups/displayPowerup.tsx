const POWERUPSCALE = 23

export function drawPowerup(context : any, powerup : any, powerState : any) {
	let puwidth = context.canvas.width / (POWERUPSCALE * 2	)
	let puheight = context.canvas.height / POWERUPSCALE
	context.drawImage(powerup, 0, 0, 128, 128,
		context.canvas.width / 2 - puwidth / 2, context.canvas.height / 2 - puheight / 2,
		puwidth, puheight)	
}
