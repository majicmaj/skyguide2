import { Button, CircularProgress, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { Dispatch, FC, SetStateAction } from 'react'
import Card from '../../components/Card'
import WeatherIcon from '../../components/WeatherIcon'
import { GetColorFromTemperature } from '../../services/GetColor'
import { getFahrenheit } from '../../services/GetFahrenheit'

interface ICurrentlyProps {
	data: any
	metric: boolean
	setMetric: Dispatch<SetStateAction<boolean>>
}
const Currently: FC<ICurrentlyProps> = ({ data, metric, setMetric }) => {
	let { temp, feels_like, weather } = data || {}
	const feelsLikeColor = GetColorFromTemperature(feels_like)
	if (!metric) {
		temp = getFahrenheit(temp)
		feels_like = getFahrenheit(feels_like)
	}
	const roundedTemp = Math.round(temp)
	const roundedFeelsLike = Math.round(feels_like)
	const showFeelsLike = roundedTemp !== roundedFeelsLike
	const { icon, main, description } = weather?.[0] || {}

	return (
		<Card
			sx={{
				'@media screen and (min-width: 768px)': {
					gridArea: 'c',
				},
			}}
		>
			<Box
				sx={{
					display: 'grid',
					placeItems: 'center',
					width: '100%',
					gridTemplateColumns: '1fr 1fr',
				}}
			>
				<Box
					sx={{
						display: 'grid',
						gridTemplateRows: '128px 1fr',
						placeItems: 'center',
					}}
				>
					<Button
						sx={{
							fontSize: '96px',
							'@media screen and (max-width: 300px)': {
								fontSize: '64px',
							},
							display: 'grid',
							color: 'white',
							lineHeight: '96px',
							placeItems: (showFeelsLike) =>
								showFeelsLike ? 'end center' : 'center',
							marginTop: '-0.5rem',
							gridRow: (showFeelsLike) => (showFeelsLike ? '1/3' : '1'),
						}}
						onClick={() => setMetric(!metric)}
					>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							{temp ? `${roundedTemp}°` : '...'}
							<Box
								sx={{
									fontSize: '1rem',
									marginTop: '-1rem',
								}}
							>
								{metric ? 'C' : 'F'}
							</Box>
						</Box>
					</Button>
					<div>
						{feels_like && showFeelsLike && (
							<p>
								Feels like{' '}
								<span style={{ color: feelsLikeColor }}>
									{roundedFeelsLike ? `${roundedFeelsLike}°` : '_'}
								</span>
							</p>
						)}
					</div>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateRows: '128px 1fr',
						'@media screen and (max-width: 320px)': {
							'& > img': {
								width: '96px',
								height: '96px',
							},
						},
						placeItems: 'center',
						'& > img': {
							width: '128px',
							height: '128px',
						},
					}}
				>
					{icon ? (
						<WeatherIcon large icon={icon} description={main} />
					) : (
						<CircularProgress />
					)}
					<Tooltip
						title={
							description &&
							description.charAt(0).toUpperCase() + description.slice(1)
						}
					>
						<Box
							sx={{
								textTransform: 'capitalize',
							}}
						>
							{main}
						</Box>
					</Tooltip>
				</Box>
			</Box>
		</Card>
	)
}

export default Currently
