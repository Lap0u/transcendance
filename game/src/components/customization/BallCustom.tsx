import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { BlockPicker } from 'react-color'
import './BallCustom.css'

const BallCustom = ({color, setColor} : any) => {
	const [hidePicker, setHidePicker] = useState(false)

	useEffect(() => {
		const handleEscape = (event : any) => {
			if (event.repeat)
				return
			if (event.key === "Escape")
				setHidePicker(false)
		}
		window.addEventListener('keyup', handleEscape)
		return () => {
			window.removeEventListener('keyup', handleEscape)
		}
	}, [hidePicker])

	function handleColorChange(color : any, event : any) {
		setColor(color.hex)
	}
	return (
		<Row justify="center" align="middle" className="ball-row">
			<Col className='ball-col' span={12}>
				BallCustom
			</Col>
			<Col className='ball-col' span={12}>
				<button style={{backgroundColor: color}} onClick={() => setHidePicker(!hidePicker)} className='my-ball'></button>
				<div className='picker-div'>
					{hidePicker && <BlockPicker onChangeComplete={handleColorChange} color={color} />}
				</div>
			</Col>
		</Row>
	)
}

export default BallCustom;