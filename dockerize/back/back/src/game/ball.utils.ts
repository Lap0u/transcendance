import { BACK_WIN_HEIGHT, BACK_WIN_WIDTH, DEFAULT_BALL_SPEED } from "./constants"
import { getRandomArbitrary } from "./game.utils"

export function resetBall(side : number) {
    
    var today = new Date()

    let angle = 0
    if (side === 0) //right start
        angle = Math.round(getRandomArbitrary(20, 160))
    else if (side === 1) // eft start
        angle = Math.round(getRandomArbitrary(200, 340))
    else if (side === 2) // random start
        angle = Math.round(today.getMilliseconds() % 2 ? getRandomArbitrary(20, 160) : getRandomArbitrary(200, 340))
    let ball = {
        pos: {
            x: BACK_WIN_WIDTH / 2,
            y: BACK_WIN_HEIGHT / 2
        },
        speed: DEFAULT_BALL_SPEED,
        angle : angle,
    }
    return ball
}


export function handleBallMove(ball: any, powerup: any, settings : any) {
	const dirX = Math.sin(ball.angle * (Math.PI / 180));
	const dirY = Math.cos(ball.angle * (Math.PI / 180));
    let ballAccel : number
    if (settings)
        ballAccel = settings.ball_speed / 100 - 1;
    else ballAccel = 0
	if (powerup.status === 2) {
		if (powerup.value === 1 && ball.angle < 180 && powerup.target === 0)
			ballAccel += 0.5;
		else if (powerup.value === 1 && ball.angle > 180 && powerup.target === 1)
			ballAccel += 0.5;
		else if (powerup.value === 3 && ball.angle < 180 && powerup.target === 1)
			ballAccel += -0.5;
		else if (powerup.value === 3 && ball.angle > 180 && powerup.target === 0)
			ballAccel += -0.5;
	}
	ball.pos.x += dirX * (ball.speed + ballAccel);
	ball.pos.y += dirY * (ball.speed + ballAccel);
}