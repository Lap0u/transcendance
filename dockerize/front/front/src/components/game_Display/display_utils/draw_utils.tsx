import { BACK_WIN_HEIGHT } from '../../constants';

export function getMousePosY(event: any, canvas: any) {
  var rect = canvas.getBoundingClientRect();
  return (
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) * BACK_WIN_HEIGHT
  );
}

export function sendNewBar(socket: any, newPos: number) {
  socket.emit(`paddleMove`, newPos);
}
