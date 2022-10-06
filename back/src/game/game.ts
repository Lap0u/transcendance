import { matchesDto } from 'src/matchmaking/matches.dto';
import { matchmakingDto } from 'src/matchmaking/matchmaking.dto';
import { handleBallMove } from './ball.utils';
import { handleWallBounce } from './bounce.utils';
import { FRAME_RATE, RECONNECTION_DELAY } from './constants';
import {
  checkGameEnd,
  checkGoal,
  clearGame,
  createGameState,
  handleEndGame,
  handlePing,
} from './game.utils';
import { handlePowerUp } from './powerUp';
import { ScoresService } from './Scores/scores.service';

export function launchGame(
  playerOne: matchmakingDto,
  playerTwo: matchmakingDto,
  socket: any,
  game: any,
  allGames: matchesDto[],
  scoreService: ScoresService,
) {
  const state = createGameState(game.settings);
  startGameInterval(
    playerOne.socket,
    playerTwo.socket,
    state,
    socket,
    game,
    allGames,
    scoreService,
  );
}

function startGameInterval(
  playerOne: string,
  playerTwo: string,
  state: any,
  socket: any,
  curGame: any,
  allGames: matchesDto[],
  scoreService: ScoresService,
) {
  let pongCounter: number = FRAME_RATE;
  const intervalId = setInterval(() => {
    //check connection with client every second
    pongCounter = handlePing(pongCounter, socket, playerOne, playerTwo);
    //
    const status: number = gameLoop(state, curGame);
    if (status === 1) {
      socket.emit(curGame.gameId, state);
    } else {
      handleEndGame(status, socket, state, curGame, scoreService);
      clearGame(curGame.gameId, allGames); //enleve la game de la liste, pose des problemes avec le front pour l'instant
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
  return curGame.gameId;
}

function gameLoop(state: any, curGames: any): number {
  if (state.frameDelay > 0) {
    state.frameDelay--;
    return 1;
  }
  curGames.playerOne.pongReply++;
  curGames.playerTwo.pongReply++;
  if (curGames.playerOne.pongReply >= FRAME_RATE * RECONNECTION_DELAY) {
    //playerOne left -> playerTWo won
    return -2;
  }
  if (curGames.playerTwo.pongReply >= FRAME_RATE * RECONNECTION_DELAY) {
    //playerTwo left -> playerOne won
    return -1;
  }
  const ball = state.ball;

  handleBallMove(ball, state.powerup, state.settings);

  state.leftPlayer.pos.y = curGames.playerOneY;
  state.rightPlayer.pos.y = curGames.playerTwoY;
  handleWallBounce(ball, state.leftPlayer, state.rightPlayer, state.powerup);
  handlePowerUp(ball, state.powerup, state.settings);
  state.ball = checkGoal(ball, state);
  return checkGameEnd(state);
}
