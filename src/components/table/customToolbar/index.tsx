import { Box } from "@mui/system";
import {
    GridToolbarContainer
} from "@mui/x-data-grid";
import { Fab } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import useCustomToolbarHelper from "./customToolbar.helper";


const CustomToolbar = (
    isRefetching: any,
    isLoading: any,
    getValueSearch: any,
    loadingExcel: boolean,
    setloadingExcel: (e: boolean) => void,
    handleGetValueExcel: () => void,
    setValueSearch: (e: any) => void,
    handleOnClickSearchColumns: (e: any) => void) => {

    const { formik } = useCustomToolbarHelper(getValueSearch, setValueSearch, handleOnClickSearchColumns)

    return (
        <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ mx: 1, display: "inline-grid", flexDirection: "column", gap: "8px" }}>
                <form noValidate onSubmit={formik.handleSubmit}>
                    {!loadingExcel ?
                        <Fab variant="extended" sx={{ mt: 2.5, height: 30, mx: 1 }} disabled={isLoading || isRefetching} onClick={() => {
                            setloadingExcel(true);
                            handleGetValueExcel();
                        }}>
                            <FileDownloadIcon color={`${isLoading || isRefetching ? "disabled" : "primary"}`} sx={{ mr: 1 }} />
							Export Excel
                        </Fab> :
                        <Fab variant="extended" sx={{ mt: 2.5, height: 30, mx: 1, }} disabled={true}>
							Carregando...
                        </Fab>
                    }
                </form>
            </Box>
        </GridToolbarContainer>
    );
};

export default CustomToolbar;
