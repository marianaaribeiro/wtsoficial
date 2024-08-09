import { useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { SvgIcon } from "@mui/material";
import {
    ChartBarIcon,
    UsersIcon,
    BookOpenIcon
} from "@heroicons/react/24/solid";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../../../../hooks/useAuth";

const useSideNavHelper = () => {
    const auth = useAuth();
    const pathname = usePathname();
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const { t } = useTranslation();
    const getBasename = (path: any) => path.substr(0, path.lastIndexOf('/'));
    /* const url = useMemo(() => getBasename(window.location.pathname), []) */

    /* const handleOnClickPage = (url: string) => {
        return url;
    }; */

    const resources = useMemo(() => {
        return {
            title: t("menu.footer.title"),
            menu: [
                {
                    title: t("menu.item[0].title"),
                    path: `/dashboard`,
                    icon: (
                        <SvgIcon fontSize="small">
                            <ChartBarIcon />
                        </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                },
                {
                    title: t("menu.item[1].title"),
                    path: `/view-campaigns`,
                    icon: (
                        <SvgIcon fontSize="small">
                            <BookOpenIcon />
                        </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                },
                {
                    title: t("menu.item[2].title"),
                    path: `/view-campaigns`,
                    icon: (
                        <SvgIcon fontSize="small">
                            <BookOpenIcon />
                        </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                },
                {
                    title: t("menu.item[3].title"),
                    path: "",
                    icon: (
                        <SvgIcon fontSize="small">
                            <UsersIcon />
                        </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                    children: [
                        {
                            title: t("menu.item[4].title"),
                            path: `/volumes-shipped`,
                            icon: (
                                <SvgIcon fontSize="small">
                                    <UsersIcon />
                                </SvgIcon>
                            ),
                            disabled: false,
                            external: false,
                        },
                        {
                            title: t("menu.item[5].title"),
                            path: `/counts`,
                            icon: (
                                <SvgIcon fontSize="small">
                                    <UsersIcon />
                                </SvgIcon>
                            ),
                            disabled: false,
                            external: false,
                        },
                    ]
                },
                {
                    title: t("menu.item[6].title"),
                    path: '',
                    icon: (
                        <SvgIcon fontSize="small">
                            <UsersIcon />
                        </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                    children: [
                        {
                            title: t("menu.item[7].title"),
                            path: `/rules`,
                            icon: (
                                <SvgIcon fontSize="small">
                                    <UsersIcon />
                                </SvgIcon>
                            ),
                            disabled: false,
                            external: false,
                        },
                        {
                            title: t("menu.item[8].title"),
                            path: `/blacklists`,
                            icon: (
                                <SvgIcon fontSize="small">
                                    <UsersIcon />
                                </SvgIcon>
                            ),
                            disabled: false,
                            external: false,
                        },
                    ]
                },
                /* {
                    title: "Históricos",
                    path: handleOnClickPage("/login"),
                    icon: (
                        <SvgIcon fontSize="small">
                            <ImportContactsIcon />
                        </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                }, */
            ],
            itemError: [
                {
                    title: t("errors.card[0].error.title"),
                    description: t("errors.card[0].error.description"),
                },
            ],
        };
    }, [t]);

    const items = resources.menu.map((item) => {
        return {
            title: item.title,
            path: item.path,
            icon: item.icon,
            disabled: item.disabled,
            external: item.external,
            children: item.children || []
        };
    });

    return {
        pathname,
        lgUp,
        items,
        auth,
        resources,
        t,
        getBasename,
    };
};

export default useSideNavHelper;
