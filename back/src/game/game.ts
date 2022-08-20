import {
    BACK_WIN_WIDTH,
    BACK_WIN_HEIGHT,
    FRAME_RATE,
    BACK_BALL_SIZE
} from './constants'

export function launchGame(playerOne: string, playerTwo : string, socket : any) {
    console.log('We got in');
    const state = createGameState();
    startGameInterval(playerOne, playerTwo, state, socket);
}

function handleWallBounce(ball: any) {
    // if (ball.pos.x - BALL_SIZE / 2)
}

function gameLoop(state: any) : number {
    let ball = state.ball
    let playerOne = state.playerOne
    let playerTwo = state.playerTwo
    var saveX = state.ball.pos.x
    var saveY = state.ball.pos.y

    handleWallBounce(ball)
    // handlePlayerBounce(ball)
    const dirX = Math.sin(ball.angle * (Math.PI/180))
    const dirY = Math.cos(ball.angle * (Math.PI/180))
    console.log('bef save state', saveY, ball.pos.y);

    if (ball.pos.x + BACK_BALL_SIZE < BACK_WIN_WIDTH)
        ball.pos.x += (dirX * ball.speed)
    if (ball.pos.y - BACK_BALL_SIZE > 0 &&
        ball.pos.y + BACK_BALL_SIZE < BACK_WIN_HEIGHT)
        ball.pos.y += (dirY * ball.speed)
    console.log('save state', saveY, ball.pos.y);
    
    if (saveX === ball.pos.x && saveY === ball.pos.y)
        return -1
    console.log('cos', dirY);
    
    // if (saveX === ball.pos.x || saveY === ball.pos.y)
    //     return -1
    state.ball = ball
    
    return 1
}

function startGameInterval(playerOne: string, playerTwo : string, state: any, socket : any)  {
    const intervalId = setInterval(() => {
        const status : number = gameLoop(state)
        console.log('bouclette', state);
        
        if (status !== -1) {
            socket.to(playerOne).to(playerTwo).emit('newGameState', state);
        } else {
            socket.to(playerOne).to(playerTwo).emit('gameOver')
            console.log('status', status);
            
            clearInterval(intervalId)
        }
    }, 1000 / FRAME_RATE)
}

function createGameState() {
    return {
        leftPlayer : {
            pos: {
                x: BACK_WIN_WIDTH / 20,
                y: BACK_WIN_HEIGHT / 2
            }
        },
        rightPlayer : {
            pos: {
                x: BACK_WIN_WIDTH / 20 * 19,
                y: BACK_WIN_HEIGHT / 2
            }
        },
        ball : {
            pos: {
                x: BACK_WIN_WIDTH / 2,
                y: BACK_WIN_HEIGHT / 2
            },
            speed: 4,
            angle : 0,
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
