import { CSSProperties, Dispatch, SetStateAction } from "react";

export interface IProps {
    text?: string;
    containerStyle?: CSSProperties;
    switchStyle?: CSSProperties;
    textStyle?: CSSProperties;
    isChecked: boolean;
    setIsChecked: Dispatch<SetStateAction<boolean>>;
}