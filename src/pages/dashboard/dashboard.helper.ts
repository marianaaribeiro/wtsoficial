import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

const useDashboardHelper = () => {
    const auth = useAuth();
    const { t } = useTranslation();

    const version = auth?.urlEnviroments ? auth?.urlEnviroments.VERSION : ""

    const resources = useMemo(() => {
        return {
            title: t("dashboard.title"),
            cardInfo: {
                title: t("dashboard.cardInfo.title", { version }),
                description: t("dashboard.cardInfo.description"),
            }
        };
    }, [t]);

    return {
        resources,
    };
};

export default useDashboardHelper;
