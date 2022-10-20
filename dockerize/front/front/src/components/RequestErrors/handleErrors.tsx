import axios from "axios";

export default async function handleErrors(error : any)
{
	const BACK_URL = "http://localhost:4000";

	console.log("errror", error);

	if (error.response.status === 401 || error.response.status === 403){
		await axios.get(`${BACK_URL}/auth/status`, {
			withCredentials:true ,
		})
		.then(res => {
			if (res.data.twoFaEnabled && !res.data.emailVerified){
				window.location.href = 'http://localhost:3000/emailverify'
				return;
			}
			if (res.data.twoFaEnabled && res.data.emailVerified){
				window.location.href = 'http://localhost:3000/2fa';
				return;
			}
			else {
				window.location.href = 'http://localhost:3000/forbidden';
				return;
			}
		 })
		.catch((error) => {
			if (error.response.status === 403){
				window.location.href = 'http://localhost:3000/error403';
				return;
			}
			else
				window.location.href = 'http://localhost:3000/error500'
		});

	}
	else if (error.response.status=== 400)
		window.location.href = 'http://localhost:3000/error400'
	else if (error.response.status=== 404)
		window.location.href = 'http://localhost:3000/error404'
	else {
		window.location.href = 'http://localhost:3000/error500'
	}
}