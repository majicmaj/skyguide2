import { getSmallWeatherIcon, getWeatherIcon, TCode } from '../services/GetIcon'

export default function WeatherIcon({
	large = false,
	icon,
	description,
}: {
	large?: boolean
	icon: TCode
	description: string
}) {
	const iconUrl = large ? getWeatherIcon(icon) : getSmallWeatherIcon(icon)
	return <img src={iconUrl} alt={description} />
}
