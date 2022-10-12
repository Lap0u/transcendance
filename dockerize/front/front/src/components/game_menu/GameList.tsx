import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Game_list.css'

const OneGame = ({game, customGameValues} : singleGamesprops) => {
	
    const navigate = useNavigate();
    const joinGame = () => {
        navigate(`/singleGame/${game.gameId}`, {state: customGameValues});

    }
    return (
        <div className='one-game-line'>
            <Button onClick={joinGame} type="link">Join {game.gameId}</Button>
            <li className='one-game-list'>
                <span className='leftPlayer'>
                    {game.playerOne.accountUsername}
                </span> 
                vs 
                <span className='rightPlayer'>
                    {game.playerTwo.accountUsername}
                </span>
            </li>
        </div>
    )
}

export const GameList = ({games, customGameValues} : gameslistprops) => {
    const ListHeader = games.length === 0 ? "No games yet" : "Current games"
    const listItems = games.map((d) => <OneGame key={d.gameId} game={d} customGameValues={customGameValues} />) 
    return (
        <div className="game-list-container">
            <h1>{ListHeader}</h1>            
            <ul className='item-list'>
                {listItems}
            </ul>
        </div>
    )
}

export type gameslistprops = {
    games: game[],
	customGameValues: customProps
}

type singleGamesprops = {
    game: game,
	customGameValues: customProps
}

type customProps = {
	myColor: string,
	opponentColor: string,
	ballColor: string,
	background: string
}

export type game = {
    gameId : string;
    playerOne : matchmakingDto;
    playerOneY : number;
    playerTwo :  matchmakingDto;
    playerTwoY : number;
}

type matchmakingDto = {
    id: string;
    socket: string;
	accountUsername: string;
}
