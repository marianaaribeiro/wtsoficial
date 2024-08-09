import { Box } from "@mui/system";
import {
    GridToolbarContainer
} from "@mui/x-data-grid";
import { Button, Fab } from "@mui/material";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { useRef } from "react";
import useCustomEmailCardToolbarHelper from "./customEmailCardToolbar.helper";
import SearchOffIcon from '@mui/icons-material/SearchOff';

const EmailCardCustomToolbar = (
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

    const { formik } = useCustomEmailCardToolbarHelper(getValueSearch, setValueSearch)

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
                            {resources.inputTitle}: 
                            <CustomInput 
                                inputRef={ref} 
                                disabled={isLoading || isRefetching}
                                placeholder='example@example.com' 
                                sx={{margin: '0 1rem'}} 
                                type='email'/> 
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


                        {/* <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            justifySelf="center"
                            spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ width: "100%", height: "100%", mb: 5 }}>
                           
                            {/* filter for columns */}
                        {/* <Box sx={{ width: { lg: "auto", md: "auto", sm: "100%", xs: "100%" }, display: "flex", justifyContent: "center", alignItems: "center", my: 1, py: 2, px: 2, color: "white", bgcolor: "primary.light", borderRadius: 30 }}>
                                <Box sx={{ display: "inline-grid", justifyContent: "center", alignItems: "center", }}>
                                    <Box sx={{ display: { lg: "flex", md: "flex", sm: "inline-grid", xs: "inline-grid" } }}>
                                        <Box>
                                            <TextField
                                                autoFocus
                                                sx={{ width: { lg: "250px", md: "250px", sm: "250px", xs: "150px" }, mt: 0.5 }}
                                                id="outlined-basic"
                                                // label={`${valueErrorFilter ? "É necessário preencher o campo" : "Filtrar valor por coluna"}`}
                                                variant="standard"
                                                disabled={isLoading || isRefetching}
                                                // error={valueErrorFilter}
                                                onChange={(e) => {
                                                    // setValueInputFilter(e.target.value);
                                                    // setValueErrorFilter(false);
                                                }}
                                                // value={valueInputFilter}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => {
                                                                    // if (valueInputFilter !== null || valueInputFilter !== "") {
                                                                    //     setValueInputFilter(null);
                                                                    //     clearTextInputForCollumn();
                                                                    // }
                                                                }}
                                                                disabled={isLoading || isRefetching}
                                                                edge="end"
                                                            >
                                                                {/* {valueInputFilter ? (
                                                                    <CloseIcon sx={{ p: 0.5 }} />
                                                                ) : null} */}
                        {/* </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Box>
                                        <Fab variant="extended" onClick={() => { */}
                        {/* // setValueInputFilter(valueInputFilter);
                                            // searchInput(); */}
                        {/* }} sx={{ mt: 2.5, height: 30, mx: 1, bgcolor: "white" }} disabled={isLoading || isRefetching}>
                                            <SearchIcon color={`${isLoading || isRefetching ? "disabled" : "primary"}`} sx={{ mr: 1 }} />
                                        Pesquisar valor
                                        </Fab> */}
                        {/* </Box>
                                </Box>
                            </Box>  */}
                        {/* <Box sx={{ width: "auto", display: "flex", justifyContent: "center", alignItems: "center", mt: { lg: 2.5, md: 2.5, sm: 1, xs: 1 } }} >
                                <Fab variant="extended" 
                                // onClick={() => handleClearFilter()} 
                                    sx={{ height: 30, mx: { lg: 3, md: 0, sm: 0, xs: 0 } }} disabled={isLoading || isRefetching}>
                                    <SearchOffIcon color={`${isLoading || isRefetching ? "disabled" : "primary"}`} sx={{ mr: 1 }} />
                                Limpar Filtro
                                </Fab>
                            </Box>  */}
                        {/* </Stack>   */}

                        
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

export default EmailCardCustomToolbar;
