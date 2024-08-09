import { Link } from "@mui/material";
import { IProps } from "./IProps";

const CustomLink = ({ text, sx, typeUnderline, hrefLink }: IProps) => {
  return (
    <Link href={hrefLink} underline={typeUnderline ? typeUnderline : "none"} sx={sx ? sx : null}>
      {text}
    </Link>
  );
};

export default CustomLink;
