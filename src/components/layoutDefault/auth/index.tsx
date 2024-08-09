
import { ThemeProvider } from "@mui/material/styles";
import { Box, Unstable_Grid2 as Grid, Typography } from "@mui/material";

import useStyle from "./style";
import { IProps } from "./IProps";
import useAutHelper from "./auth.helper";

const LayoutAuth = ({ children, logo }: IProps) => {
    const { resources, theme } = useAutHelper();
    const {
        boxContainer,
        ContainerGridItem,
        gridContainer,
        gridItem,
    } = useStyle();
    return (
        <ThemeProvider theme={theme}>
            <Box component="main" sx={boxContainer}>
                <Grid container sx={gridContainer}>
                    <Grid
                        xs={12}
                        lg={8}
                        sx={{
                            "& img": {
                                maxWidth: "100%",
                            },
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            background: `url(${logo})`,
                            ...ContainerGridItem,
                        }}
                    >
                        <Box
                            sx={{
                                p: "46px",
                                backgroundColor: (t) =>
                                    t.palette.mode === "light"
                                        ? t.palette.grey[50]
                                        : t.palette.grey[900],
                                opacity: 0.6,
                                borderRadius: "20px",
                                color: "black",
                                mt: "250px",
                            }}
                        >
                            <Typography
                                align="center"
                                color="inherit"
                                sx={{
                                    fontSize: "24px",
                                    lineHeight: "32px",
                                    mb: 1,
                                }}
                                variant="h1"
                            >
                                {resources.system}
                                <Box
                                    component="a"
                                    sx={{ color: "blues.dark", pl: "5px" }}
                                    target="_blank"
                                >
                                    {resources.title}
                                </Box>
                            </Typography>
                            <Typography align="center" variant="subtitle1">
                                {resources.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} lg={4} sx={gridItem}>
                        {children}
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default LayoutAuth;
