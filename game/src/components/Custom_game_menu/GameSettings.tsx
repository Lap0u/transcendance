import { Row, Col } from "antd";
import { useState } from "react";
import './gamesettings.css'

const GameSettings = (props : any) => {
	const [set, setSet] = useState(false);

	function handleLimit(event : any) {
		const newObj = props.settings;
		newObj.point_limit = event.target.value;
		setSet(!set)
		props.setSettings(newObj);
	}
	
	function handleSpeed(event : any) {
		const newObj = props.settings;
		newObj.ball_speed = event.target.value;
		setSet(!set)
		props.setSettings(newObj);
	}

	function powerupClick() {
		const newObj = props.settings;
		newObj.powerup = !props.settings.powerup
		setSet(!set)
		props.setSettings(newObj);
	}
	let res = props.settings.powerup ? "true" : "false"
	res += " powerup-button"
	return (
		<div className="settings-table">
			<Row className="settings-raw">
				<Col span={24}>Game settings</Col>
			</Row>
			<Row className="settings-raw">
				<Col span={12}>Powerups</Col>
				<Col span={12} className="powerup-box" >
					<button onClick={() => powerupClick()} className={res}></button>
				</Col>
			</Row>
			<Row className="settings-raw">
				<Col span={12}>Point limit</Col>
				<Col span={12}>
					<select onChange={handleLimit} defaultValue={"20"}>
						<option value="1">1</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</Col>
			</Row>
			<Row className="settings-raw">
				<Col span={12}>Ball speed</Col>
				<Col span={12}>
				<select onChange={handleSpeed} defaultValue={"100"}>
						<option value="50">50 %</option>
						<option value="75">75 %</option>
						<option value="100">100 %</option>
						<option value="125">125 %</option>
						<option value="150">150 %</option>
					</select>
				</Col>
			</Row>
		</div>
	)
}

export default GameSettings;