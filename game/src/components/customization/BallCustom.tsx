import { Col, Row } from 'antd';
import { useState } from 'react';
import { BlockPicker } from 'react-color'
import './BallCustom.css'

const BallCustom = () => {
	const [hidePicker, setHidePicker] = useState(false)
	const [pickedColor, setPickedColor] = useState("#37d67a")
	function handleColorChange(color : any, event : any) {
		setPickedColor(color.hex)
	}
	return (
		<Row justify="center" align="middle" className="ball-row">
			<Col className='ball-col' span={12}>
				BallCustom
			</Col>
			<Col className='ball-col' span={12}>
				<button style={{backgroundColor: pickedColor}} onClick={() => setHidePicker(!hidePicker)} className='my-ball'></button>
				{hidePicker && <BlockPicker onChangeComplete={handleColorChange} color={pickedColor} />}
			</Col>
		</Row>
	)
}

export default BallCustom;