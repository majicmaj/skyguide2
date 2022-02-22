import { HourglassEmpty } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import Card from '../../components/Card'

interface IMinutelylyProps {
	data: any
}
const Minute = ({ dt, precipitation, maxP }: any) => {
	const height = (precipitation / maxP) * 100 + 'px'
	const mins = new Date(dt * 1000).getMinutes()
	return (
		<Tooltip title={precipitation + 'mm'} enterTouchDelay={0}>
			<div
				style={{
					height: height,
					width: '100%',
					minWidth: '2px',
					borderRadius: '0.5rem 0.5rem 0 0 ',
					backgroundImage: 'linear-gradient(to bottom, #0070ff, #00bbff)',
					// Make gradient same height on bar
					backgroundSize: `100% 100px`,
					backgroundPosition: `0px`,
				}}
			></div>
		</Tooltip>
	)
}
const getMinutesFromDate = (date: any) => {
	const d = new Date(date * 1000)
	return d.getMinutes()
}
const Minutely: FC<IMinutelylyProps> = ({ data }) => {
	const maxPrecipitation = Math.max(...data.map((d: any) => d.precipitation))
	const firstPercipitationZero = getMinutesFromDate(
		data.find((d: any) => d.precipitation === 0)?.dt
	)
	const timeNow = new Date().getMinutes()

	return (
		<Card label='Minutely' icon={<HourglassEmpty />}>
			<p>
				Precipitation will stop in {firstPercipitationZero - timeNow} minutes
			</p>
			<Box
				sx={{
					display: 'grid',
					placeItems: 'end',
					marginTop: '1rem',
					gridTemplateColumns: 'repeat(61, 1fr)',
					// gridGap: '2px',
				}}
			>
				{data &&
					data.map((item: any, index: number) => {
						const mins = getMinutesFromDate(item.dt)
						return (
							<div
								key={index}
								style={{
									display: 'grid',
									width: '100%',
									maxWidth: '100%',
									gridTemplateRows: '100px 20px',
									placeItems: 'end',
									overflow: 'visible',
									position: 'relative',
								}}
							>
								<Minute
									dt={item.dt}
									precipitation={item.precipitation}
									maxP={maxPrecipitation}
								/>
								{mins % 15 === 0 && (
									<span
										style={{
											fontSize: '0.5em',
											position: 'absolute',
										}}
									>
										{mins}
									</span>
								)}
							</div>
						)
					})}
			</Box>
		</Card>
	)
}

export default Minutely
