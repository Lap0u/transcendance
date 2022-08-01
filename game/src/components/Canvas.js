import './Canvas.css';
import React, { useRef, useEffect, useState} from 'react'
import {getMousePosY, drawPlayBar, resizePlayBar} from './PlayBar'
import {ball, drawBall} from './Ball'




const Canvas = () => {
  const canvasRef = useRef(null)
  const [playBarPosY, movePlayBar] = useState(25)
  const [ballMoves, moveBal] = useState(0)
  const ballPosX = useRef(window.innerWidth / 2)
  const ballPosY = useRef(window.innerHeight / 2)
 
	
	setInterval(() => {
	//bal position change every 100ms
		ballPosX.current += ball.dirX * ball.speed
		ballPosY.current += ball.dirY * ball.speed
		moveBal(ballMoves + 1)
	}, 0)


  useEffect(() => {
    //draw every time the cursor move, or ball position change
	const canvas = canvasRef.current
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log('count')
	canvas.style.width = "90vw";
	canvas.style.height = "90vh";
	const context = canvas.getContext('2d')
	drawBackground(context)
	drawDashedLine(context)
	drawPlayBar(context, playBarPosY)
	drawBall(context, ballPosX.current, ballPosY.current, playBarPosY)
  }, [ballMoves, playBarPosY])
	
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
	//console.log(context.canvas);
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


window.addEventListener('resize', resizePlayBar)


export default Canvas;
