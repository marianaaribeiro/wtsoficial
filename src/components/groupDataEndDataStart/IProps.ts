export interface IProps {
  valueDataStart?: any,
  isLoading?: boolean,
  isRefetching?: boolean,
  valueDataEnd?: any,
  values?: any;
  errors?: any;
  touched?: any;
  useFormik?: boolean;
  disabled?: boolean;
  setFieldValue?: (e: any, x: any) => void;
  handleOnchangeDateEnd?: (e: any) => void,
  handleOnchangeDateStart?: (e: any) => void
}
