import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";

import useStyle from "./style";
import { IProps } from "./IProps";


const CustomDialog = ({ openModal, title, description, titleButtonPrimary, titleButtonSecundary, handleAction, handleActionSecundary }: IProps) => {
	const { containerDialog, containerItem, containerButton } = useStyle();
	return (
		<Dialog
			open={openModal || false}
			onClose={handleAction}
			maxWidth={"lg"}
			keepMounted
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			sx={{ ...containerDialog }}
		>
			<DialogTitle id="alert-dialog-title" sx={{ ...containerItem }}>
				<Typography variant="h5" fontSize={32}>
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent sx={{ ...containerItem }}>
				{description ?? null}
			</DialogContent>
			<DialogActions sx={{ ...containerItem }}>
				<Button
					size="small"
					sx={{
						color: "#FFFFFFDE",
						"&:hover": { ...containerButton },
						...containerButton,
					}}
					onClick={handleAction}
				>
					{titleButtonPrimary}
				</Button>
				{titleButtonSecundary && handleActionSecundary && <Button
					size="small"
					sx={{
						color: "#FFFFFFDE",
						"&:hover": { ...containerButton },
						...containerButton,
					}}
					onClick={handleActionSecundary}
				>
					{titleButtonSecundary}
				</Button>}
			</DialogActions>
		</Dialog>
	);
};

export default CustomDialog;
