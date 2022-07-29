import './Canvas.css';
import React, { useRef, useEffect } from 'react'

const Canvas = () => {
  const canvasRef = useRef(null)
  
	const drawBackground = (context) => {
		context.fillStyle = '#DDDDDD'
		context.fillRect(0, 0, context.canvas.width, context.canvas.height)
	}
	const drawDashedLine = (context) => {
		context.setLineDash([4, 4]);/*dashes are 5px and spaces are 3px*/
		context.beginPath();
		context.moveTo(150, 1);
		context.lineTo(150, 302);
		context.stroke();
	}
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    drawBackground(context)
		drawDashedLine(context)
  }, [drawBackground, drawDashedLine])

	return (
		<canvas ref={canvasRef} id="mainWindow">
			There should be the canvas of the full game
		</canvas>
	)
}

export default Canvas;
