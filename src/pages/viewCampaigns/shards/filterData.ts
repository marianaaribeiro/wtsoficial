
/* search value filter */
export const filterData = (getDataTable?: (e: any) => void, setPageCurrent?: (e: any) => void, setListParams?: (e: any) => void, remove?: () => void, data?: any, viewDataRows?: any, companyId?: any, valueTextColumns?: any, channel?: any, stateCampaigns?: any, sender?: any, start?: any, end?: any, columnTable?: any, sortTable?: any, valuePages?: any, valueRow?: number, downloadExcel?: boolean, filterColumn?: any) => {
    if (data?.recordsToReturns && setPageCurrent && setListParams && remove) {
        let list: any = []
        if (channel === "0" && stateCampaigns === "0" && sender === "0") {
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
                setListParams({
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
        } else if (channel !== "0" && stateCampaigns === "0" && sender === "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "channelId",
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
                            dataName: "channelId",
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
                            dataName: "channelId",
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
                            dataName: "channelId",
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
                setListParams({
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
        } else if (channel !== "0" && stateCampaigns !== "0" && sender === "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
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
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        }
                    ];
                }
            } else {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
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
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
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
                setListParams({
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
        } else if (channel !== "0" && stateCampaigns === "0" && sender !== "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
                        },
                    ];
                }
            } else {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                setListParams({
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
        } else if (channel !== "0" && stateCampaigns !== "0" && sender !== "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
                        },
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
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
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
                        },
                    ];
                }
            } else {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                            dataName: "channelId",
                            isSortable: true,
                            searchValue: `${channel}`,
                        },
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                setListParams({
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
        } else if (channel === "0" && stateCampaigns !== "0" && sender === "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
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
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        },
                    ];
                }
            } else {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
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
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
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
                setListParams({
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
        } else if (channel === "0" && stateCampaigns !== "0" && sender !== "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
                        },
                    ];
                }
            } else {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                            dataName: "stateCampaignsId",
                            isSortable: true,
                            searchValue: `${stateCampaigns}`,
                        },
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                setListParams({
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
        } else if (channel === "0" && stateCampaigns === "0" && sender !== "0") {
            setPageCurrent(valuePages === 1 ? 1 : valuePages)
            if (filterColumn === null || filterColumn === "") {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
                        },
                    ];
                }
            } else {
                if (end && start) {
                    list = [
                        {
                            headerName: "",
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                            dataName: "senderId",
                            isSortable: true,
                            searchValue: `${sender}`,
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
                setListParams({
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