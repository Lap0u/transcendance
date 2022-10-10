import {
    BACK_WIN_WIDTH,
    BACK_WIN_HEIGHT,
} from '../../constants'
import { playerType } from './game.dto'

export function drawPlayBar (context: any, player: playerType, color: string) {
    const width =  window.innerWidth / 120
    const height = window.innerHeight / 15 * player.scale
    const posX =  player.pos.x * context.canvas.width / BACK_WIN_WIDTH
    const posY =  player.pos.y * context.canvas.height / BACK_WIN_HEIGHT - (height / 2)

    context.fillStyle = color;
    context.fillRect(posX, posY, width, height)
    
}