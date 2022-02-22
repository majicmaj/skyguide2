const backgrounds = [
	'https://i.imgur.com/J9iS3bu.png',
	'https://i.imgur.com/tbF3f1s.png',
	'https://i.imgur.com/sYEJ5cG.jpg',
	'https://i.imgur.com/tAeRVF4.jpg',
	'https://i.imgur.com/QgLyNOt.jpg',
	'https://i.imgur.com/y29jthU.png',
	'https://i.imgur.com/jrK7QVZ.png',
	'https://i.imgur.com/JFxFawi.png',
]

const mobileBackgrounds = [
	'https://i.imgur.com/lBRS7N0.png', // 3,4,5
	'https://i.imgur.com/T1tbhPd.png', // 6,7,8
	'https://i.imgur.com/aHKK06w.png', // 9,10,11
	'https://i.imgur.com/WAeGn2l.png', // 12,13,14
	'https://i.imgur.com/5doC8qN.png', // 15,16,17
	'https://i.imgur.com/jhTqhxr.png', // 18,19,20
	'https://i.imgur.com/mynX9xV.png', // 21,22,23
	'https://i.imgur.com/SV6xxvx.png', // 0,1,2
]

export const getBackground = (): string => {
	const hour = Math.floor(new Date().getHours() / 3)
	return backgrounds[hour]
}
export const getMobileBackground = (): string => {
	const hour = Math.floor(new Date().getHours() / 3)
	return mobileBackgrounds[hour]
}
