import { Box, Checkbox } from "@mui/material";
import { IProps } from "./IProps";
import useStyle from "./style";

const CustomCheckBox = (props: IProps) => {
    const {text, containerStyle, textStyle, isChecked, setIsChecked} = props;

    const {containerStyleDefault, textStyleDefault} = useStyle();

    return (
        <Box sx={containerStyle ? containerStyle : containerStyleDefault}>
            {text && <Box sx={textStyle ? textStyle : textStyleDefault}>{text}</Box>}
            <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} sx={{padding: 0}}/>            
        </Box>
    )
}

export default CustomCheckBox;