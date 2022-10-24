import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import './ErrorPages.css'

export default function Forrbidden() {
	const nav = useNavigate();
	return(
		<div className='error-page'>
			<p>Forrbidden ressource</p>
			<Button className='home-button' shape="circle" icon={<HomeOutlined />} onClick={() => nav('/')} />
		</div>
	)
}