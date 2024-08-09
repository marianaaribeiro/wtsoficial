import { Fab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';

import useFilterColumnsHelper from "./filterColumns.helper";

const FilterColumns = (valueSearchColumns: any, setValueSearch: (e: any) => void, handleOnClickSearchColumns: (e: any) => void) => {

    const { formik } = useFilterColumnsHelper(valueSearchColumns, setValueSearch);
    const orientation = !!(formik.touched.searchText && formik.errors.searchText)

    return (
        <Box sx={{ mx: 3, display: "inline-flex", flexDirection: "column" }}>
            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{ width: "320px" }}
                    id="outlined-multiline-static"
                    label="filtar por coluna"
                    multiline
                    rows={1}
                    defaultValue={formik.values.searchText}
                    error={orientation}
                    name="searchText"
                    onChange={(e) => {
                        formik.handleChange(e);
                    }}
                    value={formik.values.searchText}
                />
                <Fab variant="extended" type="submit" onClick={() => {
                    if (orientation === false) {
                        handleOnClickSearchColumns(formik.values.searchText)
                    }
                }} sx={{ mt: 2.5, height: 30, mx: 3 }} disabled={orientation}>
                    <SearchIcon color={`${orientation === true ? "disabled" : "primary"}`} sx={{ mr: 1 }} />
                    Pesquisar
                </Fab>
            </form>
        </Box>
    );
};

export default FilterColumns;
