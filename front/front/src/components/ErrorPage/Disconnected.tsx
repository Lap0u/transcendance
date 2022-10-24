
import ButtonTemplate from "../ButtonTemplate";
import './ErrorPages.css'

export default function Disconnected() {
	return(
		<div className='error-page'>
			<p>You have been disconnected, please login to access the page ☹️</p>
			<ButtonTemplate text="Login" onClick={() => {window.location.href = 'http://localhost:4000/auth/login'}} buttonClass={'login-button rightButton'}/>
		</div>
	)
}