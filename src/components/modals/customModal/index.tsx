import {
	Box,
	Button,
	Modal,
	Typography,
} from "@mui/material";

import useCustomModalHelper from "./customModal.helper";
import { IProps } from "./IProps";


const CustomModal = ({ handleClose, openModal }: IProps) => {
	const { handleAction } = useCustomModalHelper(openModal, handleClose);
	return (
		<div>
			<Modal
				keepMounted
				open={openModal}
				/*  onClose={handleClose} */
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<Box >
					<Typography id="keep-mounted-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
					<Button onClick={handleAction}>Fechar</Button>

				</Box>
			</Modal>
		</div>
	);
};

export default CustomModal;
