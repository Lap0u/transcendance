import { matchmakingDto } from 'src/matchmaking/matchmaking.dto';
import {
    BACK_WIN_WIDTH,
    BACK_WIN_HEIGHT,
    FRAME_RATE,
    BACK_BALL_SIZE,
    DEFAULT_BALL_SPEED,
    STARTINGPOS_LEFT_X,
    STARTINGPOS_RIGHT_X,
    PADDLE_HEIGHT,
} from './constants'

export function launchGame(playerOne: matchmakingDto, playerTwo : matchmakingDto, socket : any, game: any) {
    const state = createGameState();
    startGameInterval(playerOne.socket, playerTwo.socket, state, socket, game);
}

function handleWallBounce(ball: any, leftPosY : number, rightPosY :number) {
    if(ball.pos.x + BACK_BALL_SIZE > STARTINGPOS_RIGHT_X && 
        ball.pos.y > rightPosY - PADDLE_HEIGHT / 2 && ball.pos.y < rightPosY + PADDLE_HEIGHT / 2 &&
        ball.angle < 180) { //hit right
        ball.angle = (360 - ball.angle) % 360 
    } else if(ball.pos.x - BACK_BALL_SIZE <= STARTINGPOS_LEFT_X && 
        ball.pos.y > leftPosY - PADDLE_HEIGHT / 2 && ball.pos.y < leftPosY + PADDLE_HEIGHT / 2 &&
        ball.angle > 180) { //hit left
        ball.angle = (360 - ball.angle) % 360
    } else if (ball.pos.y - (BACK_BALL_SIZE) <= 0 && ball.angle > 90 && ball.angle < 270) { //hit top
        ball.angle = (180 - ball.angle) % 360
    } else if ( ball.pos.y + (BACK_BALL_SIZE) >= BACK_WIN_HEIGHT && (ball.angle > 270 || ball.angle < 90)) { //hit bottom
        ball.angle = (180 - ball.angle) % 360
    
    }
    if (ball.angle < 0) //repasse l'angle en positif pour que les protections double rebond fonctionnent
        ball.angle = 360 - (ball.angle * -1)
}


function gameLoop(state: any, playerOneId : string, playerTwoId : string, socket : any, curGames: any) : number {
    let ball = state.ball
    let playerOnePaddle = state.playerOne
    let playerTwoPaddle = state.playerTwo

    const dirX = Math.sin(ball.angle * (Math.PI/180))
    const dirY = Math.cos(ball.angle * (Math.PI/180))
    
    
    ball.pos.x += (dirX * ball.speed)
    ball.pos.y += (dirY * ball.speed)
    state.leftPlayer.pos.y = curGames[0].playerOneY
    state.rightPlayer.pos.y = curGames[0].playerTwoY
    handleWallBounce(ball, state.leftPlayer.pos.y, state.rightPlayer.pos.y)
    state.ball = ball 
    return 1
}

function startGameInterval(playerOne: string, playerTwo : string, state: any, socket : any, curGames : any)  {
    const intervalId = setInterval(() => {
        const status : number = gameLoop(state, playerOne, playerTwo, socket, curGames)
        // console.log('bouclette', state);
        if (status !== -1) {
            socket.to(playerOne).to(playerTwo).emit('newGameState', state);
            
        } else {
            socket.to(playerOne).to(playerTwo).emit('gameOver')
            
            clearInterval(intervalId)
        }
    }, 1000 / FRAME_RATE)
}

function createGameState() {
    return {
        leftPlayer : {
            pos: {
                x: STARTINGPOS_LEFT_X,
                y: BACK_WIN_HEIGHT / 2
            }
        },
        rightPlayer : {
            pos: {
                x: STARTINGPOS_RIGHT_X,
                y: BACK_WIN_HEIGHT / 2
            }
        },
        ball : {
            pos: {
                x: BACK_WIN_WIDTH / 2,
                y: BACK_WIN_HEIGHT / 2
            },
            speed: DEFAULT_BALL_SPEED,
            angle : -140,
        },
        score :{
            playerOne: 0,
            playerTwo: 0,
        },
        scale : {
            width: BACK_WIN_WIDTH,
            heihgt: BACK_WIN_HEIGHT
        }
    }
}
