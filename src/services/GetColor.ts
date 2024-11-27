export const getColor = (
	value: number,
	reverse: boolean,
	hueRange: number,
	shift: number,
	scale: number,
	min: number,
	max: number
) => {
	const tempHue = reverse
		? hueRange - ((value + shift) * hueRange) / scale
		: ((value + shift) * hueRange) / scale
	const tempHsl = `hsl(clamp(${min}, ${tempHue}, ${max}), 80%, 50%)`
	return tempHsl
}

export const GetColorFromTemperature = (temp: number): string =>
	getColor(temp, true, 180, -5, 40, 0, 215)

export const GetColorFromUVI = (uvi: number): string =>
	getColor(uvi, true, 100, 0, 10, 0, 100)
