import './Canvas.css';
import React, { useRef, useEffect, useState, useMemo} from 'react'
import {getMousePosY, drawPlayBar} from './PlayBar.tsx'
import {ball, drawBall, resetBall, centerBall} from './Ball.tsx'
import {drawScore, watchScore} from './Score.tsx'
import ResetButton from './resetButton.tsx'


export function getRandomArbitrary(min : number, max : number) {
  return Math.random() * (max - min) + min;
}

const Canvas = () => {
	console.log('begin canvas')
	const canvasRef = useRef(null)
  const [playBarPosY, movePlayBar] = useState(25)
  const ballPosX = useRef(window.innerWidth / 2);
  const ballPosY = useRef(getRandomArbitrary(window.innerHeight / 15, window.innerHeight - window.innerHeight / 15));
  const [moves, moveBal] = useState(0)
	const [playersScore, updateScore] = useState([0, 0])

	const calculation = useMemo(() => throwBall(ballPosX, ballPosY, moveBal, moves), []);
	
  useEffect(() => {
		//draw every time the cursor move, or ball position change
		const canvas : any = canvasRef.current
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.width = "90vw";
		canvas.style.height = "90vh";
		const context : any = canvas.getContext('2d')
		drawBackground(context)
		drawDashedLine(context)
		drawPlayBar(context, playBarPosY)
		drawBall(context, ballPosX.current, ballPosY.current, playBarPosY)
		watchScore(context, ball, ballPosX, ballPosY, playersScore, updateScore)
		drawScore(context, playersScore)
  }, [ playBarPosY, moves, playersScore])

	return (
		<div>
			<ResetButton text="resetBall" player={true} onClick={() => resetBall(false, ballPosX, ballPosY, ball)}/>
			<ResetButton text="centerBall" player={true} onClick={() => centerBall(false, ballPosX, ballPosY, ball)}/>
			<ResetButton text = "resetBall" player={false} onClick={() => resetBall(true, ballPosX, ballPosY, ball)}/>
			<ResetButton text = "centerBall" player={false} onClick={() => centerBall(true, ballPosX, ballPosY, ball)}/>
			<canvas ref={canvasRef} id="mainWindow" onMouseMove={(event) => movePlayBar(getMousePosY(event, canvasRef.current))}>
				There should be the canvas of the full game
			</canvas>
		</div>
	)
}

function throwBall(ballPosX, ballPosY, moveBal, moves){
	setInterval(() => {
		//bal position change every 100ms
			ballPosX.current += ball.dirX * ball.speed
			ballPosY.current += ball.dirY * ball.speed
			moveBal(moves + 1)
		}, 0)
}

const drawBackground = (context : any) => {
	context.fillStyle = '#000000'
	context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}
const drawDashedLine = (context : any) => {
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
