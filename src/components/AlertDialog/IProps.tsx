import { Dispatch, SetStateAction } from "react";

export interface IProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleConfirmation: () => void;
    translation: any;
}