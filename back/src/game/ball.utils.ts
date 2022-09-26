export function handleBallMove(ball: any, powerup: any) {
	const dirX = Math.sin(ball.angle * (Math.PI / 180));
	const dirY = Math.cos(ball.angle * (Math.PI / 180));

	let ballAccel = 1;
	if (powerup.status === 2) {
		if (powerup.value === 1 && ball.angle < 180 && powerup.target === 0)
			ballAccel = 1.5;
		else if (powerup.value === 1 && ball.angle > 180 && powerup.target === 1)
			ballAccel = 1.5;
		else if (powerup.value === 3 && ball.angle < 180 && powerup.target === 1)
			ballAccel = 0.75;
		else if (powerup.value === 3 && ball.angle > 180 && powerup.target === 0)
			ballAccel = 0.75;
	}
	ball.pos.x += dirX * ball.speed * ballAccel;
	ball.pos.y += dirY * ball.speed * ballAccel;
}