import { matchesDto } from "src/matchmaking/matches.dto";
import { resetBall } from "./ball.utils";
import { BACK_BALL_SIZE, BACK_WIN_HEIGHT, POWERUPDELAY, BACK_WIN_WIDTH, DEFAULT_BALL_SPEED, FRAME_RATE, GOAL_DELAY, PADDLE_HEIGHT, PADDLE_WIDTH, SCORE_LIMIT, STARTINGPOS_LEFT_X, STARTINGPOS_RIGHT_X } from "./constants";
import { createPowerup } from "./powerUp";

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
