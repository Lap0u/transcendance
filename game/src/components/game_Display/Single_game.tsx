import { useEffect, useRef, useState } from "react";
import { drawBackground } from "./draw_background";
import { drawBall } from "./draw_ball";
import { drawPlayBar } from "./draw_paddle";
import { drawScore } from "./draw_score";
import { getMousePosY, sendNewBar } from "./draw_utils";
import { useLocation, useNavigate } from "react-router-dom"
import handleErrors from "../RequestErrors/handleErrors";
import axios from "axios";
import { BACK_URL } from "../constants";
import WinnerBox from "./WinnerBox";

const SingleGame = (props : any) => {
    const canvasRef = useRef(null);
    const [newState, setNewState] = useState();
	const [haveWinner, setHaveWinner] = useState(false)
    const winner = useRef("")
	const pageLocation = useLocation();
    const path = pageLocation.pathname.split('/')
    const gameSocket = path[path.length - 1]
    const navigate = useNavigate();
    
	function searchId(allGames : any){
		for (const game of allGames) {
			if (game.gameId === gameSocket)
				return true
		}
		return false
	}

	const checkValidId = async () => {
		try {
			const gameSarray = await axios.get(`${BACK_URL}/matchmaking/games`, {withCredentials:true});
			if(searchId(gameSarray.data) === false)
				navigate(`/wrongGameId`)
		}
		  catch(e) {
			handleErrors(e);
		}
	  }
	checkValidId()
    const socket = props.socket;
	function handleResize() {
        updateGame(newState)
	}

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
        const context : any = canvas.getContext('2d')
        drawBackground(context)
        drawPlayBar(context, gameState.leftPlayer)
        drawPlayBar(context, gameState.rightPlayer)
        drawBall(context, gameState.ball)
        drawScore(context, gameState.score)
    }

    useEffect(() => {
        socket.on(gameSocket, handleGameState)
		socket.on(`ping`, sendPong)
		socket.on(`winner`, handleWinner)
        setNewState(newState)
    })

	function sendPong() {
		socket.emit(`pong`)
	}
	function handleWinner(gameResult: string) {
		if (winner.current === "") {
			winner.current = gameResult
			setHaveWinner(true)
		}
	}
    function handleGameState(gameState : any) {// any !
        requestAnimationFrame(() => updateGame(gameState))     
    }
	window.addEventListener('resize', handleResize)
    return (
        <div>
            <canvas ref={canvasRef} onMouseMove={(event) => sendNewBar(socket, getMousePosY(event, canvasRef.current))}>
                There should be the canvas of the full game
            </canvas>
			{winner.current !== "" && < WinnerBox message={winner.current} />}
        </div>
    )
}

export default SingleGame;