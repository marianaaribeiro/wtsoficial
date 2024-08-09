import { Box } from "@mui/system";
import {
    GridToolbarContainer
} from "@mui/x-data-grid";
import { Button, Fab } from "@mui/material";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { useRef } from "react";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import useCustomSMSCardToolbarHelper from "./customSMSCardToolbar.helper";

const SMSCardCustomToolbar = (
    isRefetching: any,
    isLoading: any,
    getValueSearch: any,
    loadingExcel: boolean,
    setloadingExcel: (e: boolean) => void,
    handleGetValueExcel: () => void,
    setloadingCSV: (e: boolean) => void,
    handleGetValueCSV: () => void,
    loadingCSV: boolean,
    setValueSearch: (e: any) => void,
    searchInput: (value: any) => void,
    handleClearFilter: () => void,
    resources: any
) => {
    const ref = useRef<any>();

    const { formik } = useCustomSMSCardToolbarHelper(getValueSearch, setValueSearch)

    return (
        <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
            <Box sx={{ display: "inline-grid", flexDirection: "column", gap: "8px", width: '100%' }}>

                <form noValidate onSubmit={formik.handleSubmit}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection:'row',
                        justifyContent:{ lg: 'space-between', md: 'space-between', sm:'center', xs:'center' },
                        alignItems: 'center',
                        color: 'black',
                        width: '100%',
                        flexWrap: 'wrap',
                    }}
                    > 
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between', 
                            padding: '1rem 0', fontSize: 'larger'}}>
                            {resources.inputTitle}: <CustomInput inputRef={ref} disabled={isLoading || isRefetching}
                                placeholder='000 000 000' sx={{margin: '0 1rem'}} type='number'/> 

                            <Button 
                                sx={{
                                    height: '2rem',
                                    width: '10rem'
                                }}
                                variant='contained'
                                onClick={() => {
                                    searchInput(ref.current.value);
                                }}
                            >
                                {resources.searchButton}
                            </Button>
                            <Box sx={{ width: "auto", display: "flex", justifyContent: "center", alignItems: "center", ml: { lg: '1rem', md: '1rem', sm: '0.5rem', xs: '0.5rem' } }} >
                                <Fab variant="extended" onClick={() => handleClearFilter()} sx={{ height: 30, mx: { lg: 3, md: 0, sm: 0, xs: 0 } }} disabled={isLoading || isRefetching}>
                                    <SearchOffIcon color={`${isLoading || isRefetching ? "disabled" : "primary"}`} sx={{ mr: 1 }} />
                                    {resources.cleanFilter}
                                </Fab>
                            </Box>
                        </Box>                        
                        
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                            <Button variant="contained" sx={{
                                height: '2rem',
                                width: '10rem',
                                marginLeft: '1rem',
                                borderRadius: '12px',
                                backgroundColor: '#6366F1',
                                color: '#FFFFFF'
                            }} disabled={loadingCSV || isLoading || isRefetching} onClick={() => {
                                setloadingCSV(true);
                                handleGetValueCSV();
                            }}>
                                {!loadingCSV ? 'CSV' : resources.loading}
                            </Button> 

                            <Button variant="contained" sx={{
                                height: '2rem',
                                width: '10rem',
                                marginLeft: '1rem',
                                borderRadius: '12px',
                                backgroundColor: '#6366F1',
                                color: '#FFFFFF'
                            }} disabled={loadingExcel || isLoading || isRefetching} onClick={() => {
                                setloadingExcel(true);
                                handleGetValueExcel();
                            }}>
                                {!loadingExcel ? 'Excel' : resources.loading}
                            </Button> 
                        </Box>
                    </Box>
                </form>
            </Box>
        </GridToolbarContainer>
    );
};

export default SMSCardCustomToolbar;
