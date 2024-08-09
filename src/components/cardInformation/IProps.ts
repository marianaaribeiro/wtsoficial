import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export interface IProps {
    title?: string;
    description?: string;
    childrens?: ReactNode
    styleContainer?: SxProps<Theme>;
    styleTitle?: SxProps<Theme>;
    styleDescription?: SxProps<Theme>;
}
