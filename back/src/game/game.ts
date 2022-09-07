import { matchmakingDto } from 'src/matchmaking/matchmaking.dto';
import {
    FRAME_RATE,
    NO_NEW_FRAME,
} from './constants'
import { checkGoal, createGameState, handleWallBounce } from './gameUtils';


function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function startGameInterval(playerOne: string, playerTwo : string, state: any, socket : any, curGame : any)  {
	const intervalId = setInterval(() => {
		const status : number = gameLoop(state, playerOne, playerTwo, socket, curGame)
		
		if (status === 1) {
			socket.emit(curGame.gameId, state);
			
		} else if (status !== NO_NEW_FRAME){
			socket.emit('gameOver')
			clearInterval(intervalId)
		}
	}, 1000 / FRAME_RATE)// run FRAME_RATE times per second
}

function gameLoop(
  state: any,
  playerOneId: string,
  playerTwoId: string,
  socket: any,
  curGames: any,
): number {
  if (state.frameDelay > 0) {
    state.frameDelay--;
    return 1;
  }
  const ball = state.ball;
  const playerOnePaddle = state.playerOne;
  const playerTwoPaddle = state.playerTwo;

    if (state.frameDelay > 0){
        state.frameDelay--;
        return 1;
    }
    let ball = state.ball

	//move the ball
    const dirX = Math.sin(ball.angle * (Math.PI/180))
    const dirY = Math.cos(ball.angle * (Math.PI/180))
        
    ball.pos.x += (dirX * ball.speed)
    ball.pos.y += (dirY * ball.speed)

	//update paddle positions
	state.leftPlayer.pos.y = curGames.playerOneY
	state.rightPlayer.pos.y = curGames.playerTwoY
    handleWallBounce(ball, state.leftPlayer.pos.y, state.rightPlayer.pos.y)
    state.ball= checkGoal(ball, state)
    return 1
}
