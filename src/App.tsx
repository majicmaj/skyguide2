import { useEffect, useState } from 'react'
import { getWeather, getCityName } from './services/API'
import { Box } from '@mui/system'
import Currently from './sections/Currently/Currently'
import Alerts from './sections/Alerts/Alerts'
import {
	getDesktopBackground,
	getMobileBackground,
} from './services/GetBackground'
import Hourly from './sections/Hourly/Hourly'
import Daily from './sections/Daily/Daily'
import Stats from './sections/Stats/Stats'
import Nav from './sections/Nav/Nav'
import SampleData from './SampleData.json'
import useStickyState from './hooks/useStickyState'
import Minutely from './sections/Minutely/Minutely'
import { MEDIA } from './constants'

const SampleLocation = {
	results: [
		{
			address_components: [
				{
					long_name: 'Herndon',
					short_name: 'Herndon',
					types: ['locality', 'political'],
				},
			],
		},
	],
}

function App() {
	const devMode = 0
	const [data, setData] = useState<any>({})
	const [location, setLocation] = useState<any>({})
	const [metric, setMetric] = useStickyState(true, 'metric')

	useEffect(() => {
		if (devMode) {
			setData(SampleData)
			setLocation(SampleLocation)
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					const lat = parseFloat(latitude.toFixed(2))
					const lon = parseFloat(longitude.toFixed(2))
					getWeather(lat, lon)
						.then((data: any) => {
							setData(data)
						})
						.catch((err: any) => {
							console.log(err)
						})
					getCityName(lat, lon)
						.then((data: any) => {
							setLocation(data)
						})
						.catch((err: any) => {
							console.log(err)
						})
				},
				(err) => {
					console.log(err)
					//TODO: delete
					getWeather(38.92, -77.38)
						.then((data: any) => {
							setData(data)
						})
						.catch((err: any) => {
							console.log(err)
						})
					setLocation(SampleLocation)
				}
			)
		}
	}, [])

	const { current, minutely, hourly, daily, alerts } = data || {}
	const { dt } = current || {}
	const backgroundImage = getDesktopBackground(dt)
	const backgroundMobileImage = getMobileBackground(dt)
	const willPreciptate = minutely?.some((m: any) => m.precipitation > 0)
	return (
		<Box
			className='App'
			sx={{
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundImage: `url(${backgroundMobileImage})`,
				[MEDIA.lg]: {
					backgroundImage: `url(${backgroundImage})`,
				},
			}}
		>
			<Box
				sx={{
					color: 'white',
					minHeight: '100vh',
					display: 'grid',
					gridGap: '1rem',
					padding: '0.5rem',
					fontSize: '20px',
					maxWidth: '1000px',
					margin: '0 auto',
					[MEDIA.xs]: {
						fontSize: '16px',
						padding: 0,
					},
					'@media screen and (min-width: 768px)': {
						gridTemplateColumns: 'repeat(2, calc(50% - 0.5rem))',
						gridTemplateAreas: willPreciptate
							? `
						"n n"
						"c c"
						"m m"
						"h s"
						"d d"
						`
							: `
						"n n"
						"c c"
						"h s"
						"d d"
						`,
					},
				}}
			>
				<Nav data={location} />
				<Currently data={current} metric={metric} setMetric={setMetric} />
				<Stats data={current} />
				{alerts && alerts.length && <Alerts data={alerts} />}
				{willPreciptate && <Minutely data={minutely} />}
				<Hourly data={hourly} metric={metric} />
				<Daily data={daily} metric={metric} />
			</Box>
		</Box>
	)
}

export default App
