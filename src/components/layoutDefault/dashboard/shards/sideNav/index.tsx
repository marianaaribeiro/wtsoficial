import { Avatar, Box, Divider, Drawer, Link, Stack, Typography } from "@mui/material";

import useSideNavHelper from "./sideNav.helper";
import { IProps } from "./IProps";
import { SideNavItem } from "./shards/sideNavItem";
import useStyle from "./style";

export const SideNav = ({ open, onClose }: IProps) => {
    const { pathname, lgUp, items, auth, resources, getBasename } = useSideNavHelper();
    const {
        Scrollbar,
        containerScrollbar,
        containerBox,
        gridBox,
        boxInfo,
        boxInfoUser,
        boxFooter,
        styleDrawer,
    } = useStyle();

    
  
    const content = (
        <Scrollbar
            sx={{
                ...containerScrollbar,
                "& .simplebar-content": {
                    height: "100%",
                },
                "& .simplebar-scrollbar:before": {
                    background: "neutral.400",
                },
            }}
        >
            <Box
                sx={{
                    ...containerBox,
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Box
                        sx={{
                            p: "12px",
                            ...gridBox,
                        }}
                    >
                        <Box
                            sx={{
                                pt: "5px",
                                ...boxInfo,
                            }}
                        >
                            <Box
                                component={Link}
                                href={`${getBasename(window.location.pathname)}/email-management`}
                                sx={{
                                    ...boxInfoUser,
                                }}
                            >
                                <Avatar sx={{ bgcolor: "secondary.main" }}></Avatar>
                            </Box>
                            <Typography color="inherit" variant="subtitle1">
                                {auth?.infoUser?.username ?? ""}
                            </Typography>
                            <Typography color="neutral.400" variant="body2">
                                {auth?.infoUser?.companyName ?? ""}
                            </Typography>
                            <Typography color="neutral.400" variant="body2">
                                {auth?.infoUser?.email ?? ""}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ borderColor: "neutral.700" }} />
                <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 3,
                    }}
                >
                    <Stack
                        component="ul"
                        spacing={0.5}
                        sx={{
                            listStyle: "none",
                            p: 0,
                            m: 0,
                        }}
                    >
                        {items.map((item: any) => {
                            const active = item.path ? pathname === item.path : false;
                            return (
                                <SideNavItem
                                    active={active}
                                    disabled={item.disabled}
                                    external={item.external}
                                    icon={item.icon}
                                    key={item.title}
                                    path={item.path}
                                    title={item.title}
                                    children={item.children}
                                />)
                        })}
                    </Stack>
                </Box>
                <Divider sx={{ borderColor: "neutral.700" }} />
                <Box
                    sx={{
                        ...boxFooter,
                        py: 1,
                    }}
                >
                    <Typography color="neutral.100" variant="subtitle2">
                        {resources.title}
                    </Typography>
                </Box>
            </Box>
        </Scrollbar>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        ...styleDrawer,                        
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    ...styleDrawer,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};
