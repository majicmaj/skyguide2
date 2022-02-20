import { Box } from '@mui/system'
import React, { FC } from 'react'
import Card from '../../components/Card'

interface IMinutelylyProps {
	data: any
}
const Minutely: FC<IMinutelylyProps> = ({ data }) => {
	return (
		<Card label='Minutely'>
			<Box
				sx={{
					display: 'flex',
				}}
			>
				{data &&
					data.map((item: any, index: number) => {
						return (
							<div key={index}>
								<span>{item?.precipitation}</span>
							</div>
						)
					})}
			</Box>
		</Card>
	)
}

export default Minutely
