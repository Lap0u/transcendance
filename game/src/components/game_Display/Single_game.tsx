
const SingleGame = ({gameId} : gameProps) => {
    console.log(gameId);
    return (
        <h1 style={{ color: 'red'}}>Test {gameId}</h1>
    )
}

type gameProps = {
    gameId : string
}
export default SingleGame;