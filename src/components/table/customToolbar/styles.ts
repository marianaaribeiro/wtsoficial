import styled from "styled-components";
import { Button } from "@mui/material";

const useStyle = () => {
    const ButtonClear = styled(Button)`
    font-weight: 500;
    font-size: 14px;
    border: 1px solid #6a5aff;
    border-radius: 4px;
    width: 83%;
`;

    const ButtonExportCSV = styled(ButtonClear)`
    && {
        .MuiIconButton-root {
            &:hover {
                background-color: none;
            }
        }
        display: flex;
        width: 240px;
        color: #2f8e95;
        border: 1px solid #2f8e95;
        box-sizing: border-box;
        border-radius: 4px;
    }
`;

    return {
        ButtonClear,
        ButtonExportCSV
    };
};

export default useStyle;
