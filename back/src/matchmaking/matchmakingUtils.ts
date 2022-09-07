import { v4 as uuid} from 'uuid';
import { launchGame} from '../game/game'
import { matchmakingDto } from './matchmaking.dto';
import { BACK_WIN_HEIGHT } from 'src/game/constants';
import { matchesDto } from './matches.dto';

function generateNewGame (gameId :string, playerOne : matchmakingDto, playerTwo : matchmakingDto, currentMatches : matchesDto[]) {
	const newGame = {
		gameId : gameId,
		playerOne : playerOne,
		playerTwo : playerTwo,
		playerOneY : BACK_WIN_HEIGHT / 2,
		playerTwoY : BACK_WIN_HEIGHT / 2
	}
	currentMatches.push(newGame)
	return newGame
}

export function addUserMatchmakingList(payload: any, matchmakingList : matchmakingDto[]) {
    let newUserInMatchmaking = {
        id: uuid(),
        socket: payload.id, //ne marchera pas quand il y aura des spectateurs
        ...payload
    }
    matchmakingList.push(newUserInMatchmaking);
    return newUserInMatchmaking;
}

export function gameStart(matchmakingList : matchmakingDto[], socketService : any, currentMatches : matchesDto[], quitMatchmaking) {
    const gameId = uuid()

    const playerOne = matchmakingList[0]
    const playerTwo = matchmakingList[1]
    socketService.socket.to(playerOne.socket).emit(`matchFound:`, gameId);
    socketService.socket.to(playerTwo.socket).emit(`matchFound:`, gameId);
    const newGame = generateNewGame(gameId, playerOne, playerTwo, currentMatches)
    launchGame(playerOne, playerTwo, socketService.socket, newGame)
    return [playerOne.socket, playerTwo.socket]
}