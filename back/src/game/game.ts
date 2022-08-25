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
    PADDLE_WIDTH,
} from './constants'

function getRandomArbitrary(min : number, max : number) {
    return Math.random() * (max - min) + min;
  }

export function launchGame(playerOne: matchmakingDto, playerTwo : matchmakingDto, socket : any, game: any) {
    const state = createGameState();
    startGameInterval(playerOne.socket, playerTwo.socket, state, socket, game);
}

function paddleBounceLeft(ball: any, leftPosY : number)
{
    let   hitpos = ball.pos.y - leftPosY + (PADDLE_HEIGHT / 2)
    
    let barhit = (hitpos * 100) / PADDLE_HEIGHT
    barhit = barhit > 80 ? 80 : barhit
    barhit = barhit < 20 ? 20 : barhit
    
    ball.angle = 180 - barhit * 180 / 100
    
}

function paddleBounceRight(ball: any, rightPosY : number)
{
    let   hitpos = ball.pos.y - rightPosY + (PADDLE_HEIGHT / 2)
    let barhit = (hitpos * 100) / PADDLE_HEIGHT
    barhit = barhit > 80 ? 80 : barhit
    barhit = barhit < 20 ? 20 : barhit
    ball.angle = 180 + barhit * 180 / 100
}

function handleWallBounce(ball: any, leftPosY : number, rightPosY :number) {
    if(ball.pos.x + BACK_BALL_SIZE > STARTINGPOS_RIGHT_X && ball.pos.x + BACK_BALL_SIZE < STARTINGPOS_RIGHT_X + (PADDLE_WIDTH / 2) && //check si la balle depasse au maximum de la moitie de la width
        ball.pos.y > rightPosY - PADDLE_HEIGHT / 2 && ball.pos.y < rightPosY + PADDLE_HEIGHT / 2 &&
        ball.angle < 180) { //hit right
            paddleBounceRight(ball, rightPosY)
            ball.speed *= 1.2
    } else if(ball.pos.x - BACK_BALL_SIZE <= STARTINGPOS_LEFT_X + PADDLE_WIDTH && ball.pos.x - BACK_BALL_SIZE > (STARTINGPOS_LEFT_X + PADDLE_WIDTH / 2) && //check si la balle depasse au maximum de la moitie de la width
        ball.pos.y > leftPosY - PADDLE_HEIGHT / 2 && ball.pos.y < leftPosY + PADDLE_HEIGHT / 2 &&
        ball.angle > 180) { //hit left
            paddleBounceLeft(ball, leftPosY)
            ball.speed *= 1.2
        } else if (ball.pos.y - (BACK_BALL_SIZE) <= 0 && ball.angle > 90 && ball.angle < 270) { //hit top
            ball.angle = (180 - ball.angle) % 360
    } else if ( ball.pos.y + (BACK_BALL_SIZE) >= BACK_WIN_HEIGHT && (ball.angle > 270 || ball.angle < 90)) { //hit bottom
           ball.angle = (180 - ball.angle) % 360
    
    }
    if (ball.angle < 0) //repasse l'angle en positif pour que les protections double rebond fonctionnent
        ball.angle = 360 - (ball.angle * -1)
}

function resetBall(side : number) {
    
    var today = new Date()

    let angle = 0
    if (side === 0)
        angle = getRandomArbitrary(20, 160)
    else if (side === 1)
        angle = getRandomArbitrary(200, 340)
    else if (side === 2)
        angle = today.getMilliseconds() % 2 ? getRandomArbitrary(20, 160) : getRandomArbitrary(200, 340)
    let ball = {
        pos: {
            x: BACK_WIN_WIDTH / 2,
            y: BACK_WIN_HEIGHT / 2
        },
        speed: DEFAULT_BALL_SPEED,
        angle : angle,
    }
    return ball
}

const sleep = (ms :number) => new Promise(r => setTimeout(r, ms));

function checkGoal(ball: any, state: any) {
    if(ball.pos.x <= 0) {
        state.score.playerTwo += 1
        ball = resetBall(0)
        sleep(300)
    }
    else if (ball.pos.x >= BACK_WIN_WIDTH) {
        state.score.playerOne += 1
        ball = resetBall(1)
        sleep(300)
    }
    return ball
}

function gameLoop(state: any, playerOneId : string, playerTwoId : string, socket : any, curGames: any) : number {
    let ball = state.ball
    let playerOnePaddle = state.playerOne
    let playerTwoPaddle = state.playerTwo

    const dirX = Math.sin(ball.angle * (Math.PI/180))
    const dirY = Math.cos(ball.angle * (Math.PI/180))
    
    
    ball.pos.x += (dirX * ball.speed)
    ball.pos.y += (dirY * ball.speed)
    state.leftPlayer.pos.y = curGames.playerOneY
    state.rightPlayer.pos.y = curGames.playerTwoY
    handleWallBounce(ball, state.leftPlayer.pos.y, state.rightPlayer.pos.y)
    state.ball= checkGoal(ball, state)
    return 1
}

function startGameInterval(playerOne: string, playerTwo : string, state: any, socket : any, curGame : any)  {
    const intervalId = setInterval(() => {
        const status : number = gameLoop(state, playerOne, playerTwo, socket, curGame)
        if (status !== -1) {
            socket.emit(curGame.gameId, state);
            
        } else {
            socket.emit('gameOver')
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
        ball : resetBall(2)
        ,
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
