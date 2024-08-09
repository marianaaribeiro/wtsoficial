import { ReactNode } from "react";

export type IProps = {
    openModal: any;
    title?: string;
    description?: string | ReactNode;
    handleClose: () => void;
};