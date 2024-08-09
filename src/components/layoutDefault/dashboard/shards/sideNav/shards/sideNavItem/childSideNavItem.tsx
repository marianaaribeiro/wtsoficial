import { ButtonBase } from "@mui/material"
import { Box } from "@mui/system"
import useSideNavItemHelper from "./sideNavItem.helper";
import useStyle from "./style";
import { IChildSideNavItemProps } from "./IChildSideNavItemProps";

const ChildSideNavItem = (props: IChildSideNavItemProps) => {
    const { item } = props;
    const { linkProps } = useSideNavItemHelper(item.external, item.path);
    const { containerButton, containerIcon, styleTitle } = useStyle();

    return (
        <ul style={{listStyle: 'none'}}>
            <li>
                <ButtonBase
                    sx={{
                        pl: "30px",
                        pr: "16px",
                        py: "6px",
                        ...(item.active && {
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                        }),
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                        },
                        ...containerButton
                    }}
                    {...linkProps}
                >
                    {item.icon && (
                        <Box
                            component="span"
                            sx={{
                                ...containerIcon,
                                mr: 2,
                                ...(item.active && {
                                    color: "primary.main",
                                }),
                            }}
                        >
                            {item.icon}
                        </Box>
                    )}
                    <Box
                        component="span"
                        sx={{
                            fontFamily: (theme: any) => theme.typography.fontFamily,
                            ...styleTitle,
                            ...(item.active && {
                                color: "common.white",
                            }),
                            ...(item.disabled && {
                                color: "neutral.500",
                            }),
                        }}
                    >
                        {item.title}
                    </Box>
                </ButtonBase>
            </li>
        </ul>
    )
}

export default ChildSideNavItem;