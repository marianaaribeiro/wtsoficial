import { Button, Pagination, PaginationItem } from "@mui/material"
import { Box, Stack, styled } from "@mui/system"
import CustomInput from "../../../components/CustomInput/CustomInput"
import InformationCard from "../../../components/InformationCard/InformationCard"
import { DataGrid } from "@mui/x-data-grid"
import { useRef, useState } from "react"
import CustomNoRowsOverlay from "../../../components/table/customNoRowsOverlay"
import useEmailBlackListManagementHelper from "./EmailBlackList.helper"
import EmailCardCustomToolbar from "./shards/EmailCardCustomToolbar"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import postHttp from "../../../services/postHttp/postHttp"
import useApi from "../../../services/api"
import Cookies from 'js-cookie';
import { useAuth } from "../../../hooks/useAuth"
import AlertDialog from "../../../components/AlertDialog"
import InputFileUpload from "../../../components/FileUpload/FileUpload"

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

const EmailCard = () => {
    const {
        columnsCustom,
        isLoading,
        isRefetching,
        getValueSearch,
        loadingExcel,
        handleGetValueExcel,
        setloadingExcel,
        setloadingCSV,
        handleGetValueCSV,
        loadingCSV,
        setValueSearch,
        allPages,
        pageCurrent,
        setPageCurrent,
        handleChangePage,
        rowTable,
        searchInput,
        validateEmail,
        openAlertDialog,
        setOpenAlertDialog,
        handleDelete,
        handleClearFilter,
        sortModel,
        sortTables,
        resources
    } = useEmailBlackListManagementHelper();
    
    const emailRef = useRef<any>();    
    const auth = useAuth();
    const envUrl = auth?.urlEnviroments ? auth?.urlEnviroments.HOST.API_DIGITAL_URL : "";
    const { api } = useApi(envUrl || "");
    const token = Cookies.get('AppSessionCookie') || "";
    const [emailvalidated, setEmailValidated] = useState(true);
    const compId = '08db7195-f969-4489-8534-8c2f000a82ff';

    const handleInsertEmail = () => {       
        setEmailValidated(validateEmail(emailRef?.current?.value)) 
        if(validateEmail(emailRef?.current?.value)) {     
            const emailBlock: any = {
                companyId: compId, //auth?.companyId !== undefined ? String(auth?.companyId) : "";,
                emailToAdd: emailRef?.current?.value || '',
                createdBy: auth?.infoUser?.email || ""
            }

            try {
                if (token) {
                    const result = postHttp(api, '/AddEmailBlock', emailBlock)
                    return result;
                }
                else {
                    return null;
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Box sx={{
                fontSize: 'large',
                fontWeight: 'bold'}}>
                {resources.title}
            </Box>
                
            <InformationCard 
                containerStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFFF',
                    width: "95%",
                    minHeight: '400px',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderRadius: '20px',
                    border: '2px solid #bab2c1'
                }}
            >

                <Box sx={{
                    display: 'flex',
                    flexDirection:'row',
                    justifyContent:{ lg: 'space-between', md: 'space-between', sm:'center', xs:'center' },
                    color: 'black',
                    width: '100%',
                    flexWrap: 'wrap',
                    padding: { lg: '0 2rem', md: '0 1.5rem', sm:'0', xs:'0' } }}
                >              
                    
                    <InputFileUpload extensionTypes='.txt, .csv' url={`${envUrl}UploadFile`} />

                    <Box sx={{display: 'flex', alignItems: 'center', padding: { lg: '1rem 1rem', md: '1rem 1rem', sm: '0.5rem 0.5rem 0 0.5rem', xs:'0.5rem 0.5rem 0 0.5rem' }  }}>
                        {resources.inputTitle}: 
                        <Box sx={{height: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <CustomInput type='email' inputRef={emailRef} placeholder='example@example.com' sx={{margin: '0 1rem'}}/> 
                            {!emailvalidated && <Box sx={{color: 'red', fontSize:'small'}}>{resources.inputError}</Box>}
                        </Box>
                        <Button 
                            sx={{
                                height: '2rem',
                                width: '10rem'
                            }}
                            variant='contained'
                            component="label"
                            onClick={() => handleInsertEmail()}
                        >
                            {resources.buttonInsert}
                        </Button>

                    </Box>
                </Box>

                <Box sx={{width: '95%', height: { lg: '300px', md: '300px', sm: '350px', xs:'350px' } }}> 
                    <StyledDataGrid                        
                        slots={{
                            noRowsOverlay: CustomNoRowsOverlay,
                            toolbar: () => {
                                return (
                                    <Box sx={{ display: { lg: "inline-flex", md: "inline-flex" }, mb: 2, justifyContent: "space-between", width: '100%' }}>
                                        {EmailCardCustomToolbar(
                                            isRefetching,
                                            isLoading,
                                            getValueSearch,
                                            loadingExcel,
                                            setloadingExcel,
                                            handleGetValueExcel,
                                            setloadingCSV,      
                                            handleGetValueCSV,                                      
                                            loadingCSV,                                            
                                            setValueSearch,                                         
                                            searchInput,
                                            handleClearFilter,
                                            resources
                                        )} 
                                        <AlertDialog open={openAlertDialog} setOpen={setOpenAlertDialog} handleConfirmation={() => handleDelete()} translation={resources.deleteAlertDialog}/>
                                    </Box> 
                                ) 
                            },
                            footer: () => {
                                return (
                                    <Stack spacing={2} sx={{ width: "100%", ml: -2, display: "flex", justifyContent: "space-between", paddingBottom: '5px' }}>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                        }}
                        sx={{ '--DataGrid-overlayHeight': '300px' }}
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
        </>
    )
}

export default EmailCard;