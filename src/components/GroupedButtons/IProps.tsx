import { CSSProperties } from "react";

export interface IProps {
    buttons: any[];
    buttonContainerStyle?: CSSProperties;
    buttonStyle?: CSSProperties;
    selectedButtons?: any[];
    values?: any;
    errors?: any;
    touched?: any;
    useFormik?: boolean;
    disabled?: boolean;
    setFieldValue?: (e: any, x: any) => void;
    setSelectedButtons?: (e: any) => void;

}