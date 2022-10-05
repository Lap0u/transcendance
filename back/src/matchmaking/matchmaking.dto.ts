export class joinMatchmakingDto {
  id: string;
  socket: string;
}

export class matchmakingDto {
  login: string;
  accountUsername: string;
  socket: string;
  pongReply: number;
}

export class customMatchDto {
	playerOne: string;
	playerTwo: string;
	gameId: string;
}

export class quitMatchmakingDto {
  id: string;
  socket: string;
}

export class customGameDto {
	playerOne: matchmakingDto;
	playerTwo: matchmakingDto;
	settings: any;
}
