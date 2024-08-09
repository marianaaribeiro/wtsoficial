
/* search value filter */
export const filterData = (getDataTable?: (e: any) => void, setPageCurrent?: (e: any) => void, setListParamsEmail?: (e: any) => void, remove?: () => void, data?: any, viewDataRows?: any, companyId?: any, valueTextColumns?: any, channel?: any, start?: any, end?: any, columnTable?: any, sortTable?: any, valuePages?: any, valueRow?: number, downloadExcel?: boolean, filterColumn?: any) => {
    if (data?.recordsToReturns && setPageCurrent && setListParamsEmail && remove) {
        let list: any = []
        if (channel === "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "dateReceived",
                            isSortable: true,
                            searchValue: "",
                            searchStartDate: `${start}`,
                            searchEndDate: `${end}`,
                        }
                    ];
                } else {
                    list = [];
                }
            } else {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "dateReceived",
                            isSortable: true,
                            searchValue: "",
                            searchStartDate: `${start}`,
                            searchEndDate: `${end}`,
                        },
                        {
                            headerName: `${valueTextColumns.headerName}`,
                            dataName: `${valueTextColumns.field}`,
                            isSortable: true,
                            searchValue: `${filterColumn}`
                        }
                    ];
                } else {
                    list = [
                        {
                            headerName: `${valueTextColumns.headerName}`,
                            dataName: `${valueTextColumns.field}`,
                            isSortable: true,
                            searchValue: `${filterColumn}`
                        }
                    ];
                }
            }
            if (downloadExcel === true && getDataTable) {
                const listData = {
                    recordsByPage: valuePages === 0 ? Number(viewDataRows) : valueRow,
                    pageNumber: valuePages,
                    companyId: companyId,
                    languageCode: "pt",
                    orderColumn: `${columnTable ? columnTable : "id"}`,
                    orderDirection: `${sortTable ? sortTable : "desc"}`,
                    columnFilters: list
                }
                getDataTable(listData)
            } else {
                setListParamsEmail({
                    recordsByPage: Number(viewDataRows),
                    pageNumber: valuePages,
                    companyId: companyId,
                    languageCode: "pt",
                    orderColumn: `${columnTable ? columnTable : "id"}`,
                    orderDirection: `${sortTable ? sortTable : "desc"}`,
                    columnFilters: list
                });
                remove();
            }
        } else if (channel !== "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "stateId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "dateReceived",
                            isSortable: true,
                            searchValue: "",
                            searchStartDate: `${start}`,
                            searchEndDate: `${end}`,
                        }
                    ];
                } else {
                    list = [
                        {
                            headerName: "",
                            dataName: "stateId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        }
                    ];
                }
            } else {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "stateId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "dateReceived",
                            isSortable: true,
                            searchValue: "",
                            searchStartDate: `${start}`,
                            searchEndDate: `${end}`,
                        },
                        {
                            headerName: `${valueTextColumns.headerName}`,
                            dataName: `${valueTextColumns.field}`,
                            isSortable: true,
                            searchValue: `${filterColumn}`
                        }
                    ];
                } else {
                    list = [
                        {
                            headerName: "",
                            dataName: "stateId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: `${valueTextColumns.headerName}`,
                            dataName: `${valueTextColumns.field}`,
                            isSortable: true,
                            searchValue: `${filterColumn}`
                        }
                    ];
                }
            }
            if (downloadExcel === true && getDataTable) {
                const listData = {
                    recordsByPage: valuePages === 0 ? Number(viewDataRows) : valueRow,
                    pageNumber: valuePages,
                    companyId: companyId,
                    languageCode: "pt",
                    orderColumn: `${columnTable ? columnTable : "id"}`,
                    orderDirection: `${sortTable ? sortTable : "desc"}`,
                    columnFilters: list
                }
                getDataTable(listData)
            } else {
                setListParamsEmail({
                    recordsByPage: valuePages === 0 ? Number(viewDataRows) : valueRow,
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
}