import { Input, styled } from "@mui/material";
import useStyle from "./style";

const CustomInput = (props: any) => {
    const {containerStyle} = props;
    const {containerStyleDefault} = useStyle();

    const StyledInput = styled(Input)({
        '&:before': {
            content: 'unset',
            borderBottom: 'none'
        },
        '&:focus': {
            outline: 'none'
        },
        ...(containerStyle ? containerStyle : containerStyleDefault)
    })

    return (
        <StyledInput 
            sx={containerStyle ? containerStyle : containerStyleDefault}
            {...props}
        />
    );
};

export default CustomInput;
