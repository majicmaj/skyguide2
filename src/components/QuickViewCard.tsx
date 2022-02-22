import { Box } from '@mui/system'
import { Field, WindArrow } from '../sections/Stats/Stats'
import { GetColorFromTemperature } from '../services/GetColor'
import { getFahrenheit } from '../services/GetFahrenheit'
import getFormattedTime from '../services/getFormattedTime'
import Card from './Card'
import ColoredPop from './ColoredPop'
import Suffix from './Suffix'
import WeatherIcon from './WeatherIcon'

const QuickViewCard = ({ data, metric }: any) => {
	let {
		temp,
		feels_like,
		pressure,
		humidity,
		uvi,
		clouds,
		visibility,
		wind_speed,
		wind_deg,
		weather,
		dt,
		pop,
	} = data || {}
	const tempColor = GetColorFromTemperature(temp)
	const feelsLikeColor = GetColorFromTemperature(feels_like)
	if (!metric) {
		temp = getFahrenheit(temp)
		feels_like = getFahrenheit(feels_like)
	}
	const roundedTemp = Math.round(temp)
	const roundedFeelsLike = Math.round(feels_like)
	const { icon, main } = weather?.[0] || {}
	const title = getFormattedTime(dt) + ' - ' + main
	return (
		<div
			style={{
				display: 'grid',
				placeItems: 'center',
			}}
		>
			<Card labe={title}>
				<Box
					sx={{
						display: 'grid',
						placeItems: 'center',
						gridTemplateColumns: 'max-content 1fr',
					}}
				>
					<div
						style={{
							display: 'grid',
							placeItems: 'center',
						}}
					>
						<Box
							sx={{
								'& > img': {
									width: '128px',
								},
							}}
						>
							<WeatherIcon icon={icon} large description={main} />
						</Box>
						<p
							style={{
								fontSize: '4em',
								color: tempColor,
							}}
						>
							{roundedTemp}°
						</p>
						<p>
							Feels like{' '}
							<span
								style={{
									color: feelsLikeColor,
								}}
							>
								{roundedFeelsLike}°
							</span>
						</p>
					</div>
					<Box
						sx={{
							display: 'grid',
							placeItems: 'center start',
							height: '100%',
						}}
					>
						<Field label='Wind'>
							<WindArrow wind_deg={wind_deg} /> {wind_speed}{' '}
							<Suffix>mps</Suffix>
						</Field>
						<Field label='Pressure'>
							{pressure} <Suffix>hPa</Suffix>
						</Field>
						<Field label='Humidity'>
							{humidity} <Suffix>%</Suffix>
						</Field>
						<Field label='UVI'>{uvi}</Field>
						<Field label='Clouds'>
							{clouds} <Suffix>%</Suffix>
						</Field>
						<Field label='Visibility'>
							{visibility} <Suffix>m</Suffix>
						</Field>
						{pop && (
							<Field label='Percipitation'>
								<ColoredPop pop={pop} />
							</Field>
						)}
					</Box>
				</Box>
			</Card>
		</div>
	)
}

export default QuickViewCard
