import { useEffect, useRef, useState } from "react";
import {
    BACK_WIN_WIDTH,
    BACK_WIN_HEIGHT,
} from '../constants'

const BALLSIZE = 10

const drawBackground = (context : any) => {
	context.fillStyle = '#000055'
	context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

const drawScore = (context : any, score: scoreType) => {
	const playerOneX = context.canvas.width / 2 - 30
	const playerTwoX = context.canvas.width / 2 + 40
	const y = context.canvas.height * 8 / 100
	const avg = (context.canvas.width + context.canvas.height) / 2;
	const size = avg / 18 + 'px'

	context.beginPath();
	context.font = `${size} press_start_2pregular, Arial`;
	context.textAlign = 'right';
	context.textBaseline = 'top';
	context.fillStyle = 'white';
	context.fillText(score.playerOne, playerOneX , y);
	context.stroke();
	context.beginPath();
	context.font = `${size} press_start_2pregular, Arial`;
	context.textAlign = 'left';
	context.textBaseline = 'top';
	context.fillStyle = 'white';
	context.fillText(score.playerTwo, playerTwoX, y);
	context.stroke();
}

const drawBall = (context: any, ball : ballType) => {
    const convertedX = ball.pos.x * context.canvas.width / BACK_WIN_WIDTH
    const convertedY = ball.pos.y * context.canvas.height / BACK_WIN_HEIGHT
    
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(convertedX, convertedY, BALLSIZE, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

function drawPlayBar (context: any, player: playerType) {
    const width =  window.innerWidth / 120
    const height = window.innerHeight / 15
    const posX =  player.pos.x * context.canvas.width / BACK_WIN_WIDTH
    const posY =  player.pos.y * context.canvas.height / BACK_WIN_HEIGHT - (height / 2)

    context.fillStyle = 'white';
    context.fillRect(posX, posY, width, height)
    
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

const SingleGame = (props : any) => {
	const canvasRef = useRef(null);
    const [newState, setNewState] = useState();

    const socket = props.socket;

    function updateGame (gameState: any) {
        const canvas : any = canvasRef.current
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = "90vw";
        canvas.style.height = "90vh";
        
        console.log('fullCont', gameState);
        
        const context : any = canvas.getContext('2d')
        drawBackground(context)
		drawDashedLine(context)
        drawPlayBar(context, gameState.leftPlayer)
        drawPlayBar(context, gameState.rightPlayer)
        drawBall(context, gameState.ball)
        drawScore(context, gameState.score)

    }
    useEffect(() => {
        socket.on(`newGameState`, handleGameState)
        setNewState(newState)
    })
    function handleGameState(gameState : any) {// any !
        console.log('update');
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

type playerType = {
    pos: {
        x: number;
        y: number;
    }
}

type ballType = {
    pos: {
        x: number;
        y: number;
    }
}

type scoreType = {
    playerOne: number,
    playerTwo: number,
}

export default SingleGame;