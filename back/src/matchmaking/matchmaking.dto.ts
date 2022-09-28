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

export class quitMatchmakingDto {
  id: string;
  socket: string;
}
