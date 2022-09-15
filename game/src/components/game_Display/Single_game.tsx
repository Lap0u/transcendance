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
import './Single_game.css'
import QuitBox from "./quitBox";

const SingleGame = (props : any) => {
	const [quitPressed, setQuitPressed] = useState(false);
    const canvasRef = useRef(null);
    const [newState, setNewState] = useState();
	const [haveWinner, setHaveWinner] = useState(false)
    const winner = useRef("")
	const pageLocation = useLocation();
    const path = pageLocation.pathname.split('/')
    const gameSocket = path[path.length - 1]
    const navigate = useNavigate();
	const socket = props.socket;

	const gameCustomization	 : any = pageLocation.state
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

	//Game Display
    function updateGame (gameState: any) {
        const canvas : any = canvasRef.current
		if (canvas === null)
			return
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
        drawBackground(context, gameCustomization.background)
        drawPlayBar(context, gameState.leftPlayer, gameCustomization.myColor)
        drawPlayBar(context, gameState.rightPlayer, gameCustomization.opponentColor)
        drawBall(context, gameState.ball, gameCustomization.ballColor)
        drawScore(context, gameState.score)
    }

	//winMenu
	function handleWinner(answer: any) {       
        if (winner.current === "") {
			winner.current = answer.gameResult
			setHaveWinner(!haveWinner)
            setNewState(answer.gameState)
		}
	}
    function handleGameState(gameState : any) {// any !
        requestAnimationFrame(() => updateGame(gameState))     
    }
	//Resize
	function handleResize() {
        updateGame(newState)
	}
	window.addEventListener('resize', handleResize)

	useEffect(() => {
		const handleEscape = (event : any) => {
			console.log('keypress', event.key)
			if (event.repeat || winner.current !== "")
				return
			if (event.key === "Escape")
				setQuitPressed(!quitPressed)
		}
		window.addEventListener('keyup', handleEscape)
		return () => {
			window.removeEventListener('keyup', handleEscape)
		}
	}, [quitPressed])


	function sendPong() {
		socket.emit(`pong`)
	}
	useEffect(() => {
        socket.on(gameSocket, handleGameState)
		socket.on(`ping`, sendPong)
		socket.on(`winner`, handleWinner)
		return () => {
			socket.off(gameSocket)
			socket.off('ping')
			socket.off('winner')
		}
    })

    return (
        <div className="canvas-div">
            <canvas className="myCanvas" ref={canvasRef} onMouseMove={(event) => sendNewBar(socket, getMousePosY(event, canvasRef.current))}>
                There should be the canvas of the full game
            </canvas>
			{quitPressed && <QuitBox setQuitPressed={setQuitPressed} quitPressed={quitPressed} />}
			{winner.current !== "" && < WinnerBox message={winner.current} />}
        </div>
    )
}

export default SingleGame;