import { matchesDto } from "src/matchmaking/matches.dto";
import { BACK_BALL_SIZE, BACK_WIN_HEIGHT, POWERUPDELAY, BACK_WIN_WIDTH, DEFAULT_BALL_SPEED, FRAME_RATE, GOAL_DELAY, PADDLE_HEIGHT, PADDLE_WIDTH, SCORE_LIMIT, STARTINGPOS_LEFT_X, STARTINGPOS_RIGHT_X } from "./constants";
import { resetPowerup } from "./powerUp";

export function getRandomArbitrary(min : number, max : number) {
    return Math.random() * (max - min) + min;
  }

export function clearGame(gameId : string, allGames : matchesDto[]) {
	for (let i = 0; i < allGames.length; i++) {
	if (allGames[i].gameId === gameId) {
			allGames.splice(i, 1)
			return
		}
	}
}

function paddleBounceLeft(ball: any, leftPosY: number) {
const hitpos = ball.pos.y - leftPosY + PADDLE_HEIGHT / 2;

let barhit = (hitpos * 100) / PADDLE_HEIGHT;
barhit = barhit > 80 ? 80 : barhit;
barhit = barhit < 20 ? 20 : barhit;

ball.angle = 180 - (barhit * 180) / 100;
}

function paddleBounceRight(ball: any, rightPosY: number) {
const hitpos = ball.pos.y - rightPosY + PADDLE_HEIGHT / 2;
let barhit = (hitpos * 100) / PADDLE_HEIGHT;
barhit = barhit > 80 ? 80 : barhit;
barhit = barhit < 20 ? 20 : barhit;
ball.angle = 180 + (barhit * 180) / 100;
}

export function handleWallBounce(ball: any, leftPosY : number, rightPosY :number) {
    if(ball.pos.x + BACK_BALL_SIZE > STARTINGPOS_RIGHT_X && ball.pos.x + BACK_BALL_SIZE < STARTINGPOS_RIGHT_X + (PADDLE_WIDTH / 2) && //check si la balle depasse au maximum de la moitie de la width
        ball.pos.y > rightPosY - PADDLE_HEIGHT / 2 && ball.pos.y < rightPosY + PADDLE_HEIGHT / 2 &&
        ball.angle < 180) { //hit right
            paddleBounceRight(ball, rightPosY)
            ball.speed *= 1.2
    } else if(ball.pos.x - BACK_BALL_SIZE <= STARTINGPOS_LEFT_X + PADDLE_WIDTH && ball.pos.x - BACK_BALL_SIZE > (STARTINGPOS_LEFT_X + PADDLE_WIDTH / 2) && //check si la balle depasse au maximum de la moitie de la width
        ball.pos.y > leftPosY - PADDLE_HEIGHT / 2 && ball.pos.y < leftPosY + PADDLE_HEIGHT / 2 &&
        ball.angle > 180) { //hit left
            paddleBounceLeft(ball, leftPosY)
            ball.speed *= 1.2
        } else if (ball.pos.y - (BACK_BALL_SIZE) <= 0 && ball.angle > 90 && ball.angle < 270) { //hit top
            ball.angle = (180 - ball.angle) % 360
    } else if ( ball.pos.y + (BACK_BALL_SIZE) >= BACK_WIN_HEIGHT && (ball.angle > 270 || ball.angle < 90)) { //hit bottom
        ball.angle = (180 - ball.angle) % 360
    
    }
    if (ball.angle < 0) //repasse l'angle en positif pour que les protections double rebond fonctionnent
        ball.angle = 360 - (ball.angle * -1)
}

export function checkGoal(ball: any, state: any) {
if (ball.pos.x <= 0) {
	state.score.playerTwo += 1;
	ball = resetBall(0);
	state.frameDelay = GOAL_DELAY;
} else if (ball.pos.x >= BACK_WIN_WIDTH) {
	state.score.playerOne += 1;
	ball = resetBall(1);
	state.frameDelay = GOAL_DELAY;
}
return ball;
}

export function checkGameEnd(state: any) {
	if (state.score.playerOne >= SCORE_LIMIT)
		return -1
	if (state.score.playerTwo >= SCORE_LIMIT)
		return -2
	return 1
}

function resetBall(side : number) {
    
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

export function handlePing(pongCounter : number, socket : any,  playerOne: string, playerTwo: string) {
	pongCounter--
	if (pongCounter === 0) {
		socket.to(playerOne).emit(`ping`)
		socket.to(playerTwo).emit(`ping`)
		pongCounter = FRAME_RATE
	}
	return pongCounter
}

export function handleEndGame(gameStatus: number, socket : any, playerOne: string, playerTwo: string, state: any) {
	if (gameStatus === -1) {
		socket.to(playerOne).emit('winner', {gameResult: 'You won', gameState: state})
		socket.to(playerTwo).emit('winner', {gameResult: 'You lost', gameState: state})
		socket.emit('winner', {gameResult: `${playerTwo} won`, gameState: state})
	}
	else if (gameStatus === -2) {
		socket.to(playerOne).emit('winner', {gameResult: 'You lost', gameState: state})
		socket.to(playerTwo).emit('winner', {gameResult: 'You won', gameState: state})
		socket.emit('winner', {gameResult: `${playerTwo} won`, gameState: state})
	}
}
function createPowerup(){
	return {
		value: -1, //crash si on essaye de le draw
		status: 0,
		delay: POWERUPDELAY,
		target: 0,
		pos: {
			x: 0,
			y: 0,
		}
	}
}

export function createGameState() {
    return {
        powerup : createPowerup(),
        leftPlayer : {
            scale: 1,
			pongReply: 0,
            pos: {
                x: STARTINGPOS_LEFT_X,
                y: BACK_WIN_HEIGHT / 2
            }
        },
        rightPlayer : {
            scale: 1,
			pongReply: 0,
            pos: {
                x: STARTINGPOS_RIGHT_X,
                y: BACK_WIN_HEIGHT / 2
            }
        },
        ball : resetBall(2)
        ,
        score :{
            playerOne: 0,
            playerTwo: 0,
        },
        frameDelay: 0
    }
}
