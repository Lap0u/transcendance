//value 0 = enlarge / 1 = speed up / 2 = reduce / 3 = slow down 
//status 0 = in_delay / 1 = on_field 2 = active 
//target 0 = leftplayer 1 = rightPlayer

import { POWERUPDELAY } from "./constants";

function placePowerup(powerup: any) {
    powerup.value = 1;// randomise it
    powerup.status = 1;
    powerup.pos.x = 500;// randomise it
    powerup.pos.y = 250;// randomise it

}

function handlePowerupEnd(powerup : any) {
    powerup.delay = POWERUPDELAY
    powerup.status = 0;
    powerup.value = -1; //will crash if we make a coding mistake
    powerup.target = -1;
}

function handleDelay(powerup: any) {
    console.log(powerup)
    if (powerup.status === 0) {
        powerup.delay--
        if (powerup.delay === 0)
            placePowerup(powerup)
    }
    else if (powerup.status === 2) {
        powerup.delay--;
        if (powerup.delay === 0)
            handlePowerupEnd(powerup)
    }

}

function handlePickUp(ball: any, powerup : any) {

}

export function handlePowerUp(ball: any, powerup: any) {
    
    handleDelay(powerup);
    if (powerup.status === 1)
        handlePickUp(ball, powerup)
}