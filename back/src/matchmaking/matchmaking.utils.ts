import { BACK_WIN_HEIGHT } from 'src/game/constants';
import { launchGame } from 'src/game/game';
import { v4 as uuid} from 'uuid';
import { matchesDto } from './matches.dto';
import { matchmakingDto } from './matchmaking.dto';

export function addUserMatchmakingList(payload: any, matchmakingList : matchmakingDto[]) {
    let newUserInMatchmaking = {
		pongReply: 0,
        ...payload
    }
	for (let user of matchmakingList) {
		if (user.login === payload.login) {
			user = newUserInMatchmaking
			return user;
		}
	}
    matchmakingList.push(newUserInMatchmaking);
    return newUserInMatchmaking;
}

export function gameStart(matchmakingList : matchmakingDto[], socketService : any, currentMatches : matchesDto[]) {
    const gameId = uuid()

    const playerOne = matchmakingList[0]
    const playerTwo = matchmakingList[1]
    socketService.socket.to(playerOne.socket).emit(`matchFound:`, gameId);
    socketService.socket.to(playerTwo.socket).emit(`matchFound:`, gameId);
    const newGame = generateNewGame(gameId, playerOne, playerTwo, currentMatches)
	launchGame(playerOne, playerTwo, socketService.socket, newGame, currentMatches)
    return [playerOne.socket, playerTwo.socket]
}

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