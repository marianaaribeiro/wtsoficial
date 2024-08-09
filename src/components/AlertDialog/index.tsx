import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { IProps } from './IProps';
import { DialogTitle } from '@mui/material';

const AlertDialog = (props: IProps) => {
    const { open, setOpen, handleConfirmation, translation } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {translation?.title && 
                <DialogTitle id="alert-dialog-title">
                    {translation.title}
                </DialogTitle>}
            {translation?.description && 
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {translation.description}
                    </DialogContentText>
                </DialogContent>}
            <DialogActions>
                <Button onClick={handleClose}>{translation.buttonCancel}</Button>
                <Button onClick={handleConfirmation} autoFocus>
                    {translation.buttonOk}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;