import {
    WIN_WIDTH,
    WIN_HEIGHT,
    FRAME_RATE
} from './constants'

export function launchGame(playerOne: string, playerTwo : string, socket : any) {
    console.log('We got in');
    const state = createGameState();
    startGameInterval(playerOne, playerTwo, state, socket);
}

function gameLoop(state: any) : number {
    console.log('we send loop');
    
    return 2
}

function startGameInterval(playerOne: string, playerTwo : string, state: any, socket : any)  {
    const intervalId = setInterval(() => {
        const status : number = gameLoop(state)
        if (status !== -1) {
            socket.to(playerOne).to(playerTwo).emit('gameState', JSON.stringify(state));
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
                x: 100,
                y: 300
            }
        },
        rightPlayer : {
            pos: {
                x: 100,
                y: 300
            }
        },
        ball : {
            pos: {
                x: WIN_WIDTH / 2,
                y: WIN_HEIGHT / 2
            }
        },
        scale : {
            width: WIN_WIDTH,
            heihgt: WIN_HEIGHT
        }
    }
}
