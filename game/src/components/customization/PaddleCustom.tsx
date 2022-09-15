import { Col, Row } from 'antd'
import './PaddleCustom.css'
import { BlockPicker } from 'react-color'
import { useState } from 'react'

const PaddleCustom = ({owner} : myProps) => {
	const [hidePicker, setHidePicker] = useState(false)
	const [pickedColor, setPickedColor] = useState("#37d67a")
	function handleColorChange(color : any, event : any) {
		setPickedColor(color.hex)
	}
	return (
		<Row justify="center" align="middle" className="paddle-row">
			<Col className='paddle' span={12}>
				{owner} paddle
			</Col>
			<Col className='paddle' span={12}>
				<button style={{backgroundColor: pickedColor}} onClick={() => setHidePicker(!hidePicker)} id='my-paddle'></button>
				{hidePicker && <BlockPicker onChangeComplete={handleColorChange} color={pickedColor} />}
			</Col>
		</Row>
	)
}

type myProps = {
	owner: string
}

export default PaddleCustom