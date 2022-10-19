export const LoginSuccess = () => {
	document.cookie = '_intra_42_session_production=; path=/; domain=.intra.42.fr; expires=' + new Date(0).toUTCString();
	return (
		<div>
			<p>You have been succesfully logged in</p>
		</div>
	)
}