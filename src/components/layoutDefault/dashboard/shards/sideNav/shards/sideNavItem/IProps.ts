import { ReactNode } from "react";

export interface IProps {
  active: boolean;
  disabled: boolean;
  external: boolean;
  icon: ReactNode;
  path: string;
  title: string;
  children?: any[];
}
