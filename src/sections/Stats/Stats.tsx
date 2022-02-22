import { North } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import Card from '../../components/Card'
import Suffix from '../../components/Suffix'
import { GetColorFromUVI } from '../../services/GetColor'

interface IStatsProps {
	data: any
}

export const Field = ({ children, label }: any) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					marginRight: '0.25rem',
				}}
			>
				{label && <strong>{label}: </strong>}
			</Box>
			{children}
		</Box>
	)
}

interface IWindArrowProps {
	wind_deg: number
}

export const WindArrow = ({ wind_deg }: IWindArrowProps) => {
	return (
		<Tooltip title={`${wind_deg}°`}>
			<Box
				sx={{
					transform: `rotate(${wind_deg}deg)`,
				}}
			>
				<North fontSize='small' />
			</Box>
		</Tooltip>
	)
}
const Stats: FC<IStatsProps> = ({ data }) => {
	const { wind_speed, wind_deg, humidity, pressure, uvi, clouds, visibility } =
		data || {}
	const uviHSL = uvi ? GetColorFromUVI(uvi) : '#fff'
	return (
		<Card
			sx={{
				'@media screen and (min-width: 768px)': {
					gridArea: 's',
					justifyContent: 'center',
				},
			}}
		>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr',
					fontSize: '0.8em',
					'@media screen and (min-width: 768px)': {
						height: '100%',
					},
				}}
			>
				<Field label='W'>
					<WindArrow wind_deg={wind_deg} />
					<p>{wind_speed ? wind_speed : '_'}</p>
					<Suffix>mps</Suffix>
				</Field>
				<Field label='H'>
					{humidity ? `${humidity}` : '_'}
					<Suffix>%</Suffix>
				</Field>
				<Field label='P'>
					{pressure ? `${pressure}` : '_'}
					<Suffix>hPa</Suffix>
				</Field>
				<Field label='UV'>
					{uvi || uvi === 0 ? <p style={{ color: uviHSL }}>{uvi}</p> : '_'}
				</Field>
				<Field label='C'>
					{clouds || clouds === 0 ? `${clouds}` : '_'}
					<Suffix>%</Suffix>
				</Field>
				<Field label='V'>
					{visibility ? `${visibility}` : '_'}
					<Suffix>m</Suffix>
				</Field>
			</Box>
		</Card>
	)
}

export default Stats
