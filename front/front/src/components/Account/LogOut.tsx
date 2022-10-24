import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import handleErrors from '../RequestErrors/handleErrors';
import './AccountPage.css'

const BACK_URL = "http://localhost:4000";
const FRONT_URL = "http://localhost:3000";

export const Logout= () =>{
	const nav = useNavigate();
	async function logout() {
		await axios.get(`${BACK_URL}/auth/logout`, 
		{
			withCredentials:true,
		})
		.then((response) => {
			window.location.href = `${FRONT_URL}/`;
		})
		.catch((error) => {
			handleErrors(error, nav)
		})
	}
	logout();
	return(
	<p>...</p>
	)
}