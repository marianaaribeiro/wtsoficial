import {
    Bars3Icon,
} from "@heroicons/react/24/solid";

import {
    Avatar,
    Box,
    IconButton,
    Stack,
    SvgIcon,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import useTopNavHelper from "./topNav.helper";
import { IProps } from "./IProps";
import { AccountPopover } from "../accountPopover";
import useStyle from "./style";

export const TopNav = ({ onNavOpen }: IProps) => {
    const {
        SIDE_NAV_WIDTH,
        TOP_NAV_HEIGHT,
        lgUp,
        accountPopover,
    } = useTopNavHelper();
    const { containerAvatar, containerTopNav } = useStyle();
    return (
        <>
            <Box
                component="header"
                sx={{
                    ...containerTopNav,
                    backgroundColor: (theme) =>
                        alpha(theme.palette.background.default, 0.8),

                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`,
                    },

                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                    },
                    zIndex: (theme) => theme.zIndex.appBar,
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2,
                    }}
                >
                    <Stack alignItems="center" direction="row" spacing={2}>
                        {!lgUp && (
                            <IconButton onClick={onNavOpen}>
                                <SvgIcon fontSize="small">
                                    <Bars3Icon />
                                </SvgIcon>
                            </IconButton>
                        )}
                        {/* <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
                    </Stack>
                    <Stack alignItems="center" direction="row" spacing={2}>
                        {/* <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
                        {/* <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip> */}
                        {/*  <InputSelects title="" sx={{ width: 70, mt: 1 }} label="Language" valueSelect={itemLanguages} handleChangeLanguage={handleChangeLanguage} menuItem={dataMenuSelect} /> */}
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{
                                ...containerAvatar,
                            }}
                            src=""
                        />
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
            />
        </>
    );
};
