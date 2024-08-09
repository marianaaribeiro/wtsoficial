import { exportCSV } from "./exportEmailBlacklistCSV";
import { exportExcel } from "./exportEmailBlacklistExcel";

/* search value filter */
export const filterData = (getDataTable?: (e: any) => void, setPageCurrent?: (e: any) => void, setListParams?: (e: any) => void, remove?: () => void, data?: any, viewDataRows?: any, companyId?: any, columnTable?: any, sortTable?: any, valuePages?: any, valueRow?: number, downloadExcel?: boolean, downloadCSV?: boolean, filterColumn?: any, searchValue?: string, exportExcelParams?: any, exportCSVParams?: any) => {
    if (data && setPageCurrent && setListParams && remove) {
        let list: any = []
        if (searchValue !== "") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            list = [
                {
                    headerName: "Email",
                    dataName: "Email",
                    isSortable: true,
                    searchValue: searchValue,
                }
            ];
        } else {
            list = [];
        }
        if (downloadExcel === true) {
            const listParams = {
                recordsByPage: 10000000,
                pageNumber: 0,
                companyId: companyId,
                languageCode: "pt",
                orderColumn: `${columnTable ? columnTable : "id"}`,
                orderDirection: `${sortTable ? sortTable : "desc"}`,
                columnFilters: []
            }
            exportExcel(listParams, exportExcelParams)
        } else if (downloadCSV === true) {
            const listParams = {
                recordsByPage: 10000000,
                pageNumber: 0,
                companyId: companyId,
                languageCode: "pt",
                orderColumn: `${columnTable ? columnTable : "id"}`,
                orderDirection: `${sortTable ? sortTable : "desc"}`,
                columnFilters: []
            }
            exportCSV(listParams, exportCSVParams)
        } else {
            setListParams({
                recordsByPage: searchValue !== "" ? valuePages === 0 ? Number(viewDataRows) : valueRow : Number(viewDataRows),
                pageNumber: valuePages,
                companyId: companyId,
                languageCode: "pt",
                orderColumn: `${columnTable ? columnTable : "id"}`,
                orderDirection: `${sortTable ? sortTable : "desc"}`,
                columnFilters: list
            });
            remove();
        }
    }
}