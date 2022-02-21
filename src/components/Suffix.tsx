import { Tooltip } from '@mui/material'
import { Box } from '@mui/system'

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

export default Suffix
