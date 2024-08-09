import { Pagination, PaginationItem } from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import InformationCard from "../../../components/InformationCard/InformationCard";
import CustomNoRowsOverlay from "../../../components/table/customNoRowsOverlay";
import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useVolumesShippedHelper from "./VolumesShipped.helper";
import { Helmet } from "react-helmet";
import HeaderInformationCard from "../../../components/InformationCard/HeaderInformationCard";
import LayoutDashboard from "../../../components/layoutDefault/dashboard";
import useStyle from "../../../styles/style";
import InputSelects from "../../../components/InputSelects";
import VolumesShippedCustomToolbar from "./shards/VolumesShippedCustomToolbar";

const StyledDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        border: '1px solid black',
        borderRight: 0,
    },
    "& .MuiDataGrid-cell": {
        border: '1px solid black',
        borderRight: 0,
        borderBottom: 0,
    },
    '& .MuiDataGrid-main': {
        minHeight: '350px'
    },
    '& .MuiDataGrid-main>*:first-of-type': {
        borderRadius: '0px'
    },
    '& .MuiDataGrid-virtualScrollerContent': {
        border: '1px solid black',
        borderTop: 0,
        borderLeft: 0
    },
    '& .MuiDataGrid-columnHeaders': {
        borderRight: '1px solid black',
    }
})

const VolumesShipped = () => {
    const {
        columnsCustom,
        isLoading,
        isRefetching,
        getValueSearch,
        setValueSearch,
        allPages,
        pageCurrent,
        setPageCurrent,
        handleChangePage,
        rowTable,
        handleClearFilter,
        sortModel,
        sortTables,
        resources,
        viewDataRows,
        handleChangeviewData,
        viewDataMenuSelect,
        valueModalChannel,
        handleChangeMonth,
        pieChartData,
        months
    } = useVolumesShippedHelper();
    const { containerPage } = useStyle();
    
    return (
        <LayoutDashboard>
            <Helmet>
                <title>{resources.title}</title>
            </Helmet>
            <Box
                sx={{
                    ...containerPage,
                    justifyContent: 'flex-start',
                }}
            >
                <HeaderInformationCard
                    title= {resources.cardTitle}
                    description= {resources.cardDescription}
                />
                <InformationCard 
                    containerStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#FFFFFFF',
                        width: "95%",
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        borderRadius: '20px',
                        border: '2px solid #bab2c1'
                    }}
                >

                    <Box sx={{width: '95%', minHeight: '400px', height: 'auto' }}> 
                        <StyledDataGrid 
                            slots={{
                                noRowsOverlay: CustomNoRowsOverlay,
                                toolbar: () => {
                                    return (
                                        <Box sx={{ display: { lg: "inline-flex", md: "inline-flex" }, mb: 2, justifyContent: "space-between", width: '100%' }}>
                                            {VolumesShippedCustomToolbar(
                                                isRefetching,
                                                isLoading,
                                                getValueSearch,                                       
                                                setValueSearch,  
                                                handleClearFilter,
                                                valueModalChannel,
                                                handleChangeMonth,
                                                resources,
                                                pieChartData,
                                                months
                                            )} 
                                        </Box> 
                                    ) 
                                },
                                footer: () => {
                                    return (
                                        <Stack spacing={2} sx={{ width: "100%", ml: -2, display: "flex", justifyContent: "space-between", paddingBottom: '5px' }}>
                                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                <InputSelects
                                                    title="Quantidades"
                                                    sx={{ minWidth: 89, mx: 4, mr: 4 }}
                                                    disabled={isLoading || isRefetching}
                                                    label="quantidade" 
                                                    valueSelect={viewDataRows}
                                                    handleChangeLanguage={handleChangeviewData}
                                                    menuItem={viewDataMenuSelect} 
                                                />
                                                <Pagination
                                                    sx={{ pt: 2 }}
                                                    count={allPages}
                                                    page={pageCurrent}
                                                    onChange={(e: any, value: any) => {
                                                        setPageCurrent(value);
                                                        handleChangePage(e, value);
                                                    }}
                                                    disabled={isLoading || isRefetching}
                                                    renderItem={(item) => (                                                    
                                                        <PaginationItem
                                                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                                            {...item}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Stack>
                                    )
                                }
                            }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            columnVisibilityModel={{
                            // Hide columns status and traderName, the other columns will remain visible
                                Id: false,
                                CompanyId: false,
                                Year: false
                            }}
                            sx={{ '--DataGrid-overlayHeight': '300px', 
                                ['& .MuiDataGrid-main']: {
                                    height: `${Number(viewDataRows) < rowTable.length ? (350 * Number(viewDataRows))/5 : (350 * rowTable.length)/5}px`
                                },
                            }}
                            columns={columnsCustom}
                            rows={rowTable}
                            loading={isLoading || isRefetching}
                            sortModel={sortModel}
                            onSortModelChange={(newSortModel) => sortTables(newSortModel)}
                            hideFooterSelectedRowCount
                            disableColumnSelector
                            disableRowSelectionOnClick
                            disableDensitySelector
                            disableColumnFilter
                            autoPageSize
                        />
                    </Box>
                </InformationCard>
            </Box>
        </LayoutDashboard>
    )
}

export default VolumesShipped;