import { CSSProperties, Dispatch, SetStateAction } from "react";

export interface IProps {
    uncheckedText?: string;
    checkedText?: string;
    containerStyle?: CSSProperties;
    switchStyle?: CSSProperties;
    textStyle?: CSSProperties;
    switchActive: boolean;
    setSwitchActive: Dispatch<SetStateAction<boolean>>
}