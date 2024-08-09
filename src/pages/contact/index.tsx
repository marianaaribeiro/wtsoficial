import { Box, Button, Fab, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Helmet } from "react-helmet";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

import LayoutDashboard from "../../components/layoutDefault/dashboard";
import CardInformation from "../../components/cardInformation";
import GroupDataEndDataStart from "../../components/groupDataEndDataStart";
import CustomTable from "../../components/table/customTable";
import InputSelects from "../../components/InputSelects";
import useViewContactListHelper from "./viewContactList.helper";

const ViewContactList = () => {
    const { resources,
        valueDataStart,
        valueDataEnd,
        isLoading,
        isRefetching,
        columnsCustom,
        sortModel,
        allPages,
        pageCurrent,
        viewDataRows,
        viewDataMenuSelect,
        itemValueListState,
        dataMenuSelectListState,
        newDataSelectColumns,
        valueSelectColumns,
        valueInputFilter,
        valueErrorFilter,
        setValueInputFilter,
        setValueErrorFilter,
        searchInput,
        handleChangeListState,
        handleChangeColumns,
        handleClearFilter,
        clearTextInputForCollumn,
        setPageCurrent,
        handleChangePage,
        handleChangeviewData,
        sortTables,
        handleOnchangeDateEnd,
        handleOnchangeDateStart,
        goBackPage } = useViewContactListHelper();

    return (
        <LayoutDashboard>
            <Helmet>
                <title>{resources.title}</title>
            </Helmet>
            <Box
                sx={{
                    ml: 1,
                    mr: 2.5
                }}
            >
                <Box sx={{ flexDirection: "row" }}>
                    <CardInformation
                        title={resources.cardInfo.title}
                        description={resources.cardInfo.description}
                        styleContainer={{
                            m: 2,
                            width: "100%",
                        }}
                    />
                    <Button sx={{ mt: 2 }} variant="text" onClick={() => goBackPage()} disabled={isLoading || isRefetching}> {`< ${resources.textButton}`}</Button>

                    <Box sx={{
                        mt: 5,
                        mb: 5,
                        flexDirection: "column",
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        width: "100%"
                    }}>
                        <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            justifySelf="center"
                            spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ width: "100%", height: "100%", mb: 5 }}>

                            <CardInformation
                                description="Quantidade máxima enviada da campanha por canal"
                                styleContainer={{
                                    width: "100%"
                                }}
                                childrens={
                                    <Box sx={{ mt: 3 }}>
                                        <PieChart
                                            colors={['purple', 'green']}
                                            series={[
                                                {
                                                    data: [
                                                        { id: 0, value: 10, label: 'email' },
                                                        { id: 1, value: 15, label: 'sms' },

                                                    ],
                                                },
                                            ]}
                                            width={400}
                                            height={200}
                                        />
                                    </Box>
                                }
                            />

                            <CardInformation
                                description="Quantidade máxima enviada da lista de distribuição por canal"
                                styleContainer={{
                                    width: "100%",
                                }}
                                childrens={
                                    <Box sx={{ mt: 3 }}>
                                        <PieChart
                                            colors={['orange', 'black']}
                                            series={[
                                                {
                                                    data: [
                                                        { id: 0, value: 10, label: 'email' },
                                                        { id: 1, value: 15, label: 'sms' },

                                                    ],
                                                },
                                            ]}
                                            width={400}
                                            height={200}
                                        />
                                    </Box>
                                }
                            />
                        </Stack>
                        <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            justifySelf="center"
                            spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ width: "100%", height: "100%", mb: 5 }}>

                            <CardInformation
                                description="Quantidade máxima de ativos e inativos da campanha por canal"
                                styleContainer={{
                                    width: "100%",
                                }}
                                childrens={
                                    <Box sx={{ mt: 3 }}>
                                        <BarChart
                                            colors={['yellow', 'gray']}
                                            xAxis={[{ scaleType: 'band', data: ['Email', 'SMS'] }]}
                                            series={[{ data: [4, 3], label: 'Ativo' }, { data: [1, 6], label: 'Inativo' }]}
                                            width={500}
                                            height={300}
                                        />
                                    </Box>
                                }
                            />

                            <CardInformation
                                description="Quantidade máxima de ativos e inativos da lista de distribuição por canal"
                                styleContainer={{
                                    width: "100%",
                                }}
                                childrens={
                                    <Box sx={{ mt: 3 }}>
                                        <BarChart
                                            xAxis={[{ scaleType: 'band', data: ['Email', 'SMS'] }]}
                                            series={[{ data: [4, 3], label: 'Ativo' }, { data: [1, 6], label: 'Inativo' }]}
                                            width={500}
                                            height={300}
                                        />
                                    </Box>
                                }
                            />

                        </Stack>
                    </Box>
                    {/* list filtros */}
                    <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                        justifySelf="center"
                        spacing={{ lg: 1, md: 3, sm: 1, xs: 1 }}
                        useFlexGap
                        flexWrap="wrap"
                        sx={{ width: "100%", height: "100%", mb: 5 }}>

                        <GroupDataEndDataStart
                            valueDataStart={valueDataStart}
                            valueDataEnd={valueDataEnd}
                            handleOnchangeDateEnd={handleOnchangeDateEnd}
                            handleOnchangeDateStart={handleOnchangeDateStart}
                            isLoading={isLoading}
                            isRefetching={isRefetching}
                        />
                        {/* filter for columns */}
                        <Box sx={{ width: { lg: "auto", md: "auto", sm: "100%", xs: "100%" }, display: "flex", justifyContent: "center", alignItems: "center", my: 1, py: 2, px: 2, color: "white", bgcolor: "primary.light", borderRadius: 30 }}>
                            <Box sx={{ display: "inline-grid", justifyContent: "center", alignItems: "center", }}>
                                <Box sx={{ display: { lg: "flex", md: "flex", sm: "inline-grid", xs: "inline-grid" } }}>
                                    <Box>
                                        <InputSelects title="Coluna" sx={{ minWidth: 89, mx: 2, mr: 2 }} label="columns" valueSelect={valueSelectColumns} handleChangeLanguage={(e: any) => {
                                            handleChangeColumns(e);
                                        }} menuItem={newDataSelectColumns}
                                            disabled={isLoading || isRefetching} />
                                        <TextField
                                            autoFocus
                                            sx={{ width: { lg: "250px", md: "250px", sm: "250px", xs: "150px" }, mt: 0.5 }}
                                            id="outlined-basic"
                                            label={`${valueErrorFilter ? "É necessário preencher o campo" : "Filtrar valor por coluna"}`}
                                            variant="standard"
                                            disabled={isLoading || isRefetching}
                                            error={valueErrorFilter}
                                            onChange={(e) => {
                                                setValueInputFilter(e.target.value);
                                                setValueErrorFilter(false);
                                            }}
                                            value={valueInputFilter}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => {
                                                                if (valueInputFilter !== null || valueInputFilter !== "") {
                                                                    setValueInputFilter(null);
                                                                    clearTextInputForCollumn();
                                                                }
                                                            }}
                                                            disabled={isLoading || isRefetching}
                                                            edge="end"
                                                        >
                                                            {valueInputFilter ? (
                                                                <CloseIcon sx={{ p: 0.5 }} />
                                                            ) : null}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                    <Fab variant="extended" onClick={() => {
                                        setValueInputFilter(valueInputFilter);
                                        searchInput();
                                    }} sx={{ mt: 2.5, height: 30, mx: 1, bgcolor: "white" }} disabled={isLoading || isRefetching}>
                                        <SearchIcon color={`${isLoading || isRefetching ? "disabled" : "primary"}`} sx={{ mr: 1 }} />
                                        Pesquisar valor
                                    </Fab>
                                </Box>
                            </Box>
                        </Box>
                        {/* {(listChannel && listChannel?.length > 0) && */}
                        <Box sx={{ minWidth: 79, width: { lg: "auto", md: "auto", sm: "45%", xs: "35%" }, mx: { lg: 3, md: 0, sm: 0, xs: 0 }, display: "inline-flex", justifyContent: { lg: "center", md: "center", sm: "flex-start", xs: "flex-end" }, alignItems: "center" }}>
                            <InputSelects
                                title="Estado da Lista de Contatos"
                                sx={{ minWidth: 79 }}
                                disabled={isLoading || isRefetching}
                                label="Estado da Lista de Contatos"
                                valueSelect={itemValueListState}
                                handleChangeLanguage={handleChangeListState}
                                menuItem={dataMenuSelectListState}
                            />
                        </Box>
                        {/*    } */}
                        <Box sx={{ width: "auto", display: "flex", justifyContent: "center", alignItems: "center", mt: { lg: 2.5, md: 2.5, sm: 1, xs: 1 } }} >
                            <Fab variant="extended" onClick={() => handleClearFilter()} sx={{ height: 30, mx: { lg: 3, md: 0, sm: 0, xs: 0 } }} disabled={isLoading || isRefetching}>
                                <SearchOffIcon color={`${isLoading || isRefetching ? "disabled" : "primary"}`} sx={{ mr: 1 }} />
                                Limpar Filtro
                            </Fab>
                        </Box>
                    </Stack>

                    <CardInformation
                        styleContainer={{
                            m: 2,
                            width: "100%",
                        }}
                        childrens={
                            <CustomTable
                                columnsCustom={columnsCustom}
                                rowTable={[{
                                    id: 1,
                                    description: "teste nome",
                                    channel: "email",
                                    dateStart: "10/08/2024",
                                    dateEnd: "10/07/2024",
                                    week: "segunda-feira",
                                    priority: "teste",
                                    nameFile: "teste",
                                    amount: "1000",
                                }]}
                                footerWithPagination={true}
                                isLoading={isLoading}
                                isRefetching={isRefetching}
                                sortModel={sortModel}
                                allPages={allPages}
                                pageCurrent={pageCurrent}
                                viewDataRows={viewDataRows}
                                viewDataMenuSelect={viewDataMenuSelect}
                                setPageCurrent={setPageCurrent}
                                handleChangePage={handleChangePage}
                                handleChangeviewData={handleChangeviewData}
                                sortTables={sortTables}
                            />
                        }
                    />
                </Box>
            </Box>
        </LayoutDashboard >
    );
};

export default ViewContactList;
