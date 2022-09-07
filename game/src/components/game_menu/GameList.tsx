import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Game_list.css'

const OneGame = ({game} : singleGamesprops) => {
	
    const navigate = useNavigate();
    const joinGame = () => {
        navigate(`/singleGame/${game.gameId}`);

    }
    return (
        <div className='one-game-line'>
            <Button onClick={joinGame} type="link">Join {game.gameId}</Button>
            <li className='one-game-list'>
                <span className='leftPlayer'>
                    {game.playerOne.id}
                </span> 
                vs 
                <span className='rightPlayer'>
                    {game.playerTwo.id}
                </span>
            </li>
                
        
        </div>
    )
}

export const GameList = ({games} : gameslistprops) => {
    const ListHeader = games.length === 0 ? "No games yet" : "Current games"
    const listItems = games.map((d) => <OneGame key ={d.gameId} game={d} />) 
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
}

type singleGamesprops = {
    game: game,
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
}
