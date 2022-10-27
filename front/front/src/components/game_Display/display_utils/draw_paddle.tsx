import {
  BACK_WIN_WIDTH,
  BACK_WIN_HEIGHT,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
} from '../../constants';
import { playerType } from './game.dto';

export function drawPlayBar(context: any, player: playerType, color: string) {
  const width = PADDLE_WIDTH;
  const height = PADDLE_HEIGHT * player.scale;
  const posX = (player.pos.x * context.canvas.width) / BACK_WIN_WIDTH;
  const posY =
    (player.pos.y * context.canvas.height) / BACK_WIN_HEIGHT - height / 2;

  context.fillStyle = color;
  context.fillRect(posX, posY, width, height);
}
