import { SelectChangeEvent, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GridSortModel } from "@mui/x-data-grid";
import { useAuth } from "../../../hooks/useAuth";
import CustomDialog from "../../../components/modals/CustomDialog";
import { IColumnInformation } from "../../blockLists/Email/IProps";
import { filterData } from "./shards/filterData";
import { volumesShippedServices } from "../../../services/volumesShipped";
import { IVolumesShipped, IVolumesShippedResponse } from "./IProps";

const useVolumesShippedHelper = () => {
    const { t } = useTranslation();
    const auth = useAuth();
    const envUrl = auth?.urlEnviroments ? auth?.urlEnviroments.HOST.API_DIGITAL_URL : "";
    const router = useNavigate();
    const cookieValue = Cookies.get('AppSessionCookie') || "";
    const companyId = auth?.companyId !== undefined ? String(auth?.companyId) : "";

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [viewDataRows, setViewDataRows] = useState<string>("5");
    const [params, setParams] = useState<any>();
    const [dateRefetch, setDateRefetch] = useState<any>();
    const [newDataTable, setNewDataTable] = useState(null);
    const [rowTable, setRowTable] = useState<IVolumesShipped[]>([])
    const [allPages, setallPages] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [valueSearchColumns, setValueSearchColumns] = useState<any>();
    const [getValueSearch, setValueSearch] = useState<any>(null)
    const [openFilter, setOpenFilter] = useState(false)
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
    const [valueChannel, setValueModalChannel] = useState<any>("0");
    const valueModalChannel = useMemo(() => valueChannel, [valueChannel]);
    const [columnsCustom, setColumnsCustom] = useState<IColumnInformation[] & any>([]);
    const [pieChartData, setPieChartData] = useState<any>();
    const vertical = "top";
    const horizontal = "center";

    const compId = '08db7195-f969-4489-8534-8c2f000a82ff';

    const [listParamsVolumesShipped, setListParamsVolumesShipped] = useState({
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
            title: t("reporting.volumesShipped.title"),
            cardTitle: t("reporting.volumesShipped.cardInfo.title"),
            cardDescription: t("reporting.volumesShipped.cardInfo.description"),
            viewDataMenuSelect: {
                "5": t("global.viewDataMenuSelect.5"),
                "10": t("global.viewDataMenuSelect.10"),
                "25": t("global.viewDataMenuSelect.25"),
                "50": t("global.viewDataMenuSelect.50"),
                "100": t("global.viewDataMenuSelect.100"),
            },
            tableHeader: {
                Id: t("reporting.volumesShipped.tableHeader.Id"),
                CompanyId: t("reporting.volumesShipped.tableHeader.CompanyId"),
                Year: t("reporting.volumesShipped.tableHeader.Year"),
                Month: t("reporting.volumesShipped.tableHeader.Month"),
                Channel: t("reporting.volumesShipped.tableHeader.Channel"),
                Count: t("reporting.volumesShipped.tableHeader.Count"),
            },
            cleanFilter: t("reporting.volumesShipped.toolbar.cleanFilter"),
            months: {
                "0": t("reporting.volumesShipped.toolbar.months.0"),
                "1": t("reporting.volumesShipped.toolbar.months.1"),
                "2": t("reporting.volumesShipped.toolbar.months.2"),
                "3": t("reporting.volumesShipped.toolbar.months.3"),
                "4": t("reporting.volumesShipped.toolbar.months.4"),
                "5": t("reporting.volumesShipped.toolbar.months.5"),
                "6": t("reporting.volumesShipped.toolbar.months.6"),
                "7": t("reporting.volumesShipped.toolbar.months.7"),
                "8": t("reporting.volumesShipped.toolbar.months.8"),
                "9": t("reporting.volumesShipped.toolbar.months.9"),
                "10": t("reporting.volumesShipped.toolbar.months.10"),
                "11": t("reporting.volumesShipped.toolbar.months.11"),
                "12": t("reporting.volumesShipped.toolbar.months.12")
            }
        };
    }, [t]);
    
    const months = Object.keys(resources.months).map(key => {
        return {value: key, context: resources.months[`${key}` as keyof typeof resources.months] }
    })   

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
    const convertRowData = (valuesData: IVolumesShipped[] & any) => {
        const valueTable = valuesData && valuesData?.map((itemData: IVolumesShipped) => {
            return {
                id: `${itemData?.id ? itemData?.id : ""}`,
                Id: `${itemData?.id ? itemData?.id : ""}`,              
                CompanyId: `${itemData?.companyId ? itemData?.companyId : ""}`,
                Month: `${itemData?.month ? itemData?.month : ""} ${itemData?.year ? itemData?.year : ""}`,
                Channel: `${itemData?.channel ? itemData?.channel : ""}`,
                Count: itemData?.count ? itemData?.count : null
            }
        }) || [];
        return valueTable
    }

    const { isLoading, isRefetching, data, refetch, remove } = useQuery(
        "GetVolumesShippedPaged",
        () => {
            if (companyId !== undefined || companyId !== "") {
                return volumesShippedServices.getVolumesShippedPaged(cookieValue, listParamsVolumesShipped, informationError, envUrl);
            }
        },
        {
            enabled: true,
            refetchInterval: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: false,
            retry: false,
            retryDelay: 1,
            onSuccess: (data: IVolumesShippedResponse) => {
                if (data) {
                    setRowTable(convertRowData(data.volumesShipped || []));
                    setColumnsCustom(setColumns(data.columnInformation || []));
                    setPieChart(data.volumesShipped)

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

    const handleChangeMonth = (event: SelectChangeEvent) => {
        setValueModalChannel(event.target.value);      
        
        const month = months.find(x => x.value === event.target.value)?.context;

        setValueInputFilter(event?.target?.value !== '0' && month || "");

        filterData(
            undefined,
            setPageCurrent,
            setListParamsVolumesShipped,
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
            'Month',
            event.target.value !== '0' ? month : ""
        );
        remove()
    }

    /* search for page */
    const handleChangePage = (e: any, value: number) => {        
        if ((valueInputFilter === "" || valueInputFilter === null)) {
            setListParamsVolumesShipped({
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
                setListParamsVolumesShipped,
                refetch,
                data,
                viewDataRows,
                compId,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                value,
                Number(viewDataRows),
                false,
                false,
                'Month',
                valueInputFilter || ""
            );
            remove();
            setPageCurrent(value);
        }
    };

    const [openTable, setOpenTable] = useState(true);
    const [openReload, setopenReload] = useState(false);

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
        return columns;
    }

    const groupBy = (data: any, propToGroup: any) => {
        return data.reduce((r: any, a: any) => {
            const key = a[propToGroup];
            r[key] = r[key] || [];
            r[key].push(a);
            return r;
        }, Object.create(null));
    }

    const randomHexColorCode = () => {
        const n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };

    const setPieChart = (data: IVolumesShipped[] & any) => {
        const groupedDataByMonth = groupBy(data, 'month');

        const pieChartFiltered = Object.keys(groupedDataByMonth).map((key:any) => {
            const sumValue = groupedDataByMonth[key].reduce((a: any, b: any) => { return a + b.count; }, 0)
            return {
                value: sumValue,
                label: Object.values(resources.months).find(x => x === key),
                color: randomHexColorCode()
            }
        })

        setPieChartData(pieChartFiltered)
    }

    const handleClearFilter = () => {
        setValueSearch(null);
        setValueInputFilter(null);
        setValueErrorFilter(false);
        setValueModalChannel(0);
        setTimeout(() => {
            setValueSearch(null);
            setValueInputFilter(null);
            setListParamsVolumesShipped({
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
                    setListParamsVolumesShipped,
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
            }, 300);
            remove();
        }
    }

    /* see amount of value in table or card */
    const handleChangeviewData = (event: SelectChangeEvent) => {
        if ((valueInputFilter === "" || valueInputFilter === null)) {
            setListParamsVolumesShipped({
                recordsByPage: Number(event.target.value),
                pageNumber: 1,
                companyId: compId,
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
                setListParamsVolumesShipped,
                remove,
                data,
                viewDataRows,
                compId,
                orientationSort.columnTable || "id",
                orientationSort.sortTable || "desc",
                1,
                Number(event.target.value),
                false,
                false,
                'Month',
                valueInputFilter || "");
            remove();
            setViewDataRows(event.target.value);
        }
    }

    const viewDataMenuSelect = Object.keys(resources.viewDataMenuSelect).map(key => {
        return {value: key, context: resources.viewDataMenuSelect[`${key}` as keyof typeof resources.viewDataMenuSelect] }
    })

    return {
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
        vertical,
        horizontal,
        orientationSort,
        sortModel,
        valueInputFilter,
        valueErrorFilter,
        setPageCurrent,
        setValueErrorFilter,
        setValueInputFilter,
        sortTables,
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
        setOpen,
        setViewDataRows,
        setParams,
        setDateRefetch,
        setValueSearchColumns,
        handleChangeviewData,
        viewDataMenuSelect,
        valueModalChannel,
        handleChangeMonth,
        setValueModalChannel,
        pieChartData,
        months
    };
};

export default useVolumesShippedHelper;
