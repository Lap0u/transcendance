import { Col, Row } from 'antd'
import './PaddleCustom.css'
import { BlockPicker } from 'react-color'
import { useEffect } from 'react'

const PaddleCustom = ({others, compPicker, setCompPicker, owner, color, setColor} : myProps) => {

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
		<Row justify="center" align="middle" className="paddle-row">
			<Col className='paddle' span={12}>
				{owner} paddle
			</Col>
			<Col className='paddle' span={12}>
				<button style={{backgroundColor: color}} onClick={() => updatePicker()} className='paddle-button'></button>
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
	owner: string,
	color: string,
	setColor: any
}

export default PaddleCustom