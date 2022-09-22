//value 0 = enlarge / 1 = speed up / 2 = reduce / 3 = slow down 
//status 0 = in_delay / 1 = on_field 2 = active 
//target 0 = leftplayer 1 = rightPlayer

import { exit } from "process";
import { BACK_BALL_SIZE, POWERUPDELAY, POWERUPSCALE } from "./constants";

function placePowerup(powerup: any) {
    powerup.value = 1;// randomise it
    powerup.status = 1;
    powerup.pos.x = 300;// randomise it
    powerup.pos.y = 150;// randomise it

}

export function resetPowerup() {
    return {
        value: -1, //crash si on essaye de le draw
        status: 0,
        delay: 10,
        target: 0,
        pos: {
            x: 0,
            y: 0,
        }
    }
}

function handleDelay(powerup: any) {
    if (powerup.status === 0) {
        powerup.delay--
        if (powerup.delay === 0)
            placePowerup(powerup)
    }
    else if (powerup.status === 2) {
        powerup.delay--;
        if (powerup.delay === 0)
            resetPowerup()
    }

}

const checkCollision = (p1x : number, p1y : number, r1 : number, p2x : number, p2y : number, r2 : number) => {
    return ((r1 + r2) ** 2 > (p1x - p2x) ** 2 + (p1y - p2y) ** 2)
}

function handlePickUp(ball: any, powerup : any) {
    if (checkCollision(ball.pos.x, ball.pos.y, BACK_BALL_SIZE / 2.5, 
        powerup.pos.x, powerup.pos.y, POWERUPSCALE / 2.5)) {
            console.log(ball);
            console.log(powerup);
            exit()
        }
}

export function handlePowerUp(ball: any, powerup: any) {
    
    handleDelay(powerup);
    if (powerup.status === 1)
        handlePickUp(ball, powerup)
}