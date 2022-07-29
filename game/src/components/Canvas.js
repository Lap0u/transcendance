import './Canvas.css';
import React, { useRef, useEffect } from 'react'

const Canvas = () => {
  const canvasRef = useRef(null)
  
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
		context.moveTo(20.5, 0);
		context.lineTo(20.5, 250);
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
  }, [])

	return (
		<canvas ref={canvasRef} id="mainWindow">
			There should be the canvas of the full game
		</canvas>
	)
}

export default Canvas;
