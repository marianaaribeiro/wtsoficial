/* search value filter */
export const filterData = (getDataTable?: (e: any) => void, setPageCurrent?: (e: any) => void, setListParams?: (e: any) => void, remove?: () => void, data?: any, viewDataRows?: any, companyId?: any, columnTable?: any, sortTable?: any, valuePages?: any, valueRow?: number, downloadExcel?: boolean, downloadCSV?: boolean, filterColumn?: any, searchValue?: string) => {
    if (data && setPageCurrent && setListParams && remove) {
        let list: any = []
        if (searchValue !== "") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            list = [
                {
                    headerName: "Month",
                    dataName: filterColumn,
                    isSortable: true,
                    searchValue: searchValue,
                }
            ];
        } else {
            list = [];
        }

        setListParams({
            recordsByPage: searchValue !== "" ? valuePages === 0 ? Number(viewDataRows) : valueRow : Number(viewDataRows),
            pageNumber: valuePages,
            companyId: companyId,
            languageCode: "pt",
            orderColumn: `${columnTable ? columnTable : "id"}`,
            orderDirection: `${sortTable ? sortTable : "desc"}`,
            columnFilters: list
        });
    }
}