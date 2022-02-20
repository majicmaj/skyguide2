import axios from 'axios'

const api = 'http://192.168.1.94:8000'
export const getWeather = async (lat: number, lon: number) => {
	const response = await axios.get(`${api}/?lat=${lat}&lon=${lon}`)
	return response.data
}

export const getCityName = async (lat: number, lon: number) => {
	const response = await axios.get(`${api}/geocode?lat=${lat}&lon=${lon}`)
	return response.data
}
