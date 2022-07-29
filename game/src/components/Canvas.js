import './Canvas.css';
import React, { useRef, useEffect } from 'react'

const Canvas = () => {
  const canvasRef = useRef(null)
  
	const drawBackground = (context) => {
		context.fillStyle = '#000000'
		context.fillRect(0, 0, context.canvas.width, context.canvas.height)
	}
	const drawDashedLine = (context) => {
		context.lineWidth = 4;
		context.strokeStyle = 'white'
		context.lineCap = 'square'
		context.setLineDash([4, 8]);/*dashes are 5px and spaces are 3px*/
		context.beginPath();
		context.moveTo(150, 1);
		context.lineTo(150, 300);
		context.stroke();
	}
  useEffect(() => {
    const canvas = canvasRef.current
		canvas.width = 300;
		canvas.height = 150;
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
