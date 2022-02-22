const getFormattedTime = (time: number) => {
	return new Date(time * 1000).toLocaleTimeString('en-US', {
		hour: 'numeric',
	})
}

export default getFormattedTime
