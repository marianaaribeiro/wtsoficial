import {
    Box,
    Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";

import LoadingCustom from "../../components/loadingCustom";
import useLoginHelper from "./login.helper";
import LayoutAuth from "../../components/layoutDefault/auth";
import imgs from "/login.svg"

const Login = () => {
    const {
        resources,
        loading,
    } = useLoginHelper();

    return (
        <LayoutAuth logo={`${imgs}`}>
            <Helmet>
                <title>{resources.title}</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.paper",
                    flex: "1 1 auto",
                    alignItems: "center",
                    display: "inline-flex",
                    justifyContent: "center",
                    paddingBottom: "40px",
                    height: "100vh",
                    flexDirection: "column",
                    gap: "15px",
                    justifySelf: "center",
                    width: "100%",
                    mt: 15
                }}
            >
                {(loading) && <LoadingCustom />}
                <Typography>
                    {resources.loading}
                </Typography>
            </Box>
        </LayoutAuth>
    );
};


export default Login;
