import { CalendarToday } from '@mui/icons-material'
import { Box } from '@mui/system'
import { FC } from 'react'
import Card from '../../components/Card'
import ColoredPop from '../../components/ColoredPop'
import WeatherIcon from '../../components/WeatherIcon'
import { GetColorFromTemperature } from '../../services/GetColor'

interface IHourlyProps {
	data: any
	metric: boolean
}

const Bar = ({ min, max, minHsl, maxHsl, data }: any) => {
	if (!data) return <p>No data</p>
	const dataMin = Math.min(...data?.map((d: any) => d?.temp?.min))
	const dataMax = Math.max(...data?.map((d: any) => d.temp.max))
	const range = dataMax - dataMin
	const width = 100
	const modifier = range / width
	return (
		<div
			style={{
				background: '#00000030',
				display: 'flex',
				width: width + '%',
				borderRadius: '2px',
			}}
		>
			<div
				style={{
					width: `${(min - dataMin) / modifier}%`,
				}}
			/>
			<Box
				sx={{
					height: '4px',
					background: 'red',
					borderRadius: '2px',
					width: `${(max - min) / modifier}%`,
					backgroundImage: `linear-gradient(to right, ${minHsl}, ${maxHsl})`,
				}}
			/>
		</div>
	)
}

const DayWeather = ({ item, index, metric, data }: any) => {
	const { temp, weather, dt, pop } = item
	let { min, max } = temp
	const { min: cMin, max: cMax } = temp
	const minHsl = GetColorFromTemperature(min)
	const maxHsl = GetColorFromTemperature(max)
	if (!metric) {
		min = Math.round((min * 9) / 5 + 32)
		max = Math.round((max * 9) / 5 + 32)
	}
	const { icon, description } = weather[0]
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '60px 1fr 1fr minmax(100px, 1fr)',
				placeItems: 'center',
				'& > img': {
					width: '2.5rem',
				},
			}}
		>
			<p style={{ textAlign: 'left', width: '100%' }}>
				{index === 0
					? 'Today'
					: new Date(dt * 1000).toLocaleString('en-US', {
							weekday: 'short',
					  })}
			</p>
			<WeatherIcon icon={icon} description={description} />
			<ColoredPop pop={pop} />
			<Box
				sx={{
					display: 'grid',
					placeItems: 'center start',
					gridGap: '0.5rem',
					width: '100%',
					gridTemplateColumns: '30px 1fr 30px',
				}}
			>
				<span style={{ color: minHsl }}>{Math.round(min)}&deg;</span>
				<Bar
					min={cMin}
					max={cMax}
					minHsl={minHsl}
					maxHsl={maxHsl}
					data={data}
				/>
				<span style={{ color: maxHsl }}>{Math.round(max)}&deg;</span>
			</Box>
		</Box>
	)
}
const Daily: FC<IHourlyProps> = ({ data, metric }) => {
	return (
		<Card
			icon={<CalendarToday fontSize='small' />}
			label='Daily'
			sx={{
				'@media screen and (min-width: 768px)': {
					gridArea: 'd',
				},
			}}
		>
			<Box
				sx={{
					display: 'grid',
				}}
			>
				{data ? (
					data.map((item: any, index: number) => {
						return (
							<div key={index}>
								<DayWeather
									item={item}
									index={index}
									metric={metric}
									data={data}
								/>
							</div>
						)
					})
				) : (
					<Box
						sx={{
							height: '100px',
							width: '100%',
						}}
					/>
				)}
			</Box>
		</Card>
	)
}

export default Daily
