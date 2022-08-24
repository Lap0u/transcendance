export const GameList = ({games} : any) => {
    console.log(`games`, games);
    return (
        <h1 style={{ color: 'red'}}>GameList</h1>
    )
}

type gameslistprops = {
    games: game,
}

type game = {
    gameId : string;
    playerOne : matchmakingDto;
    playerOneY : number;
    playerTwo :  matchmakingDto;
    playerTwoY : number;
}

type matchmakingDto = {
    id: string;
    socket: string;
}