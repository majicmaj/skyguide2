import { Warning } from '@mui/icons-material'
import { Button } from '@mui/material'
import { FC, useState } from 'react'
import Card from '../../components/Card'
import { Modal } from '../../components/Modal'

interface ICurrentlyProps {
	data: any
}

// capitalize all letters in a string that are preceeded by a period
const capitalize = (str: string) =>
	str
		.toLowerCase()
		.split('. ')
		.map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
		.join('. ')

const Alerts: FC<ICurrentlyProps> = ({ data }) => {
	const { event, tags, end, sender_name, description } = data[0]
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<Card label={event} icon={<Warning fontSize='small' />}>
			<p>
				{event} until{' '}
				{new Date(end * 1000).toLocaleTimeString('en-US', {
					hour: 'numeric',
				})}
			</p>
			<Button variant='text' color='inherit' onClick={handleOpen}>
				<u>Learn More</u>
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Card label={event} icon={<Warning fontSize='small' />}>
					<div style={{ marginBottom: '1rem' }}>
						{tags.length > 0 && (
							<p>
								<b>Severe Weather Type: </b>
								<span>{tags.join(',')}</span>
							</p>
						)}
					</div>
					<p>
						<b>{sender_name}</b>:{' '}
						{capitalize(description.replaceAll('...', ''))}
					</p>
				</Card>
			</Modal>
		</Card>
	)
}

export default Alerts
