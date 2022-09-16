import { Col, Row } from 'antd'
import './PaddleCustom.css'
import { BlockPicker } from 'react-color'
import { useState } from 'react'

const PaddleCustom = ({owner, color, setColor} : myProps) => {
	const [hidePicker, setHidePicker] = useState(false)
	function handleColorChange(color : any, event : any) {
		setColor(color.hex)
	}
	return (
		<Row justify="center" align="middle" className="paddle-row">
			<Col className='paddle' span={12}>
				{owner} paddle
			</Col>
			<Col className='paddle' span={12}>
				<button style={{backgroundColor: color}} onClick={() => setHidePicker(!hidePicker)} className='paddle-button'></button>
				<div className='picker-div'>
					{hidePicker && <BlockPicker className='my-picker' onChangeComplete={handleColorChange} color={color} />}
				</div>
			</Col>
		</Row>
	)
}

type myProps = {
	owner: string,
	color: string,
	setColor: any
}

export default PaddleCustom