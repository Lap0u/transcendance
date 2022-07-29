import './Canvas.css';
import React, { useRef, useEffect, useState } from 'react'

const Canvas = () => {
  const canvasRef = useRef(null)
  
  const [playBarPosY, movePlayBar] = useState(25);

  function getMousePos(event) {
	  const canvas = canvasRef.current
	  var rect = canvas.getBoundingClientRect();
	  console.log(event.clientY - rect.top);
	  return {
	  	x: event.clientX - rect.left,
	  	y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
	};
}
  	const drawPlayBar = (context) => {
	//	console.log(playBarPosY);
		const playBarPosX = 20;
		const playBarWidth = 2;
		const playBarHeight = 18;
		context.fillStyle = 'white';
		context.fillRect(playBarPosX, playBarPosY - (playBarHeight / 2), playBarWidth, playBarHeight);
	}
	const drawBackground = (context) => {
		context.fillStyle = '#000000'
		context.fillRect(0, 0, context.canvas.width, context.canvas.height)
	}
	const drawDashedLine = (context) => {
		context.lineWidth = 5;
		context.strokeStyle = 'white'
		context.lineCap = 'square'
		context.setLineDash([5, 10]);/*dashes are 5px and spaces are 3px*/
		context.beginPath();
		context.moveTo(125.5, 0);
		context.lineTo(125.5, 250);
		context.stroke();
	}
  useEffect(() => {
    const canvas = canvasRef.current
		canvas.width = 250;
		canvas.height = 250;
		canvas.style.width = "90vw";
		canvas.style.height = "90vh";
    const context = canvas.getContext('2d')
    //Our first draw
    drawBackground(context)
	drawDashedLine(context)
	drawPlayBar(context)
  }, [playBarPosY])

	return (
		<canvas ref={canvasRef} id="mainWindow" onMouseMove={(event, context) => movePlayBar(getMousePos(event).y)}>
			There should be the canvas of the full game
		</canvas>
	)
}

export default Canvas;
