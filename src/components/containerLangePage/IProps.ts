import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export interface IProps {
  sxContainer?: SxProps<Theme>;
  imgs: any;
  children: ReactNode
}
