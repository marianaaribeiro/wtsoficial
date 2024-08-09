import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export type IProps = {
    title: string;
    sx?: SxProps<Theme>;
    languages?: any;
    label: string;
    valueSelect: any;
    disabled?: boolean;
    menuItem: MenuItemIProps[]
    handleChangeLanguage: (e: any) => void
}

export interface MenuItemIProps {
    value: string | number;
    context: ReactNode | string | number
}
