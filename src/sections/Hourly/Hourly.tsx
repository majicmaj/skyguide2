import { AccessTime } from '@mui/icons-material'
import { Box } from '@mui/system'
import { FC, useState } from 'react'
import Card from '../../components/Card'
import ColoredPop from '../../components/ColoredPop'
import { Modal } from '../../components/Modal'
import QuickViewCard from '../../components/QuickViewCard'
import WeatherIcon from '../../components/WeatherIcon'
import { GetColorFromTemperature } from '../../services/GetColor'
import { getFahrenheit } from '../../services/GetFahrenheit'
import getFormattedTime from '../../services/getFormattedTime'

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
					<QuickViewCard data={data[selected] || {}} metric={metric} />
				) : (
					''
				)}
			</Modal>
		</Card>
	)
}

export default Hourly
