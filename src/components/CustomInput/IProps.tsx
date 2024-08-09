import { CSSProperties } from "react";

export interface IProps {
    name: string;
    type: string;
    disabled?: boolean;
    value?: string | boolean;
    onChange?: () => void;
    containerStyle?: CSSProperties;
}