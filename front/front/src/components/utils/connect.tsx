import axios from "axios";
import { BACK_URL } from "../constants";
import handleErrors from "../RequestErrors/handleErrors";
import UserDto from "./UserDto";

export async function setConnect(user : typeof UserDto, nav: any){
	console.log("eeeeee");
	console.log(user, "connectedddc")
	axios.post(`${BACK_URL}/account/connected`, {account_id :user.account_id}, {
		withCredentials:true ,
		method: "post",
		headers: {}
	})
	.catch((error) => {
		  handleErrors(error, nav)
	  });
}

export async function setDisconnect(user : typeof UserDto, nav: any){
	axios.post(`${BACK_URL}/account/disconnected`, {account_id :user.account_id}, {
		withCredentials:true ,
		method: "post",
		headers: {}
	})
	.catch((error) => {
		  handleErrors(error, nav)
	  });
}

export async function handleDisconected(user: typeof UserDto, nav:any){
	axios.post(`${BACK_URL}/account/disconnected`, {account_id :user.account_id}, {
		withCredentials:true ,
		method: "post",
		headers: {}
	})
	.catch((error) => {
		  handleErrors(error, nav)
	  });
}