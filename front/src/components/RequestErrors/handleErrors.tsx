export default function handleErrors(error : any)
{
	if (error.response.status === 403)
	{
	//	window.location.href = 'http://localhost:3000/'
		console.log("errror 403");
	}
	else
	{
	//	window.location.href = 'http://localhost:3000/'
		console.log("errroooor");
	}
}