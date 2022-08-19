import { useRef } from "react";
import { io } from "socket.io-client";

const BACK_URL = "http://localhost:4000";

const socket = io(BACK_URL).connect();

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

const SingleGame = () => {
	const canvasRef = useRef(null)
    
    function updateGame (gameState: any) {
        const canvas : any = canvasRef.current
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = "90vw";
        canvas.style.height = "90vh";
        console.log('rendered');
        
        const context : any = canvas.getContext('2d')
        drawBackground(context)
		drawDashedLine(context)

    }
    socket.on('newGameState', handleGameState)

    
    function handleGameState(gameState : any) {// any !
        gameState = JSON.parse(gameState)
        requestAnimationFrame(() => updateGame(gameState))     
    }
    return (
        <div>
            <h1 style={{ color: 'red'}}>Test</h1>
            <canvas ref={canvasRef}>
            {/* <canvas ref={canvasRef} id="mainWindow" onMouseMove={(event) => movePlayBar(getMousePosY(event, canvasRef.current))}> */}
                There should be the canvas of the full game
            </canvas>
        </div>
    )
}
export default SingleGame;