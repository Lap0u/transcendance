import { useEffect, useRef, useState } from "react";
import { drawBackground } from "./draw_background";
import { drawBall } from "./draw_ball";
import { drawPlayBar } from "./draw_paddle";
import { drawScore } from "./draw_score";
import { getMousePosY, sendNewBar } from "./draw_utils";
import { useLocation } from "react-router-dom"

const SingleGame = (props : any) => {
    const canvasRef = useRef(null);
    const [newState, setNewState] = useState();
    const pageLocation = useLocation();
    const path = pageLocation.pathname.split('/')
    const gameSocket = path[path.length - 1]
    
    const socket = props.socket;
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
        drawScore(context, gameState.score)
    }
    useEffect(() => {
        socket.on(gameSocket, handleGameState)
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