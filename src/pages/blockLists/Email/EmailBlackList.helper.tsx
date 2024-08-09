import { Box, IconButton, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GridSortModel } from "@mui/x-data-grid";
import { useAuth } from "../../../hooks/useAuth";
import CustomDialog from "../../../components/modals/CustomDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import postHttp from "../../../services/postHttp/postHttp";
import useApi from "../../../services/api";
import { IBlacklistEmail, IBlackListEmailReponse, IColumnInformation } from "./IProps";
import { filterData } from "./shards/filterData";
import { emailBlackListManagementServices } from "../../../services/emailBlackList";

const useEmailBlackListManagementHelper = () => {
    const { t } = useTranslation();
    const auth = useAuth();
    const envUrl = auth?.urlEnviroments ? auth?.urlEnviroments.HOST.API_DIGITAL_URL : "";
    const router = useNavigate();
    const cookieValue = Cookies.get('AppSessionCookie') || "";
    const { api } = useApi(envUrl || "");
    const token = Cookies.get('AppSessionCookie') || "";
    const companyId = auth?.companyId !== undefined ? String(auth?.companyId) : "";

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [viewDataRows, setViewDataRows] = useState<string>("2");
    const [params, setParams] = useState<any>();
    const [dateRefetch, setDateRefetch] = useState<any>();
    const [newDataTable, setNewDataTable] = useState(null);
    const [rowTable, setRowTable] = useState<IBlacklistEmail[]>([])
    const [allPages, setallPages] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [valueSearchColumns, setValueSearchColumns] = useState<any>();
    const [getValueSearch, setValueSearch] = useState<any>(null)
    const [openFilter, setOpenFilter] = useState(false)
    const [loadingExcel, setloadingExcel] = useState(false)
    const [loadingCSV, setloadingCSV] = useState(false)
    const [openAlertExcel, setOpenAlertExcel] = useState({ value: false, status: "", events: null });
    const [openAlertCSV, setOpenAlertCSV] = useState({ value: false, status: "", events: null });
    const [orientationSort, setOrientationSort] = useState({ columnTable: "id", sortTable: "desc" });
    const [valueSortTable, setValueSortTable] = useState({ field: "id", sort: "desc" });
    const [valueInputFilter, setValueInputFilter] = useState<null | string>(null);
    const [valueErrorFilter, setValueErrorFilter] = useState(false);
    const [sortModel, setSortModels] = useState<GridSortModel>([
        {
            field: 'id',
            sort: 'desc',
        },
    ]);


    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [rowParams, setRowParams] = useState<any>();
    const [columnsCustom, setColumnsCustom] = useState<IColumnInformation[] & any>([]);
    const vertical = "top";
    const horizontal = "center";

    const compId = '08db7195-f969-4489-8534-8c2f000a82ff';

    function validateEmail(emailToValidate: string) {
        const re = /\S+@\S+\.\S+/;
        return re.test(emailToValidate);
    }

    const [listParamsEmail, setListParamsEmail] = useState({
        recordsByPage: Number(viewDataRows),
        pageNumber: pageCurrent,
        companyId: compId, //companyId
        languageCode: "pt",
        orderColumn: valueSortTable.field || "id",
        orderDirection: valueSortTable.sort || "desc",
        columnFilters: []
    });

    const resources = useMemo(() => {
        return {
            deleteAlertDialog: {
                title:  t("blacklists.deleteAlertDialog.title"),
                description:  t("blacklists.deleteAlertDialog.description"),
                buttonOk:  t("blacklists.deleteAlertDialog.buttonOk"),
                buttonCancel:  t("blacklists.deleteAlertDialog.buttonCancel")
            },
            title: t("blacklists.email.title"),
            inputTitle: t("blacklists.email.inputTitle"),
            inputError: t("blacklists.email.inputError"),
            buttonInsert: t("blacklists.email.buttonInsert"),
            searchButton: t("blacklists.email.searchButton"),
            cleanFilter: t("blacklists.email.cleanFilter"),
            tableHeader: {
                Id: t("blacklists.email.tableHeader.Id"),
                CompanyId: t("blacklists.email.tableHeader.CompanyId"),
                Email: t("blacklists.email.tableHeader.Email"),
                CreatedOn: t("blacklists.email.tableHeader.CreatedOn"),
                CreatedBy: t("blacklists.email.tableHeader.CreatedBy"),
                Actions: t("blacklists.email.tableHeader.Actions"),
            }
        };
    }, [t]);

    const informationError = () => {
        setOpenModal(true);
        return (
            <CustomDialog
                title={t("global.error.item[0].title")}
                description={<Typography variant="h5" fontSize={18}>
                    {t("global.error.item[1].title")}
                </Typography>}
                openModal={openModal}
                handleAction={() => {
                    setOpenModal(false);
                    router("/login");
                }} titleButtonPrimary={""} titleButtonSecundary={""} />
        )
    }

    /* convert value table N/A */
    const convertRowData = (valuesData: IBlacklistEmail[] & any) => {
        const valueTable = valuesData && valuesData?.map((itemData: IBlacklistEmail) => {
            return {
                id: `${itemData?.id ? itemData?.id : ""}`,
                Id: `${itemData?.id ? itemData?.id : ""}`,
                CompanyId: `${itemData?.companyId ? itemData?.companyId : ""}`,
                Email: `${itemData?.email ? itemData?.email : ""}`,
                Deleted: itemData.deleted,
                CreatedOn: `${itemData?.createdOn ? new Date(String(itemData?.createdOn)).toLocaleDateString('pt', {
                    month: '2-digit',
                    day: '2-digit',
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }) : ""}`,
                CreatedBy: `${itemData?.createdBy ? itemData?.createdBy : ""}`,
            }
        }) || [];
        return valueTable
    }

    const { isLoading, isRefetching, data, refetch, remove } = useQuery(
        "GetEmailBlacklistPaged",
        () => {
            if (companyId !== undefined || companyId !== "") {
                return emailBlackListManagementServices.getEmailBlackListPaged(cookieValue, listParamsEmail, informationError, envUrl);
            }
        },
        {
            enabled: true,
            refetchInterval: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: false,
            retry: false,
            retryDelay: 1,
            onSuccess: (data: IBlackListEmailReponse) => {
                if (data) {
                    setRowTable(convertRowData(data.blackListedEmails || []));
                    setColumnsCustom(setColumns(data.columnInformation || []));

                    /* pagination calculation */
                    const x = data.totalFilteredRecordsCount / Number(viewDataRows)
                    if (Math.trunc(x) < x) {
                        let all: any = null
                        all = Math.trunc(x) + 1
                        setallPages(all)

                    } else {
                        setallPages(x)
                    }
                }
            }
        }
    );

    /* search for columns */
    const searchInput = (searchValue: any) => {
        if (searchValue === "" || searchValue === null) {
            setValueErrorFilter(true)
        } else {
            setValueErrorFilter(false)
            setValueSearch(searchValue)

            setTimeout(() => {
                filterData(
                    undefined,
                    setPageCurrent,
                    setListParamsEmail,
                    refetch,
                    data,
                    viewDataRows,
                    compId,
                    orientationSort.columnTable || "id",
                    orientationSort.sortTable || "desc",
                    1,
                    Number(viewDataRows),
                    false,
                    false,
                    valueInputFilter || "",
                    searchValue
                );

                remove();
            }, 300)
        }
    }

    /* search for page */
    const handleChangePage = (e: any, value: number) => {
        console.log(e)
        if ((valueInputFilter === "" || valueInputFilter === null)) {
            setListParamsEmail({
                recordsByPage: Number(viewDataRows),
                pageNumber: value,
                companyId: compId,
                languageCode: "pt",
                orderColumn: orientationSort.columnTable || "id",
                orderDirection: orientationSort.sortTable || "desc",
                columnFilters: []
            });

            remove();
        } else {
            filterData(
                undefined,
                setPageCurrent,
                setListParamsEmail,
                refetch,
                data,
                viewDataRows,
                compId,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                1,
                Number(viewDataRows),
                false,
                false,
                valueInputFilter || "",
                ""
            );
            setPageCurrent(value);
        }
    };

    const [openTable, setOpenTable] = useState(true);
    const [openReload, setopenReload] = useState(false);

    const handleDelete = () => {
        try {
            if (token) {
                const result = postHttp(api, '/DeleteEmailBlock', {
                    companyId: compId, //companyId
                    userId: rowParams?.row?.Id
                })
                setOpenAlertDialog(false);
                remove()
                return result;
            }
            else {
                return null;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setColumns = (data: IColumnInformation[] & any) => {
        const columns = data.map((item: IColumnInformation) => {
            return {
                field: item?.dataName,
                center: true,
                headerName: resources.tableHeader[`${item?.dataName}` as keyof typeof resources.tableHeader],
                flex: 1,
                editable: false,
                sortable: item.isSortable,
            }
        })

        columns.push(
            {
                field: "",
                center: true,
                headerName: resources.tableHeader.Actions,
                flex: 0.5,
                editable: false,
                sortable: false,
                renderCell: (params: any) => {
                    return (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: '5px'
                        }}
                        key={params.id}>
                            <IconButton aria-label="delete"
                                onClick={() => {
                                    setOpenAlertDialog(true);
                                    setRowParams(params)
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    );
                }
            })
        return columns;
    }

    const handleClearFilter = () => {
        setValueSearch(null);
        setValueInputFilter(null);
        setValueErrorFilter(false);
        setTimeout(() => {
            setValueSearch(null);
            setValueInputFilter(null);
            setloadingExcel(false);
            setloadingCSV(false);
            setListParamsEmail({
                recordsByPage: Number(viewDataRows),
                pageNumber: 1,
                companyId: compId,
                languageCode: "pt",
                orderColumn: orientationSort.columnTable || "id",
                orderDirection: orientationSort.sortTable || "desc",
                columnFilters: []
            });
            remove();
            setPageCurrent(1);
        }, 300);
    }

    /* call export excel */
    const handleGetValueExcel = () => {
        const exportExcelParams = {
            compId: compId,
            cookieValue: cookieValue,
            auth: auth,
            setValueErrorFilter: setValueErrorFilter,
            setloadingExcel: setloadingExcel,
            setOpenAlertExcel: setOpenAlertExcel
        }

        filterData(
            undefined,
            setPageCurrent,
            setListParamsEmail,
            refetch,
            data,
            viewDataRows,
            compId,
            orientationSort.columnTable || "id",
            orientationSort.sortTable || "desc",
            1,
            Number(viewDataRows),
            true,
            false,
            valueInputFilter || "",
            "",
            exportExcelParams,
            undefined,
        );
        remove();
    }

    /* call export csv */
    const handleGetValueCSV = () => {
        const exportCSVParams = {
            compId: compId,
            cookieValue: cookieValue,
            auth: auth,
            setValueErrorFilter: setValueErrorFilter,
            setloadingCSV: setloadingCSV,
            setOpenAlertCSV: setOpenAlertCSV
        }

        filterData(
            undefined,
            setPageCurrent,
            setListParamsEmail,
            refetch,
            data,
            viewDataRows,
            compId,
            orientationSort.columnTable || "id",
            orientationSort.sortTable || "desc",
            1,
            Number(viewDataRows),
            false,
            true,
            valueInputFilter || "",
            "",
            undefined,
            exportCSVParams
        );
        remove();
    }

    /* Alert excel */
    // const handleClickAlertExcel = (item: boolean) => {
    //     if (item) {
    //         setOpenAlertExcel({ value: true, status: "success", events: null });

    //     } else {
    //         setOpenAlertExcel({ value: true, status: "error", events: null });
    //     }
    // };

    const handleCloseAlertExcel = (event?: any, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlertExcel({ value: false, status: "", events: event });
    };

    const handleCloseAlertCSV = (event?: any, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlertCSV({ value: false, status: "", events: event });
    };

    /* sort api */
    const sortTables = (value: any[]) => {
        if (value.length > 0) {
            setSortModels(value)
            setTimeout(() => {
                setOrientationSort({ columnTable: String(value[0]?.field) || "id", sortTable: String(value[0]?.sort) || "desc" });
                setPageCurrent(1)
                filterData(
                    undefined,
                    setPageCurrent,
                    setListParamsEmail,
                    refetch,
                    data,
                    viewDataRows,
                    compId,
                    orientationSort.columnTable || "id",
                    orientationSort.sortTable || "desc",
                    1,
                    Number(viewDataRows),
                    false,
                    false,
                    valueInputFilter || "",
                    "",
                    undefined,
                    undefined
                );
            }, 300);
            remove();
        }
    }

    return {
        openAlertDialog,
        setOpenAlertDialog,
        handleDelete,
        filterData,
        resources,
        openTable,
        columnsCustom,
        isLoading,
        isRefetching,
        data,
        open,
        newDataTable,
        params,
        dateRefetch,
        cookieValue,
        openModal,
        openReload,
        rowTable,
        auth,
        companyId,
        allPages,
        pageCurrent,
        viewDataRows,
        valueSearchColumns,
        getValueSearch,
        openFilter,
        loadingExcel,
        loadingCSV,
        openAlertExcel,
        vertical,
        horizontal,
        orientationSort,
        sortModel,
        valueInputFilter,
        valueErrorFilter,
        setPageCurrent,
        setValueErrorFilter,
        searchInput,
        setValueInputFilter,
        sortTables,
        handleCloseAlertExcel,
        handleCloseAlertCSV,
        setloadingExcel,
        setloadingCSV,
        handleGetValueExcel,
        handleGetValueCSV,
        setOpenFilter,
        setValueSearch,
        handleChangePage,
        setopenReload,
        handleClearFilter,
        refetch,
        remove,
        setValueSortTable,
        informationError,
        setOpenTable,
        setNewDataTable,
        validateEmail,
        setOpen,
        setViewDataRows,
        setParams,
        setDateRefetch,
        setValueSearchColumns,
        openAlertCSV
    };
};

export default useEmailBlackListManagementHelper;
