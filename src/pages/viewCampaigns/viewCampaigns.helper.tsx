import { Box, Fab, IconButton, SelectChangeEvent, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { GridSortModel } from "@mui/x-data-grid";
import { viewCampaignsServices } from "../../services/viewCampaigns";
import { filterData } from "./shards/filterData";
import EditIcon from '@mui/icons-material/Edit';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const useViewCampaignsHelper = () => {
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

    const [listChannel, setListChannel] = useState<any[]>([]);
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
    const [itemValueListChannel, setValueListChannel] = useState<string>("0");
    const [loadingExcel, setloadingExcel] = useState(false)
    const [valueErrorFilter, setValueErrorFilter] = useState(false);
    const [valueInputFilter, setValueInputFilter] = useState<null | string>(null);
    const [itemValueListCampaigns, setValueListCampaigns] = useState<string>("0");
    const [listCampaigns, setListCampaigns] = useState<any[]>([]);
    const [itemValueListSender, setValueListSender] = useState<string>("0");
    const [listSender, setListSender] = useState<any[]>([]);
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
            title: t("viewCampaigns.title"),
            cardInfo: {
                title: t("viewCampaigns.cardInfo.title"),
                description: t("viewCampaigns.cardInfo.description"),
            },
            textButton: t("viewCampaigns.button"),
            textButtonTwo: t("viewCampaigns.buttonCancel"),
            table: {
                campaigns: t("viewCampaigns.table.item[0]"),
                channel: t("viewCampaigns.table.item[1]"),
                dateStart: t("viewCampaigns.table.item[2]"),
                dateEnd: t("viewCampaigns.table.item[3]"),
                week: t("viewCampaigns.table.item[4]"),
                hoursStart: t("viewCampaigns.table.item[5]"),
                hoursEnd: t("viewCampaigns.table.item[6]"),
                amount: t("viewCampaigns.table.item[7]"),
                state: t("viewCampaigns.table.item[8]"),
                action: t("viewCampaigns.table.item[9]")
            },
            titleButtonPrimary: t("viewCampaigns.buttonSave"),
            titleButtonSecundary: t("viewCampaigns.buttonCancel")
        };
    }, [t]);

    /* Create campaigns */
    const handleActionCampaigns = () => {
        if (auth?.setEditCampaigns && valueModalChannel !== "0" && auth.setTypeCreateCampaigns) {
            auth.setEditCampaigns(false)
            setOpenCreatCampaigns(false)
            const campaignsSelected = dataMenuListChannel.find((item: any) => String(item.value) === String(valueModalChannel)).context
            auth.setTypeCreateCampaigns(campaignsSelected)
            router("/create-campaigns")
        }
    }

    const handleActionSecundary = () => {
        setOpenCreatCampaigns(false)
    }
    const goCreatCampaigns = () => {
        setOpenCreatCampaigns(true)
    }

    const goEditCampaigns = (value: any) => {
        if (auth?.setEditCampaigns && auth?.setParamsRowTable) {
            auth.setEditCampaigns(true)
            setParams(value)
            auth.setParamsRowTable(value)
            router("/edit-campaigns")
        }
    }

    const goPage = (value: any) => {
        if (auth?.setEditCampaigns && auth.setParamsRowTable) {
            auth.setParamsRowTable(value)
            router("/distribution-list")
        }
    }

    /* CALL APIS */

    /* convert value table N/A */
    const convertRowData = (valuesData: any[]) => {
        const valueTable = valuesData && valuesData?.map((itemData: any) => {
            const context = listChannel.filter(x => String(x.idChannel) === String(itemData.channelId))[0] || "";
            const contextChannel = context ? context?.nameChannel : "N/A";

            const contextCampaigns = listCampaigns.filter(x => String(x.idCampaigns) === String(itemData.campaignsId))[0] || "";
            const contextnameCampaigns = contextCampaigns ? contextCampaigns?.nameCampaigns : "N/A";

            const contextSender = listSender.filter(x => String(x.idSender) === String(itemData.senderId))[0] || "";
            const contextnameSender = contextSender ? contextSender?.nameSender : "N/A";

            return {
                id: `${itemData?.id ? itemData?.id : "N/A"}`,
                campaigns: `${contextnameCampaigns ? contextnameCampaigns : "N/A"}`,
                channel: `${contextChannel ? contextChannel : "N/A"}`,
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
                hoursStart: `${itemData?.hoursStart ? new Date(String(itemData?.hoursStart)).toLocaleDateString('pt', {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }) : "N/A"}`,
                hoursEnd: `${itemData?.hoursEnd ? new Date(String(itemData?.hoursEnd)).toLocaleDateString('pt', {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }) : "N/A"}`,
                amount: `${itemData?.amount ? itemData?.amount : "N/A"}`,
                state: `${contextnameSender ? contextnameSender : "N/A"}`,
            }
        }) || [];
        return valueTable
    }

    /* call api table */
    const { isLoading, isRefetching, data, refetch, remove } = useQuery(
        "PostPagedGeral",
        () => {
            if ((companyId !== undefined || companyId !== "") && auth?.urlEnviroments) {
                return viewCampaignsServices.postPagedGeral(cookieValue, listParamsEmail, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
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
        "AllListChannel",
        () => {
            if ((companyId !== undefined || companyId !== "") && auth?.urlEnviroments) {
                return viewCampaignsServices.getChannel(cookieValue, companyId, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
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
                    setListChannel(data)
                }
            },
            onError: () => {
            },
        }
    );

    const { } = useQuery(
        "AllListCampaigns",
        () => {
            if ((companyId !== undefined || companyId !== "") && auth?.urlEnviroments) {
                return viewCampaignsServices.getStateCampaigns(cookieValue, companyId, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
            }
        },
        {
            enabled: (companyId !== undefined || companyId !== "") && !openCreatCampaigns ? true : false,
            refetchInterval: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: false,
            retry: false,
            retryDelay: 1,
            onSuccess: (data) => {
                if (data) {
                    setListCampaigns(data)
                }
            },
            onError: () => {
            },
        }
    );

    const { } = useQuery(
        "AllListSender",
        () => {
            if ((companyId !== undefined || companyId !== "") && auth?.urlEnviroments) {
                return viewCampaignsServices.getSenderCampaigns(cookieValue, companyId, auth?.urlEnviroments.HOST.API_DIGITAL_URL);
            }
        },
        {
            enabled: (companyId !== undefined || companyId !== "") && !openCreatCampaigns ? true : false,
            refetchInterval: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: false,
            retry: false,
            retryDelay: 1,
            onSuccess: (data) => {
                if (data) {
                    setListSender(data)
                }
            },
            onError: () => {
            },
        }
    );


    /* tabela */
    const columnsCustom: any = [
        {
            field: "campaigns",
            center: true,
            headerName: `${resources.table.campaigns}`,
            flex: 1,
            editable: false
        },
        {
            field: "channel",
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
            field: "hoursStart",
            center: true,
            headerName: `${resources.table.hoursStart}`,
            flex: 1,
            editable: false
        },
        {
            field: "hoursEnd",
            center: true,
            headerName: `${resources.table.hoursEnd}`,
            flex: 1,
            editable: false
        },
        {
            field: "amount",
            center: true,
            headerName: `${resources.table.amount}`,
            flex: 1,
            editable: false
        },
        {
            field: "state",
            center: true,
            headerName: `${resources.table.state}`,
            flex: 1,
            editable: false
        },
        {
            field: "action",
            center: true,
            headerName: `${resources.table.action}`,
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
                            <Tooltip title="Visualizar Lista de Distribuição" onClick={() => goPage(params)}>
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
        if (itemValueListChannel === "0" && valueDataStart.formart === null && valueDataEnd.formart === null && (valueInputFilter === "" || valueInputFilter === null)) {
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
                String(itemValueListChannel),
                String(itemValueListCampaigns),
                String(itemValueListSender),
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
        if (itemValueListChannel === "0" && valueDataStart.formart === null && valueDataEnd.formart === null && (valueInputFilter === "" || valueInputFilter === null)) {
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
                String(itemValueListChannel),
                String(itemValueListCampaigns),
                String(itemValueListSender),
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
                    String(itemValueListChannel),
                    String(itemValueListCampaigns),
                    String(itemValueListSender),
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
                String(itemValueListChannel),
                String(itemValueListCampaigns),
                String(itemValueListSender),
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
                String(itemValueListChannel),
                String(itemValueListCampaigns),
                String(itemValueListSender),
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
    const dataMenuSelectListChannel: any[] = listChannel?.map((item: any) => {
        return {
            value: `${item.idServico}`,
            context: `${item.nameChannel}`
        }
    }) || [];

    dataMenuSelectListChannel.push({
        value: `0`,
        context: `Todos os Canais`
    })

    /* filter List Channel */
    const handleChangeListChannel = (event: SelectChangeEvent) => {

        setPageCurrent(1);
        refetch();
        setloadingExcel(false);
        setValueListChannel(event.target.value);
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
                String(itemValueListCampaigns),
                String(itemValueListSender),
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

    /* multi select List campaigns */
    const dataMenuSelectListCampaigns: any[] = listCampaigns?.map((item: any) => {
        return {
            value: `${item.idServico}`,
            context: `${item.nameCampaigns}`
        }
    }) || [];

    dataMenuSelectListCampaigns.push({
        value: `0`,
        context: `Todos os estados das Campanhas`
    })

    /* filter List Channel */
    const handleChangeListCampaigns = (event: SelectChangeEvent) => {

        setPageCurrent(1);
        refetch();
        setloadingExcel(false);
        setValueListCampaigns(event.target.value);
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
                String(itemValueListChannel),
                String(event.target.value),
                String(itemValueListSender),
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


    /* multi select List Channel */
    const dataMenuSelectListSender: any[] = listSender?.map((item: any) => {
        return {
            value: `${item.idServico}`,
            context: `${item.nameSender}`
        }
    }) || [];

    dataMenuSelectListSender.push({
        value: `0`,
        context: `Todos os Remetentes`
    })

    /* filter List Channel */
    const handleChangeListSender = (event: SelectChangeEvent) => {

        setPageCurrent(1);
        refetch();
        setloadingExcel(false);
        setValueListSender(event.target.value);
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
                String(itemValueListChannel),
                String(itemValueListCampaigns),
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
            String(itemValueListChannel),
            String(itemValueListCampaigns),
            String(itemValueListSender),
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
                String(itemValueListChannel),
                String(itemValueListCampaigns),
                String(itemValueListSender),
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
            setValueListChannel("0");
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
        listChannel,
        valueErrorFilter,
        itemValueListChannel,
        dataMenuSelectListChannel,
        newDataSelectColumns,
        valueSelectColumns,
        valueInputFilter,
        listCampaigns,
        itemValueListCampaigns,
        dataMenuSelectListCampaigns,
        listSender,
        itemValueListSender,
        dataMenuSelectListSender,
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
        handleChangeListSender,
        handleChangeListCampaigns,
        handleChangeListChannel,
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
        goCreatCampaigns
    };
};

export default useViewCampaignsHelper;
