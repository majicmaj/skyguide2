import { useEffect, useState } from 'react'
import { getWeather, getCityName } from './services/API'
import { Box } from '@mui/system'
import Currently from './sections/Currently/Currently'
import Alerts from './sections/Alerts/Alerts'
import { getBackground, getMobileBackground } from './services/GetBackground'
import Hourly from './sections/Hourly/Hourly'
import Daily from './sections/Daily/Daily'
import Stats from './sections/Stats/Stats'
import Nav from './sections/Nav/Nav'
import SampleData from './SampleData.json'

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
	const [metric, setMetric] = useState<boolean>(true)

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

	const { current, hourly, daily, alerts } = data
	const backgroundImage = getBackground()
	const backgroundMobileImage = getMobileBackground()
	return (
		<div className='App'>
			<Box
				sx={{
					background: `linear-gradient(to bottom, #2266ff, #ffccaa, #faf)`,
					backgroundImage: `url(${backgroundMobileImage})`,
					'@media screen and (min-width: 768px)': {
						backgroundImage: `url(${backgroundImage})`,
					},
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					color: 'white',
					minHeight: '100vh',
					display: 'grid',
					gridGap: '1rem',
					padding: '0.5rem',
					fontSize: '20px',
					placeItems: 'center',
				}}
			>
				<Nav data={location} />
				<Currently data={current} metric={metric} setMetric={setMetric} />
				<Stats data={current} />
				{alerts && alerts.length && <Alerts data={alerts} />}
				{/* {(current?.rain || current?.snow) && <Minutely data={minutely} />} */}
				<Hourly data={hourly} metric={metric} />
				<Daily data={daily} metric={metric} />
			</Box>
		</div>
	)
}

export default App
