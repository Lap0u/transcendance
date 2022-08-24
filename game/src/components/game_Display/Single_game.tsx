import { useEffect, useRef, useState } from "react";
import { drawBackground } from "./draw_background";
import { drawBall } from "./draw_ball";
import { drawPlayBar } from "./draw_paddle";
import { drawScore } from "./draw_score";
import { getMousePosY, sendNewBar } from "./draw_utils";

const SingleGame = (props : any) => {
	const canvasRef = useRef(null);
    const [newState, setNewState] = useState();

    const socket = props.socket;
    socket.emit(`start`);
    function updateGame (gameState: any) {
        const canvas : any = canvasRef.current
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (window.innerHeight * 2 > window.innerWidth) {
            canvas.style.width = "90vw";
            canvas.style.height = "45vw";
        } else {
            canvas.style.width = "180vh";
            canvas.style.height = "90vh";
        }
        
        // console.log('fullCont', gameState);
        
        const context : any = canvas.getContext('2d')
        drawBackground(context)
        drawPlayBar(context, gameState.leftPlayer)
        drawPlayBar(context, gameState.rightPlayer)
        drawBall(context, gameState.ball)
        console.log('avant');
        drawScore(context, gameState.score)
        console.log('apres');
        
    }
    useEffect(() => {
        socket.on(`newGameState`, handleGameState)
        setNewState(newState)
    })
    function handleGameState(gameState : any) {// any !
        requestAnimationFrame(() => updateGame(gameState))     
    }
    return (
        <div>
            <canvas ref={canvasRef} onMouseMove={(event) => sendNewBar(socket, getMousePosY(event, canvasRef.current))}>
            {/* <canvas ref={canvasRef} id="mainWindow" onMouseMove={(event) => movePlayBar(getMousePosY(event, canvasRef.current))}> */}
                There should be the canvas of the full game
            </canvas>
        </div>
    )
}

export default SingleGame;