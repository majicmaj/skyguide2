import { Box } from '@mui/system'

const Card = (props: any) => {
	const { label, icon = '' } = props || {}
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '1rem',
				width: '100%',
				maxWidth: '1000px',
				borderRadius: '1rem',
				background: '#00000060',
				border: '1px solid #ffffff10',
				boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
				backdropFilter: 'blur( 20px )',
				WebkitBackdropFilter: 'blur( 20px )',
			}}
			{...props}
		>
			{label && (
				<Box
					sx={{
						paddingBottom: '4px',
						marginBottom: '4px',
						borderBottom: '1px solid #ffffff30',
						fontWeight: 'bold',
						display: 'flex',
						fontSize: '1rem',
						alignItems: 'center',
						'& > svg': {
							marginRight: '0.5rem',
						},
					}}
				>
					{icon}
					{label}
				</Box>
			)}
			{props?.children}
		</Box>
	)
}

export default Card
