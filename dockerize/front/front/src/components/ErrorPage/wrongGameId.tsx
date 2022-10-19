
import ButtonTemplate from "../ButtonTemplate";

export default function WrongGameId() {
	return(
		<div>
			<p>You tried to access a game that doesn't currently exist</p>
			<ButtonTemplate text="Login" onClick={() => {window.location.href = 'http://localhost:4000/auth/login'}} buttonClass={'login-button rightButton'}/>
		</div>
	)
}