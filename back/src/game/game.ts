import {
    BACK_WIN_WIDTH,
    BACK_WIN_HEIGHT,
    FRAME_RATE
} from './constants'

export function launchGame(playerOne: string, playerTwo : string, socket : any) {
    console.log('We got in');
    const state = createGameState();
    startGameInterval(playerOne, playerTwo, state, socket);
}

function gameLoop(state: any) : number {
    state = state
    return 1
}

function startGameInterval(playerOne: string, playerTwo : string, state: any, socket : any)  {
    const intervalId = setInterval(() => {
        const status : number = gameLoop(state)
        console.log('bouclette');
        
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
            }
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
