import './Canvas.css';
import React, { useRef, useEffect, useState } from 'react'
import {getMousePosY, drawPlayBar} from './PlayBar'
import {drawBall} from './Ball'


const Canvas = () => {
  const canvasRef = useRef(null)
  const [playBarPosY, movePlayBar] = useState(25)
  //const [ballPosX, moveBalX] = useState(60)
  //const [ballPosY, moveBalY] = useState(60)
  const ballPosX = useRef(60);
  const ballPosY = useRef(60);
  const [moves, moveBal] = useState(0)

 // setInterval(moveBal[], 1);
 
	setInterval(() => {
		/*const canvas = canvasRef.current
		canvas.width = 250;
		canvas.height = 250;
		canvas.style.width = "90vw";
		canvas.style.height = "90vh";
		const context = canvas.getContext('2d')
		drawBall(context)*/
		ballPosX.current += 0.1
		ballPosY.current += 0.1
		moveBal(moves + 1)
	}, 100)

  useEffect(() => {
    //draw every time the cursor move
	const canvas = canvasRef.current
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log(canvas.width, canvas.height)
	canvas.style.width = "90vw";
	canvas.style.height = "90vh";
	const context = canvas.getContext('2d')
	drawBackground(context)
	drawDashedLine(context)
	drawPlayBar(context, playBarPosY)
	drawBall(context, ballPosX.current, ballPosY.current)
  }, [ playBarPosY, ballPosX, ballPosY, moves])

	return (
		<canvas ref={canvasRef} id="mainWindow" onMouseMove={(event) => movePlayBar(getMousePosY(event, canvasRef.current))}>
			There should be the canvas of the full game
		</canvas>
	)
}

const drawBackground = (context) => {
	context.fillStyle = '#000000'
	context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}
const drawDashedLine = (context) => {
	console.log(context.canvas);
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
