//value 0 = enlarge / 1 = speed up / 2 = reduce / 3 = slow down 
//status 0 = in_delay / 1 = on_field 2 = active 
//target 0 = leftplayer 1 = rightPlayer

import { BACK_BALL_SIZE, BACK_WIN_HEIGHT, BACK_WIN_WIDTH, POWERUPDELAY, POWERUPDURATION, POWERUPMARGIN, POWERUPSCALE } from "./constants";
import { getRandomArbitrary } from "./game.utils";

function placePowerup(powerup: any) {
    powerup.value = 3
    // powerup.value = Math.round(getRandomArbitrary(0, 3));
	
	powerup.status = 1;
    powerup.pos.x = Math.round(getRandomArbitrary(POWERUPMARGIN, BACK_WIN_WIDTH - POWERUPMARGIN));
    powerup.pos.y = Math.round(getRandomArbitrary(POWERUPMARGIN / 2, BACK_WIN_HEIGHT - POWERUPMARGIN / 2));
}

export function resetPowerup(powerup: any) {	
	powerup.value = -1;
	powerup.status = 0;
	powerup.delay = POWERUPDELAY;
	powerup.target = 0;
	powerup.pos.x = 0;
	powerup.pos.y = 0;
}

function handleDelay(powerup: any) {
    if (powerup.status === 0) {
        powerup.delay--
        if (powerup.delay === 0)
            placePowerup(powerup)
    }
    else if (powerup.status === 2) {
        powerup.delay--;
        if (powerup.delay < 0)
            resetPowerup(powerup)
    }

}

const checkCollision = (p1x : number, p1y : number, r1 : number, p2x : number, p2y : number, r2 : number) => {
    return ((r1 + r2) ** 2 > (p1x - p2x) ** 2 + (p1y - p2y) ** 2)
}

function playerCaughtPowerup(ballAngle: number, powerup : any) {
	if (ballAngle < 180) {
		powerup.target = 0
	} else {
		powerup.target = 1
	}
	powerup.status = 2
	powerup.delay = POWERUPDURATION
	if (powerup.value === 3)
		powerup.delay *= 2
}

function handlePickUp(ball: any, powerup : any) {
    if (checkCollision(ball.pos.x, ball.pos.y, BACK_BALL_SIZE / 2.5, 
        powerup.pos.x, powerup.pos.y, POWERUPSCALE / 2.5)) {
            playerCaughtPowerup(ball.angle, powerup)
        }
}

export function handlePowerUp(ball: any, powerup: any) {
    
    handleDelay(powerup);
    if (powerup.status === 1)
        handlePickUp(ball, powerup)
}