import { matchmakingDto } from "src/matchmaking/matchmaking.dto";
import { BACK_BALL_SIZE, BACK_WIN_HEIGHT, BACK_WIN_WIDTH, DEFAULT_BALL_SPEED, GOAL_DELAY, PADDLE_HEIGHT, PADDLE_WIDTH, STARTINGPOS_LEFT_X, STARTINGPOS_RIGHT_X } from "./constants";

function getRandomArbitrary(min : number, max : number) {
    return Math.random() * (max - min) + min;
  }

function paddleBounceLeft(ball: any, leftPosY: number) {
const hitpos = ball.pos.y - leftPosY + PADDLE_HEIGHT / 2;

let barhit = (hitpos * 100) / PADDLE_HEIGHT;
barhit = barhit > 80 ? 80 : barhit;
barhit = barhit < 20 ? 20 : barhit;

ball.angle = 180 - (barhit * 180) / 100;
}

function paddleBounceRight(ball: any, rightPosY: number) {
const hitpos = ball.pos.y - rightPosY + PADDLE_HEIGHT / 2;
let barhit = (hitpos * 100) / PADDLE_HEIGHT;
barhit = barhit > 80 ? 80 : barhit;
barhit = barhit < 20 ? 20 : barhit;
ball.angle = 180 + (barhit * 180) / 100;
}

export function handleWallBounce(ball: any, leftPosY : number, rightPosY :number) {
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

export function checkGoal(ball: any, state: any) {
if (ball.pos.x <= 0) {
	state.score.playerTwo += 1;
	ball = resetBall(0);
	state.frameDelay = GOAL_DELAY;
} else if (ball.pos.x >= BACK_WIN_WIDTH) {
	state.score.playerOne += 1;
	ball = resetBall(1);
	state.frameDelay = GOAL_DELAY;
}
return ball;
}

function resetBall(side : number) {
    
    var today = new Date()

    let angle = 0
    if (side === 0) //right start
        angle = getRandomArbitrary(20, 160)
    else if (side === 1) // eft start
        angle = getRandomArbitrary(200, 340)
    else if (side === 2) // random start
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

export function createGameState() {
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
        },
        frameDelay: 0
    }
}