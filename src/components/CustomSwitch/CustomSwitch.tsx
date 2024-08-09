import { Box, Switch } from "@mui/material";
import { IProps } from "./IProps";
import useStyle from "./style";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const CustomSwitch = (props: IProps) => {
    const {uncheckedText, checkedText, switchStyle, containerStyle, textStyle, switchActive, setSwitchActive} = props;
    const [text, setText] = useState(uncheckedText);
    
    const {containerStyleDefault, switchStyleDefault, textStyleDefault} = useStyle();
    
    const StyledSwitch = styled(Switch)(() => (switchStyle ? switchStyle : switchStyleDefault));

    const handleChange = (e: any) => {
        if(e.target.checked) {
            setText(checkedText)
            setSwitchActive(true)
        } 
        else {
            setText(uncheckedText)
            setSwitchActive(false)            
        }
    }

    return (
        <Box sx={containerStyle ? containerStyle : containerStyleDefault}>
            <StyledSwitch checked={switchActive} onChange={(e) => handleChange(e)}/>
            <Box sx={textStyle ? textStyle : textStyleDefault}>{text}</Box>
        </Box>
    )
}

export default CustomSwitch;