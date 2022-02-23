import { Modal as MuiModal } from '@mui/material'

const style = {
	color: 'white',
	margin: '0.5rem',
}

interface IModalProps {
	open: boolean
	onClose: () => void
	children: any
}

export function Modal({ open, onClose, children }: IModalProps) {
	return (
		<MuiModal
			style={style}
			open={open}
			onClose={onClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			{children}
		</MuiModal>
	)
}
