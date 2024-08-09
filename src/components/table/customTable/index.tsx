import { DataGrid } from "@mui/x-data-grid";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { IProps } from "./IProps";
import useCustomTableHelper from "./customTable.helper";
import CustomNoRowsOverlay from "../customNoRowsOverlay";
import InputSelects from "../../InputSelects";

const CustomTable = ({
    footer,
    isLoading,
    isRefetching,
    columnsCustom,
    rowTable,
    sortModel,
    footerWithPagination,
    allPages,
    pageCurrent,
    viewDataRows,
    viewDataMenuSelect,
    setPageCurrent,
    handleChangePage,
    handleChangeviewData,
    sortTables,
}: IProps) => {
    const { } = useCustomTableHelper()
    return (
        <DataGrid
            autoHeight
            slots={{
                noRowsOverlay: CustomNoRowsOverlay,
                footer: () => {
                    return (
                        <Stack spacing={2} sx={{ width: "100%", my: 6, ml: -2, display: "flex", justifyContent: "space-between" }}>
                            {footerWithPagination === false ?
                                <>
                                    {footer ?? null}
                                </>
                                :
                                <>
                                    {handleChangeviewData && handleChangePage && setPageCurrent && viewDataRows && viewDataMenuSelect && <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <InputSelects
                                            title="Quantidades"
                                            sx={{ minWidth: 89, mx: 4, mr: 4 }}
                                            disabled={isLoading || isRefetching}
                                            label="quantidade"
                                            valueSelect={viewDataRows}
                                            handleChangeLanguage={handleChangeviewData}
                                            menuItem={viewDataMenuSelect} />
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
                                    }
                                </>

                            }

                        </Stack>
                    )
                }
            }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}
            sx={{ '--DataGrid-overlayHeight': '300px', ml: 1 }}
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
        />
    );
};

export default CustomTable;
