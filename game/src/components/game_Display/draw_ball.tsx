import {
    BACK_WIN_WIDTH,
    BACK_WIN_HEIGHT,
    BACK_BALL_SIZE,
} from '../constants'
import { ballType } from './game.dto'

export const drawBall = (context: any, ball : ballType, color: string) => {
    const convertedX = ball.pos.x * context.canvas.width / BACK_WIN_WIDTH
    const convertedY = ball.pos.y * context.canvas.height / BACK_WIN_HEIGHT
    // const bsize = (context.canvas.height + context.canvas.width) * BACK_BALL_SIZE / (BACK_WIN_HEIGHT + BACK_WIN_WIDTH)
    const xRad = BACK_BALL_SIZE * context.canvas.height / BACK_WIN_HEIGHT
    const yRad = BACK_BALL_SIZE * context.canvas.width / BACK_WIN_WIDTH
    context.fillStyle = color;
    context.beginPath();
    // context.arc(convertedX, convertedY, 1, 0, 2 * Math.PI);
    context.ellipse(convertedX, convertedY, xRad, yRad, Math.PI / 2, 0, 2 * Math.PI)
    context.closePath();
    context.fill();
}