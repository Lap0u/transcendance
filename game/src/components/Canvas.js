import './Canvas.css';
import React, { useRef, useEffect, useState, useMemo} from 'react'
import {getMousePosY, drawPlayBar} from './PlayBar'
import {Ball} from './Ball'
import {drawScore} from './Score'


const Canvas = () => {
	const [playersScore, updateScore] = useState([0, 0])
  const canvasRef = useRef(null)
  const [playBarPosY, movePlayBar] = useState(25)
  const ballPosX = useRef(window.innerWidth / 2);
  const ballPosY = useRef(window.innerHeight / 2);
  const [moves, moveBal] = useState(0)
  let ball = useMemo(() => new Ball(), []);
 
	setInterval(() => {
		//bal position change every 100ms
		ballPosX.current += ball.dirX * ball.speed
		ballPosY.current += ball.dirY * ball.speed
		moveBal(moves + 1)
	}, 100)

  useEffect(() => {
    //draw every time the cursor move, or ball position change
	const canvas = canvasRef.current
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.width = "90vw";
	canvas.style.height = "90vh";
	const context = canvas.getContext('2d')
	drawBackground(context)
	drawDashedLine(context)
	drawPlayBar(context, playBarPosY)
	ball.drawBall(context, ballPosX.current, ballPosY.current, playBarPosY)
	drawScore(context, playersScore)
  }, [ playBarPosY, ballPosX, ballPosY, moves, ball])

	return (
		<div>
			<canvas ref={canvasRef} id="mainWindow" onMouseMove={(event) => movePlayBar(getMousePosY(event, canvasRef.current))}>
				There should be the canvas of the full game
			</canvas>
		</div>
	)
}

const drawBackground = (context) => {
	context.fillStyle = '#000000'
	context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}
const drawDashedLine = (context) => {
	const cvwidth = context.canvas.width
	const cvheight = context.canvas.height

	context.lineWidth = 5;
	context.strokeStyle = 'white'
	context.lineCap = 'square'
	context.setLineDash([5, 10]);/*dashes are 5px and spaces are 3px*/
	context.beginPath();
	context.moveTo(cvwidth / 2, 0);
	context.lineTo(cvwidth / 2, cvheight);
	context.stroke();
}

export default Canvas;
