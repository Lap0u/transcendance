import BallCustom from "./BallCustom";
import PaddleCustom from "./PaddleCustom";
import './Customization.css'

const Customization = () => {
	return (
		<div className="customization-grid">
			<PaddleCustom owner={'Your'}/>
			<PaddleCustom owner={'Enemy'}/>
			<BallCustom />
		</div>
	)
}

export default Customization;