import myImg from '../../../assets/enlarge-powerup.png';

export function drawPowerup(context : any) {
	const img = new Image();
	img.onload = function () {
		context.drawImage(img, 0, 0)
	}
	img.onerror = function (e) {
		console.log('error: ', e);
	}
	img.src = myImg
}
