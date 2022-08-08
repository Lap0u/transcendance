import './login.css'
import avatar from '../../assets/default-avatar.png'

const LoginPopup = ({isLog, setLog}) => {

	function hideForm(){
		setLog(!isLog)
	}
	
	window.onclick = function(event : any) {
		const form = document.getElementById('main');
		if (event.target === form) {
			hideForm();
		}
	}	
	return (
	<div className='loginContainer' id='main'>
		<form className='loginForm animate'>
			<img src={avatar} alt='Default Avatar' />
			<span onClick={() => hideForm()} className="redCross" title="Close Modal">&times;</span>
			<div className='fieldContainer'>
				<label htmlFor='username'>Username</label>
				<input type="text" placeholder="Enter Username" name="username" required />

				<label htmlFor='password'>Password</label>
				<input type="password" placeholder="Enter Password" name="password" required />
					
				<div className='rememberMe'>
					<button type="submit">Login</button>
					<label className="loginRememberMe">
						<input type="checkbox" defaultChecked={true} name="remember" />
							Remember me
					</label>
				</div>
			</div>
		</form>
	</div>
	)
}

export default LoginPopup;