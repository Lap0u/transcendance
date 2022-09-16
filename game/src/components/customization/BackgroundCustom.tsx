import { Col, Row } from 'antd'
import './BackgroundCustom.css'
import { BlockPicker } from 'react-color'
import { useEffect, useState } from 'react'

const BackgroundCustom = ({color, setColor} : myProps) => {
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
		<Row justify="center" align="middle" className="background-row">
			<Col className='background' span={12}>
				Background
			</Col>
			<Col className='background' span={12}>
				<button style={{backgroundColor: color}} onClick={() => setHidePicker(!hidePicker)} id='my-background'></button>
				<div className='picker-div'>
					{hidePicker && <BlockPicker onChangeComplete={handleColorChange} color={color} />}
				</div>
			</Col>
		</Row>
	)
}

type myProps = {
	color: string,
	setColor: any
}

export default BackgroundCustom