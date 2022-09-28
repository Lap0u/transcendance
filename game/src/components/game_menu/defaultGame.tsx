import { BACK_WIN_HEIGHT, BACK_WIN_WIDTH, STARTINGPOS_LEFT_X, STARTINGPOS_RIGHT_X } from "../constants";

export const DEFAULT_GAME = {
	leftPlayer : {
		pongReply: 0,
		pos: {
			x: STARTINGPOS_LEFT_X,
			y: BACK_WIN_HEIGHT / 2
		},
		scale: 1,
	},
	rightPlayer : {
		pongReply: 0,
		pos: {
			x: STARTINGPOS_RIGHT_X,
			y: BACK_WIN_HEIGHT / 2
		},
		scale: 1,
	},
	ball : { 
		pos: {
		x: BACK_WIN_WIDTH / 2,
		y: BACK_WIN_HEIGHT / 2
		}
	}
	,
	score :{
		playerOne: 0,
		playerTwo: 0,
	},
	frameDelay: 0
}