const miniIcons = {
	'01d': 'https://i.imgur.com/lAF9QMn.png',
	'02d': 'https://i.imgur.com/vD3Q7AG.png', // few clouds
	'03d': 'https://i.imgur.com/jySmqqH.png', // scattered clouds
	'04d': 'https://i.imgur.com/fjKJgZ8.png', // broken clouds
	'09d': 'https://i.imgur.com/GgRLWVw.png', // shower rain
	'10d': 'https://i.imgur.com/uvSxUaE.png', // rain
	'11d': 'https://i.imgur.com/oA3VxUU.png', // thunderstorm
	'13d': 'https://i.imgur.com/hpyGDFx.png', // snow
	'50d': 'https://i.imgur.com/biSmT5W.png', // mist
	'01n': 'https://i.imgur.com/SFA2fV3.png', // clear
	'02n': 'https://i.imgur.com/z6A8QUk.png', // few clouds
	'03n': 'https://i.imgur.com/jySmqqH.png', // scattered
	'04n': 'https://i.imgur.com/fjKJgZ8.png', //
	'09n': 'https://i.imgur.com/GgRLWVw.png', //
	'10n': 'https://i.imgur.com/DX1E7XH.png', //
	'11n': 'https://i.imgur.com/oA3VxUU.png', //
	'13n': 'https://i.imgur.com/r5ZTtRz.png', //
	'50n': 'https://i.imgur.com/biSmT5W.png', //
}
const icons = {
	'01d': 'https://i.imgur.com/EkjX0ep.png',
	'02d': 'https://i.imgur.com/49eFUwO.png', // few clouds
	'03d': 'https://i.imgur.com/U7C6wtI.png', // scattered clouds
	'04d': 'https://i.imgur.com/on0DzwQ.png', // broken clouds
	'09d': 'https://i.imgur.com/GgRLWVw.png', // shower rain
	'10d': 'https://i.imgur.com/GIjO03H.png', // rain
	'11d': 'https://i.imgur.com/5CyNpdM.png', // thunderstorm
	'13d': 'https://i.imgur.com/kKeH0zt.png', // snow
	'50d': 'https://i.imgur.com/XjsVd7R.png', // mist

	'01n': 'https://i.imgur.com/VSPEyxF.png', // clear
	'02n': 'https://i.imgur.com/w9hbSel.png', // few clouds
	'03n': 'https://i.imgur.com/U7C6wtI.png', // scattered
	'04n': 'https://i.imgur.com/on0DzwQ.png', //
	'09n': 'https://i.imgur.com/GgRLWVw.png', //
	'10n': 'https://i.imgur.com/vyE7IRd.png', //
	'11n': 'https://i.imgur.com/5CyNpdM.png', //
	'13n': 'https://i.imgur.com/3TliUMC.png', //
	'50n': 'https://i.imgur.com/XjsVd7R.png', //
}

export type TCode = keyof typeof icons
export const getWeatherIcon = (code: TCode): string => {
	return icons[code]
}

export const getSmallWeatherIcon = (code: TCode): string => {
	return miniIcons[code]
}
