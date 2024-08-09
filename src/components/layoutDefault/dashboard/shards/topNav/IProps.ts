import { ReactNode } from "react";

export interface IProps {
    onNavOpen: () => void;
}

export interface MenuItemIProps {
    value: string | number;
    context: ReactNode | string | number
}