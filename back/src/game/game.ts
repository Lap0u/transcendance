import { matchesDto } from 'src/matchmaking/matches.dto';
import { matchmakingDto } from 'src/matchmaking/matchmaking.dto';
import {
  FRAME_RATE,
  RECONNECTION_DELAY,
} from './constants';
import { checkGameEnd, checkGoal, clearGame, createGameState, handleEndGame, handlePing, handleWallBounce } from './game.utils';

export function launchGame(
  playerOne: matchmakingDto,
  playerTwo: matchmakingDto,
  socket: any,
  game: any,
  allGames: matchesDto[]
) {
  const state = createGameState();
  startGameInterval(playerOne.socket, playerTwo.socket, state, socket, game, allGames);
}

function startGameInterval(
  playerOne: string,
  playerTwo: string,
  state: any,
  socket: any,
  curGame: any,
  allGames: matchesDto[]

) {
  let pongCounter : number = FRAME_RATE
  const intervalId = setInterval(() => {
	//check connection with client every second
	pongCounter = handlePing(pongCounter, socket, playerOne, playerTwo)
	//
	const status: number = gameLoop(state, curGame);
	if (status === 1) {
	  socket.emit(curGame.gameId, state);
	} else {
	  console.log(status);
      handleEndGame(status, socket, playerOne, playerTwo, state)
	//   clearGame(curGame.gameId, allGames) //enleve la game de la liste, pose des problemes avec le front pour l'instant
	  clearInterval(intervalId);
	}
  }, 1000 / FRAME_RATE);
  return curGame.gameId
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
  if(curGames.playerOne.pongReply >= FRAME_RATE * RECONNECTION_DELAY) //playerOne left -> playerTWo won
  	return -2
  if(curGames.playerTwo.pongReply >= FRAME_RATE * RECONNECTION_DELAY) //playerTwo left -> playerOne won
 	return -1 
  const ball = state.ball;

  const dirX = Math.sin(ball.angle * (Math.PI / 180));
  const dirY = Math.cos(ball.angle * (Math.PI / 180));

  ball.pos.x += dirX * ball.speed;
  ball.pos.y += dirY * ball.speed;
  state.leftPlayer.pos.y = curGames.playerOneY;
  state.rightPlayer.pos.y = curGames.playerTwoY;
  handleWallBounce(ball, state.leftPlayer.pos.y, state.rightPlayer.pos.y);
  state.ball = checkGoal(ball, state);
  return checkGameEnd(state)
}
