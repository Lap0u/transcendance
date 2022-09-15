import { Col, Row } from 'antd'
import './PaddleCustom.css'
import { BlockPicker } from 'react-color'
import { useState } from 'react'

const PaddleCustom = ({owner} : myProps) => {
	const [hidePicker, setHidePicker] = useState(false)
	
	return (
		<Row justify="center" align="top" className="paddle-row">
			<Col className='paddle' span={12}>
				{owner} paddle
			</Col>
			<Col className='paddle' span={12}>
				<button onClick={() => setHidePicker(!hidePicker)} className='my-paddle'></button>
				{hidePicker && <BlockPicker />}
			</Col>
		</Row>
	)
}

type myProps = {
	owner: string
}

export default PaddleCustom