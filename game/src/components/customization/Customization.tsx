import BallCustom from "./BallCustom";
import PaddleCustom from "./PaddleCustom";
import './Customization.css'
import BackgroundCustom from "./BackgroundCustom";

const Customization = ({ownPaddleColor, setOwnPaddleColor, opponentPaddleColor, setOpponentPaddleColor,
ballColor, setBallColor, gameBackground, setGameBackground} : customProps) => {
	return (
		<div className="customization-grid">
			<PaddleCustom owner={'Your'} color={ownPaddleColor} setColor={setOwnPaddleColor}/>
			<PaddleCustom owner={'Enemy'} color={opponentPaddleColor} setColor={setOpponentPaddleColor}/>
			<BallCustom color={ballColor} setColor={setBallColor}/>
			<BackgroundCustom color={gameBackground} setColor={setGameBackground} />
		</div>
	)
}

type customProps = {
	ownPaddleColor: string,
	setOwnPaddleColor: any,
	opponentPaddleColor: string,
	setOpponentPaddleColor: any,
	ballColor: string,
	setBallColor: any,
	gameBackground: string,
	setGameBackground: any
}

export default Customization;