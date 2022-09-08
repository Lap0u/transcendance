import { matchmakingDto } from 'src/matchmaking/matchmaking.dto';
import {
  FRAME_RATE,
  NO_NEW_FRAME,
  RECONNECTION_DELAY,
} from './constants';
import { checkGoal, createGameState, handleWallBounce } from './game.utils';

export function launchGame(
  playerOne: matchmakingDto,
  playerTwo: matchmakingDto,
  socket: any,
  game: any,
) {
  const state = createGameState();
  startGameInterval(playerOne.socket, playerTwo.socket, state, socket, game);
}

function startGameInterval(
  playerOne: string,
  playerTwo: string,
  state: any,
  socket: any,
  curGame: any,
) {
  let pongCounter : number = FRAME_RATE
  const intervalId = setInterval(() => {
	//check connection with client every second
	pongCounter--
	if (pongCounter === 0) {
		socket.to(playerOne).emit(`ping`)
		socket.to(playerTwo).emit(`ping`)
		pongCounter = FRAME_RATE
	}
	//
	const status: number = gameLoop(state, curGame);
	if (status === 1) {
	  socket.emit(curGame.gameId, state);
	} else if (status !== NO_NEW_FRAME) {
	  socket.emit('gameOver');
	  clearInterval(intervalId);
	}
  }, 1000 / FRAME_RATE);
}

function gameLoop(
  state: any,
  curGames: any,
): number {
  if (state.frameDelay > 0) {
    state.frameDelay--;
    return 1;
  }
  curGames.playerOne.pongReply++
  curGames.playerTwo.pongReply++
  if(curGames.playerOne.pongReply >= FRAME_RATE * RECONNECTION_DELAY || 
	curGames.playerTwo.pongReply >= FRAME_RATE * RECONNECTION_DELAY)
	console.log('someone left');
	
  const ball = state.ball;

  const dirX = Math.sin(ball.angle * (Math.PI / 180));
  const dirY = Math.cos(ball.angle * (Math.PI / 180));

  ball.pos.x += dirX * ball.speed;
  ball.pos.y += dirY * ball.speed;
  state.leftPlayer.pos.y = curGames.playerOneY;
  state.rightPlayer.pos.y = curGames.playerTwoY;
  handleWallBounce(ball, state.leftPlayer.pos.y, state.rightPlayer.pos.y);
  state.ball = checkGoal(ball, state);
  return 1;
}
