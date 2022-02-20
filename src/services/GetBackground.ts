const backgrounds = [
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-2-dragged.jpg?quality=82&strip=all&w=1000',
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-3-dragged.jpg?quality=82&strip=all&w=1000',
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-6-dragged.jpg?quality=82&strip=all&w=1000',
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-5-dragged.jpg?quality=82&strip=all&w=1000',
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-5-dragged.jpg?quality=82&strip=all&w=1000',
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-1-dragged.jpg?quality=82&strip=all&w=1000',
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-4-dragged.jpg?quality=82&strip=all&w=1000',
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-8-dragged.jpg?quality=82&strip=all&w=1000',
	'https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Lake-7-dragged.jpg?quality=82&strip=all&w=1000',
]

export const getBackground = (): string => {
	const hour = Math.floor(new Date().getHours() / 3)
	return backgrounds[hour]
}
