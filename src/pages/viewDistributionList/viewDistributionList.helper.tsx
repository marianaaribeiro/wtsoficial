import { Box, Fab, IconButton, SelectChangeEvent, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { GridSortModel } from "@mui/x-data-grid";
import { filterData } from "./shards/filterData";
import EditIcon from '@mui/icons-material/Edit';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { viewDistributionListServices } from "../../services/viewDistributionList";

const useViewDistributionListHelper = () => {
    const { t } = useTranslation();
    const router = useNavigate();
    const auth = useAuth();

    const [valueDataStart, setValueDataStart] = useState<any>({
        formart: null,
        noFormart: null,
        error: null
    });
    const [valueDataEnd, setValueDataEnd] = useState<any>({
        formart: null,
        noFormart: null,
        error: null
    });

    const [listState, setListState] = useState<any[]>([]);
    const [viewDataRows, setViewDataRows] = useState<string>("5");
    const [params, setParams] = useState<any>();
    const [rowTable, setRowTable] = useState<any[]>([])
    const [newDataEmail, setNewDataEmail] = useState<any[]>([])
    const [allPages, setallPages] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [valueSearchColumns, setValueSearchColumns] = useState<any>();
    const [getValueSearch, setValueSearch] = useState<any>(null)
    const [orientationSort, setOrientationSort] = useState({ columnTable: "id", sortTable: "desc" });
    const [valueSortTable, setValueSortTable] = useState({ field: "id", sort: "desc" });
    const [sortModel, setSortModels] = useState<GridSortModel>([
        {
            field: 'id',
            sort: 'desc',
        },
    ]);
    const [openCreatCampaigns, setOpenCreatCampaigns] = useState<boolean>(false);
    const [itemValueListState, setValueListState] = useState<string>("0");
    const [loadingExcel, setloadingExcel] = useState(false)
    const [valueErrorFilter, setValueErrorFilter] = useState(false);
    const [valueInputFilter, setValueInputFilter] = useState<null | string>(null);
    const [valueChannel, setValueModalChannel] = useState<any>("0");

    const valueModalChannel = useMemo(() => valueChannel, [valueChannel]);

    const companyId = auth?.companyId !== undefined ? String(auth?.companyId) : "";

    const [listParamsEmail, setListParamsEmail] = useState({
        recordsByPage: 5,
        pageNumber: pageCurrent,
        companyId: companyId,
        languageCode: "pt",
        orderColumn: valueSortTable.field || "id",
        orderDirection: valueSortTable.sort || "desc",
        columnFilters: []
    });

    const cookieValue = Cookies.get('AppSessionCookie') || "";

    const resources = useMemo(() => {
        return {
            title: t("viewDistribution.title"),
            cardInfo: {
                title: t("viewDistribution.cardInfo.title"),
                description: t("viewDistribution.cardInfo.description"),
            },
            textButton: t("viewDistribution.button"),
            textButtonTwo: t("viewDistribution.buttonCancel"),
            table: {
                campaigns: t("viewDistribution.table.item[0]"),
                channel: t("viewDistribution.table.item[1]"),
                dateStart: t("viewDistribution.table.item[2]"),
                dateEnd: t("viewDistribution.table.item[3]"),
                week: t("viewDistribution.table.item[4]"),
                hoursStart: t("viewDistribution.table.item[5]"),
                hoursEnd: t("viewDistribution.table.item[6]"),
                amount: t("viewDistribution.table.item[7]"),
                state: t("viewDistribution.table.item[8]"),
                action: t("viewDistribution.table.item[9]")
            },
            titleButtonPrimary: t("viewDistribution.buttonSave"),
            titleButtonSecundary: t("viewDistribution.buttonCancel"),
            textButtonBack: "Voltar para a lista de campanhas"
        };
    }, [t]);

    /* Create campaigns */
    const handleActionCampaigns = () => {
        if (auth?.setEditDistributionList && valueModalChannel !== "0" && auth.setTypeCreateCampaigns) {
            auth.setEditDistributionList(false)
            setOpenCreatCampaigns(false)
            const campaignsSelected = dataMenuListChannel.find((item: any) => String(item.value) === String(valueModalChannel)).context
            auth.setTypeCreateCampaigns(campaignsSelected)
            router("/create-distribution-list")
        }
    }

    const handleActionSecundary = () => {
        setOpenCreatCampaigns(false)
    }
    const goCreatPage = () => {
        setOpenCreatCampaigns(true)
    }
    const goBackPage = () => {
        router("/view-campaigns")
    }

    const goEditCampaigns = (value: any) => {
        if (auth?.setEditDistributionList && auth.setParamsRowTable) {
            auth.setEditDistributionList(true)
            setParams(value)
            auth.setParamsRowTable(value)
            router("/edit-distribution-list")
        }
    }

    /* CALL APIS */

    /* convert value table N/A */
    const convertRowData = (valuesData: any[]) => {
        const valueTable = valuesData && valuesData?.map((itemData: any) => {
            const context = listState.filter(x => String(x.idState) === String(itemData.stateId))[0] || "";
            const contextState = context ? context?.nameState : "N/A";

            return {
                id: `${itemData?.id ? itemData?.id : "N/A"}`,
                description: `${itemData?.description ? itemData?.description : "N/A"}`,
                channel: `${contextState ? contextState : "N/A"}`,
                dateStart: `${itemData?.dateStart ? new Date(String(itemData?.dateStart)).toLocaleDateString('pt', {
                    month: '2-digit',
                    day: '2-digit',
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }) : "N/A"}`,
                dateEnd: `${itemData?.dateEnd ? new Date(String(itemData?.dateEnd)).toLocaleDateString('pt', {
                    month: '2-digit',
                    day: '2-digit',
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }) : "N/A"}`,
                week: `${itemData?.week ? itemData?.week : ""}`,
                amount: `${itemData?.amount ? itemData?.amount : "N/A"}`,
                priority: `${itemData?.priority ? itemData?.priority : "N/A"}`,
                nameFile: `${itemData?.nameFile ? itemData?.nameFile : "N/A"}`,
            }
        }) || [];
        return valueTable
    }

    /* call api table */
    const { isLoading, isRefetching, data, refetch, remove } = useQuery(
        "PostPagedGeral",
        () => {
            if ((companyId !== undefined || companyId !== "") && auth?.urlEnviroments) {
                return viewDistributionListServices.postPagedGeral(cookieValue, listParamsEmail, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
            }
        },
        {
            enabled: (companyId !== undefined || companyId !== "") && !openCreatCampaigns ? true : false,
            refetchInterval: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: false,
            retry: false,
            retryDelay: 1,
            onSuccess: (data: any) => {
                if (data) {
                    setRowTable(convertRowData(data.recordsToReturns || []));
                    setNewDataEmail(data?.recordsToReturns || []);

                    /* pagination calculation */
                    const x = data.totalFilteredRecords / Number(viewDataRows)
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

    const { } = useQuery(
        "AllListState",
        () => {
            if ((companyId !== undefined || companyId !== "") && auth?.urlEnviroments) {
                return viewDistributionListServices.getState(cookieValue, companyId, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
            }
        },
        {
            enabled: (companyId !== undefined || companyId !== "") ? true : false,
            refetchInterval: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: false,
            retry: false,
            retryDelay: 1,
            onSuccess: (data) => {
                if (data) {
                    setListState(data)
                }
            },
            onError: () => {
            },
        }
    );
    /* tabela */
    const columnsCustom: any = [
        {
            field: "id",
            center: true,
            headerName: `${resources.table.campaigns}`,
            flex: 1,
            editable: false
        },
        {
            field: "description",
            center: true,
            headerName: `${resources.table.channel}`,
            flex: 1,
            editable: false
        },
        {
            field: "dateStart",
            center: true,
            headerName: `${resources.table.dateStart}`,
            flex: 1,
            editable: false
        },
        {
            field: "dateEnd",
            center: true,
            headerName: `${resources.table.dateEnd}`,
            flex: 1,
            editable: false
        },
        {
            field: "week",
            center: true,
            headerName: `${resources.table.week}`,
            flex: 1,
            editable: false
        },
        {
            field: "amount",
            center: true,
            headerName: `${resources.table.hoursStart}`,
            flex: 1,
            editable: false
        },
        {
            field: "nameFile",
            center: true,
            headerName: `${resources.table.hoursEnd}`,
            flex: 1,
            editable: false
        },
        {
            field: "state",
            center: true,
            headerName: `${resources.table.amount}`,
            flex: 1,
            editable: false
        },
        {
            field: "action",
            center: true,
            headerName: `${resources.table.state}`,
            flex: 1,
            editable: false,
            renderCell: (params: any) => {
                return (
                    <Box sx={{ display: "inline-flex", gap: "10px" }}>
                        <Fab size="small" sx={{ mb: 1, mr: 1 }} color="primary" aria-label="add">
                            <Tooltip title="Editar Campanha" onClick={() => goEditCampaigns(params)}>
                                <IconButton>
                                    <EditIcon sx={{ color: "#fff" }} />
                                </IconButton>
                            </Tooltip>
                        </Fab>
                        <Fab size="small" sx={{ mb: 1, mr: 1 }} color="secondary" aria-label="add">
                            <Tooltip title="Visualizar Lista de Distribuição" onClick={() => router("/contact-list")}>
                                <IconButton>
                                    <ImportContactsIcon sx={{ color: "#fff" }} />
                                </IconButton>
                            </Tooltip>
                        </Fab>
                    </Box>
                )
            }
        },
    ]

    const [valueSelectColumns, setValueSelectColumns] = useState<any>(String(columnsCustom[0].field));


    /* select rows */
    const viewDataMenuSelect: any[] = [
        {
            value: `5`,
            context: `ver 5 registros`
        },
        {
            value: `10`,
            context: `ver 10 registros`
        },
        {
            value: `25`,
            context: `ver 25 registros`
        },
        {
            value: `50`,
            context: `ver 50 registros`
        },
        {
            value: `100`,
            context: `ver 100 registros`
        }
    ]

    /* search for page */
    const handleChangePage = (e: SelectChangeEvent, value: number) => {
        e.preventDefault()
        if (itemValueListState === "0" && valueDataStart.formart === null && valueDataEnd.formart === null && (valueInputFilter === "" || valueInputFilter === null)) {
            setListParamsEmail({
                recordsByPage: Number(viewDataRows),
                pageNumber: value,
                companyId: companyId,
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
                remove,
                data,
                viewDataRows,
                companyId,
                valueTextColumns,
                String(itemValueListState),
                valueDataStart.formart,
                valueDataEnd.formart,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                value,
                Number(viewDataRows),
                false,
                valueInputFilter || "");

            setPageCurrent(value);
        }
    };

    /* see amount of value in table or card */
    const handleChangeviewData = (event: SelectChangeEvent) => {
        if (itemValueListState === "0" && valueDataStart.formart === null && valueDataEnd.formart === null && (valueInputFilter === "" || valueInputFilter === null)) {
            setListParamsEmail({
                recordsByPage: Number(event.target.value),
                pageNumber: 1,
                companyId: companyId,
                languageCode: "pt",
                orderColumn: orientationSort.columnTable || "id",
                orderDirection: orientationSort.sortTable || "desc",
                columnFilters: []
            });
            remove();
            setViewDataRows(event.target.value);
            setPageCurrent(1);
        } else {
            filterData(
                undefined,
                setPageCurrent,
                setListParamsEmail,
                remove,
                data,
                viewDataRows,
                companyId,
                valueTextColumns,
                String(itemValueListState),
                valueDataStart.formart,
                valueDataEnd.formart,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                1,
                Number(event.target.value),
                false,
                valueInputFilter || "");
            remove();
            setViewDataRows(event.target.value);
        }
    }

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
                    remove,
                    data,
                    viewDataRows,
                    companyId,
                    valueTextColumns,
                    String(itemValueListState),
                    valueDataStart.formart,
                    valueDataEnd.formart,
                    value[0]?.field,
                    value[0]?.sort,
                    1,
                    Number(viewDataRows),
                    false,
                    valueInputFilter || "");
            }, 300);
            remove();
        }
    }

    /* search for columns */
    const searchInput = () => {
        if (valueInputFilter === "" || valueInputFilter === null) {
            setValueErrorFilter(true)
        } else {
            setValueErrorFilter(false)
            setValueSearch(valueInputFilter)
            filterData(
                undefined,
                setPageCurrent,
                setListParamsEmail,
                remove,
                data,
                viewDataRows,
                companyId,
                valueTextColumns,
                String(itemValueListState),
                valueDataStart.formart,
                valueDataEnd.formart,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                1,
                Number(viewDataRows),
                false,
                valueInputFilter || "");
            remove();
        }
    }

    /* list channel in modal */
    /* const dataMenuListChannel: any[] = listChannel?.map((item: any) => {
        return {
            value: `${item.idServico}`,
            context: `${item.nameChannel}`
        }
    }) || []; 
    */
    const dataMenuListChannel: any[] = [
        {
            value: `0`,
            context: `Selecionar`
        },
        {
            value: `1`,
            context: `Email`
        },
        {
            value: `2`,
            context: `SMS`
        }]

    const handleChangeChannelModal = (event: SelectChangeEvent) => {
        setValueModalChannel(event.target.value);
    }
    /* end */


    /* FILTROS */
    /* date end date start*/
    const handleOnchangeDateEnd = (end: any) => {
        const dates = new Date(String(end)).toLocaleDateString('en', {
            month: '2-digit',
            day: '2-digit',
            year: "numeric",
        })
        const formatValue = dates.split("/")
        const value = formatValue[2] + "-" + formatValue[0] + "-" + formatValue[1]

        setValueDataEnd({
            formart: value,
            noFormart: end,
            error: null
        });
    }

    const handleOnchangeDateStart = (start: any) => {
        const dates = new Date(String(start)).toLocaleDateString('en', {
            month: '2-digit',
            day: '2-digit',
            year: "numeric",
        })
        const formatValue = dates.split("/")
        const value = formatValue[2] + "-" + formatValue[0] + "-" + formatValue[1]

        setValueDataStart({
            formart: value,
            noFormart: start,
            error: null
        });
    }

    useEffect(() => {
        if (valueDataStart.formart !== null && valueDataEnd.formart !== null) {
            /* setloadingExcel(false); */
            /* remove(); */
            filterData(
                undefined,
                setPageCurrent,
                setListParamsEmail,
                remove,
                data,
                viewDataRows,
                companyId,
                valueTextColumns,
                String(itemValueListState),
                valueDataStart.formart,
                valueDataEnd.formart,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                1,
                Number(viewDataRows),
                false,
                valueInputFilter || "");
            refetch();
        }
    }, [valueDataEnd, valueDataStart])

    /* multi select List Channel */
    const dataMenuSelectListState: any[] = listState?.map((item: any) => {
        return {
            value: `${item.idServico}`,
            context: `${item.nameState}`
        }
    }) || [];

    dataMenuSelectListState.push({
        value: `0`,
        context: `Todos os Estados`
    })

    /* filter List Channel */
    const handleChangeListState = (event: SelectChangeEvent) => {

        setPageCurrent(1);
        refetch();
        setloadingExcel(false);
        setValueListState(event.target.value);
        setTimeout(() => {
            filterData(
                undefined,
                setPageCurrent,
                setListParamsEmail,
                remove,
                data,
                viewDataRows,
                companyId,
                valueTextColumns,
                String(event.target.value),
                valueDataStart.formart,
                valueDataEnd.formart,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                1,
                Number(viewDataRows),
                false,
                valueInputFilter || "");
            remove();
        }, 300);
    }


    /* select columns table */
    const [valueTextColumns, setValueTextColumns] = useState<any>({
        center: true,
        editable: false,
        field: String(columnsCustom[0].field || ""),
        flex: 1,
        headerName: String(columnsCustom[0].headerName || "")
    })

    const dataSelectColumns: any[] = columnsCustom?.map((item: any, id: number) => {
        return {
            value: `${item.field}`,
            context: `${item.headerName}`,
            id: id
        }
    }) || [];

    const newDataSelectColumns = dataSelectColumns.filter(x => x.id <= 3)

    const handleChangeColumns = (event: SelectChangeEvent) => {
        setValueSelectColumns(event.target.value)
        const result = columnsCustom.filter((item: any) => item.field === event.target.value)[0] || null
        setValueTextColumns(result)
    }

    const handleChangeSearchColumns = (event: SelectChangeEvent) => {
        setValueSearchColumns(event.target.value)
    }


    const handleOnClickSearchColumns = (value: any) => {
        filterData(
            undefined,
            setPageCurrent,
            setListParamsEmail,
            remove,
            data,
            viewDataRows,
            companyId,
            valueTextColumns,
            String(itemValueListState),
            valueDataStart.formart,
            valueDataEnd.formart,
            orientationSort.columnTable || "id",
            orientationSort.sortTable || "desc",
            1,
            Number(viewDataRows),
            false,
            value.searchText || "");
        remove();
    }

    /* clear text input for collumn */
    const clearTextInputForCollumn = () => {
        setTimeout(() => {
            filterData(
                undefined,
                setPageCurrent,
                setListParamsEmail,
                remove,
                data,
                viewDataRows,
                companyId,
                valueTextColumns,
                String(itemValueListState),
                valueDataStart.formart,
                valueDataEnd.formart,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                1,
                Number(viewDataRows),
                false,
                null);
            remove();
        }, 300);
    }

    /* clear filter */
    const handleClearFilter = () => {
        setValueSearch(null);
        setValueInputFilter(null);
        setValueErrorFilter(false);
        setTimeout(() => {
            setValueListState("0");
            setValueSearch(null);
            setValueInputFilter(null);
            setloadingExcel(false);
            setValueDataStart({
                formart: null,
                noFormart: null,
                error: null
            });
            setValueDataEnd({
                formart: null,
                noFormart: null,
                error: null
            });
            setListParamsEmail({
                recordsByPage: Number(viewDataRows),
                pageNumber: 1,
                companyId: companyId,
                languageCode: "pt",
                orderColumn: orientationSort.columnTable || "id",
                orderDirection: orientationSort.sortTable || "desc",
                columnFilters: []
            });
            remove();
            setPageCurrent(1);
        }, 300);
    }


    /* END FILTERS*/


    return {
        resources,
        valueDataStart,
        valueDataEnd,
        isLoading,
        isRefetching,
        rowTable,
        columnsCustom,
        sortModel,
        allPages,
        pageCurrent,
        viewDataRows,
        viewDataMenuSelect,
        openCreatCampaigns,
        valueErrorFilter,
        itemValueListState,
        dataMenuSelectListState,
        newDataSelectColumns,
        valueSelectColumns,
        valueInputFilter,
        listState,
        dataMenuListChannel,
        valueModalChannel,
        params,
        newDataEmail,
        getValueSearch,
        loadingExcel,
        valueSearchColumns,
        setValueSortTable,
        setOrientationSort,
        goEditCampaigns,
        handleActionSecundary,
        handleChangeChannelModal,
        handleChangeSearchColumns,
        handleOnClickSearchColumns,
        handleChangeListState,
        setValueInputFilter,
        setValueErrorFilter,
        searchInput,
        handleChangeColumns,
        handleClearFilter,
        clearTextInputForCollumn,
        handleActionCampaigns,
        setPageCurrent,
        handleChangePage,
        handleChangeviewData,
        sortTables,
        handleOnchangeDateEnd,
        handleOnchangeDateStart,
        goCreatPage,
        goBackPage
    };
};

export default useViewDistributionListHelper;
