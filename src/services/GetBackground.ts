const backgrounds = [
	'https://i.imgur.com/JFxFawi.png',
	'https://i.imgur.com/J9iS3bu.png',
	'https://i.imgur.com/tbF3f1s.png',
	'https://i.imgur.com/sYEJ5cG.jpg',
	'https://i.imgur.com/tAeRVF4.jpg',
	'https://i.imgur.com/QgLyNOt.jpg',
	'https://i.imgur.com/y29jthU.png',
	'https://i.imgur.com/jrK7QVZ.png',
]

const mobileBackgrounds = [
	'https://i.imgur.com/SV6xxvx.png', // 0,1,2
	'https://i.imgur.com/lBRS7N0.png', // 3,4,5
	'https://i.imgur.com/T1tbhPd.png', // 6,7,8
	'https://i.imgur.com/aHKK06w.png', // 9,10,11
	'https://i.imgur.com/WAeGn2l.png', // 12,13,14
	'https://i.imgur.com/5doC8qN.png', // 15,16,17
	'https://i.imgur.com/jhTqhxr.png', // 18,19,20
	'https://i.imgur.com/mynX9xV.png', // 21,22,23
]

export const getBackground = (dt: number, backgrounds: any): string => {
	const hour = Math.floor(new Date(dt * 1000).getHours())
	if (hour === 4) {
		return backgrounds[1]
	}
	if (hour === 5) {
		return backgrounds[2]
	}
	if (hour > 5 && hour <= 9) {
		return backgrounds[3]
	}
	if (hour > 9 && hour <= 15) {
		return backgrounds[4]
	}
	if (hour > 15 && hour <= 18) {
		return backgrounds[5]
	}
	if (hour === 18) {
		return backgrounds[6]
	}
	if (hour === 19) {
		return backgrounds[7]
	}
	return backgrounds[0]
}
export const getDesktopBackground = (dt: number): string => {
	return getBackground(dt, backgrounds)
}

export const getMobileBackground = (dt: number): string => {
	return getBackground(new Date(dt).getTime(), mobileBackgrounds)
}
