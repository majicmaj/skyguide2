interface INavProps {
	data: any
}

const Nav = ({ data }: INavProps) => {
	const { results } = data || {}
	const first = results && results[0]
	const { address_components } = first || {}
	const locality =
		address_components &&
		address_components.find((c: any) => c.types.includes('locality'))
	const name = locality ? locality.long_name : 'Loading...'
	return (
		<div
			style={{
				display: 'grid',
				marginTop: '0.5rem',
				placeItems: 'center',
			}}
		>
			<p
				style={{
					fontSize: '1em',
					textAlign: 'center',
					textTransform: 'none',
				}}
			>
				{name}
			</p>
		</div>
	)
}

export default Nav
