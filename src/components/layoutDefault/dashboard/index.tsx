import { ThemeProvider } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { IProps } from "./IProps";
import useDashboardHelper from "./dasboard.helper";
import { TopNav } from "./shards/topNav";
import { SideNav } from "./shards/sideNav";
import { withAuthGuard } from "../auth/shards/withAuthGuard";
import useStyle from "./style";
import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";


export const LayoutDashboard = withAuthGuard((props: IProps) => {
    const { children, urls } = props;
    const { openNav, theme, openSideBar, setOpenSideBar, setOpenNav } = useDashboardHelper();
    const { LayoutContainer, LayoutRoot } = useStyle();
    return (
        <ThemeProvider theme={theme}>
            <TopNav onNavOpen={() => setOpenNav(true)} />
            {openSideBar && <SideNav
                onClose={() => {
                    setOpenNav(false)
                }}
                open={openNav}
                urls={urls || ""}
            />}
            {openNav && <SideNav
                onClose={() => { setOpenNav(false) }}
                open={openNav}
                urls={urls || ""}
            />}
            <LayoutRoot sx={{ paddingLeft: `${openSideBar ? "280px" : "none"}` }}>
                <Box sx={{ height: "100%", display: { lg: "flex", md: "none", sm: "none", xs: "none" } }}>
                    <Tooltip title={`${openSideBar ? "Fechar Menu" : "Abrir Menu"}`} sx={{ height: 30, mt: 3 }}>
                        <IconButton>
                            {openSideBar ?
                                <ArrowBackIosNewIcon sx={{ mt: -0.5, color: "primary.main" }} onClick={() => { setOpenSideBar(!openSideBar); setOpenNav(false); }} />
                                :
                                <MenuIcon sx={{ mt: -0.5, color: "primary.main" }} onClick={() => { setOpenSideBar(!openSideBar); setOpenNav(false); }} />
                            }
                        </IconButton>
                    </Tooltip>
                </Box>
                <LayoutContainer>{children}</LayoutContainer>
            </LayoutRoot>
        </ThemeProvider>
    );
});

export default LayoutDashboard;
