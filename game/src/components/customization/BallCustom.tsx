import { Col, Row } from 'antd';
import { useState } from 'react';
import { BlockPicker } from 'react-color'
import './BallCustom.css'

const BallCustom = () => {
	const [hidePicker, setHidePicker] = useState(false)

	return (
		<Row justify="center" align="middle" className="ball-row">
			<Col className='ball-col' span={12}>
				BallCustom
			</Col>
			<Col className='ball-col' span={12}>
				<button onClick={() => setHidePicker(!hidePicker)} className='my-ball'></button>
			</Col>
			{hidePicker && <BlockPicker />}
		</Row>
	)
}

export default BallCustom;