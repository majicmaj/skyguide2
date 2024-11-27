import { useEffect, useState } from 'react'
import { getWeather, getCityName } from './services/API'
import { Box, height } from '@mui/system'
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
import useStickyState from './hooks/useStickyState'
import Minutely from './sections/Minutely/Minutely'
import { MEDIA } from './constants'
import useData from './hooks/useData'
import { getGridArea } from './utils/getGridArea'

function App() {
	const devMode = false
	const [metric, setMetric] = useStickyState(true, 'metric')
	
	const { weather, location } = useData({
		metric,
		devMode
	}) 

	const { current, minutely, hourly, daily, alerts } = weather || {}
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
					gridTemplateColumns: '1fr',
					gridTemplateRows: 'auto auto auto auto auto auto auto 1fr',
					gridGap: '16px',
					padding: '16px',
					fontSize: '20px',
					maxWidth: '1000px',
					margin: '0 auto',

					[MEDIA.xs]: {
						fontSize: '16px',
						padding: 0,
					},
					[MEDIA.lg]: {
						gridTemplateColumns: 'repeat(2, calc(50% - 0.5rem))',
						gridTemplateAreas: getGridArea(willPreciptate, alerts),
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
