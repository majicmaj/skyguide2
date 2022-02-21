// import { Menu, NotificationAdd } from '@mui/icons-material'
import { Button } from '@mui/material'

// const requestNotificationPermission = () => {
// 	// if (Notification.permission === 'granted') {
// 	// 	const not = new Notification('Hello Skyguide', {
// 	// 		body: "You've been notified!",
// 	// 	})
// 	// } else if ('Notification' in window) {
// 	// 	Notification.requestPermission((status) => {
// 	// 		console.log('Notification permission status:', status)
// 	// 	})
// 	// }
// }

const Nav = ({ data }: any) => {
	const { results } = data || {}
	const first = results && results[0]
	const { address_components } = first || {}
	const locality =
		address_components &&
		address_components.find((c: any) => c.types.includes('locality'))
	const name = locality ? locality.long_name : 'Herndon.'
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '40px 1fr 40px',
				width: '100%',
				placeItems: 'center',
			}}
		>
			{/* <IconButton color='inherit' onClick={requestNotificationPermission}>
				<NotificationAdd />
			</IconButton> */}
			<div />
			<Button color='inherit'>
				<p
					style={{
						fontSize: '1.5em',
						textAlign: 'center',
						textTransform: 'none',
					}}
				>
					{name}
				</p>
			</Button>
			{/* <IconButton color='inherit'>
				<Menu />
			</IconButton> */}
		</div>
	)
}

export default Nav
