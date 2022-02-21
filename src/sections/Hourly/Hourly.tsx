import { AccessTime } from '@mui/icons-material'
import { Box } from '@mui/system'
import { FC, useState } from 'react'
import Card from '../../components/Card'
import ColoredPop from '../../components/ColoredPop'
import { Modal } from '../../components/Modal'
import Suffix from '../../components/Suffix'
import WeatherIcon from '../../components/WeatherIcon'
import { GetColorFromTemperature } from '../../services/GetColor'
import { getFahrenheit } from '../../services/GetFahrenheit'
import { Field, WindArrow } from '../Stats/Stats'

const getFormattedTime = (time: number) => {
	return new Date(time * 1000).toLocaleTimeString('en-US', {
		hour: 'numeric',
	})
}

const HourCard = ({ data, index, metric }: any) => {
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
	const { icon, main, description } = weather?.[0] || {}
	return (
		<div
			style={{
				display: 'grid',
				gridGap: '1rem',
			}}
		>
			<Card label={getFormattedTime(dt) + ' - ' + main}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<div>
						<p
							style={{
								fontSize: '4em',
								color: tempColor,
							}}
						>
							{roundedTemp}°
						</p>
						<p>
							feels like{' '}
							<span
								style={{
									color: feelsLikeColor,
								}}
							>
								{roundedFeelsLike}°
							</span>
						</p>
						<ColoredPop pop={pop} />
					</div>

					<Box
						sx={{
							'& > img': {
								width: '96px',
							},
						}}
					>
						<WeatherIcon icon={icon} large description={main} />
						<p style={{ textTransform: 'capitalize' }}>{description}</p>
					</Box>
				</Box>
				<Box
					sx={{
						marginTop: '2rem',
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
					}}
				>
					<Field label='W'>
						<WindArrow wind_deg={wind_deg} /> {wind_speed} <Suffix>mps</Suffix>
					</Field>
					<Field label='P'>
						{pressure} <Suffix>hPa</Suffix>
					</Field>
					<Field label='H'>
						{humidity} <Suffix>%</Suffix>
					</Field>
					<Field label='U'>{uvi}</Field>
					<Field label='C'>
						{clouds} <Suffix>%</Suffix>
					</Field>
					<Field label='V'>
						{visibility} <Suffix>m</Suffix>
					</Field>
				</Box>
			</Card>
		</div>
	)
}
const HourWeather = ({ data, index, metric, onClick }: any) => {
	let { temp, weather, dt, pop } = data
	const tempColor = GetColorFromTemperature(temp)
	if (!metric) {
		temp = getFahrenheit(temp)
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
			onClick={() => onClick(index)}
		>
			{index === 0 ? <p>Now</p> : <p>{getFormattedTime(dt)}</p>}
			<WeatherIcon icon={icon} description={description} />
			<ColoredPop pop={pop} />
			<Box sx={{ color: tempColor }}>{Math.round(temp)}&deg;</Box>
		</Box>
	)
}

interface IHourlyProps {
	data: any
	metric: boolean
}

const Hourly: FC<IHourlyProps> = ({ data, metric }) => {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState(0)
	const handleOpen = (index: number) => {
		setSelected(index)
		setOpen(true)
	}
	const handleClose = () => setOpen(false)
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
								<HourWeather
									data={item}
									index={index}
									metric={metric}
									onClick={handleOpen}
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
			<Modal open={open} onClose={handleClose}>
				{data ? (
					<HourCard
						data={data[selected] ? data[selected] : {}}
						index={selected}
						metric={metric}
					/>
				) : (
					''
				)}
			</Modal>
		</Card>
	)
}

export default Hourly
