import { CSSProperties, ReactNode } from "react";

export interface IProps {
    title?: string;
    description?: string;
    containerStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    descriptionStyle?: CSSProperties;
    children?: ReactNode;
}