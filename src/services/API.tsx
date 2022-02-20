import axios from 'axios'

const api = 'https://skyguide-317801.uk.r.appspot.com/'
export const getWeather = async (lat: number, lon: number) => {
	const response = await axios.get(`${api}/?lat=${lat}&lon=${lon}`)
	return response.data
}

export const getCityName = async (lat: number, lon: number) => {
	const response = await axios.get(`${api}/geocode?lat=${lat}&lon=${lon}`)
	return response.data
}
