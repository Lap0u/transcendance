import {
  BACK_BALL_SIZE,
  BACK_WIN_HEIGHT,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  STARTINGPOS_LEFT_X,
  STARTINGPOS_RIGHT_X,
} from './constants';
import { checkPowerup } from './powerUp';

function paddleBounceLeft(ball: any, leftPosY: number, height: number) {
  const hitpos = ball.pos.y - leftPosY + height / 2;

  let barhit = (hitpos * 100) / height;
  barhit = barhit > 80 ? 80 : barhit;
  barhit = barhit < 20 ? 20 : barhit;

  ball.angle = 180 - (barhit * 180) / 100;
}

function paddleBounceRight(ball: any, rightPosY: number, height: number) {
  const hitpos = ball.pos.y - rightPosY + height / 2;
  let barhit = (hitpos * 100) / height;
  barhit = barhit > 80 ? 80 : barhit;
  barhit = barhit < 20 ? 20 : barhit;
  ball.angle = 180 + (barhit * 180) / 100;
}

export function handleWallBounce(
  ball: any,
  leftPlayer: any,
  rightPlayer: any,
  powerup: any,
) {
  checkPowerup(powerup, leftPlayer, rightPlayer);
  const leftPosY = leftPlayer.pos.y;
  const rightPosY = rightPlayer.pos.y;

  const leftHeight = PADDLE_HEIGHT * leftPlayer.scale;
  const rightHeight = PADDLE_HEIGHT * rightPlayer.scale;

  if (
    ball.pos.x + BACK_BALL_SIZE > STARTINGPOS_RIGHT_X &&
    ball.pos.x + BACK_BALL_SIZE < STARTINGPOS_RIGHT_X + PADDLE_WIDTH / 2 && //check si la balle depasse au maximum de la moitie de la width
    ball.pos.y > rightPosY - rightHeight / 2 &&
    ball.pos.y < rightPosY + rightHeight / 2 &&
    ball.angle < 180
  ) {
    //hit right
    paddleBounceRight(ball, rightPosY, rightHeight);
    ball.speed += 0.2;
  } else if (
    ball.pos.x - BACK_BALL_SIZE <= STARTINGPOS_LEFT_X + PADDLE_WIDTH &&
    ball.pos.x - BACK_BALL_SIZE > STARTINGPOS_LEFT_X + PADDLE_WIDTH / 2 && //check si la balle depasse au maximum de la moitie de la width
    ball.pos.y > leftPosY - leftHeight / 2 &&
    ball.pos.y < leftPosY + leftHeight / 2 &&
    ball.angle > 180
  ) {
    //hit left
    paddleBounceLeft(ball, leftPosY, leftHeight);
    ball.speed += 0.2;
  } else if (
    ball.pos.y - BACK_BALL_SIZE <= 0 &&
    ball.angle > 90 &&
    ball.angle < 270
  ) {
    //hit top
    ball.angle = (180 - ball.angle) % 360;
  } else if (
    ball.pos.y + BACK_BALL_SIZE >= BACK_WIN_HEIGHT &&
    (ball.angle > 270 || ball.angle < 90)
  ) {
    //hit bottom
    ball.angle = (180 - ball.angle) % 360;
  }
  if (ball.angle < 0)
    //repasse l'angle en positif pour que les protections double rebond fonctionnent
    ball.angle = 360 - ball.angle * -1;
}
