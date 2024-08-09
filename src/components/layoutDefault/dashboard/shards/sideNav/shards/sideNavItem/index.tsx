import { Box, ButtonBase } from "@mui/material";

import { IProps } from "./IProps";
import useSideNavItemHelper from "./sideNavItem.helper";
import useStyle from "./style";
import { useState } from "react";
import ChildSideNavItem from "./childSideNavItem";

export const SideNavItem = ({
    active = false,
    disabled,
    external,
    icon,
    path,
    title,
    children
}: IProps) => {
    const { linkProps } = useSideNavItemHelper(external, path);
    const { containerButton, containerIcon, styleTitle } = useStyle();
    const [openSubMenu, setOpenSubMenu] = useState(false);

    return (
        <li>
            <ButtonBase
                sx={{
                    pl: "16px",
                    pr: "16px",
                    py: "6px",
                    ...(active && {
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                    }),
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                    },
                    ...containerButton
                }}
                {...linkProps}
                onClick={() => children && children.length > 0 && setOpenSubMenu(!openSubMenu)}
            >
                {icon && (
                    <Box
                        component="span"
                        sx={{
                            ...containerIcon,
                            mr: 2,
                            ...(active && {
                                color: "primary.main",
                            }),
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        fontFamily: (theme) => theme.typography.fontFamily,
                        ...styleTitle,
                        ...(active && {
                            color: "common.white",
                        }),
                        ...(disabled && {
                            color: "neutral.500",
                        }),
                    }}
                >
                    {title}
                </Box>
            </ButtonBase>      

            {openSubMenu && children && children.map((child: any) => <ChildSideNavItem item={child} key={child.title}/>)}       
            
        </li>
    );
};
