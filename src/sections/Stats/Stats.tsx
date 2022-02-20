import { North } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import Card from '../../components/Card'
import { GetColorFromUVI } from '../../services/GetColor'

interface IStatsProps {
	data: any
}
const Suffix = ({ children }: any) => {
	return (
		<Tooltip title={children}>
			<Box
				sx={{
					color: '#aaa',
					fontSize: '1rem',
					fontStyle: 'italic',
				}}
			>
				{children}
			</Box>
		</Tooltip>
	)
}

const Field = ({ children, label }: any) => {
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
				<strong>{label}: </strong>
			</Box>
			{children}
		</Box>
	)
}

const Stats: FC<IStatsProps> = ({ data }) => {
	const { wind_speed, wind_deg, humidity, pressure, uvi, clouds, visibility } =
		data || {}
	const uviHSL = uvi ? GetColorFromUVI(uvi) : '#fff'
	return (
		<Card>
			<div>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						fontSize: '0.8em',
					}}
				>
					<Field label='W'>
						<Tooltip title={`${wind_deg}°`}>
							<Box
								sx={{
									transform: `rotate(${wind_deg}deg)`,
								}}
							>
								<North fontSize='small' />
							</Box>
						</Tooltip>
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
			</div>
		</Card>
	)
}

export default Stats
