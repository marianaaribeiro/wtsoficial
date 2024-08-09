import { SxProps, Theme } from "@mui/material";

export interface IProps {
  text: string;
  hrefLink: string;
  sx?: SxProps<Theme>;
  typeUnderline?: "none" | "always" | "hover" | undefined;
}
