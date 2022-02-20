import { Menu } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'

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
			<div />
			<Button color='inherit'>
				<p
					style={{
						fontSize: '2em',
						textAlign: 'center',
						textTransform: 'none',
					}}
				>
					{name}
				</p>
			</Button>
			<IconButton color='inherit'>
				<Menu />
			</IconButton>
		</div>
	)
}

export default Nav
