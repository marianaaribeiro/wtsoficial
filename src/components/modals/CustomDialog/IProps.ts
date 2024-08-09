import { ReactNode } from "react";

export type IProps = {
    openModal: any;
    title: string;
    description: string | ReactNode;
    titleButtonPrimary: string;
    titleButtonSecundary: string;
    handleAction: () => void;
    handleActionSecundary?: () => void;
};