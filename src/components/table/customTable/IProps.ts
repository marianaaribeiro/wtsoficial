import { ReactNode } from "react";

export interface IProps {
  resources?: any;
  isLoading: boolean;
  isRefetching: boolean;
  columnsCustom: any;
  rowTable: any;
  footer?: ReactNode;
  sortModel: any;
  footerWithPagination: boolean;
  allPages?: any;
  pageCurrent?: any;
  viewDataRows?: any;
  viewDataMenuSelect?: any;
  setPageCurrent?: (e: any) => any;
  handleChangePage?: (e: any, value: any) => any;
  handleChangeviewData?: (e: any) => any;
  sortTables: (e: any) => any;
}
