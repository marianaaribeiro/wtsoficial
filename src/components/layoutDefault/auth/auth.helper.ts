import { useMemo } from "react";
import { useTranslation } from "next-i18next";

import { createTheme } from "../../../theme";
import { useAuth } from "../../../hooks/useAuth";

const useAutHelper = () => {
    const { t } = useTranslation();

    const resources = useMemo(() => {
        return {
            system: t("login.name.system"),
            description: t("login.description.system"),
            title: t("login.subTitle")
        };
    }, [t]);

    const data = useAuth()
    const theme = createTheme(data?.listTheme);

    return {
        resources,
        theme
    };
};

export default useAutHelper;
