import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { BlockPicker } from 'react-color'
import './BallCustom.css'

const BallCustom = ({others, compPicker, setCompPicker, color, setColor} : myProps) => {

	useEffect(() => {
		const handleEscape = (event : any) => {
			if (event.repeat)
				return
			if (event.key === "Escape")
				setCompPicker(false)
		}
		window.addEventListener('keyup', handleEscape)
		return () => {
			window.removeEventListener('keyup', handleEscape)
		}
	}, [compPicker])

	function handleColorChange(color : any, event : any) {
		setColor(color.hex)
	}
	function updatePicker() {
		console.log('other', others)
		if (others === true){
			setCompPicker(!compPicker)
		}
	}
	return (
		<Row justify="center" align="middle" className="ball-row">
			<Col className='ball-col' span={12}>
				BallCustom
			</Col>
			<Col className='ball-col' span={12}>
				<button style={{backgroundColor: color}} onClick={() => updatePicker()} className='my-ball'></button>
				<div className='picker-div'>
					{compPicker && <BlockPicker className='my-picker' onChangeComplete={handleColorChange} color={color} />}
				</div>
			</Col>
		</Row>
	)
}

type myProps = {
	others: boolean,
	compPicker: boolean,
	setCompPicker: any,
	color: string,
	setColor: any
}

export default BallCustom;