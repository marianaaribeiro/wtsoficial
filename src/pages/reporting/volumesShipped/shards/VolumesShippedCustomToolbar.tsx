import { Box } from "@mui/system";
import {
    GridToolbarContainer
} from "@mui/x-data-grid";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import InputSelects from "../../../../components/InputSelects";
import useCustomVolumesShippedToolbarHelper from "./customVolumesShippedToolbar.helper";
import { Fab } from "@mui/material";
import CustomPieChart from "../../../../components/PieChart";

const VolumesShippedCustomToolbar = (
    isRefetching: any,
    isLoading: any,
    getValueSearch: any,
    setValueSearch: (e: any) => void,
    handleClearFilter: () => void,
    valueModalChannel: () => void,
    handleChangeMonth: (e: any) => void,
    resources: any,
    pieChartData: any,
    months: any
) => {
    const { formik } = useCustomVolumesShippedToolbarHelper(getValueSearch, setValueSearch)
    
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
                        flexWrap: 'wrap',
                        // width: {lg: '100%', md: '100%', sm: '100%', xs: '350px'}
                        width: '100%'
                    }}
                    > 
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between', 
                            padding: '1rem 0', fontSize: 'larger'}}>
                            <InputSelects
                                title="Mês"
                                sx={{ minWidth: 150 }}
                                disabled={false}
                                label="months"
                                valueSelect={valueModalChannel}
                                handleChangeLanguage={handleChangeMonth}
                                menuItem={months}                            
                            />

                            <Box sx={{ width: "auto", display: "flex", justifyContent: "center", alignItems: "center", ml: { lg: '1rem', md: '1rem', sm: '0.5rem', xs: '0.5rem' } }} >
                                <Fab variant="extended" onClick={() => handleClearFilter()} sx={{ height: 30, mx: { lg: 3, md: 0, sm: 0, xs: 0 } }} disabled={isLoading || isRefetching}>
                                    <SearchOffIcon color={`${isLoading || isRefetching ? "disabled" : "primary"}`} sx={{ mr: 1 }} />
                                    {resources.cleanFilter}
                                </Fab>
                            </Box>
                        </Box>  


                        <CustomPieChart size={{width: 300, height: 150}} data={pieChartData}/>                      

                    </Box>
                </form>
            </Box>
        </GridToolbarContainer>
    );
};

export default VolumesShippedCustomToolbar;
