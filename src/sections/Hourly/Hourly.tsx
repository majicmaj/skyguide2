import { AccessTime } from '@mui/icons-material'
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

const HourWeather = ({ data, index, metric }: any) => {
	let { temp, weather, dt, pop } = data
	const tempColor = GetColorFromTemperature(temp)
	if (!metric) {
		temp = Math.round((temp * 9) / 5 + 32)
	}
	const { icon, description } = weather[0]
	return (
		<Box
			sx={{
				width: '64px',
				display: 'grid',
				placeItems: 'center',
				gridGap: '0.5rem',
				marginBottom: '0.25rem',
				'& > img': {
					width: '2rem',
				},
			}}
		>
			{index === 0 ? (
				<p>Now</p>
			) : (
				<p>
					{new Date(dt * 1000).toLocaleTimeString('en-US', {
						hour: 'numeric',
					})}
				</p>
			)}
			<WeatherIcon icon={icon} description={description} />
			<ColoredPop pop={pop} />
			<Box sx={{ color: tempColor }}>{Math.round(temp)}&deg;</Box>
		</Box>
	)
}
const Hourly: FC<IHourlyProps> = ({ data, metric }) => {
	return (
		<Card icon={<AccessTime fontSize='small' />} label='Hourly'>
			<Box
				sx={{
					display: 'flex',
					overflowX: 'scroll',
					maxWidth: 'calc(100vw - 4rem)',
					'&::-webkit-scrollbar': {
						background: 'transparent',
						width: '0.5rem',
						height: '0.5rem',
						// border: '1px solid red',
					},
					'&::-webkit-scrollbar-track': {
						background: 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						background: 'rgba(0, 0, 0, 0.2)',
						borderRadius: '0.5rem',
					},
					'&::-webkit-scrollbar-button': {
						display: 'none',
					},
				}}
			>
				{data ? (
					data.map((item: any, index: number) => {
						return (
							<div key={index}>
								<HourWeather data={item} index={index} metric={metric} />
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

export default Hourly
