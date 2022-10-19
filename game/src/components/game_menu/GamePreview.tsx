import { useEffect, useRef, useState } from 'react';
import { drawBackground } from '../game_Display/display_utils/draw_background';
import { drawBall } from '../game_Display/display_utils/draw_ball';
import { drawPlayBar } from '../game_Display/display_utils/draw_paddle';
import { drawScore } from '../game_Display/display_utils/draw_score';
import { DEFAULT_GAME } from './defaultGame';
import './GamePreview.css';

const GamePreview = ({
  ownColor,
  opponentColor,
  ballColor,
  backgroundColor,
}: previewProps) => {
  const canvasRef = useRef(null);
  function updateGame(gameState: any) {
    const canvas: any = canvasRef.current;
    if (canvas === null) {
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (window.innerHeight * 2 > window.innerWidth) {
      canvas.style.width = '45vw';
      canvas.style.height = '22.5vw';
    } else {
      canvas.style.width = '90vh';
      canvas.style.height = '45vh';
    }
    const context: any = canvas.getContext('2d');
    drawBackground(context, backgroundColor);
    drawPlayBar(context, gameState.leftPlayer, ownColor);
    drawPlayBar(context, gameState.rightPlayer, opponentColor);
    drawBall(context, gameState.ball, ballColor);
    drawScore(context, gameState.score);
  }
  useEffect(() => {
    updateGame(DEFAULT_GAME);
  });
  function handleResize() {
    updateGame(DEFAULT_GAME);
  }
  window.addEventListener('resize', handleResize);

  return (
    <div className="prev-canvas-div">
      <canvas className="prev-canvas" ref={canvasRef}>
        There should be the canvas of the full game
      </canvas>
    </div>
  );
};

type previewProps = {
  ownColor: string;
  opponentColor: string;
  ballColor: string;
  backgroundColor: string;
};

export default GamePreview;
